#### Hint 1: String to number type conversion
**The goal:** Convert string literal `"123"` to number literal `123`.

**The nudge:** Check if `S extends `${infer N extends number}` ? N : never`.
