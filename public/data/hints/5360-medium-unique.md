#### Hint 1: Deduplicating tuple elements
**The goal:** Remove duplicate elements while preserving original order.

**The nudge:** Maintain an output tuple `Acc extends any[] = []`. Check if `Head` is already included in `Acc` before adding.
