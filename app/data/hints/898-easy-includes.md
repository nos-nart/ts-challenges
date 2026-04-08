#### Hint 1: Array Search Logic
**The Goal:** Check if `U` exists within the array `T`.

**The Nudge:** This is a tricky one! You need to look through each item of the array. If the array is `[infer First, ...infer Rest]`, what should you check first?

#### Hint 2: Deep Equality
**The Goal:** Make sure `true` is exactly `true` and not just `boolean`.

**The Nudge:** In TypeScript, `true` extends `boolean`, and `boolean` also extends `true | false`. To check for an *exact* match, you might need a special helper type or a very specific conditional check like `(<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false`.

#### Hint 3: Recursion
**The Goal:** If the first element doesn't match, keep looking.

**The Nudge:** If `First` is not equal to `U`, how do you check the `Rest` of the array?
