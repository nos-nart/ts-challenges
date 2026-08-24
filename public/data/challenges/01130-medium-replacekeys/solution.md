## Solution

We have a union of interfaces and we need to iterate over them and replace keys
in there. The distributivity will definitely help here as well as mapped types.

I'll start with the fact that mapped types in TypeScript are also distributive.
It means we can start writing mapped type to iterate over the keys of the
interface and have a distributivity over the union at the same time. But, let's
not go so fast, I'll explain a bit.

You already know that we can write a conditional type that accepts a union and
it will iterate over the elements of union. It helped us a lot before with other
challenges. Every time you write something like `U extends any ? U[] : never`,
what actually happens is `U` becomes an element from the union `U` in the truth
branch on each iteration.

The same applies to mapped types. We can write a mapped type that iterates over
the keys of type parameter and what actually happens is iterating over a single
element of union, not the whole union.

So we start with the simplest. Take all the elements from union `U` (thanks to
distributivity) and on each element iterate over its keys and return a copy.

```typescript
type ReplaceKeys<U, T, Y> = { [P in keyof U]: U[P] };
```

That way we got just a copy of anything that went into through type parameter
`U`. Now, we need to filter out those keys that are in `T` and `Y`.

First, we will check if the property we are currently in is in the list of keys
to update (in type parameter `T`).

```typescript
type ReplaceKeys<U, T, Y> = {
  [P in keyof U]: P extends T ? never : never;
};
```

If so, it means that the developer asked to update the key and provided a type
it needs to be replaced with. But we can't be sure that the key there actually
exists. So we need to check if the same property exists in keys of `Y`.

```typescript
type ReplaceKeys<U, T, Y> = {
  [P in keyof U]: P extends T ? (P extends keyof Y ? never : never) : never;
};
```

In case both conditions are true, it means that we know the key and the type of
the key we need to replace with. So we return the type that is specified in `Y`.

```typescript
type ReplaceKeys<U, T, Y> = {
  [P in keyof U]: P extends T ? (P extends keyof Y ? Y[P] : never) : never;
};
```

However, in case when there is a key to update in type parameter `T` but it is
absent in type parameter `Y`, we need to return `never` (according to challenge
specification). And the last case is when there is no such key both in `T` and
`Y`. In that case, we just skip replacing and get whatever the type is in the
original interface.

```typescript
type ReplaceKeys<U, T, Y> = {
  [P in keyof U]: P extends T ? (P extends keyof Y ? Y[P] : never) : U[P];
};
```

Having a distributive mapped types really made it possible to have a more
readable solution. Without them, they would force us to apply conditional types
for iterating over the `U` with the following mapped types inside the true
branch.

## References

- [Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [Indexed Access Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
