#### Hint 1: Spread Operator (`...`)
**The Goal:** Combine two arrays into one.

**The Nudge:** TypeScript's type system supports the same "spread" syntax as JavaScript. How do you create a new array type that contains all elements of `T` followed by all elements of `U`?

#### Hint 2: Constraints
**The Goal:** Ensure both `T` and `U` are arrays.

**The Nudge:** You can only spread array-like things. How do you tell TypeScript to restrict `T` and `U` to be arrays? Try `T extends readonly any[]`.
