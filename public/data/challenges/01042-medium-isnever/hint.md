#### Hint 1: Non-distributive never check
**The goal:** Detect if type `T` is `never`.

**The nudge:** Wrap `T` in a tuple to prevent distributive branch elimination: `[T] extends [never] ? true : false`.
