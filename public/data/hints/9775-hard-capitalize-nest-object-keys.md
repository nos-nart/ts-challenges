#### Hint 1: Capitalizing nested keys
**The goal:** Capitalize all property keys in a nested object or array structure.

**The nudge:** Remap keys with `as Capitalize<K & string>` and recurse on nested objects and arrays.
