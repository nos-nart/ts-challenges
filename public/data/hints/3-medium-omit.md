#### Hint 1: The Loop (Mapped Types)
**The Goal:** Start by iterating over all keys of `T`.

**The Nudge:** You know how to loop over keys using `[P in keyof T]`. This is your starting point.

#### Hint 2: Filtering Keys (`as`)
**The Goal:** Exclude keys that are present in `K`.

**The Nudge:** Since TypeScript 4.1, you can re-map keys using the `as` keyword. How do you tell TypeScript to use the key `P` *only if* it doesn't extend `K`? Think about `P extends K ? never : P`.
