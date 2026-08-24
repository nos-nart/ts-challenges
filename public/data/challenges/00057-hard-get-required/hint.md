#### Hint 1: Detecting optional properties
**The goal:** Pick only required properties from object `T`.

**The nudge:** An optional property allows `undefined` when picking the single key `Pick<T, K>`. Remap keys: `[K in keyof T as {} extends Pick<T, K> ? never : K]: T[K]`.
