#### Hint 1: The empty array pitfall
**The goal:** Extract the first element type of a tuple `T`.

**The pitfall:** Simply writing `T[0]` returns `undefined` when `T` is an empty array `[]`, but the test cases expect `never`.

#### Hint 2: Handling empty arrays with conditional types
**The nudge:** Check whether the array is empty before accessing index 0. You can test if `T extends [] ? never : T[0]`, or check `T['length'] extends 0 ? never : T[0]`.

#### Hint 3: Pattern matching with infer
**The nudge:** Alternatively, match the head element using tuple destructuring: `type First<T extends any[]> = T extends [infer Head, ...infer _] ? Head : never`.
