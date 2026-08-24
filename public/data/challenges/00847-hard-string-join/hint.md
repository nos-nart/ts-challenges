#### Hint 1: Typed string joiner
**The goal:** Type a curried join function: `join(delimiter)(...parts)`.

**The nudge:** Type delimiter generic `D extends string` and parts generic `P extends string[]`. Return `Join<P, D>`.
