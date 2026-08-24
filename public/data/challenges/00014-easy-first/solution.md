## Solution

The first thing that could come up is to use Indexed Access Types and just write `T[0]`:

```ts
type First<T extends any[]> = T[0];
```

But there is an edge case that we need to handle. If we pass an empty array,
`T[0]` will not work, because there is no element.

So that, before accessing the first element in the array, we need to check if
the array is empty. To do that, we can use
[conditional types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
in TypeScript.

The idea behind them is pretty straightforward. If we can assign the type to the
type of condition, it will go into "true" branch, otherwise it will take "false"
path.

We are going to check, if the array is empty, we return nothing, otherwise we
return the first element of the array:

```ts
type First<T extends any[]> = T extends [] ? never : T[0];
```

## References

- [Indexed Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
