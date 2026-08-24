#### Hint 1: Space-separated key combinations
**The goal:** Generate all space-separated permutations from string array `T`.

**The nudge:** Convert `T` to union `U = T[number]`. Recurse: `U extends string ? U | `${U} ${Combination<any, Exclude<All, U>>}` : never`.
