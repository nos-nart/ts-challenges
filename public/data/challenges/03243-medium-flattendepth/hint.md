#### Hint 1: Tracking depth with tuple accumulator
**The goal:** Flatten an array up to a specified depth `D`.

**The nudge:** Use a counter tuple `Count extends unknown[] = []`. If `Count['length'] extends D`, stop recursion; otherwise flatten one level and increment counter.
