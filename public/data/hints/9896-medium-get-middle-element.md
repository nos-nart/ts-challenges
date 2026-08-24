#### Hint 1: Peeling ends inward
**The goal:** Return the middle 1 or 2 elements of a tuple.

**The nudge:** Match `T extends [infer _, ...infer Middle, infer _]`. Recurse on `Middle` until length is 0, 1, or 2.
