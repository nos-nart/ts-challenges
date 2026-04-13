<script setup lang="ts">
const store = useChallengeStore()

defineProps<{
  results: {
    passed: boolean
    errors: string[]
  }
}>()
</script>

<template>
  <div class="h-full flex flex-col bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 overflow-hidden">
    <div class="px-4 py-2 border-b border-gray-200 dark:border-gray-800 flex items-center bg-gray-50 dark:bg-gray-950/50 justify-between shrink-0">
      <span class="text-[10px] font-bold uppercase tracking-widest opacity-60">Results</span>
      <div
        v-if="results.errors.length"
        class="text-[10px] text-red-500 font-bold uppercase"
      >
        {{ results.errors.length }} errors found
      </div>
      <div
        v-else-if="results.passed && store.currentChallenge"
        class="text-[10px] text-green-500 font-bold uppercase"
      >
        Passed!
      </div>
    </div>

    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Error Summary Section (Collapsible/Scrollable) -->
      <div
        v-if="results.errors.length"
        class="p-4 bg-red-50/50 dark:bg-red-950/10 border-b border-red-100 dark:border-red-900/20 max-h-[40%] overflow-y-auto shrink-0"
      >
        <div class="space-y-2">
          <div
            v-for="err in results.errors"
            :key="err"
            class="text-[11px] font-mono text-red-600 dark:text-red-400"
          >
            {{ err }}
          </div>
        </div>
      </div>

      <!-- Success Message -->
      <div
        v-else-if="results.passed && store.currentChallenge"
        class="p-4 flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-50/50 dark:bg-green-950/10 border-b border-green-100 dark:border-green-900/20 shrink-0"
      >
        <UIcon
          name="i-solar-check-circle-bold-duotone"
          class="w-4 h-4"
        />
        <span class="text-xs font-bold uppercase">All tests passed!</span>
      </div>

      <!-- Always show Test Cases -->
      <div class="flex-1 relative overflow-hidden">
        <div class="absolute inset-0">
          <LazyChallengeEditor
            v-if="store.currentChallenge"
            :model-value="store.currentChallenge.tests || ''"
            tests=""
            read-only
            path="test-cases.ts"
          />
          <div
            v-else
            class="flex items-center justify-center h-full text-gray-400 text-[10px] italic uppercase"
          >
            No active challenge
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
