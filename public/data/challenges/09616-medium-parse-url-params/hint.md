#### Hint 1: Extracting route parameter keys
**The goal:** Parse route params like `":id"` from `"posts/:id/:user"`.

**The nudge:** Match `S extends `${string}:${infer Rest}``. Extract until next `/` or end of string: `Rest extends `${infer Param}/${infer Tail}` ? Param | ParseUrlParams<Tail> : Rest`.
