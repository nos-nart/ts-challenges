#### Hint 1: Pattern Matching (`infer`)
**The Goal:** Extract the parameter types from a function.

**The Nudge:** Use `T extends (...args: infer P) => any ? P : never`.

#### Hint 2: Constraints
**The Goal:** Ensure `T` is a function.

**The Nudge:** How do you tell TypeScript to only allow function types for `T`? Try `T extends (...args: any[]) => any`.
