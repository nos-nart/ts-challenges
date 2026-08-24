#### Hint 1: Symmetric difference of object properties
**The goal:** Return properties that exist in either `O` or `O1`, but not both.

**The nudge:** Filter keys with `Exclude<keyof O | keyof O1, keyof O & keyof O1>`, then look up values from whichever object contains the key.
