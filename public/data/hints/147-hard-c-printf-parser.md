#### Hint 1: Parsing format specifiers
**The goal:** Parse format strings like `"%d %s"` into array of types `["dec", "string"]`.

**The nudge:** Match `%` followed by specifier characters (`'d'`, `'s'`, etc.) and append mapped format types.
