#### Hint 1: Appending parameters to function types
**The goal:** Add a new parameter of type `A` to the end of function `Fn`.

**The nudge:** Infer parameters and return type, then spread parameters with `A`: `type AppendArgument<Fn extends (...args: any[]) => any, A> = Fn extends (...args: infer P) => infer R ? (...args: [...P, A]) => R : never`.
