#### Hint 1: Why U extends T[number] fails
**The goal:** Implement `Array.includes` as a type that returns `true` if `U` exists in tuple `T`, and `false` otherwise.

**The pitfall:** Checking `U extends T[number]` returns `true` for `Includes<[boolean, 2, 3], false>` because `false extends boolean` is true. It also fails on `any` and `readonly` objects.

#### Hint 2: Exact type equality helper
**The nudge:** Use a strict equality helper based on deferred conditional functions:
`type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false`.

#### Hint 3: Recursive tuple matching
**The nudge:** Deconstruct tuple elements one by one:
`type Includes<T extends readonly unknown[], U> = T extends [infer Head, ...infer Tail] ? Equal<Head, U> extends true ? true : Includes<Tail, U> : false`.
