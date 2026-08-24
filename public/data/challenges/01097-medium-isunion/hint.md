#### Hint 1: Comparing distributed item with full union
**The goal:** Determine if type `T` is a union.

**The nudge:** Check `[T] extends [never] ? false : T extends any ? [Copy] extends [T] ? false : true : never` where `Copy = T`.
