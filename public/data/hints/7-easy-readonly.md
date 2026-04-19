#### Hint 1: The Loop (Mapped Types)
**The Goal:** Iterate over all keys of the object to recreate its structure.

**The Nudge:** Just like in "Pick", you need to loop through every key. How do you tell TypeScript to look at every property `P` in the set of keys of `T`?

#### Hint 2: The Modifier (`readonly`)
**The Goal:** Make every property immutable.

**The Nudge:** TypeScript allows you to add prefixes to mapped type properties. To make a property read-only, where do you place the `readonly` keyword in the `{ [P in keyof T]: T[P] }` syntax?
