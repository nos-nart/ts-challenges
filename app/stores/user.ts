import { defineStore } from 'pinia'
import { useIDBKeyval } from '@vueuse/integrations/useIDBKeyval'

export type ChallengeStatus = 'passed' | 'failed' | 'unsolved'

export const useUserStore = defineStore('user', () => {
  // Use a fallback for SSR since IndexedDB is client-only
  const progress = import.meta.client
    ? useIDBKeyval<Record<string, ChallengeStatus>>('ts-challenges-progress', {})
    : { data: ref<Record<string, ChallengeStatus>>({}), isFinished: ref(true), set: async () => {} }

  const solutions = import.meta.client
    ? useIDBKeyval<Record<string, string>>('ts-challenges-solutions', {})
    : { data: ref<Record<string, string>>({}), isFinished: ref(true), set: async () => {} }

  const migrated = import.meta.client
    ? useIDBKeyval<boolean>('ts-challenges-migrated', false)
    : { data: ref(false), isFinished: ref(true), set: async () => {} }

  // Sync migration from localStorage (Only on client)
  if (import.meta.client) {
    watch([progress.data, solutions.data, migrated.data], () => {
      if (!migrated.data.value) {
        const localProgress = localStorage.getItem('ts-challenges-progress')
        const localSolutions = localStorage.getItem('ts-challenges-solutions')

        if (localProgress) {
          try {
            progress.data.value = { ...progress.data.value, ...JSON.parse(localProgress) }
          } catch (e) {
            console.error('Failed to migrate progress', e)
          }
        }

        if (localSolutions) {
          try {
            solutions.data.value = { ...solutions.data.value, ...JSON.parse(localSolutions) }
          } catch (e) {
            console.error('Failed to migrate solutions', e)
          }
        }

        migrated.data.value = true
        console.log('Successfully migrated data from localStorage to IndexedDB')
      }
    }, { immediate: true })
  }

  function updateProgress(challengeName: string, status: ChallengeStatus) {
    progress.data.value[challengeName] = status
  }

  function saveSolution(challengeName: string, code: string) {
    solutions.data.value[challengeName] = code
  }

  function getStatus(challengeName: string): ChallengeStatus {
    return progress.data.value[challengeName] || 'unsolved'
  }

  function getSolution(challengeName: string): string | null {
    return solutions.data.value[challengeName] || null
  }

  return {
    progress: progress.data,
    solutions: solutions.data,
    updateProgress,
    saveSolution,
    getStatus,
    getSolution
  }
})
