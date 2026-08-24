## Solution

This challenge reminds me ["append to object"](./medium-append-to-object.md)
challenge. There we were using union operator to gather all the properties from
the object and string.

We can use the same trick here, to gather all the properties names from both
objects. So that our mapped type holds properties from both objects:

```typescript
type Merge<F, S> = { [P in keyof F | keyof S]: never };
```

Having properties names from both objects, we can start getting their value
types. We start with `S` because it has a higher precedence, it can override the
value type from `F`. But also we need to check if the property exists on `S`:

```typescript
type Merge<F, S> = {
  [P in keyof F | keyof S]: P extends keyof S ? S[P] : never;
};
```

In case, there is no property in `S`, we check if the property exists on `F` and
if so; we get the value type from there:

```typescript
type Merge<F, S> = {
  [P in keyof F | keyof S]: P extends keyof S
    ? S[P]
    : P extends keyof F
    ? F[P]
    : never;
};
```

That way we merge two objects with `S` having a higher precedence.

## References

- [Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)
- [keyof and Indexed Access Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
- [Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
