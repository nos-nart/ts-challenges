#### Hint 1: Recursive replacement without infinite loops
**The goal:** Replace all occurrences of `From` with `To` in string `S`.

**The pitfall:** Recursively replacing on the entire result string ``${Prefix}${To}${Suffix}`` can cause infinite recursion if `To` contains `From` (e.g. replacing `'f'` with `'foo'`).

#### Hint 2: Recursing only on the suffix
**The nudge:** Recurse only on the remaining `Suffix`: `type ReplaceAll<S extends string, From extends string, To extends string> = From extends '' ? S : S extends `${infer Prefix}${From}${infer Suffix}` ? `${Prefix}${To}${ReplaceAll<Suffix, From, To>}` : S`.
