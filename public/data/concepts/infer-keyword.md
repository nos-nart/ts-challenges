The `infer` keyword allows you to "guess" or "pluck" a type from within another structure. It's used inside conditional types to capture a specific type.

#### Example: Return Type
```ts
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never

type A = GetReturnType<() => string> // string
```

#### Example: Array Element
```ts
type UnpackArray<T> = T extends (infer U)[] ? U : T

type B = UnpackArray<number[]> // number
```

#### Example: Promise Value
```ts
type UnpackPromise<T> = T extends Promise<infer U> ? U : T

type C = UnpackPromise<Promise<string>> // string
```

#### Why use it?
`infer` is essential for creating flexible, generic types that can reach into other types and extract their internal structure.
