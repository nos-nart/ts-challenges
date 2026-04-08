The `readonly` modifier allows you to make properties of a type immutable. This is incredibly useful for ensuring that once an object is created, its properties cannot be changed.

#### Basic Usage
```ts
interface User {
  readonly id: number
  name: string
}

const user: User = { id: 1, name: "Alice" }
user.id = 2 // Error: Cannot assign to 'id' because it is a read-only property.
```

#### Mapped Types
You can also apply `readonly` to all properties of a type using a mapped type:
```ts
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}
```

#### Removing Readonly
You can remove the `readonly` modifier by prefixing it with `-`:
```ts
type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}
```

#### Why use it?
Immutability is a core concept in modern software development, helping to prevent bugs that arise from unexpected state changes.
