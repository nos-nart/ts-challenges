#### Hint 1: Filtering array items against excluded items
**The goal:** Remove matching elements specified in `U` (single item or array) from array `T`.

**The nudge:** Normalize `U` to a union `U extends any[] ? U[number] : U`. Deconstruct `T` and omit items matching `U`.
