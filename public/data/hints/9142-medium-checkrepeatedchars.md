#### Hint 1: Tracking seen characters
**The goal:** Return true if a string contains any duplicate characters.

**The nudge:** Deconstruct first character: `S extends `${infer Char}${infer Rest}``. Check if `Rest extends `${string}${Char}${string}``.
