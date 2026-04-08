Intersection types allow you to combine multiple types into a single new type. The result will have all of the members of each of the component types.

#### Basic Usage
```ts
interface Person {
  name: string
}

interface Worker {
  job: string
}

type WorkingPerson = Person & Worker

const person: WorkingPerson = {
  name: "Alice",
  job: "Engineer"
}
```

#### Merging Objects
You can use intersection types to "merge" object types together:
```ts
type Merge<T, U> = T & U
```

#### Why use them?
Intersection types are a fundamental way to build complex types out of simpler ones, supporting composition and allowing for more flexible type definitions.
```ts
type PartialReadonly<T, K extends keyof T> = 
  Readonly<Pick<T, K>> & Omit<T, K>
```
