Indexed access types allow you to look up a specific property on another type, similar to how you access an object property at runtime.

#### Example
```ts
type Person = { age: number; name: string };
type Age = Person["age"]; // number
```

#### Using with Unions
You can use a union of keys to get a union of values:
```ts
type Values = Person["age" | "name"]; // string | number
```

#### References
- [Official Handbook: Indexed Access](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
