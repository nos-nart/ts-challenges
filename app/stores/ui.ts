import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', () => {
  const isDragging = ref(false)

  function getLayoutDefaults() {
    return {
      panelSidebar: 20,
      panelInstructions: 40,
      panelEditorHeight: 70,
      tsVersion: '5.7.3'
    }
  }

  const persistState = reactive(getLayoutDefaults())

  // Mapping TS versions to the specific Monaco versions that contained them
  const supportedTsVersions = [
    { label: 'v5.7.3 (Latest)', value: '5.7.3', monaco: '0.55.1' },
    { label: 'v5.3.3', value: '5.3.3', monaco: '0.45.0' },
    { label: 'v4.9.5', value: '4.9.5', monaco: '0.34.1' },
    { label: 'v4.5.5', value: '4.5.5', monaco: '0.31.1' },
    { label: 'v4.0.8', value: '4.0.8', monaco: '0.21.2' }
  ]

  // Single cookie for all UI state
  const stateCookie = useCookie<Partial<typeof persistState>>(
    'ts-challenges-ui-state',
    { 
      default: () => getLayoutDefaults(),
      watch: true,
      maxAge: 60 * 60 * 24 * 30 // 30 days
    }
  )

  if (stateCookie.value) {
    Object.assign(persistState, stateCookie.value)
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
    supportedTsVersions,
    ...toRefs(persistState)
  }
})
