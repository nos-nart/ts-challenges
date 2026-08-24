## Solution

We need to make all the properties in the object read-only. Therefore, we need
to iterate over all the properties and add a modifier to them.

We are going to use the usual
[Mapped Type](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
here, nothing serious. For each property in the type, we take its key and add a
`readonly` modifier to it:

```ts
type MyReadonly<T> = { readonly [K in keyof T]: T[K] };
```

## References

- [Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
