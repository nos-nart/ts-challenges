#### Hint 1: Handling empty search strings
**The goal:** Replace the first occurrence of `From` with `To` in string `S`.

**The pitfall:** If `From` is empty string `''`, matching ``${infer P}${''}${infer S}`` can trigger an unexpected match at the start.

#### Hint 2: The pattern match
**The nudge:** If `From` is `''`, return `S`. Otherwise: `S extends `${infer Prefix}${From}${infer Suffix}` ? `${Prefix}${To}${Suffix}` : S`.
