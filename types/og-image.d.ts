declare module '#og-image/components' {
  interface OgImageComponents {
    Custom: {
      title: string | import('vue').ComputedRef<string>
      description?: string | import('vue').ComputedRef<string>
      colorMode?: 'dark' | 'light'
    }
  }
}

export {}
