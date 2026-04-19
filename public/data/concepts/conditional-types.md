Conditional types allow you to choose between two types based on a condition, similar to a ternary operator in JavaScript.

#### Syntax
```ts
T extends U ? X : Y
```

#### Example
```ts
type IsString<T> = T extends string ? true : false

type A = IsString<"hello"> // true
type B = IsString<123>     // false
```

#### Why use them?
They are the foundation of most logic in the TypeScript type system, allowing you to create dynamic, responsive types that change based on their inputs.
