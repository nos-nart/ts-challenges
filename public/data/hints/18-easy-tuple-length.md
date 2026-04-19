#### Hint 1: Indexed Access (Length Property)
**The Goal:** Access the "length" property of the tuple.

**The Nudge:** In JavaScript, how do you find the length of an array? In TypeScript, you can access properties of a type using the same bracket notation: `T['property']`.

#### Hint 2: Constraining the Input
**The Goal:** Ensure the input `T` is actually a tuple/array.

**The Nudge:** You can't get the length of something that isn't an array-like structure. How do you tell TypeScript that `T` must be a readonly array of anything? Try `T extends readonly any[]`.
