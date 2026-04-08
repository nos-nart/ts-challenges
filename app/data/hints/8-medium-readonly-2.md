#### Hint 1: The Goal (Split and Merge)
**The Goal:** Treat the readonly keys differently from the rest.

**The Nudge:** Can you create one type that makes only the keys in `K` readonly, and another that keeps the rest of the keys (those *not* in `K`) as they are? How do you combine two object types into one?

#### Hint 2: The Default Value
**The Goal:** Handle the case where `K` isn't provided.

**The Nudge:** If no keys are specified for `K`, everything should be made `readonly`. How do you set a default value for the generic parameter `K` to include all keys of `T`?

#### Hint 3: Intersection Types (`&`)
**The Goal:** Join the two separate object parts into the final result.

**The Nudge:** In TypeScript, how do you merge two objects together? Use the `&` operator to combine the "readonly part" and the "rest part".
