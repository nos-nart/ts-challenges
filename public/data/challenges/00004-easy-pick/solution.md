## Solution

For this challenge to solve, we need to use Indexed Access Types and Mapped Types.

Indexed Access Types allow for us to extract a type from another type by its name. Kind
of getting a value from an object by using its key.

Mapped Types allow for us to transform each property in a type into a new type.

You can read more about them and understand what they are doing on TypeScript
website:
[Indexed Access Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
and
[mapped types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html).

Now, knowing that there are Indexed Access Types and mapped types in TypeScript. How to
implement the required type?

We need to take everything from the union `K`, iterate over it, and return a new
type that will consist only of those keys. Exactly what mapped types are doing.

The type of values itself are going to be without change. Although, we need to
take its type from the original type and that is where lookup type is useful:

```ts
type MyPick<T, K extends keyof T> = { [P in K]: T[P] };
```

We are saying "get everything from `K`, name it as `P` and make it as a new key
in our new object with a value type taken from the input type". It's hard to
grasp at first, so if you didn't understand something, try to read the info
again and wrap it in your head step by step.

## References

- [Indexed Access Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
- [Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- [Indexed Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
