#### Hint 1: Detecting readonly properties
**The goal:** Extract union of keys in `T` that are marked `readonly`.

**The nudge:** Compare single-key pick `Equal<Pick<T, K>, Readonly<Pick<T, K>>>`. If true, the key has the readonly modifier.
