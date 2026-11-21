import type * as MonacoType from 'monaco-editor'
import type { Highlighter } from 'shiki'
import { BUNDLED_TS_VERSION, resolveTsVersion } from '~/monaco/versions'

export type Monaco = typeof MonacoType
export type MonacoTypeScript = Monaco['typescript']

interface OxcFormatModule {
  default: () => Promise<void>
  format: (
    code: string,
    filename: string,
    options: { indentStyle: 'space' | 'tab', indentWidth: number }
  ) => string
}

export function getMonacoTypeScript(monaco: Monaco): MonacoTypeScript {
  const legacyTs = Reflect.get(monaco.languages as object, 'typescript') as unknown as MonacoTypeScript | undefined
  const ts = monaco.typescript ?? legacyTs
  if (!ts) {
    throw new Error('Monaco TypeScript language service is unavailable.')
  }
  return ts
}

let setupPromise: Promise<{ monaco: Monaco, highlighter: Highlighter }> | null = null
let formatterInitialized = false

export async function setMonacoTsVersion(versionValue: string) {
  const { monaco } = await setupMonaco()
  const resolved = resolveTsVersion(versionValue)
  const ts = getMonacoTypeScript(monaco)
  ts.typescriptDefaults.setWorkerOptions({
    customWorkerPath: resolved.value === BUNDLED_TS_VERSION ? undefined : resolved.value
  })
}

export async function setupMonaco() {
  if (setupPromise) return setupPromise

  setupPromise = (async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const selectedVersion = resolveTsVersion(urlParams.get('v'))

    const [monaco, { shikiToMonaco }, { createHighlighter }] = await Promise.all([
      import('monaco-editor'),
      import('@shikijs/monaco'),
      import('shiki')
    ])

    if (typeof window !== 'undefined') {
      window.MonacoEnvironment = {
        async getWorker(_: string, label: string) {
          if (label === 'json') {
            const JsonWorker = (
              await import('monaco-editor/language/json/json.worker?worker')
            ).default
            return new JsonWorker()
          }
          if (label === 'typescript' || label === 'javascript') {
            const TsWorker = (
              await import('~/monaco/ts.worker?worker')
            ).default
            return new TsWorker()
          }
          const EditorWorker = (
            await import('monaco-editor/editor/editor.worker?worker')
          ).default
          return new EditorWorker()
        }
      }
    }

    const highlighter = await createHighlighter({
      themes: ['vitesse-dark', 'vitesse-light'],
      langs: ['typescript', 'javascript', 'json']
    })

    shikiToMonaco(highlighter, monaco)

    if (!formatterInitialized && typeof window !== 'undefined') {
      try {
        const oxcUrl = 'https://cdn.jsdelivr.net/npm/@wasm-fmt/oxc_fmt@0.2.8/oxc_fmt_web.js'
        const { default: init, format } = await (import(/* @vite-ignore */ oxcUrl) as Promise<OxcFormatModule>)
        await init()
        formatterInitialized = true

        monaco.languages.registerDocumentFormattingEditProvider('typescript', {
          async provideDocumentFormattingEdits(model, options) {
            const code = model.getValue()
            try {
              const formatted = format(code, 'index.ts', {
                indentStyle: options.insertSpaces ? 'space' : 'tab',
                indentWidth: options.tabSize
              })
              return [
                {
                  range: model.getFullModelRange(),
                  text: formatted
                }
              ]
            } catch (e) {
              console.error('Oxc formatting failed:', e)
              return []
            }
          }
        })
      } catch (e) {
        console.error('Failed to initialize Oxc formatter from CDN:', e)
      }
    }

    const ts = getMonacoTypeScript(monaco)
    ts.typescriptDefaults.setWorkerOptions({
      customWorkerPath: selectedVersion.value === BUNDLED_TS_VERSION ? undefined : selectedVersion.value
    })
    ts.typescriptDefaults.setCompilerOptions({
      target: ts.ScriptTarget.ESNext,
      allowNonTsExtensions: true,
      moduleResolution: ts.ModuleResolutionKind.NodeJs || 2,
      module: ts.ModuleKind.CommonJS || 1,
      noEmit: true,
      esModuleInterop: true,
      jsx: ts.JsxEmit.React || 2,
      lib: ['esnext', 'dom'],
      strict: true
    })

    const utilsContent = `
      export type Expect<T extends true> = T
      export type ExpectTrue<T extends true> = T
      export type ExpectFalse<T extends false> = T
      export type IsTrue<T extends true> = T
      export type IsFalse<T extends false> = T
      export type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true
      export type Equal<X, Y> =
        (<T>() => T extends X ? 1 : 2) extends
        (<T>() => T extends Y ? 1 : 2) ? true : false
      export type IsAny<T> = 0 extends (1 & T) ? true : false
      export type NotAny<T> = true extends IsAny<T> ? false : true
      export type Debug<T> = { [K in keyof T]: T[K] }
      export type Alike<X, Y> = Equal<Debug<X>, Debug<Y>>
      export type ExpectExtends<VALUE, EXPECTED> = VALUE extends EXPECTED ? true : false
      export type ExpectValidArgs<FUNC extends (...args: any[]) => any, ARGS extends any[]> = ARGS extends Parameters<FUNC>
        ? true
        : false
      export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
        ? I
        : never
    `
    ts.typescriptDefaults.addExtraLib(
      utilsContent,
      'file:///node_modules/@type-challenges/utils/index.d.ts'
    )

    return { monaco, highlighter }
  })()

  return setupPromise
}
