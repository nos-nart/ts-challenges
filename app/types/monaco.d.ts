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

declare module 'splitpanes' {
  import type { DefineComponent } from 'vue'

  const Splitpanes: DefineComponent<any, any, any>
  const Pane: DefineComponent<any, any, any>
  export { Splitpanes, Pane }
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
