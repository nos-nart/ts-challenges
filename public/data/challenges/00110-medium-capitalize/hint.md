#### Hint 1: Splitting and uppercasing the first letter
**The goal:** Capitalize the first character of string `S`.

**The nudge:** Extract the first character with `infer`: `type MyCapitalize<S extends string> = S extends `${infer Head}${infer Tail}` ? `${Uppercase<Head>}${Tail}` : S`.
