#### Hint 1: Finding keys that lack readonly
**The goal:** Return union of keys in `T` that are mutable.

**The nudge:** Compare `Equal<Pick<T, K>, Readonly<Pick<T, K>>>`. If false, the key is mutable.
