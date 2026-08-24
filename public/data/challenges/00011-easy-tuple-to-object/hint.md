#### Hint 1: Extracting values from a tuple as a union
**The goal:** Transform a `readonly` array or tuple of literal strings/numbers into an object where each element becomes both a key and a value.

**The pitfall:** Iterating over `keyof T` on an array returns array methods (`'slice'`, `'push'`, array indices) rather than element values.

**The nudge:** Access tuple elements as a union using indexed access `T[number]`.

#### Hint 2: Mapping union elements to keys
**The goal:** Iterate over the union and create object entries.

**The nudge:** Constrain generic `T extends readonly (string | number | symbol)[]` and map over elements: `type TupleToObject<T extends readonly PropertyKey[]> = { [P in T[number]]: P }`.
