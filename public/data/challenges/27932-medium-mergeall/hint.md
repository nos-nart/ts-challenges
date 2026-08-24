#### Hint 1: Merging an array of objects
**The goal:** Merge a tuple of object types into a single object with union values.

**The nudge:** Deconstruct `[infer Head, ...infer Tail]`, merging `Head` with the accumulated properties of `MergeAll<Tail>`.
