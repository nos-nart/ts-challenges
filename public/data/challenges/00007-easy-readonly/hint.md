#### Hint 1: Mapping over existing keys
**The goal:** Iterate over all properties of object `T` and prevent re-assignment to any property.

**The nudge:** Use `keyof T` inside a mapped type: `[P in keyof T]: T[P]`.

#### Hint 2: Adding the readonly modifier
**The goal:** Mark every property as immutable.

**The nudge:** Prefix the property signature with the `readonly` keyword: `type MyReadonly<T> = { readonly [P in keyof T]: T[P] }`.
