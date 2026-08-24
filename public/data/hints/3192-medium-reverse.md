#### Hint 1: Reversing tuple elements
**The goal:** Reverse the order of elements in an array or tuple.

**The nudge:** Deconstruct head and tail, then place head at the end of the reversed tail: `T extends [infer Head, ...infer Tail] ? [...Reverse<Tail>, Head] : []`.
