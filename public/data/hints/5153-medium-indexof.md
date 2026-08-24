#### Hint 1: Finding element index with exact equality
**The goal:** Return index of first element matching `U` in tuple `T`, or `-1`.

**The nudge:** Use an index accumulator tuple `Index extends any[] = []`. Test exact equality `Equal<Head, U>` on each element.
