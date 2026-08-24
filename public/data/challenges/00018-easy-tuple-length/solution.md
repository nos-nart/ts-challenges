## Solution

We know that we can use property `length` to access the length of the array in
JavaScript. We can do the same in types as well:

```ts
type Length<T extends any> = T["length"];
```

But going that way we will get the compilation error `Type 'length' cannot be
used to index type 'T'.`. We could try to give a hint to TypeScript and tell that
our input type parameter has the `length` property:

```ts
type Length<T extends { length: number }> = T["length"];
```

However, in this case T encompasses both arrays and strings. Instead, check that T is an array
with:

```ts
type Length<T extends readonly any[]> = T["length"];
```

## References

- [Indexed Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
