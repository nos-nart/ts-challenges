declare module 'splitpanes' {
  import type { DefineComponent, ComponentOptionsMixin } from 'vue'
  import { ComputedOptions, MethodOptions, VNodeProps, AllowedComponentProps, ComponentCustomProps } from 'vue'

  interface SplitpanesProps {
    horizontal?: boolean
    pushOtherPanes?: boolean
    dblClickSplitter?: boolean
    firstSplitter?: boolean
    rtl?: boolean
    class?: string
    style?: string | Record<string, any>
  }

  interface PaneProps {
    size?: number | string
    minSize?: number | string
    maxSize?: number | string
    class?: string
    style?: string | Record<string, any>
  }

  export const Splitpanes: DefineComponent<SplitpanesProps, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, { 'resize': (...args: any[]) => void, 'resized': (...args: any[]) => void, 'pane-add': (...args: any[]) => void, 'pane-remove': (...args: any[]) => void, 'pane-click': (...args: any[]) => void }>
  export const Pane: DefineComponent<PaneProps, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}>
}
