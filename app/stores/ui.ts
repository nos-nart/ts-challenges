import { defineStore } from 'pinia'
import { DEFAULT_TS_VERSION, SUPPORTED_TS_VERSIONS, resolveTsVersion } from '~/monaco/versions'

export const useUiStore = defineStore('ui', () => {
  const isDragging = ref(false)

  function getLayoutDefaults() {
    return {
      panelSidebar: 20,
      panelInstructions: 40,
      panelEditorHeight: 70,
      tsVersion: DEFAULT_TS_VERSION.value
    }
  }

  const persistState = reactive(getLayoutDefaults())

  const stateCookie = useCookie<Partial<typeof persistState>>(
    'ts-challenges-ui-state',
    {
      default: () => getLayoutDefaults(),
      watch: true,
      maxAge: 60 * 60 * 24 * 30
    }
  )

  if (stateCookie.value) {
    Object.assign(persistState, stateCookie.value)
    persistState.tsVersion = resolveTsVersion(persistState.tsVersion).value
  }

  watch(persistState, (val) => {
    stateCookie.value = { ...val }
  }, { deep: true })

  const panelMain = computed(() => 100 - persistState.panelSidebar)
  const panelEditor = computed(() => 100 - persistState.panelInstructions)
  const panelResultsHeight = computed(() => 100 - persistState.panelEditorHeight)

  return {
    isDragging,
    panelMain,
    panelEditor,
    panelResultsHeight,
    supportedTsVersions: SUPPORTED_TS_VERSIONS,
    ...toRefs(persistState)
  }
})
