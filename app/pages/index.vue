<script setup lang="ts">
import { Splitpanes, Pane } from "splitpanes";
import { useChallengeStore } from "~/stores/challenge";
import { useUiStore } from "~/stores/ui";
import { useMounted } from "@vueuse/core";

const store = useChallengeStore();
const ui = useUiStore();
const code = ref("");

watch(
  () => store.currentChallenge?.template,
  (val) => {
    if (val) code.value = val;
  },
);

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

// TS Version handling
const selectedVersion = ref(
  ui.supportedTsVersions.find((v) => v.value === ui.tsVersion) ||
    ui.supportedTsVersions[0],
);

const defaultTsVersion = ui.supportedTsVersions?.[0]?.value;

// Keep UI ref in sync with store (important for initialization and reloads)
watch(
  () => ui.tsVersion,
  (newVer) => {
    const found = ui.supportedTsVersions.find((v) => v.value === newVer);
    if (found) selectedVersion.value = found;
  },
);

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const v = urlParams.get("v");

  if (v) {
    const found = ui.supportedTsVersions.find((ver) => ver.value === v);
    if (found) {
      ui.tsVersion = v;
    }
  } else if (defaultTsVersion) {
    ui.tsVersion = defaultTsVersion;
  }
});

const handleVersionChange = (version: any) => {
  // 1. Update the store/cookie immediately so it's correct on next load
  ui.tsVersion = version.value;

  // 2. Prepare the new URL
  const url = new URL(window.location.href);
  const defaultVersion = ui.supportedTsVersions?.[0]?.value;

  if (version.value === defaultVersion) {
    url.searchParams.delete("v");
  } else {
    url.searchParams.set("v", version.value);
  }

  // 3. Hard reload to swap the Monaco worker engine
  window.location.href = url.toString();
};

const toggleColorMode = () => {
  const isAppearanceTransition =
    typeof document !== "undefined" &&
    "startViewTransition" in document &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!isAppearanceTransition) {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
    return;
  }

  document.startViewTransition(async () => {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
    await nextTick();
  });
};

const editorRef = ref<{ getModel: () => any; format: () => void } | null>(null);
const { results, testChallenge, reset: resetResults } = useChallengeTester();
const toast = useToast();

const formatCode = () => {
  editorRef.value?.format();
};

// Clear results when challenge changes
watch(
  () => store.currentChallenge?.name,
  () => {
    resetResults();
  },
);

const handleSubmit = async () => {
  if (!store.currentChallenge) return;

  const normalizedCode = code.value.trim();
  const normalizedTemplate = store.currentChallenge.template?.trim();

  // 1. Prevent submitting without changes
  // We compare the trimmed code to the original template to ensure the user actually tried something.
  if (normalizedCode === normalizedTemplate) {
    toast.add({
      title: "No changes detected",
      description: "Please implement your solution before submitting.",
      color: "warning",
    });
    return;
  }

  const res = await testChallenge(
    code.value,
    store.currentChallenge.tests || "",
  );
  if (res.passed) {
    toast.add({
      title: "Challenge Completed!",
      description: "All type checks passed!",
      color: "success",
    });
  } else {
    toast.add({
      title: "Check Failed",
      description: `Found ${res.errors.length} errors`,
      color: "error",
    });
  }
};

// Dragging logic
function onResizeMain(e: { size: number }[]) {
  if (ui) {
    ui.isDragging = true;
    if (e[0]) ui.panelSidebar = e[0].size;
  }
}

function onResizedMain() {
  if (ui) ui.isDragging = false;
}

function onResizeHorizontal(e: { size: number }[]) {
  if (ui) {
    ui.isDragging = true;
    if (e[0]) ui.panelEditorHeight = e[0].size;
  }
}

function onResizedHorizontal() {
  if (ui) ui.isDragging = false;
}

function onResizeEditorPane(e: { size: number }[]) {
  if (ui) {
    ui.isDragging = true;
    if (e[0]) ui.panelInstructions = e[0].size;
  }
}

function onResizedEditorPane() {
  if (ui) ui.isDragging = false;
}

// SSR hydration stability
const isMounted = useMounted();
const sidebarInit = computed(() =>
  isMounted.value ? {} : { width: `${ui?.panelSidebar}%` },
);
const mainInit = computed(() =>
  isMounted.value ? {} : { width: `${ui?.panelMain}%` },
);
const instrInit = computed(() =>
  isMounted.value ? {} : { width: `${ui?.panelInstructions}%` },
);
const editorInit = computed(() =>
  isMounted.value ? {} : { width: `${ui?.panelEditor}%` },
);
const editorHeightInit = computed(() =>
  isMounted.value ? {} : { height: `${ui?.panelEditorHeight}%` },
);
const resultsHeightInit = computed(() =>
  isMounted.value ? {} : { height: `${ui?.panelResultsHeight}%` },
);
</script>

<template>
  <div class="h-screen w-screen flex flex-col overflow-hidden">
    <!-- Navbar -->
    <header
      class="h-12 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shrink-0 z-20"
    >
      <div class="flex items-center gap-3">
        <h1
          class="tracking-tight text-md flex items-center font-mono font-bold"
        >
          TYPE&lt;<span
            class="text-blue-500 underline underline-offset-4 decoration-red-500 decoration-wavy"
            >CHALLENGES</span
          >[]&gt;<span
            class="after:animate-blink after:text-black after:content-['|']"
          ></span>
        </h1>
      </div>

      <div class="flex items-center gap-3">
        <USelectMenu
          v-model="selectedVersion"
          :items="ui.supportedTsVersions"
          size="sm"
          class="w-40"
          searchable
          by="value"
          placeholder="Select TS Version"
          @update:model-value="handleVersionChange"
        >
          <template #leading>
            <UIcon name="i-lucide-binary" class="w-4 h-4 opacity-50" />
          </template>
        </USelectMenu>

        <UButton
          :icon="isDark ? 'i-lucide-sun' : 'i-lucide-moon'"
          color="neutral"
          variant="ghost"
          size="sm"
          aria-label="Toggle Color Mode"
          @click="toggleColorMode"
        />
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 overflow-hidden relative">
      <ClientOnly>
        <Splitpanes
          class="default-theme"
          :class="ui?.isDragging ? 'splitpanes--dragging' : ''"
          @resize="onResizeMain"
          @resized="onResizedMain"
        >
          <!-- Sidebar -->
          <Pane
            :size="ui?.panelSidebar"
            min-size="15"
            max-size="30"
            :style="sidebarInit"
          >
            <ChallengeList />
          </Pane>

          <PaneSplitter />

          <!-- Editor & Instructions -->
          <Pane :size="ui?.panelMain" :style="mainInit">
            <Splitpanes
              horizontal
              :class="ui?.isDragging ? 'splitpanes--dragging' : ''"
              @resize="onResizeHorizontal"
              @resized="onResizedHorizontal"
            >
              <Pane :size="ui?.panelEditorHeight" :style="editorHeightInit">
                <Splitpanes
                  :class="ui?.isDragging ? 'splitpanes--dragging' : ''"
                  @resize="onResizeEditorPane"
                  @resized="onResizedEditorPane"
                >
                  <!-- Instructions -->
                  <Pane
                    :size="ui?.panelInstructions"
                    min-size="20"
                    :style="instrInit"
                  >
                    <div
                      class="h-full flex flex-col bg-white dark:bg-gray-950 overflow-hidden"
                    >
                      <template v-if="store.currentChallenge">
                        <LazyUTabs
                          :items="[
                            {
                              label: 'Challenge',
                              icon: 'i-lucide-scroll-text',
                              slot: 'readme',
                            },
                            {
                              label: 'Hint',
                              icon: 'i-lucide-lightbulb',
                              slot: 'hint',
                            },
                            {
                              label: 'Learn',
                              icon: 'i-lucide-graduation-cap',
                              slot: 'learn',
                            },
                          ]"
                          variant="link"
                          class="w-full h-full flex flex-col"
                          :ui="{
                            content: 'flex-1 overflow-y-auto p-6',
                          }"
                        >
                          <template #readme>
                            <div
                              class="prose dark:prose-invert max-w-none prose-sm challenge-readme"
                            >
                              <div
                                class="flex items-center gap-2 mb-4 not-prose"
                              >
                                <LazyUBadge
                                  :label="store.currentChallenge.difficulty"
                                  color="neutral"
                                  variant="solid"
                                  size="xs"
                                />
                              </div>
                              <AppSkeleton :loading="store.detailsLoading">
                                <LazyMDC
                                  :value="
                                    store.detailsLoading
                                      ? '# Loading Challenge\n\nThis is a placeholder for the challenge description. It is used to generate the skeleton shimmer effect automatically without manual sizing.'
                                      : store.currentChallenge.readme || ''
                                  "
                                />
                              </AppSkeleton>
                            </div>
                          </template>

                          <template #hint>
                            <div
                              class="prose dark:prose-invert max-w-none prose-sm challenge-readme"
                            >
                              <h3 class="flex items-center gap-2">
                                <UIcon
                                  name="i-lucide-sparkles"
                                  class="text-primary w-5 h-5"
                                />
                                Helpful Hints
                              </h3>
                              <AppSkeleton :loading="store.detailsLoading">
                                <LazyMDC
                                  :value="
                                    store.detailsLoading
                                      ? '- Loading Hint...\n- Please wait while we find some helpful tips for this challenge.'
                                      : store.currentChallenge.hint || ''
                                  "
                                />
                              </AppSkeleton>
                            </div>
                          </template>

                          <template #learn>
                            <div
                              class="prose dark:prose-invert max-w-none prose-sm challenge-readme"
                            >
                              <AppSkeleton :loading="store.detailsLoading">
                                <template v-if="store.activeConcepts.length">
                                  <div
                                    v-for="(
                                      concept, index
                                    ) in store.activeConcepts"
                                    :key="concept?.id"
                                  >
                                    <template v-if="concept">
                                      <div class="flex items-center gap-2 mb-4">
                                        <UIcon
                                          name="i-lucide-lightbulb"
                                          class="text-primary w-5 h-5"
                                        />
                                        <h2 class="m-0!">
                                          {{ concept.title }}
                                        </h2>
                                      </div>

                                      <LazyMDC :value="concept.content" />

                                      <LazyUSeparator
                                        v-if="
                                          index <
                                          store.activeConcepts.length - 1
                                        "
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
                                    name="i-lucide-library"
                                    class="w-10 h-10 mb-2"
                                  />
                                  <p>
                                    No specific concept notes for this challenge
                                    yet.
                                  </p>
                                  <UButton
                                    to="https://www.typescriptlang.org/docs/handbook/intro.html"
                                    variant="link"
                                    label="Browse TS Handbook"
                                    target="_blank"
                                  />
                                </div>
                              </AppSkeleton>
                            </div>
                          </template>
                        </LazyUTabs>
                      </template>
                      <div
                        v-else
                        class="flex flex-col items-center justify-center h-full text-gray-400"
                      >
                        <UIcon
                          name="i-lucide-code-2"
                          class="w-10 h-10 mb-4 opacity-20"
                        />
                        <p>Select a challenge to begin</p>
                      </div>
                    </div>
                  </Pane>

                  <PaneSplitter />

                  <!-- Editor -->
                  <Pane :size="ui?.panelEditor" :style="editorInit">
                    <div
                      class="h-full flex flex-col bg-gray-50 dark:bg-black border-l border-gray-200 dark:border-gray-800 relative group"
                    >
                      <div class="flex-1 min-h-0">
                        <LazyChallengeEditor
                          v-if="store.currentChallenge"
                          ref="editorRef"
                          v-model="code"
                          :tests="store.currentChallenge.tests || ''"
                          path="solution.ts"
                        />
                        <div
                          v-else
                          class="flex items-center justify-center h-full text-gray-500 italic"
                        >
                          No challenge selected
                        </div>
                      </div>

                      <!-- LeetCode-style Bottom Right Actions -->
                      <div
                        v-if="store.currentChallenge"
                        class="absolute bottom-4 right-6 flex items-center gap-2 z-10"
                      >
                        <UButton
                          icon="i-lucide-sparkles"
                          label="Prettify"
                          variant="subtle"
                          color="neutral"
                          size="xs"
                          class="font-bold shadow-sm backdrop-blur-sm bg-white/80 dark:bg-gray-900/80"
                          @click="formatCode"
                        />
                        <UButton
                          label="Submit"
                          color="primary"
                          icon="i-lucide-check-circle"
                          size="xs"
                          class="font-bold shadow-md"
                          @click="handleSubmit"
                        />
                      </div>
                    </div>
                  </Pane>
                </Splitpanes>
              </pane>

              <PaneSplitter />

              <!-- Test Cases / Footer -->
              <Pane :size="ui?.panelResultsHeight" :style="resultsHeightInit">
                <div
                  class="h-full flex flex-col bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 overflow-hidden"
                >
                  <div
                    class="px-4 py-2 border-b border-gray-200 dark:border-gray-800 flex items-center bg-gray-50 dark:bg-gray-950/50 justify-between shrink-0"
                  >
                    <span
                      class="text-[10px] font-bold uppercase tracking-widest opacity-60"
                      >Results</span
                    >
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
                      <UIcon name="i-lucide-check-circle" class="w-4 h-4" />
                      <span class="text-xs font-bold uppercase"
                        >All tests passed!</span
                      >
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
              </Pane>
            </Splitpanes>
          </Pane>
        </Splitpanes>
        <template #placeholder>
          <div class="h-full w-full flex items-center justify-center">
            <UIcon
              name="i-lucide-loader-2"
              class="w-10 h-10 animate-spin opacity-20"
            />
          </div>
        </template>
      </ClientOnly>
    </main>
    <UToaster />
  </div>
</template>
