## Solution

When you want to get the last element from the array, you need to get all the
elements starting from the head until you find the last element. It is a hint to
use
[variadic tuple types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types);
we have an array and we need to work with its elements.

Knowing about variadic tuple types, the solution is pretty obvious. We need to
take anything in the head and the last element. Combining it with the
[type inference in conditional types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)
makes it easy to infer the last element:

```ts
type Last<T extends any[]> = T extends [...infer X, infer L] ? L : never;
```

## References

- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [Type inference in conditional types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)
- [Variadic Tuple Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types)
