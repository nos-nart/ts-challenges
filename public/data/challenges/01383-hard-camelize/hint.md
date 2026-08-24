#### Hint 1: Recursive key camelization
**The goal:** Convert all object keys in a nested structure from snake_case to camelCase.

**The nudge:** Remap keys with `as CamelCase<K & string>` and recurse on nested object values.
