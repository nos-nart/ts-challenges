#### Hint 1: Generating all dot-delimited key paths
**The goal:** Return union of all valid dot paths in nested object `T`.

**The nudge:** For each key `K`, emit `K` and if `T[K]` is an object, also emit ``${K}.${ObjectKeyPaths<T[K]>}``.
