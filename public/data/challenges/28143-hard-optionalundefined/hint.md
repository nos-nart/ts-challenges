#### Hint 1: Making undefined-accepting properties optional
**The goal:** Make properties whose value includes `undefined` optional.

**The nudge:** Filter keys where `undefined extends T[K]` and apply `?` modifier.
