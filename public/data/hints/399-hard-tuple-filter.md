#### Hint 1: Filtering matching elements from a tuple
**The goal:** Filter out elements matching type `F` from tuple `T`.

**The nudge:** Deconstruct `[infer Head, ...infer Tail]`. If `[Head] extends [F]`, omit it, otherwise retain `Head`.
