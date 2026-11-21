import { initialize } from 'monaco-editor/internal/common/initialize'
import { TypeScriptWorker } from 'monaco-editor/languages/features/typescript/tsWorker'
import type { TsCreateData } from 'monaco-editor/languages/features/typescript/tsWorker'
import { BUNDLED_TS_VERSION } from './versions'

interface CustomTsModule {
  version: string
  createLanguageService: (host: unknown) => unknown
}

const compilerCache = new Map<string, Promise<CustomTsModule>>()

function loadTypeScriptCompiler(version: string): Promise<CustomTsModule> {
  const cached = compilerCache.get(version)
  if (cached) return cached

  const promise = (async () => {
    const res = await fetch(`https://cdn.jsdelivr.net/npm/typescript@${version}/lib/typescript.js`)
    if (!res.ok) {
      throw new Error(`Failed to fetch TypeScript ${version}: HTTP ${res.status}`)
    }
    const source = await res.text()
    const mod = { exports: {} as CustomTsModule }
    const factory = new Function(
      'module',
      'exports',
      `${source}\nreturn typeof ts !== "undefined" ? ts : module.exports;`
    ) as (m: { exports: CustomTsModule }, e: CustomTsModule) => CustomTsModule
    return factory(mod, mod.exports)
  })()

  compilerCache.set(version, promise)
  return promise
}

class VersionedTypeScriptWorker extends TypeScriptWorker {
  private readonly _ready: Promise<void>

  constructor(ctx: unknown, createData: TsCreateData) {
    super(ctx, createData)
    const targetVersion = createData.customWorkerPath
    if (!targetVersion || targetVersion === BUNDLED_TS_VERSION) {
      this._ready = Promise.resolve()
    } else {
      this._ready = loadTypeScriptCompiler(targetVersion)
        .then((customTs) => {
          this._languageService = customTs.createLanguageService(this)
        })
        .catch((err) => {
          console.warn(`Falling back to bundled TypeScript ${BUNDLED_TS_VERSION}:`, err)
        })
    }
  }

  override async getSyntacticDiagnostics(fileName: string) {
    await this._ready
    return super.getSyntacticDiagnostics(fileName)
  }

  override async getSemanticDiagnostics(fileName: string) {
    await this._ready
    return super.getSemanticDiagnostics(fileName)
  }

  override async getSuggestionDiagnostics(fileName: string) {
    await this._ready
    return super.getSuggestionDiagnostics(fileName)
  }

  override async getCompilerOptionsDiagnostics(fileName: string) {
    await this._ready
    return super.getCompilerOptionsDiagnostics(fileName)
  }

  override async getCompletionsAtPosition(fileName: string, position: number) {
    await this._ready
    return super.getCompletionsAtPosition(fileName, position)
  }

  override async getCompletionEntryDetails(fileName: string, position: number, entry: string) {
    await this._ready
    return super.getCompletionEntryDetails(fileName, position, entry)
  }

  override async getSignatureHelpItems(fileName: string, position: number, options: unknown) {
    await this._ready
    return super.getSignatureHelpItems(fileName, position, options)
  }

  override async getQuickInfoAtPosition(fileName: string, position: number) {
    await this._ready
    return super.getQuickInfoAtPosition(fileName, position)
  }

  override async getDocumentHighlights(fileName: string, position: number, filesToSearch: string[]) {
    await this._ready
    return super.getDocumentHighlights(fileName, position, filesToSearch)
  }

  override async getDefinitionAtPosition(fileName: string, position: number) {
    await this._ready
    return super.getDefinitionAtPosition(fileName, position)
  }

  override async getReferencesAtPosition(fileName: string, position: number) {
    await this._ready
    return super.getReferencesAtPosition(fileName, position)
  }

  override async getNavigationTree(fileName: string) {
    await this._ready
    return super.getNavigationTree(fileName)
  }

  override async getFormattingEditsForDocument(fileName: string, options: unknown) {
    await this._ready
    return super.getFormattingEditsForDocument(fileName, options)
  }

  override async getFormattingEditsForRange(fileName: string, start: number, end: number, options: unknown) {
    await this._ready
    return super.getFormattingEditsForRange(fileName, start, end, options)
  }

  override async getFormattingEditsAfterKeystroke(fileName: string, postion: number, ch: string, options: unknown) {
    await this._ready
    return super.getFormattingEditsAfterKeystroke(fileName, postion, ch, options)
  }

  override async findRenameLocations(
    fileName: string,
    position: number,
    findInStrings: boolean,
    findInComments: boolean,
    providePrefixAndSuffixTextForRename: boolean
  ) {
    await this._ready
    return super.findRenameLocations(
      fileName,
      position,
      findInStrings,
      findInComments,
      providePrefixAndSuffixTextForRename
    )
  }

  override async getRenameInfo(fileName: string, position: number, options: unknown) {
    await this._ready
    return super.getRenameInfo(fileName, position, options)
  }

  override async getEmitOutput(fileName: string, emitOnlyDtsFiles?: boolean, forceDtsEmit?: boolean) {
    await this._ready
    return super.getEmitOutput(fileName, emitOnlyDtsFiles, forceDtsEmit)
  }

  override async getCodeFixesAtPosition(
    fileName: string,
    start: number,
    end: number,
    errorCodes: number[],
    formatOptions: unknown
  ) {
    await this._ready
    return super.getCodeFixesAtPosition(fileName, start, end, errorCodes, formatOptions)
  }

  override async provideInlayHints(fileName: string, start: number, end: number) {
    await this._ready
    return super.provideInlayHints(fileName, start, end)
  }
}

self.onmessage = () => {
  initialize((ctx: unknown, createData: TsCreateData) => {
    return new VersionedTypeScriptWorker(ctx, createData)
  })
}
