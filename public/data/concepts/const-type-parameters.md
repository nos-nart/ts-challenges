Starting in TypeScript 5.0, you can add a `const` modifier to a type parameter declaration. This causes TypeScript to infer the most specific literal type (like `readonly ["a", "b"]`) without requiring callers to write `as const` at call sites.

#### Example Without `const`
```ts
type HasNames = { names: readonly string[] }
function getNamesExact<T extends HasNames>(arg: T): T['names'] {
  return arg.names
}

// Inferred as string[]
const names = getNamesExact({ names: ['Alice', 'Bob'] })
```

#### Example With `const` (TypeScript 5.0+)
```ts
function getNamesExactConst<const T extends HasNames>(arg: T): T['names'] {
  return arg.names
}

// Inferred as readonly ["Alice", "Bob"]
const exactNames = getNamesExactConst({ names: ['Alice', 'Bob'] })
```

#### Why Use It?
`const` type parameters eliminate the need for users to write `as const` on object and array arguments passed to generic functions.

#### References
- [Official Handbook: Const Type Parameters](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#const-type-parameters)
