Constraints allow you to restrict the types that can be passed to a generic parameter using the `extends` keyword.

#### Why use them?
Sometimes you want to write a generic function that works on a set of types where you know a certain property exists.

#### Syntax
```ts
function loggingIdentity<T extends { length: number }>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```

#### References
- [Official Handbook: Constraints](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)
