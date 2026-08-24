#### Hint 1: Splitting string into tuple by delimiter
**The goal:** Split string `S` by delimiter `SEP` into a tuple of parts.

**The nudge:** Match `S extends `${infer Head}${SEP}${infer Tail}` ? [Head, ...Split<Tail, SEP>] : [S]`. Handle edge cases like empty string delimiter.
