declare module 'monaco-editor/editor/editor.worker?worker' {
  const WorkerFactory: new () => Worker
  export default WorkerFactory
}

declare module 'monaco-editor/language/typescript/ts.worker?worker' {
  const WorkerFactory: new () => Worker
  export default WorkerFactory
}

declare module '~/monaco/ts.worker?worker' {
  const WorkerFactory: new () => Worker
  export default WorkerFactory
}

declare module 'monaco-editor/language/json/json.worker?worker' {
  const WorkerFactory: new () => Worker
  export default WorkerFactory
}

declare module 'monaco-editor/internal/common/initialize' {
  export function initialize<TCreateData>(
    callback: (ctx: unknown, createData: TCreateData) => unknown
  ): void
  export function isWorkerInitialized(): boolean
}

declare module 'monaco-editor/languages/features/typescript/tsWorker' {
  import type { typescript } from 'monaco-editor'

  export interface TsCreateData {
    compilerOptions: Record<string, unknown>
    extraLibs: typescript.IExtraLibs
    customWorkerPath?: string
    inlayHintsOptions?: Record<string, unknown>
  }

  export class TypeScriptWorker {
    protected _languageService: unknown
    constructor(ctx: unknown, createData: TsCreateData)
    getSyntacticDiagnostics(fileName: string): Promise<typescript.Diagnostic[]>
    getSemanticDiagnostics(fileName: string): Promise<typescript.Diagnostic[]>
    getSuggestionDiagnostics(fileName: string): Promise<typescript.Diagnostic[]>
    getCompilerOptionsDiagnostics(fileName: string): Promise<typescript.Diagnostic[]>
    getCompletionsAtPosition(fileName: string, position: number): Promise<unknown>
    getCompletionEntryDetails(fileName: string, position: number, entry: string): Promise<unknown>
    getSignatureHelpItems(fileName: string, position: number, options: unknown): Promise<unknown>
    getQuickInfoAtPosition(fileName: string, position: number): Promise<unknown>
    getDocumentHighlights(fileName: string, position: number, filesToSearch: string[]): Promise<unknown>
    getDefinitionAtPosition(fileName: string, position: number): Promise<unknown>
    getReferencesAtPosition(fileName: string, position: number): Promise<unknown>
    getNavigationTree(fileName: string): Promise<unknown>
    getFormattingEditsForDocument(fileName: string, options: unknown): Promise<unknown[]>
    getFormattingEditsForRange(fileName: string, start: number, end: number, options: unknown): Promise<unknown[]>
    getFormattingEditsAfterKeystroke(fileName: string, postion: number, ch: string, options: unknown): Promise<unknown[]>
    findRenameLocations(
      fileName: string,
      position: number,
      findInStrings: boolean,
      findInComments: boolean,
      providePrefixAndSuffixTextForRename: boolean
    ): Promise<unknown>
    getRenameInfo(fileName: string, position: number, options: unknown): Promise<unknown>
    getEmitOutput(fileName: string, emitOnlyDtsFiles?: boolean, forceDtsEmit?: boolean): Promise<typescript.EmitOutput>
    getCodeFixesAtPosition(
      fileName: string,
      start: number,
      end: number,
      errorCodes: number[],
      formatOptions: unknown
    ): Promise<readonly unknown[]>
    provideInlayHints(fileName: string, start: number, end: number): Promise<readonly unknown[]>
  }
}

interface Window {
  MonacoEnvironment: import('monaco-editor').Environment
}

interface WorkerGlobalScope {
  MonacoEnvironment: import('monaco-editor').Environment
}
