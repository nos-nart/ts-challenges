#### Hint 1: Transforming properties into key-value pairs
**The goal:** Convert an object into a union of `[key, value]` tuple pairs.

**The nudge:** Map over keys `[K in keyof T]-?: [K, T[K] extends undefined ? undefined : T[K]]`, then index by `[keyof T]`.
