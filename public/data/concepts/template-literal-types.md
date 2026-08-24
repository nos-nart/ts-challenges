Template literal types build on string literal types and can expand into many strings via unions. They use the same syntax as JavaScript template strings, but in type positions.

#### Syntax
```ts
type World = 'world'
type Greeting = `hello ${World}` // "hello world"
```

#### Pattern Matching with Infer
You can use `infer` inside template literal types to extract parts of a string:
```ts
type TrimLeft<S extends string> = S extends ` ${infer Rest}` ? TrimLeft<Rest> : S

type Result = TrimLeft<'   hello'> // "hello"
```

#### Distributive Unions in Templates
When a template literal type receives a union, it distributes over each member:
```ts
type Color = 'red' | 'blue'
type Size = 'small' | 'large'

type Item = `${Size}-${Color}`
// "small-red" | "small-blue" | "large-red" | "large-blue"
```

#### References
- [Official Handbook: Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
