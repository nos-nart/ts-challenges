declare module 'monaco-editor/esm/vs/editor/editor.worker?worker' {
  const WorkerFactory: new () => Worker
  export default WorkerFactory
}

declare module 'monaco-editor/esm/vs/language/typescript/ts.worker?worker' {
  const WorkerFactory: new () => Worker
  export default WorkerFactory
}

declare module 'monaco-editor/esm/vs/language/json/json.worker?worker' {
  const WorkerFactory: new () => Worker
  export default WorkerFactory
}

declare global {
  interface Window {
    MonacoEnvironment: import('monaco-editor').Environment
  }
  interface WorkerGlobalScope {
    MonacoEnvironment: import('monaco-editor').Environment
  }
}

export {}
