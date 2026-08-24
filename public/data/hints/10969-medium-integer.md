#### Hint 1: Detecting decimal point in number strings
**The goal:** Verify if number `T` is an integer.

**The nudge:** Stringify `${T}`. If ``${T}` extends `${string}.${string}``, return `never`, otherwise `T`.
