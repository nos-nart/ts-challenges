#### Hint 1: Transforming matching member types
**The goal:** Map types within `T` according to transformation rule `R extends { mapFrom: any, mapTo: any }`.

**The nudge:** Check `T[K] extends R['mapFrom'] ? (R extends { mapFrom: T[K] } ? R['mapTo'] : never) : T[K]`.
