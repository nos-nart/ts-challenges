#### Hint 1: Simulating Object.assign
**The goal:** Merge a sequence of objects into a target object.

**The nudge:** Process sources one by one: `T extends [infer Head, ...infer Tail] ? Assign<Merge<Target, Head>, Tail> : Target`.
