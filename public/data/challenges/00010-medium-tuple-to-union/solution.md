## Solution

We need to take all the elements from an array and convert it to the union.
Luckily, TypeScript already has it in its type system -
[Indexed Access Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html).

We can use the construct `T[number]` to get the union of all elements of `T`:

```ts
type TupleToUnion<T> = T[number];
```

But, we will get an error "Type ‘number' cannot be used to index type ‘T'". That
is because we don't have a constraint over `T` that is saying to the compiler it
is an array that can be indexed. Let us fix that by adding `extends unknown[]`:

```ts
type TupleToUnion<T extends unknown[]> = T[number];
```

## References

- [Indexed Access Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
