#### Hint 1: Triplet pattern matching
**The goal:** Parse string like `"+100%"` into `["+", "100", "%"]`.

**The nudge:** Extract sign with `A extends `+${infer R}` ? ['+', R] : ...`, then check for trailing `%`.
