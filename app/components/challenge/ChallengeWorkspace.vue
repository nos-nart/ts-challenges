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
const isReady = ref(false)

onMounted(() => {
  // Defer heavy editor mount slightly to let the rest of the UI settle
  setTimeout(() => {
    isReady.value = true
  }, 400)
})

defineExpose({
  format: () => editorRef.value?.format()
})
</script>

<template>
  <div class="h-full flex flex-col bg-gray-50 dark:bg-black border-l border-gray-200 dark:border-gray-800 relative group">
    <div class="flex-1 min-h-0">
      <template v-if="isReady">
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
      </template>
      <div
        v-else
        class="h-full w-full p-6 space-y-4"
      >
        <div class="flex items-center justify-between">
          <USkeleton class="h-4 w-32" />
          <div class="flex gap-2">
            <USkeleton class="h-8 w-16" />
            <USkeleton class="h-8 w-24" />
          </div>
        </div>
        <USkeleton class="h-[calc(100%-4rem)] w-full rounded-lg" />
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
