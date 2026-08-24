#### Hint 1: Trimming both sides
**The goal:** Remove whitespace from both the beginning and end of string `S`.

**The nudge:** Check for leading or trailing whitespace in a single union match: `type Trim<S extends string> = S extends `${Space}${infer R}` | `${infer R}${Space}` ? Trim<R> : S`.
