#### Hint 1: Distributive Conditional Types
**The Goal:** Filter out items from a union that match a condition.

**The Nudge:** When you use `T extends U ? A : B` on a union `T`, TypeScript applies the check to each member of the union *individually*. How do you tell TypeScript to "discard" a member that matches `U`?

#### Hint 2: The `never` type
**The Goal:** Use `never` to remove unwanted types from the union.

**The Nudge:** In a union, `T | never` is just `T`. If `T` matches `U`, what type should you return to effectively remove it from the final result?
