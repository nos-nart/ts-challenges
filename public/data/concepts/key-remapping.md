Key remapping allows you to transform or filter the keys of a mapped type using the `as` keyword. This was introduced in TypeScript 4.1.

#### Basic Usage
```ts
type Getters<T> = {
  [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P]
}

interface Person {
  name: string
  age: number
}

type PersonGetters = Getters<Person>
// { getName: () => string; getAge: () => number }
```

#### Filtering Keys
You can use key remapping to "filter" keys by mapping them to `never`:
```ts
type OmitByType<T, U> = {
  [P in keyof T as T[P] extends U ? never : P]: T[P]
}

type OnlyStrings = OmitByType<{ id: number; name: string }, number>
// { name: string }
```

#### Why use it?
Key remapping is an advanced feature that allows for powerful type transformations that were previously impossible.
