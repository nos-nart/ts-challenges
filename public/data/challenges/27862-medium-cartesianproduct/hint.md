#### Hint 1: Distributing Cartesian pairs
**The goal:** Return Cartesian product of union `T` and union `U` as `[T, U]`.

**The nudge:** Distribute both unions: `T extends any ? U extends any ? [T, U] : never : never`.
