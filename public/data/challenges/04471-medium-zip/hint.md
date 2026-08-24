#### Hint 1: Pairing corresponding elements
**The goal:** Merge two tuples into pairs: `[[A0, B0], [A1, B1], ...]`.

**The nudge:** Deconstruct `T extends [infer T0, ...infer TRest]` and `U extends [infer U0, ...infer URest]`, building `[[T0, U0], ...Zip<TRest, URest>]`.
