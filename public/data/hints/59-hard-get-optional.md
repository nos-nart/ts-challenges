#### Hint 1: Picking optional properties
**The goal:** Pick only optional properties from object `T`.

**The nudge:** Test if `{} extends Pick<T, K>`. If true, keep the key; otherwise drop it with `never`.
