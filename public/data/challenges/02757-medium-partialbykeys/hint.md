#### Hint 1: Splitting optional and required keys
**The goal:** Make a subset of keys `K` optional while preserving others.

**The nudge:** Combine `Partial<Pick<T, K & keyof T>> & Omit<T, K>` and copy into a clean mapped type to flatten.
