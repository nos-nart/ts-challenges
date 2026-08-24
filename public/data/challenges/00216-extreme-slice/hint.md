#### Hint 1: Handling negative indices and bounds
**The goal:** Implement array slice `Slice<Arr, Start, End>` supporting negative indices.

**The nudge:** Normalize negative indices by subtracting from `Arr['length']`. Use an index counter to take elements between `Start` and `End`.
