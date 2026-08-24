#### Hint 1: Default generic parameters
**The goal:** Make keys in `K` readonly. If `K` is not provided, make all keys in `T` readonly.

**The nudge:** Provide a default value for `K`: `type MyReadonly2<T, K extends keyof T = keyof T>`.

#### Hint 2: Splitting readonly and mutable keys
**The pitfall:** Simply intersecting `Readonly<Pick<T, K>> & T` can retain duplicate properties.

**The nudge:** Intersect readonly picked keys with omitted remaining keys: `type MyReadonly2<T, K extends keyof T = keyof T> = Readonly<Pick<T, K>> & Omit<T, K>`.
