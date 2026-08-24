#### Hint 1: Distributing over discriminated unions
**The goal:** Find the specific object in a union `U` whose `type` property matches string `T`.

**The nudge:** Conditional types automatically distribute across unions: `type LookUp<U, T> = U extends { type: T } ? U : never`.
