#### Hint 1: Checking all tuple elements against target type
**The goal:** Return true if every element in tuple `T` equals `Target`.

**The nudge:** Deconstruct `[infer Head, ...infer Tail]`. If `Equal<Head, Target>` is false, return false; otherwise recurse on `Tail`.
