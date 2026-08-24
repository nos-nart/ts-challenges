#### Hint 1: Matching leading whitespace characters
**The goal:** Remove leading whitespace characters (`' '`, `'\n'`, `'\t'`) from string `S`.

**The nudge:** Define whitespace union `type Space = ' ' | '\n' | '\t'`. Match and recurse: `type TrimLeft<S extends string> = S extends `${Space}${infer Rest}` ? TrimLeft<Rest> : S`.
