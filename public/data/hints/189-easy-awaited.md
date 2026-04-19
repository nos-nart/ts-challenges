#### Hint 1: Pattern Matching (`infer`)
**The Goal:** Capture the value inside a Promise.

**The Nudge:** If you have `Promise<string>`, how do you "pluck out" the `string`? Use `T extends Promise<infer R> ? ... : ...`.

#### Hint 2: Recursion
**The Goal:** Handle nested Promises like `Promise<Promise<string>>`.

**The Nudge:** If `R` is itself a Promise, you need to repeat the process. How do you call `MyAwaited` on the captured `R`?

#### Hint 3: Constraints
**The Goal:** Ensure `T` is something that *can* be awaited.

**The Nudge:** Usually, we await things that are "Thenable" (have a `.then` method) or Promises. How do you tell TypeScript to restrict `T` to be something that looks like a Promise? Try `T extends { then: (onfulfilled: any) => any }`.
