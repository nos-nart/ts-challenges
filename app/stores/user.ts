import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export type ChallengeStatus = 'passed' | 'failed' | 'unsolved'

export const useUserStore = defineStore('user', () => {
  // Store status of each challenge: { '4-easy-pick': 'passed' }
  const progress = useLocalStorage<Record<string, ChallengeStatus>>('ts-challenges-progress', {})

  // Store latest code for each challenge: { '4-easy-pick': 'type MyPick...' }
  const solutions = useLocalStorage<Record<string, string>>('ts-challenges-solutions', {})

  function updateProgress(challengeName: string, status: ChallengeStatus) {
    progress.value[challengeName] = status
  }

  function saveSolution(challengeName: string, code: string) {
    solutions.value[challengeName] = code
  }

  function getStatus(challengeName: string): ChallengeStatus {
    return progress.value[challengeName] || 'unsolved'
  }

  function getSolution(challengeName: string): string | null {
    return solutions.value[challengeName] || null
  }

  return {
    progress,
    solutions,
    updateProgress,
    saveSolution,
    getStatus,
    getSolution
  }
})
