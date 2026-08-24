#### Hint 1: Distributive conditional types
**The goal:** Remove all types from union `T` that are assignable to `U`.

**The nudge:** Naked generic type parameters in conditional types automatically distribute over unions. When `T` is `'a' | 'b' | 'c'`, `T extends U` runs separately for each member.

#### Hint 2: The solution
**The nudge:** If a member extends `U`, discard it with `never`; otherwise keep it: `type MyExclude<T, U> = T extends U ? never : T`.
