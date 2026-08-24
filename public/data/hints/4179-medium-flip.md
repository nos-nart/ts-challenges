#### Hint 1: Inverting keys and values
**The goal:** Swap keys and values in an object type.

**The nudge:** Use key remapping: `{ [K in keyof T as `${T[K]}`]: K }`. Remember boolean/number values stringify cleanly in template literals.
