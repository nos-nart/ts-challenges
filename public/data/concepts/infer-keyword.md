The `infer` keyword allows you to extract and name a type variable from within another structure inside conditional types.

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

#### Constrained Infer (`infer extends` in TypeScript 4.7+)
You can add an `extends` constraint directly onto an `infer` declaration:

```ts
type StringToNumber<S extends string> = S extends `${infer N extends number}` ? N : never

type C = StringToNumber<'123'> // 123
type D = StringToNumber<'abc'> // never
```

#### References
- [Official Handbook: Inferring Within Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)
- [Release Notes: extends Constraints on infer Type Variables](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-7.html#extends-constraints-on-infer-type-variables)
