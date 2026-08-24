#### Hint 1: Omitting properties by value type
**The goal:** Omit properties whose values match type `U`.

**The nudge:** Use key remapping: `[K in keyof T as T[K] extends U ? never : K]: T[K]`.
