#### Hint 1: Identifying falsy values
**The goal:** Return `true` if any array element is truthy.

**The nudge:** Define falsy union `0 | '' | false | [] | Record<string, never>`. Check if `T[number] extends Falsy` evaluates to `false`.
