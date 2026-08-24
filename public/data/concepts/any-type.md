The `any` type opts out of type checking. TypeScript treats `any` as both a top type (all types can be assigned to it) and a bottom type (it can be assigned to all types).

#### Detecting Any
Because `any` behaves as both top and bottom, standard `T extends ...` checks fail to differentiate it cleanly. However, intersecting `any` with a number produces a union of possibilities internally that allows detection:

```ts
type IsAny<T> = 0 extends 1 & T ? true : false

type A = IsAny<any> // true
type B = IsAny<unknown> // false
type C = IsAny<never> // false
```

#### Any vs Unknown
- `unknown` is safe: you must narrow or assert before using properties.
- `any` disables all type checks on the value.
