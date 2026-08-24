#### Hint 1: Recursive mutability
**The goal:** Strip `readonly` modifiers from all levels of nested objects and arrays.

**The nudge:** Map with `-readonly [K in keyof T]: T[K] extends Function ? T[K] : T[K] extends object ? DeepMutable<T[K]> : T[K]`.
