#### Hint 1: Flattening a nested object key
**The goal:** Extract object `T[U]` properties directly into `T`, removing `U`.

**The nudge:** Combine `Omit<T, U> & T[U]` into a single mapped type.
