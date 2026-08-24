#### Hint 1: Removing the first element
**The goal:** Return the tuple with its first element removed.

**The nudge:** Use `T extends [infer _, ...infer Rest] ? Rest : []`.
