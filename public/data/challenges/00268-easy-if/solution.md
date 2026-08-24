## Solution

If you are not sure when to use
[conditional types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
in TypeScript, it is when you need to use an "if" statement on types. Exactly
what we tasked to do here.

If the condition type evaluates to `true`, we need to take a "true" branch,
otherwise "false" branch:

```ts
type If<C, T, F> = C extends true ? T : F;
```

Going that way we will get a compilation error, because we are trying to assign
`C` to boolean type and not having a constraint that shows that. So let us fix
it by adding `extends boolean` to the type parameter `C`:

```ts
type If<C extends boolean, T, F> = C extends true ? T : F;
```

## References

- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
