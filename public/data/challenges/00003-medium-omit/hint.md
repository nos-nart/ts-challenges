#### Hint 1: Key exclusion vs value lookup
**The goal:** Construct a type with properties `K` excluded from `T`.

**The pitfall:** Indexing `T[Exclude<keyof T, K>]` returns a union of property value types, not an object.

#### Hint 2: Key remapping with as
**The nudge:** In TypeScript 4.1+, use the `as` clause to filter keys: `type MyOmit<T, K extends PropertyKey> = { [P in keyof T as P extends K ? never : P]: T[P] }`.

#### Hint 3: Combining Pick and Exclude
**The nudge:** Alternatively, combine standard utilities: `type MyOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>`.
