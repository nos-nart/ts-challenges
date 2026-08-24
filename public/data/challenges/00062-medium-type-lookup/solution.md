## Solution

At first, I thought it will be a huge solution with a lot of explanations, but
turns out nothing out of ordinary.

We know about
[Conditional Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#conditional-types)
in TypeScript and we know that we can use it to check if the type is assignable
to some specific layout (if I may say so).

Let us check if `U` is assignable to the `{ type: T }` then:

```ts
type LookUp<U, T> = U extends { type: T } ? U : never;
```

BTW, worth noting that Conditional Types in TypeScript are
[distributive](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types).
So that each item from the union is going to be checked against our condition.

## References

- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [Distributive Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types)
