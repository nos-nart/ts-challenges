import { defineStore } from 'pinia'
import type { Challenge, Concept } from '~/types/challenge'
import {
  challengeMapping,
  titleOverrides,
  getHintContent,
  getConcept
} from '~/data/challenges'
import challengeList from '~/data/challenges/list.json'

// Load all challenge files locally
const challengeFiles = import.meta.glob('../data/challenges/**/*.{(md,ts)}', {
  query: '?raw',
  import: 'default',
  eager: true
})

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

      // Get content from local files
      const readmePath = `../data/challenges/${challenge.name}/README.md`
      const templatePath = `../data/challenges/${challenge.name}/template.ts`
      const testsPath = `../data/challenges/${challenge.name}/test-cases.ts`

      const readme = (challengeFiles[readmePath] as string) || ''
      const template = (challengeFiles[templatePath] as string) || ''
      const tests = (challengeFiles[testsPath] as string) || ''

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
