import type * as Monaco from 'monaco-editor'

export function useChallengeTester() {
  const results = ref<{
    passed: boolean
    errors: string[]
  }>({
    passed: false,
    errors: [],
  })

  async function testChallenge(userCode: string, testCases: string) {
    const monaco = await import('monaco-editor')
    const ui = useUiStore()
    
    // Create a temporary model that combines code + tests
    const hasImport = testCases.includes('@type-challenges/utils')
    const importStatement = hasImport ? '' : "import { Equal, Expect } from '@type-challenges/utils'\n\n"
    const combinedCode = `${importStatement}${userCode}\n\n// --- Test Cases ---\n${testCases}`
    
    const testUri = monaco.Uri.file('test-runner.ts')
    let testModel = monaco.editor.getModel(testUri)
    
    if (testModel) {
      testModel.setValue(combinedCode)
    } else {
      testModel = monaco.editor.createModel(combinedCode, 'typescript', testUri)
    }

    return new Promise<{ passed: boolean, errors: string[] }>((resolve) => {
      setTimeout(() => {
        const markers = monaco.editor.getModelMarkers({ resource: testUri })
        const errors = markers
          .filter(m => m.severity === monaco.MarkerSeverity.Error)
          .map(m => `Line ${m.startLineNumber}: ${m.message}`)

        results.value = {
          passed: errors.length === 0,
          errors,
        }
        resolve(results.value)
      }, 500)
    })
  }

  function reset() {
    results.value = {
      passed: false,
      errors: [],
    }
  }

  return {
    results,
    testChallenge,
    reset,
  }
}
