import { defineStore } from 'pinia'
import type { Challenge, Concept } from '~/types/challenge'
import {
  challengeMapping,
  titleOverrides,
  getHintContent,
  getConcept
} from '~/data/challenges'

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
  const listLoading = ref(false)
  const detailsLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchChallenges() {
    listLoading.value = true
    try {
      const response = await fetch(
        'https://api.github.com/repos/type-challenges/type-challenges/contents/questions'
      )
      const data = await response.json()
      challenges.value = data.map((item: any) => {
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
      // Update URL with challenge slug without full reload if possible,
      // but index.vue handles initial load from URL.
      const url = new URL(window.location.href)
      url.searchParams.set('c', challenge.name)
      window.history.replaceState({}, '', url.toString())

      const [readme, template, tests] = await Promise.all([
        fetch(
          `https://raw.githubusercontent.com/type-challenges/type-challenges/main/questions/${challenge.name}/README.md`
        ).then(r => r.text()),
        fetch(
          `https://raw.githubusercontent.com/type-challenges/type-challenges/main/questions/${challenge.name}/template.ts`
        ).then(r => r.text()),
        fetch(
          `https://raw.githubusercontent.com/type-challenges/type-challenges/main/questions/${challenge.name}/test-cases.ts`
        ).then(r => r.text())
      ])

      const normalized = normalizeName(challenge.name)

      currentChallenge.value = {
        ...challenge,
        readme,
        template,
        tests,
        hint:
          getHintContent(normalized)
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

  const activeConcepts = computed(() => {
    if (!currentChallenge.value?.concepts) return []
    return currentChallenge.value.concepts
      .map(id => getConcept(id))
      .filter((c): c is Concept => !!c)
  })

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
