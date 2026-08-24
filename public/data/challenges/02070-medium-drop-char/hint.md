#### Hint 1: Stripping specific characters
**The goal:** Remove all occurrences of character `C` from string `S`.

**The nudge:** Use `S extends `${infer Prefix}${C}${infer Suffix}` ? `${Prefix}${DropChar<Suffix, C>}` : S`.
