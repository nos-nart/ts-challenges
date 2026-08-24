Mapped types allow adding or removing `readonly` and `?` (optional) modifiers using the prefix `+` or `-`. If no prefix is given, `+` is assumed.

#### Removing Modifiers
Use `-readonly` to make properties mutable, and `-?` to make optional properties required:

```ts
// Make all properties mutable
type Mutable<T> = {
  -readonly [K in keyof T]: T[K]
}

// Make all properties required
type Concrete<T> = {
  [K in keyof T]-?: T[K]
}
```

#### Adding Modifiers
Use `+readonly` (or `readonly`) and `+?` (or `?`):

```ts
type Optional<T> = {
  [K in keyof T]+?: T[K]
}
```
