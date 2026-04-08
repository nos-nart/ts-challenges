#### Hint 1: Simple Conditional Types
**The Goal:** Choose `T` or `F` based on a boolean condition.

**The Nudge:** Use the `C extends true ? T : F` syntax.

#### Hint 2: Handling Null/Undefined
**The Goal:** Ensure `C` is strictly `true` or `false`.

**The Nudge:** In TypeScript, things that aren't `true` or `false` (like `null`) can cause issues if they don't match your constraint. How do you tell TypeScript that `C` *must* be a boolean? Try `C extends boolean`.
