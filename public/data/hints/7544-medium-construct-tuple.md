#### Hint 1: Building a tuple of length L
**The goal:** Construct a tuple with `L` elements of type `unknown`.

**The nudge:** Recurse with accumulator `Acc extends unknown[] = []`: `Acc['length'] extends L ? Acc : ConstructTuple<L, [...Acc, unknown]>`.
