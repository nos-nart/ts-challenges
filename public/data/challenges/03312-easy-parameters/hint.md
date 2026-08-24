#### Hint 1: Function parameter inference
**The goal:** Extract parameter types of function type `T` as a tuple.

**The nudge:** Constrain `T extends (...args: any[]) => any` and infer arguments list with `infer P`: `type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never`.
