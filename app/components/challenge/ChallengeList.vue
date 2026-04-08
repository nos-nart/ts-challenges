<script setup lang="ts">
import { useChallengeStore, type Challenge } from "~/stores/challenge";

const store = useChallengeStore();

onMounted(() => {
  store.fetchChallenges();
});

const difficultyOrder = ["warmup", "easy", "medium", "hard", "extreme"];

const groupedChallenges = computed(() => {
  const groups: Record<string, Challenge[]> = {};

  // Sort difficulties based on our predefined order
  const sortedDifficulties = [
    ...new Set(store.challenges.map((c) => c.difficulty)),
  ].sort((a, b) => {
    return difficultyOrder.indexOf(a) - difficultyOrder.indexOf(b);
  });

  for (const diff of sortedDifficulties) {
    groups[diff] = store.challenges.filter((c) => c.difficulty === diff);
  }

  return groups;
});

const difficultyColor = (diff: string) => {
  switch (diff) {
    case "warmup":
      return "text-blue-500";
    case "easy":
      return "text-green-500";
    case "medium":
      return "text-yellow-500";
    case "hard":
      return "text-orange-500";
    case "extreme":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
</script>

<template>
  <div
    class="h-full flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
  >
    <div
      class="p-4 dark:border-gray-800 flex items-center justify-between bg-gray-50 dark:bg-gray-950/50"
    >
      <h2 class="font-bold text-lg">Challenges</h2>
      <span v-if="store.listLoading" class="text-xs animate-pulse"
        >Loading...</span
      >
    </div>

    <div
      class="flex-1 overflow-y-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
      tabindex="0"
      role="region"
      aria-label="Challenges list"
    >
      <AppSkeleton :loading="store.listLoading">
        <!-- If loading and no challenges, show mock items to define the skeleton shape -->
        <template v-if="store.listLoading && store.challenges.length === 0">
          <div v-for="i in 3" :key="i" class="mb-4">
            <div
              class="px-4 py-2 bg-gray-50 dark:bg-gray-800/50 border-y border-gray-200 dark:border-gray-800"
            >
              <span class="text-[10px] uppercase font-black"
                >Loading Group</span
              >
            </div>
            <div
              v-for="j in 4"
              :key="j"
              class="px-4 py-2 border-b border-gray-50 dark:border-gray-800/20"
            >
              <span class="text-sm"
                >This is a placeholder for a challenge title</span
              >
            </div>
          </div>
        </template>

        <div
          v-for="(challenges, difficulty) in groupedChallenges"
          :key="difficulty"
          class="mb-2"
        >
          <div
            class="px-4 py-2 bg-gray-50 dark:bg-gray-800/50 border-y border-gray-200 dark:border-gray-800 flex items-center gap-2"
          >
            <span
              class="text-[10px] font-black uppercase tracking-widest opacity-50"
              :class="difficultyColor(difficulty as string)"
            >
              {{ capitalize(difficulty as string) }}
            </span>
            <span class="text-[10px] opacity-30 font-bold">{{
              challenges.length
            }}</span>
          </div>

          <div
            v-for="challenge in challenges"
            :key="challenge.name"
            role="button"
            tabindex="0"
            @click="store.selectChallenge(challenge)"
            @keydown.enter.prevent="store.selectChallenge(challenge)"
            @keydown.space.prevent="store.selectChallenge(challenge)"
            class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex flex-col transition-colors border-b border-gray-50 dark:border-gray-800/20 last:border-b-0 focus:outline-none focus-visible:bg-gray-100 dark:focus-visible:bg-gray-800 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
            :class="{
              'bg-primary/5 dark:bg-primary/10 !border-l-2 !border-l-primary':
                store.currentChallenge?.name === challenge.name,
            }"
          >
            <span
              class="text-sm font-medium"
              :class="{
                'text-primary': store.currentChallenge?.name === challenge.name,
              }"
            >
              {{ challenge.title }}
            </span>
          </div>
        </div>
      </AppSkeleton>

      <div
        v-if="!store.listLoading && store.challenges.length === 0"
        class="p-8 text-center text-gray-400 italic text-sm"
      >
        No challenges found
      </div>
    </div>
  </div>
</template>
