#### Hint 1: Generic Constraints
**The Goal:** Ensure the input is actually a function.

**The Nudge:** You only want to extract return types from functions. How do you constrain `T` to be "any function"? Try something like `T extends (...args: any[]) => any`.

#### Hint 2: Pattern Matching with `infer`
**The Goal:** Capture the return value of the function.

**The Nudge:** TypeScript's `infer` keyword lets you "guess" a part of a type structure. If you match against `(...args: any[]) => infer R`, what will `R` represent?
