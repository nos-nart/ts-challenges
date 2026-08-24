#### Hint 1: Enforcing required modifiers on key subset
**The goal:** Make specified keys `K` required while preserving other properties.

**The nudge:** Combine `Required<Pick<T, K & keyof T>> & Omit<T, K>` and flatten.
