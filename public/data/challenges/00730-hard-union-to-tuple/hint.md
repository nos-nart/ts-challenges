#### Hint 1: Isolating the last union element
**The goal:** Convert union `'a' | 'b' | 'c'` into tuple `['a', 'b', 'c']`.

**The nudge:** Use overloaded function inference to extract one member: `LastInUnion<U>`. Append it to the tuple and recurse on `Exclude<U, Last>`.
