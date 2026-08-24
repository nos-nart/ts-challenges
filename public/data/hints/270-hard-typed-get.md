#### Hint 1: Nested property resolution via dot path
**The goal:** Retrieve the value type at path `"a.b.c"` from object `T`.

**The nudge:** Match `Path extends `${infer Head}.${infer Tail}` ? Get<T[Head & keyof T], Tail> : T[Path & keyof T]`.
