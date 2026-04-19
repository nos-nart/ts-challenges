import { defineStore } from 'pinia'
import type { Challenge, Concept } from '~/types/challenge'
import {
  challengeMapping,
  titleOverrides,
  getHintContent,
  getConcept
} from '~/utils/challenges'
import challengeList from '~/utils/challenge-list.json'

// Helper to normalize "00004-easy-pick" to "4-easy-pick" for lookups
function normalizeName(name: string) {
  return name.replace(/^0+/, '')
}

function formatTitle(slug: string) {
  // 1. Check for manual overrides
  if (titleOverrides[slug]) return titleOverrides[slug]

  // 2. Standard formatting
  return slug
    .split('-')
    .map((part) => {
      // Special handling for common TS words that should remain capitalized
      const special = ['vue', 'bem', 'id', 'ts', 'js']
      if (special.includes(part.toLowerCase())) return part.toUpperCase()

      // Capitalize first letter, keep rest as is
      return part.charAt(0).toUpperCase() + part.slice(1)
    })
    .join(' ')
}

export const useChallengeStore = defineStore('challenge', () => {
  const challenges = ref<Challenge[]>([])
  const currentChallenge = ref<Challenge | null>(null)
  const activeConcepts = ref<Concept[]>([])
  const listLoading = ref(false)
  const detailsLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchChallenges() {
    listLoading.value = true
    try {
      challenges.value = challengeList.map((item: any) => {
        const parts = item.name.split('-')
        parts.shift() // Remove ID
        const difficulty = parts.shift()
        const slug = parts.join('-')
        const normalized = normalizeName(item.name)

        return {
          name: item.name,
          path: item.path,
          difficulty,
          title: formatTitle(slug),
          concepts: challengeMapping[normalized] || []
        }
      })
    } catch (e: any) {
      error.value = e.message
    } finally {
      listLoading.value = false
    }
  }

  async function selectChallenge(challenge: Challenge) {
    detailsLoading.value = true
    try {
      // Update URL with challenge slug without full reload
      const url = new URL(window.location.href)
      url.searchParams.set('c', challenge.name)
      window.history.replaceState({}, '', url.toString())

      const normalized = normalizeName(challenge.name)

      // Fetch content from public directory
      const [readme, template, tests, hint, concepts] = await Promise.all([
        fetch(`/data/challenges/${challenge.name}/README.md`).then(r => r.ok ? r.text() : ''),
        fetch(`/data/challenges/${challenge.name}/template.ts`).then(r => r.ok ? r.text() : ''),
        fetch(`/data/challenges/${challenge.name}/test-cases.ts`).then(r => r.ok ? r.text() : ''),
        getHintContent(normalized),
        Promise.all((challengeMapping[normalized] || []).map(id => getConcept(id)))
      ])

      activeConcepts.value = concepts.filter((c): c is Concept => !!c)

      currentChallenge.value = {
        ...challenge,
        readme,
        template,
        tests,
        hint:
          hint
          || `
- Think about the core TypeScript features that might apply here.
- Check the **Learn** tab for syntax deep-dives.
- Break the problem into smaller steps: what is the input, and what exactly is the expected output?
        `
      }
    } catch (e: any) {
      error.value = e.message
    } finally {
      detailsLoading.value = false
    }
  }

  return {
    challenges,
    currentChallenge,
    activeConcepts,
    listLoading,
    detailsLoading,
    error,
    fetchChallenges,
    selectChallenge
  }
})
