<script setup lang="ts">
const code = defineModel<string>('code', { default: '' })
const store = useChallengeStore()

defineProps<{
  tests: string
}>()

defineEmits<{
  format: []
  submit: []
}>()

const editorRef = ref()

defineExpose({
  format: () => editorRef.value?.format()
})
</script>

<template>
  <div class="h-full flex flex-col bg-gray-50 dark:bg-black border-l border-gray-200 dark:border-gray-800 relative group">
    <div class="flex-1 min-h-0">
      <LazyChallengeEditor
        v-if="store.currentChallenge"
        ref="editorRef"
        v-model:model-value="code"
        :tests="tests"
        path="solution.ts"
      />
      <div
        v-else
        class="flex items-center justify-center h-full text-gray-500 italic"
      >
        No challenge selected
      </div>
    </div>

    <!-- Actions -->
    <div
      v-if="store.currentChallenge"
      class="absolute bottom-4 right-6 flex items-center gap-2 z-10"
    >
      <UButton
        icon="i-solar-stars-bold-duotone"
        label="Prettify"
        variant="subtle"
        color="neutral"
        size="xs"
        class="font-bold shadow-sm backdrop-blur-sm bg-white/80 dark:bg-gray-900/80"
        @click="$emit('format')"
      />
      <UButton
        label="Submit"
        color="primary"
        icon="i-solar-check-circle-bold-duotone"
        size="xs"
        class="font-bold shadow-md"
        @click="$emit('submit')"
      />
    </div>
  </div>
</template>
