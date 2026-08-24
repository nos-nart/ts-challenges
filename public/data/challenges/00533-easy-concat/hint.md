#### Hint 1: Variadic tuple spreads
**The goal:** Concatenate two tuples or arrays `T` and `U` into a single tuple.

**The nudge:** TypeScript supports the spread operator `...` inside tuple type definitions.

#### Hint 2: The solution
**The nudge:** Constrain `T extends readonly unknown[], U extends readonly unknown[]` and spread both into a new tuple: `type Concat<T extends readonly unknown[], U extends readonly unknown[]> = [...T, ...U]`.
