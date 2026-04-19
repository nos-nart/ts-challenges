Mapped types allow you to create new types based on the properties of existing ones. They are a powerful tool for transforming object structures.

#### Syntax
```ts
type Mapped<T> = {
  [P in keyof T]: T[P]
}
```

#### Key Modifiers
- **readonly**: Makes properties immutable.
- **?**: Makes properties optional.
- **-** (minus): Removes a modifier (e.g., `-readonly` or `-?`).

#### References
- [Official Handbook: Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- [Total TypeScript: Mapped Types](https://www.totaltypescript.com/concepts/mapped-types)
