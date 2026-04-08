When conditional types act on a generic type that is a union, they become *distributive*. This means the condition is applied to each member of the union individually.

#### Example
```ts
type ToArray<T> = T extends any ? T[] : never

type A = ToArray<string | number> // string[] | number[]
```

#### Filtering Unions
This is exactly how the built-in `Exclude` type works. It checks each member against a criteria and returns `never` for matches:
```ts
type MyExclude<T, U> = T extends U ? never : T

type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
```

#### Non-distributive Behavior
If you want to avoid this (i.e., check the entire union as one), you can wrap the types in square brackets:
```ts
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never

type B = ToArrayNonDist<string | number> // (string | number)[]
```
