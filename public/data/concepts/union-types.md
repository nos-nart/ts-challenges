A union type represents a value that can be one of several types. Union types are formed using the vertical bar (`|`).

#### Basic Unions
```ts
type Status = 'pending' | 'resolved' | 'rejected'
```

#### Discriminated Unions
A common pattern in TypeScript is to use a literal property (the "discriminant") to allow the compiler to narrow a union:

```ts
type Action = 
  | { type: 'ADD'; amount: number }
  | { type: 'RESET' }

function reducer(action: Action) {
  if (action.type === 'ADD') {
    // TypeScript knows action has `amount`
    console.log(action.amount)
  }
}
```

#### Indexing Unions
Accessing a property on a union returns a union of the property types:
```ts
type Item = { id: string; name: string } | { id: number; name: string }
type IdType = Item['id'] // string | number
```
