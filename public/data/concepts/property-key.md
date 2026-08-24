In TypeScript and JavaScript, valid property keys on objects can only be strings, numbers, or symbols. The built-in type `PropertyKey` represents this union.

#### Syntax
```ts
type PropertyKey = string | number | symbol
```

#### Generic Constraints on Keys
When writing generic helpers that accept object keys, constrain generic type parameters to `PropertyKey`:

```ts
type RecordItem<K extends PropertyKey, V> = {
  [P in K]: V
}
```

#### Converting Keys to Strings in Template Literals
When using template literal types with property keys, constrain keys with `string & K` or template literal interpolation `${K & string}` to satisfy the string requirement:
```ts
type PrefixKeys<T> = {
  [K in keyof T as `data_${string & K}`]: T[K]
}
```
