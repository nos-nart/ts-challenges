#### Hint 1: Function argument contravariance
**The goal:** Convert union `'foo' | 'bar'` into intersection `'foo' & 'bar'`.

**The nudge:** Distribute union members into function parameters: `(U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never`.
