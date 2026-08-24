#### Hint 1: Searching from the right
**The goal:** Return the last index of element `U` in tuple `T`.

**The nudge:** Match from the end using `T extends [...infer Rest, infer Last]`. If `Equal<Last, U>` is true, return `Rest['length']`.
