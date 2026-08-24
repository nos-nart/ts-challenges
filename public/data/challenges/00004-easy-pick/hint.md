#### Hint 1: Generic constraints
**The goal:** Restrict the keys `K` so callers cannot pass keys that do not exist on object `T`.

**The pitfall:** If `K` is unconstrained, callers could pass arbitrary strings like `'invalid'`, causing lookup errors when indexing `T[K]`.

**The nudge:** Constrain `K` to valid keys using `K extends keyof T`.

#### Hint 2: Mapped types and indexed access
**The goal:** Iterate over the union of keys in `K` and retrieve their corresponding types from `T`.

**The nudge:** Use the mapped type loop `[P in K]` to iterate over keys, and indexed access `T[P]` to look up their original value types: `type MyPick<T, K extends keyof T> = { [P in K]: T[P] }`.
