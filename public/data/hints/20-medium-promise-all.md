#### Hint 1: Mapping over tuple elements and unwrapping
**The goal:** Type a function accepting a tuple of values/promises and returning `Promise<UnwrappedTuple>`.

**The nudge:** Map over parameter tuple `values`: `[K in keyof T]: T[K] extends Promise<infer R> ? R : T[K]`.

#### Hint 2: Constraining function arguments
**The nudge:** Declare `declare function PromiseAll<T extends readonly any[]>(values: readonly [...T]): Promise<{ [K in keyof T]: T[K] extends Promise<infer R> ? R : T[K] }>`.
