#### Hint 1: Building function signature from format string
**The goal:** Parse format string and return a callable function type: `Format<"Hello %s">` becomes `(s: string) => string`.

**The nudge:** Map format specifiers into curried parameters, terminating with `() => string` or `string`.
