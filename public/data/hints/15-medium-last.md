#### Hint 1: Variadic tuple matching
**The goal:** Extract the final element of tuple `T`.

**The nudge:** Use spread pattern matching: `type Last<T extends any[]> = T extends [...infer _, infer L] ? L : never`.
