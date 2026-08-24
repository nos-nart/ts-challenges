## Solution

In this challenge, we need to create the same
[`Readonly<T>`](./easy-readonly.md) type. The only difference is that we need to
make it recursive.

Let us start from classic and implement the regular
[`Readonly<T>`](./easy-readonly.md) type:

```ts
type DeepReadonly<T> = { readonly [P in keyof T]: T[P] };
```

But, as you already aware, this type will not make everything read-only, but
only the fields that are not in depth. The reason is that when our `T[P]` is not
a primitive, but an object, it will just pass it as is, without making its
properties read-only.

Therefore, we need to replace `T[P]` with a recursive usage of
`DeepReadonly<T>`. Do not forget about basic case when using recursions, though.

The algorithm is simple. In case `T[P]` is an object, we are going deeper into
`DeepReadonly`, otherwise - return `T[P]`:

```ts
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends Record<string, unknown>
    ? DeepReadonly<T[P]>
    : T[P];
};
```

## References

- [Index Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
- [Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [Recursive Conditional Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#recursive-conditional-types)
