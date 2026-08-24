#### Hint 1: Stripping readonly modifiers
**The goal:** Make all properties of an object or array mutable.

**The nudge:** Use the `-readonly` modifier: `{ -readonly [K in keyof T]: T[K] }`.
