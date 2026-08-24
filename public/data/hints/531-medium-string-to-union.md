#### Hint 1: Splitting string into a union of characters
**The goal:** Convert string `T` into union of individual characters.

**The nudge:** Match first character: `type StringToUnion<T extends string> = T extends `${infer Head}${infer Tail}` ? Head | StringToUnion<Tail> : never`.
