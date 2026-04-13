<script setup lang="ts">
const store = useChallengeStore()
</script>

<template>
  <div class="h-full flex flex-col bg-white dark:bg-gray-950 overflow-hidden">
    <template v-if="store.currentChallenge">
      <LazyUTabs
        :items="[
          {
            label: 'Challenge',
            icon: 'i-solar-dumbbell-large-minimalistic-bold-duotone',
            slot: 'readme'
          },
          {
            label: 'Hint',
            icon: 'i-solar-lightbulb-bolt-bold-duotone',
            slot: 'hint'
          },
          {
            label: 'Learn',
            icon: 'i-solar-book-bookmark-bold-duotone',
            slot: 'learn'
          }
        ]"
        variant="link"
        class="w-full h-full flex flex-col"
        :ui="{
          content: 'flex-1 overflow-y-auto p-6'
        }"
      >
        <template #readme>
          <div class="prose dark:prose-invert max-w-none prose-sm challenge-readme">
            <ChallengeReadmeSkeleton v-if="store.detailsLoading" />
            <LazyMDC
              v-else
              :value="store.currentChallenge.readme || ''"
            />
          </div>
        </template>

        <template #hint>
          <div class="prose dark:prose-invert max-w-none prose-sm challenge-readme">
            <h3 class="flex items-center gap-2">
              <UIcon
                name="i-solar-stars-bold-duotone"
                class="text-primary w-5 h-5"
              />
              Helpful Hints
            </h3>
            <ChallengeReadmeSkeleton v-if="store.detailsLoading" />
            <LazyMDC
              v-else
              :value="store.currentChallenge.hint || ''"
            />
          </div>
        </template>

        <template #learn>
          <div class="prose dark:prose-invert max-w-none prose-sm challenge-readme">
            <ChallengeReadmeSkeleton v-if="store.detailsLoading" />
            <template v-else-if="store.activeConcepts.length">
              <div
                v-for="(concept, index) in store.activeConcepts"
                :key="concept?.id"
              >
                <template v-if="concept">
                  <div class="flex items-center gap-2 mb-4">
                    <UIcon
                      name="i-solar-lightbulb-bold-duotone"
                      class="text-primary w-5 h-5"
                    />
                    <h2 class="m-0!">
                      {{ concept.title }}
                    </h2>
                  </div>

                  <LazyMDC :value="concept.content" />

                  <LazyUSeparator
                    v-if="index < store.activeConcepts.length - 1"
                    class="my-12"
                  />
                </template>
              </div>
            </template>
            <div
              v-else-if="!store.detailsLoading"
              class="flex flex-col items-center justify-center py-10 opacity-50"
            >
              <UIcon
                name="i-solar-library-bold-duotone"
                class="w-10 h-10 mb-2"
              />
              <p>No specific concept notes for this challenge yet.</p>
              <UButton
                to="https://www.typescriptlang.org/docs/handbook/intro.html"
                variant="link"
                label="Browse TS Handbook"
                target="_blank"
              />
            </div>
          </div>
        </template>
      </LazyUTabs>
    </template>
    <div
      v-else
      class="flex flex-col items-center justify-center h-full text-gray-400"
    >
      <UIcon
        name="i-solar-code-bold-duotone"
        class="w-10 h-10 mb-4 opacity-20"
      />
      <p>Select a challenge to begin</p>
    </div>
  </div>
</template>
