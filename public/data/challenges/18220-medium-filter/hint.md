#### Hint 1: Filtering array elements
**The goal:** Keep only elements from array `T` that extend predicate type `P`.

**The nudge:** Deconstruct `[infer Head, ...infer Tail]`. If `Head extends P`, include `[Head, ...Filter<Tail, P>]`, else `Filter<Tail, P>`.
