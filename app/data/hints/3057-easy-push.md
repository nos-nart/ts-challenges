#### Hint 1: Spread Operator (`...`)
**The Goal:** Add a new element to the end of an array.

**The Nudge:** Use the `[...T, U]` syntax.

#### Hint 2: Constraints
**The Goal:** Ensure `T` is an array.

**The Nudge:** How do you tell TypeScript that `T` *must* be some kind of array? Try `T extends any[]`.
