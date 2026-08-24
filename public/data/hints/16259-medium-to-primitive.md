#### Hint 1: Converting literal types to broad primitives
**The goal:** Convert all literal types (e.g. `"foo"`, `123`, `true`) within an object into their primitive types (`string`, `number`, `boolean`).

**The nudge:** Check `T extends string ? string : T extends number ? number : T extends boolean ? boolean : T extends Function ? Function : T extends object ? { [K in keyof T]: ToPrimitive<T[K]> } : T`.
