#### Hint 1: Union element substitution
**The goal:** Replace matching union elements with replacement types.

**The nudge:** Distribute over union: `T extends any ? (T extends From ? To : T) : never`.
