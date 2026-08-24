#### Hint 1: Function signature constraints
**The goal:** Extract the return type of a generic function type `T`.

**The pitfall:** Constraining `T extends Function` is too broad because `Function` does not expose parameter or return type signatures.

**The nudge:** Constrain `T extends (...args: any[]) => any`.

#### Hint 2: Pattern matching return types with infer
**The goal:** Capture and return the return type.

**The nudge:** Use `infer R` in the return position: `type MyReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : never`.
