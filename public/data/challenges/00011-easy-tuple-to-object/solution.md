## Solution

We need to take all the values from the array and make it as keys and values in
our new object.

It is easy to do with indexed types. We can get the values from an array by
using `T[number]` construct. With the help of mapped types, we can iterate over
those values in `T[number]` and return a new type where the key and value is the
type from `T[number]`:

```ts
type TupleToObject<T extends readonly PropertyKey[]> = { [K in T[number]]: K };
```

## References

- [Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- [Indexed Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
