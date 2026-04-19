#### Hint 1: The Constraint (`extends keyof`)
**The Goal:** Prevent picking keys that do not exist.

**The Nudge:** Before you build the new object, how do you tell TypeScript that the generic `K` is only allowed to be a valid key of `T`? Try using the `extends` keyword combined with `keyof`.

#### Hint 2: The Loop (Mapped Types)
**The Goal:** Iterate over the allowed keys to build a new object type.

**The Nudge:** If `K` is a union of keys (like `'title' | 'completed'`), how do you "loop" through them in TypeScript to create your new properties? Take a look at the `[Property in K]` syntax for mapped types.

#### Hint 3: The Lookup (Indexed Access)
**The Goal:** Assign the correct type to the new keys.

**The Nudge:** Inside your type loop, how do you grab the original property type from `T`? Think about how you access object values dynamically in standard JavaScript—it's very similar in the type world!
