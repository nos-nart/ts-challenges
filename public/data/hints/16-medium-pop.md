#### Hint 1: Dropping the last element
**The goal:** Return a tuple with the last element removed.

**The nudge:** Match the rest before the final element: `type Pop<T extends any[]> = T extends [...infer Rest, infer _] ? Rest : []`.
