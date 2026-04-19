Recursive types are types that refer to themselves. This is common when working with nested data structures like trees, JSON, or deeply nested objects.

#### Example
```ts
type NestedArray<T> = T | NestedArray<T>[]

const data: NestedArray<number> = [1, [2, [3, 4]]]
```

#### Base Case
Every recursive type needs a "base case"—a condition where the recursion stops. In the example above, the base case is when the type is `T` (not an array).

#### Deep Transformation
Recursion is frequently used in TypeScript to perform deep transformations on object structures:
```ts
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P]
}
```
