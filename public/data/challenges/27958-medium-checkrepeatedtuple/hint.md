#### Hint 1: Detecting duplicates in a tuple
**The goal:** Return true if any element in tuple `T` is duplicated.

**The nudge:** Deconstruct `[infer Head, ...infer Tail]`. If `Head extends Tail[number]`, return true; otherwise recurse on `Tail`.
