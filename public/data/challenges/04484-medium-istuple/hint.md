#### Hint 1: Differentiating fixed tuples from open arrays
**The goal:** Return true if type `T` is a tuple (fixed length) rather than a general array `number[]`.

**The nudge:** Check `[T] extends [never] ? false : T extends readonly any[] ? number extends T['length'] ? false : true : false`.
