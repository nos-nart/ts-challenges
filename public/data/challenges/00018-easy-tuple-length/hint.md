#### Hint 1: Tuple length property
**The goal:** Return the numeric literal length of a fixed-size tuple.

**The pitfall:** General arrays like `string[]` have a `length` property of type `number`, not a literal number like `3`. Constrain `T` to a `readonly` tuple.

#### Hint 2: The solution
**The nudge:** Use generic constraint `T extends readonly any[]` and access the literal length via `T['length']`.
