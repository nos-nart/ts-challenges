#### Hint 1: Converting key-value tuples to object
**The goal:** Transform union of `[Key, Value]` tuples into an object.

**The nudge:** Distribute pairs into objects `Pair extends [infer K, infer V] ? { [P in K & PropertyKey]: V } : never` and merge with `UnionToIntersection`.
