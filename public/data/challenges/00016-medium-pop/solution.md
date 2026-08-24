## Solution

We need to split the array into two parts: everything from the head until the
last element and the last element itself. Afterwards, we can get rid of the last
element and return the other part.

To achieve that, we can use
[variadic tuple types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types).
By combining them with
[type inference in conditional types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types),
we can infer the needed parts:

```ts
type Pop<T extends any[]> = T extends [...infer H, infer T] ? H : never;
```

In case `T` is assignable to the type of array that can be split in two parts,
we return everything except the last one, otherwise - `never`.

## References

- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [Type inference in conditional types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)
- [Variadic Tuple Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types)
