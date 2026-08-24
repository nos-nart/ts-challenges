#### Hint 1: Pattern matching promise types
**The goal:** Extract the wrapped value type from a `Promise<T>` or thenable object.

**The pitfall:** Promises can be nested (`Promise<Promise<string>>`) and can be standard Promises or custom objects with a `.then` method.

#### Hint 2: Recursive unwrapping with infer
**The nudge:** Use conditional type inference: `T extends Promise<infer R> ? MyAwaited<R> : T`.

#### Hint 3: Supporting thenables and constraints
**The nudge:** Constrain `T extends PromiseLike<any>` or `T extends { then: (onfulfilled: (arg: infer R) => any) => any }` and recurse until the unwrapped type is no longer a thenable.
