#### Hint 1: Appending an element to a tuple
**The goal:** Return an array with element `U` appended to the end of tuple `T`.

**The nudge:** Use variadic tuple spread: `type Push<T extends readonly unknown[], U> = [...T, U]`.
