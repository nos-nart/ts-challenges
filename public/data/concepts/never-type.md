The `never` type represents values that never occur. It is the bottom type in TypeScript, meaning it is a subtype of every type, but no type is a subtype of `never` (except `never` itself).

#### Checking for Never
Because conditional types distribute over naked generic type parameters, checking `T extends never` directly can yield unexpected results with `never`. To check if `T` is `never`, wrap `T` in a tuple:

```ts
type IsNever<T> = [T] extends [never] ? true : false

type A = IsNever<never> // true
type B = IsNever<string> // false
```

#### Filtering with Never in Mapped Types
Mapping keys to `never` removes them from the resulting object:
```ts
type OmitNever<T> = {
  [K in keyof T as T[K] extends never ? never : K]: T[K]
}
```

#### References
- [Official Handbook: The Never Type](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-never-type)
