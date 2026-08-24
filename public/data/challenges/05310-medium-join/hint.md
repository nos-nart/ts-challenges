#### Hint 1: Joining tuple strings with delimiter
**The goal:** Join string tuple elements with separator `U`.

**The nudge:** Deconstruct `T extends [infer Head, ...infer Tail]`. If `Tail` is empty, return `Head`, else ``${Head & string}${U}${Join<Tail, U>}``.
