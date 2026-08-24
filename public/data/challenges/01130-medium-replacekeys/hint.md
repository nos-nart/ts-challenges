#### Hint 1: Selective key replacement
**The goal:** In union `U`, replace property keys in `T` with matching keys from `Y`.

**The nudge:** Map over keys: `{ [K in keyof U]: K extends T ? (K extends keyof Y ? Y[K] : never) : U[K] }`.
