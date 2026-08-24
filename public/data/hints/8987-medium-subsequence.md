#### Hint 1: Generating all subsequences
**The goal:** Return all subsequences of a tuple as tuples.

**The nudge:** Deconstruct `[infer Head, ...infer Tail]`. For each item, return the union of including `Head` vs omitting `Head`: `Subsequence<Tail> | [Head, ...Subsequence<Tail>]`.
