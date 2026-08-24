#### Hint 1: All combinations of string characters
**The goal:** Generate all non-empty character combinations from a string.

**The nudge:** Convert string to a union of characters, then build permutations with template literals: `${U}${AllCombinations<Exclude<FullUnion, U>>}`.
