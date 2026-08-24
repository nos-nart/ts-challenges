#### Hint 1: Tuple length decrement
**The goal:** Compute `N - 1` for number `N`.

**The nudge:** Construct a tuple of length `N` and match `[infer _, ...infer Rest]`, returning `Rest['length']`.
