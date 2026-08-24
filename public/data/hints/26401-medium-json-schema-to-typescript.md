#### Hint 1: Parsing schema types
**The goal:** Convert JSON Schema definition object to TypeScript type.

**The nudge:** Inspect `T['type']`. If `"string"`, `"number"`, or `"boolean"`, return primitive. If `"object"`, map `T['properties']` considering `T['required']`. If `"array"`, recurse on `T['items']`.
