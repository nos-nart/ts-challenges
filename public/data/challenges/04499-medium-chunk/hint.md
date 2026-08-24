#### Hint 1: Chunking with a sub-array accumulator
**The goal:** Split an array into sub-arrays of size `N`.

**The nudge:** Maintain current chunk `Chunk extends any[] = []`. When `Chunk['length'] extends N`, push chunk to result and reset chunk.
