#### Hint 1: Recursive curried function signatures
**The goal:** Transform a multi-argument function into unary chained functions: `Curry<(a: A, b: B) => R>` becomes `(a: A) => (b: B) => R`.

**The nudge:** Deconstruct parameters `Args extends [infer First, ...infer Rest]`. If `Rest['length'] extends 0`, return `(arg: First) => Ret`, else `(arg: First) => Curried<(...rest: Rest) => Ret>`.
