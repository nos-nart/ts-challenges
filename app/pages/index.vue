<script setup lang="ts">
import { Splitpanes, Pane } from 'splitpanes'
import { useChallengeStore } from '~/stores/challenge'
import { useUiStore } from '~/stores/ui'
import { useUserStore } from '~/stores/user'
import { useMounted, breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const store = useChallengeStore()
const ui = useUiStore()
const user = useUserStore()
const code = ref('')

const breakpoints = useBreakpoints(breakpointsTailwind)
const largerThanLg = breakpoints.greaterOrEqual('lg')
const isDesktop = computed(() => isMounted.value ? largerThanLg.value : false)
const isSidebarOpen = ref(false)

// Dynamic SEO
useSeoMeta({
  title: () => store.currentChallenge ? `${store.currentChallenge.title}` : 'Select a Challenge',
  ogTitle: () => store.currentChallenge ? `${store.currentChallenge.title} | TS Challenges` : 'TypeScript Challenges',
  description: () => store.currentChallenge
    ? `Can you solve the "${store.currentChallenge.title}" challenge? Master TypeScript one exercise at a time.`
    : 'A platform to practice and master TypeScript with interactive challenges.',
  ogImage: () => store.currentChallenge
    ? `https://ts-challenges.vercel.app/__og-image__/static/challenge-${store.currentChallenge.name}.png`
    : 'https://ts-challenges.vercel.app/__og-image__/static/og.png',
  twitterImage: () => store.currentChallenge
    ? `https://ts-challenges.vercel.app/__og-image__/static/challenge-${store.currentChallenge.name}.png`
    : 'https://ts-challenges.vercel.app/__og-image__/static/og.png'
})

defineOgImage('Custom', {
  title: computed(() => store.currentChallenge?.title || 'TS Challenges'),
  description: computed(() => store.currentChallenge
    ? `${store.currentChallenge.difficulty.toUpperCase()} Challenge • Interactive Practice`
    : 'Master TypeScript with interactive challenges.'),
  colorMode: 'dark'
})

// Auto-save code as user types
watch(code, (newCode) => {
  if (store.currentChallenge && newCode) {
    user.saveSolution(store.currentChallenge.name, newCode)
  }
})

// Restore solution or template when challenge changes
watch(
  () => store.currentChallenge,
  (newChallenge) => {
    if (newChallenge) {
      const saved = user.getSolution(newChallenge.name)
      code.value = saved || newChallenge.template || ''
      resetResults()
      isSidebarOpen.value = false
    }
  }
)

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

// TS Version handling
const selectedVersion = ref(
  ui.supportedTsVersions.find(v => v.value === ui.tsVersion)
  || ui.supportedTsVersions[0]
)

const defaultTsVersion = ui.supportedTsVersions?.[0]?.value

// Keep UI ref in sync with store (important for initialization and reloads)
watch(
  () => ui.tsVersion,
  (newVer) => {
    const found = ui.supportedTsVersions.find(v => v.value === newVer)
    if (found) selectedVersion.value = found
  }
)

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const v = urlParams.get('v')
  const c = urlParams.get('c')

  if (v) {
    const found = ui.supportedTsVersions.find(ver => ver.value === v)
    if (found) {
      ui.tsVersion = v
    }
  } else if (defaultTsVersion) {
    ui.tsVersion = defaultTsVersion
  }

  // Restore challenge
  if (c) {
    if (store.challenges.length === 0) {
      await store.fetchChallenges()
    }
    const challenge = store.challenges.find(ch => ch.name === c)
    if (challenge) {
      store.selectChallenge(challenge)
    }
  }
})

const handleVersionChange = (version: { value: string }) => {
  ui.tsVersion = version.value
  const url = new URL(window.location.href)
  const defaultVersion = ui.supportedTsVersions?.[0]?.value

  if (version.value === defaultVersion) {
    url.searchParams.delete('v')
  } else {
    url.searchParams.set('v', version.value)
  }
  window.location.href = url.toString()
}

const toggleColorMode = () => {
  const isAppearanceTransition
    = typeof document !== 'undefined'
      && 'startViewTransition' in document
      && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!isAppearanceTransition) {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    return
  }

  document.startViewTransition(async () => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    await nextTick()
  })
}

const editorRef = ref<{ getModel: () => unknown, format: () => void } | null>(null)
const { results, testChallenge, reset: resetResults } = useChallengeTester()
const toast = useToast()

const formatCode = () => {
  editorRef.value?.format()
}

const handleSubmit = async () => {
  if (!store.currentChallenge) return

  const normalizedCode = code.value.trim()
  const normalizedTemplate = store.currentChallenge.template?.trim()

  if (normalizedCode === normalizedTemplate) {
    toast.add({
      title: 'No changes detected',
      description: 'Please implement your solution before submitting.',
      color: 'warning'
    })
    return
  }

  const res = await testChallenge(
    code.value,
    store.currentChallenge.tests || ''
  )

  // Save progress
  user.updateProgress(store.currentChallenge.name, res.passed ? 'passed' : 'failed')

  if (res.passed) {
    toast.add({
      title: 'Challenge Completed!',
      description: 'All type checks passed!',
      color: 'success'
    })
  } else {
    toast.add({
      title: 'Check Failed',
      description: `Found ${res.errors.length} errors`,
      color: 'error'
    })
  }
}

// Dragging logic
function onResizeMain(e: { size: number }[]) {
  if (ui) {
    ui.isDragging = true
    if (e[0]) ui.panelSidebar = e[0].size
  }
}

function onResizedMain() {
  if (ui) ui.isDragging = false
}

function onResizeHorizontal(e: { size: number }[]) {
  if (ui) {
    ui.isDragging = true
    if (e[0]) ui.panelEditorHeight = e[0].size
  }
}

function onResizedHorizontal() {
  if (ui) ui.isDragging = false
}

function onResizeEditorPane(e: { size: number }[]) {
  if (ui) {
    ui.isDragging = true
    if (e[0]) ui.panelInstructions = e[0].size
  }
}

function onResizedEditorPane() {
  if (ui) ui.isDragging = false
}

// SSR hydration stability
const isMounted = useMounted()
const sidebarInit = computed(() =>
  isMounted.value ? {} : { width: `${ui?.panelSidebar}%` }
)
const mainInit = computed(() =>
  isMounted.value ? {} : { width: `${ui?.panelMain}%` }
)
const instrInit = computed(() =>
  isMounted.value ? {} : { width: `${ui?.panelInstructions}%` }
)
const editorInit = computed(() =>
  isMounted.value ? {} : { width: `${ui?.panelEditor}%` }
)
const editorHeightInit = computed(() =>
  isMounted.value ? {} : { height: `${ui?.panelEditorHeight}%` }
)
const resultsHeightInit = computed(() =>
  isMounted.value ? {} : { height: `${ui?.panelResultsHeight}%` }
)
</script>

<template>
  <div class="h-screen w-screen flex flex-col overflow-hidden">
    <!-- Navbar -->
    <header
      class="h-12 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shrink-0 z-20"
    >
      <div class="flex items-center gap-2">
        <template v-if="!isMounted">
          <USkeleton class="h-8 w-8 rounded-md sm:hidden" />
          <USkeleton class="h-5 w-32 hidden sm:block" />
        </template>
        <template v-else>
          <UButton
            v-if="!isDesktop"
            icon="i-solar-hamburger-menu-bold-duotone"
            color="neutral"
            variant="ghost"
            size="sm"
            @click="isSidebarOpen = true"
          />

          <h1
            class="tracking-tight text-md flex items-center font-mono font-bold"
          >
            <template v-if="isDesktop">
              TYPE&lt;<span
                class="text-blue-500 underline underline-offset-4 decoration-red-500 decoration-wavy"
              >CHALLENGES</span>[]&gt;
            </template>
            <template v-else>
              TS[]
            </template>
            <span
              class="after:animate-blink after:text-black after:content-['|']"
            />
          </h1>
        </template>
      </div>

      <div class="flex items-center gap-1.5 sm:gap-3">
        <template v-if="!isMounted">
          <USkeleton class="h-8 w-24 sm:w-40" />
          <USkeleton class="h-8 w-8 rounded-full" />
        </template>
        <template v-else>
          <USelectMenu
            v-model="selectedVersion"
            :items="ui.supportedTsVersions"
            size="sm"
            :class="isDesktop ? 'w-40' : 'w-24'"
            searchable
            by="value"
            :placeholder="isDesktop ? 'Select TS Version' : 'v5.7.3'"
            @update:model-value="handleVersionChange"
          >
            <template #leading>
              <UIcon
                name="i-solar-code-2-bold-duotone"
                class="w-4 h-4 opacity-50"
              />
            </template>
          </USelectMenu>

          <UButton
            :icon="isDark ? 'i-solar-sun-2-bold-duotone' : 'i-solar-moon-bold-duotone'"
            color="neutral"
            variant="ghost"
            size="sm"
            aria-label="Toggle Color Mode"
            @click="toggleColorMode"
          />
        </template>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 overflow-hidden relative">
      <ClientOnly>
        <div
          class="h-full w-full"
          :class="{ 'animate-fade-in': isMounted }"
        >
          <!-- Desktop Layout -->
          <Splitpanes
            v-if="isDesktop"
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
            <Pane
              :size="ui?.panelMain"
              :style="mainInit"
            >
              <Splitpanes
                horizontal
                :class="ui?.isDragging ? 'splitpanes--dragging' : ''"
                @resize="onResizeHorizontal"
                @resized="onResizedHorizontal"
              >
                <Pane
                  :size="ui?.panelEditorHeight"
                  :style="editorHeightInit"
                >
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
                      <ChallengeInstructions />
                    </Pane>

                    <PaneSplitter />

                    <!-- Editor -->
                    <Pane
                      :size="ui?.panelEditor"
                      :style="editorInit"
                    >
                      <ChallengeWorkspace
                        ref="editorRef"
                        v-model:code="code"
                        :tests="store.currentChallenge?.tests || ''"
                        @format="formatCode"
                        @submit="handleSubmit"
                      />
                    </Pane>
                  </Splitpanes>
                </Pane>

                <PaneSplitter />

                <!-- Test Cases / Footer -->
                <Pane
                  :size="ui?.panelResultsHeight"
                  :style="resultsHeightInit"
                >
                  <ChallengeResults :results="results" />
                </Pane>
              </Splitpanes>
            </Pane>
          </Splitpanes>

          <!-- Mobile/Tablet Layout (Stacked Scrolling) -->
          <div
            v-else
            class="h-full w-full overflow-y-auto flex flex-col bg-white dark:bg-gray-950"
          >
            <div class="flex-shrink-0">
              <ChallengeInstructions />
            </div>
            <div class="h-[400px] flex-shrink-0 border-t border-gray-200 dark:border-gray-800">
              <ChallengeWorkspace
                v-model:code="code"
                :tests="store.currentChallenge?.tests || ''"
                @format="formatCode"
                @submit="handleSubmit"
              />
            </div>
            <div class="h-[300px] flex-shrink-0">
              <ChallengeResults :results="results" />
            </div>
          </div>
        </div>

        <!-- Sidebar Drawer (Mobile/Tablet) -->
        <USlideover
          v-model:open="isSidebarOpen"
          title="Challenges"
        >
          <template #body>
            <div class="h-full overflow-hidden">
              <ChallengeList />
            </div>
          </template>
        </USlideover>

        <template #placeholder>
          <div class="h-full w-full flex items-center justify-center bg-white dark:bg-gray-950">
            <svg
              class="w-10 h-10 animate-spin opacity-20 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              style="will-change: transform"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        </template>
      </ClientOnly>
    </main>
    <UToaster />
  </div>
</template>
