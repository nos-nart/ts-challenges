#### Hint 1: Overwriting object properties
**The goal:** Merge objects `F` and `S`, where properties in `S` override those in `F`.

**The nudge:** Map over `keyof F | keyof S`: `{ [K in keyof F | keyof S]: K extends keyof S ? S[K] : K extends keyof F ? F[K] : never }`.
