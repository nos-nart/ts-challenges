#### Hint 1: Generic constraints on booleans
**The goal:** Return type `T` if condition `C` is `true`, and type `F` if `C` is `false`.

**The pitfall:** Callers might pass non-boolean types like `null` or numbers if `C` is not properly constrained.

#### Hint 2: The solution
**The nudge:** Constrain `C extends boolean` and branch using a conditional type: `type If<C extends boolean, T, F> = C extends true ? T : F`.
