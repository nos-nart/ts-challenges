#### Hint 1: Adding a new key-value pair to an object
**The goal:** Append property `U: V` to interface `T`.

**The nudge:** Map over the combined keys `keyof T | U`:
`type AppendToObject<T, U extends PropertyKey, V> = { [K in keyof T | U]: K extends keyof T ? T[K] : V }`.
