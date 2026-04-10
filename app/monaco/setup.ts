import type * as MonacoType from 'monaco-editor'

export type Monaco = typeof MonacoType

let setupPromise: Promise<{ monaco: Monaco, highlighter: any }> | null = null
let formatterInitialized = false

export async function setupMonaco() {
  if (setupPromise) return setupPromise

  setupPromise = (async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const version = urlParams.get('v')

    const versionMap: Record<string, string> = {
      '5.3.3': '0.45.0',
      '4.9.5': '0.34.1',
      '4.5.5': '0.31.1',
      '4.0.8': '0.21.2'
    }

    const monacoCdnVersion
      = version && versionMap[version] ? versionMap[version] : null

    let monaco: Monaco

    if (monacoCdnVersion) {
      monaco = await new Promise<Monaco>((resolve, reject) => {
        const loaderScript = document.createElement('script')
        loaderScript.crossOrigin = 'anonymous'
        loaderScript.src = `https://cdn.jsdelivr.net/npm/monaco-editor@${monacoCdnVersion}/min/vs/loader.js`
        loaderScript.onload = () => {
          const amdRequire = (window as any).require
          amdRequire.config({
            paths: {
              vs: `https://cdn.jsdelivr.net/npm/monaco-editor@${monacoCdnVersion}/min/vs`
            },
            scriptAttributes: {
              crossorigin: 'anonymous'
            }
          })
          amdRequire(
            ['vs/editor/editor.main'],
            () => {
              const m = (window as any).monaco
              // Important: Re-initialize workers for the new version
              m.languages.typescript.typescriptDefaults.setCompilerOptions({
                target: m.languages.typescript.ScriptTarget.ESNext,
                allowNonTsExtensions: true,
                moduleResolution: m.languages.typescript.ModuleResolutionKind.NodeJs || 2,
                module: m.languages.typescript.ModuleKind.CommonJS || 1,
                noEmit: true,
                esModuleInterop: true,
                jsx: m.languages.typescript.JsxEmit.React || 2,
                lib: ['esnext', 'dom'],
                strict: true
              })
              resolve(m)
            },
            reject
          )
        }
        loaderScript.onerror = reject
        document.head.appendChild(loaderScript)
      })
    } else {
      const [importedMonaco] = await Promise.all([import('monaco-editor')])
      monaco = importedMonaco

      if (typeof window !== 'undefined') {
        (window as any).MonacoEnvironment = {
          async getWorker(_: any, label: string) {
            if (label === 'json') {
              const JsonWorker = (
                await import(
                  'monaco-editor/esm/vs/language/json/json.worker?worker'
                )
              ).default
              return new JsonWorker()
            }
            if (label === 'typescript' || label === 'javascript') {
              const TsWorker = (
                await import(
                  'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
                )
              ).default
              return new TsWorker()
            }
            const EditorWorker = (
              await import('monaco-editor/esm/vs/editor/editor.worker?worker')
            ).default
            return new EditorWorker()
          }
        }
      }
    }

    const [{ shikiToMonaco }, { createHighlighter }] = await Promise.all([
      import('@shikijs/monaco'),
      import('shiki')
    ])

    const highlighter = await createHighlighter({
      themes: ['vitesse-dark', 'vitesse-light'],
      langs: ['typescript', 'javascript', 'json']
    })

    shikiToMonaco(highlighter, monaco as any)

    // --- Dynamic Oxc Formatter (Bypassing Vite Recursion) ---
    if (!formatterInitialized && typeof window !== 'undefined') {
      try {
        // Load from CDN to avoid Vite dependency scanning issues
        const { default: init, format } = (await import(
          /* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/@wasm-fmt/oxc_fmt@0.2.8/oxc_fmt_web.js' as any
        )) as any
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

    const languages = monaco.languages as any
    const ts = languages.typescript
    if (ts && ts.typescriptDefaults) {
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
    }

    return { monaco, highlighter }
  })()

  return setupPromise
}
