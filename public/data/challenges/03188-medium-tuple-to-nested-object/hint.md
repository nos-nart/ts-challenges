#### Hint 1: Nesting objects from path keys
**The goal:** Turn `['a', 'b', 'c']` and value `V` into `{ a: { b: { c: V } } }`.

**The nudge:** Deconstruct the tuple head: `T extends [infer Head, ...infer Tail] ? { [K in Head & string]: TupleToNestedObject<Tail, V> } : V`.
