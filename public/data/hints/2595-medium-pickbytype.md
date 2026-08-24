#### Hint 1: Filtering properties by value type
**The goal:** Pick only properties whose values match type `U`.

**The nudge:** Use key remapping: `[K in keyof T as T[K] extends U ? K : never]: T[K]`.
