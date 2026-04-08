#### Hint 1: Recursion
**The Goal:** Apply `readonly` to every level of the object.

**The Nudge:** When you iterate over keys, you'll find values. If a value is itself an object, what should you do with it? Think about calling your own `DeepReadonly` type on that value.

#### Hint 2: Base Case (When to stop?)
**The Goal:** Know when *not* to recurse.

**The Nudge:** If a value is a primitive (like a string or a number) or a function, you shouldn't try to recurse into it. How do you check if `T[P]` is an object?

#### Hint 3: Key Check
**The Goal:** Make sure you handle functions and other special objects correctly.

**The Nudge:** Be careful! Functions are also technically objects. You might need to check if `T[P]` is specifically an "object" but not a function.
