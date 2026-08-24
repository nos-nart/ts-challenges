#### Hint 1: Deep array flattening
**The goal:** Flatten a nested array into a single flat array.

**The nudge:** Deconstruct `T extends [infer Head, ...infer Tail]`. If `Head extends any[]`, spread `[...Flatten<Head>, ...Flatten<Tail>]`, else `[Head, ...Flatten<Tail>]`.
