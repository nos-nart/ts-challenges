#### Hint 1: Prepending an element to a tuple
**The goal:** Return an array with element `U` inserted at the beginning of tuple `T`.

**The nudge:** Place `U` before spreading `T`: `type Unshift<T extends readonly unknown[], U> = [U, ...T]`.
