import { setupMonaco } from '~/monaco/setup'

export function useChallengeTester() {
  const results = ref<{
    passed: boolean
    errors: string[]
  }>({
    passed: false,
    errors: []
  })

  async function testChallenge(userCode: string, testCases: string) {
    const { monaco } = await setupMonaco()

    // Create a temporary model that combines code + tests
    const hasImport = testCases.includes('@type-challenges/utils')
    const importStatement = hasImport ? '' : 'import { Equal, Expect } from \'@type-challenges/utils\'\n\n'
    const combinedCode = `${importStatement}${userCode}\n\n// --- Test Cases ---\n${testCases}`

    const testUri = monaco.Uri.file('test-runner.ts')
    let testModel = monaco.editor.getModel(testUri)

    if (testModel) {
      testModel.setValue(combinedCode)
    } else {
      testModel = monaco.editor.createModel(combinedCode, 'typescript', testUri)
    }

    // Definitive way to get diagnostics from the TS Worker
    const ts = monaco.languages.typescript as any
    const getWorker = await ts.getTypeScriptWorker()
    const worker = await getWorker(testUri)

    // Get both syntax and semantic errors (Expect/Equal failures)
    const [syntactic, semantic] = await Promise.all([
      worker.getSyntacticDiagnostics(testUri.toString()),
      worker.getSemanticDiagnostics(testUri.toString())
    ])

    const allDiagnostics = [...syntactic, ...semantic]

    const errors = allDiagnostics.map((diag) => {
      const pos = testModel!.getPositionAt(diag.start!)
      const message
        = typeof diag.messageText === 'string'
          ? diag.messageText
          : diag.messageText.messageText

      return `Line ${pos.lineNumber}: ${message}`
    })

    // --- FIX: Immediately dispose the model to prevent "Duplicate Identifier" errors in the main editor ---
    testModel.dispose()

    results.value = {
      passed: errors.length === 0,
      errors
    }

    return results.value
  }

  function reset() {
    results.value = {
      passed: false,
      errors: []
    }
  }

  return {
    results,
    testChallenge,
    reset
  }
}
