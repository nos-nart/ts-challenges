#### Hint 1: Number stringification and minus sign matching
**The goal:** Return the absolute positive string of a number, string, or bigint.

**The nudge:** Stringify with `${T}`. If it starts with a minus ``-${infer N}``, return `N`, else return ``${T}``.
