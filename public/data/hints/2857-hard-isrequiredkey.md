#### Hint 1: Checking required status of a single key
**The goal:** Return true if key `K` is required in object `T`.

**The nudge:** Test if `Pick<T, K>` is assignable to `Required<Pick<T, K>>`.
