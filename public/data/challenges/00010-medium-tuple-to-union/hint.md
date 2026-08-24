#### Hint 1: Indexed access with number
**The goal:** Convert elements of a tuple or array `T` into a union of its element types.

**The nudge:** In TypeScript, indexing an array with `number` (`T[number]`) extracts the union of all element types: `type TupleToUnion<T extends readonly unknown[]> = T[number]`.
