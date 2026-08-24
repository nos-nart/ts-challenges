## Solution

The important detail here is a knowledge that conditional types in TypeScript
are
[distributive](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types).

So that when you are writing the construct `T extends U` where `T` is the union,
actually what is happening is TypeScript iterates over the union `T` and applies
the condition to each element.

Therefore, the solution is pretty straightforward. We check that `T` can be
assigned to `U` and if so; we skip it:

```ts
type MyExclude<T, U> = T extends U ? never : T;
```

## References

- [Distributive Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types)
