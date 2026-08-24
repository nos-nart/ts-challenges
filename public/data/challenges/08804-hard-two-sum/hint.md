#### Hint 1: Finding pair with target sum
**The goal:** Return true if any two distinct numbers in `T` sum to `U`.

**The nudge:** Check each element `Head` against all elements in `Tail`. Test if `Add<Head, Other> extends U`.
