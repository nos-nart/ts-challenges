#### Hint 1: Stripping trailing whitespace
**The goal:** Remove trailing whitespace characters (`' '`, `'\n'`, `'\t'`).

**The nudge:** Use `S extends `${infer Rest}${' ' | '\n' | '\t'}` ? TrimRight<Rest> : S`.
