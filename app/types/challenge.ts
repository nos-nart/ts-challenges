export interface Challenge {
  name: string
  path: string
  difficulty: string
  title: string
  readme?: string
  template?: string
  tests?: string
  concepts?: string[]
  hint?: string
}

export interface Concept {
  id: string
  title: string
  content: string
}
