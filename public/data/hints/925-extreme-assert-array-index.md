#### Hint 1: Typed valid array indices
**The goal:** Check if index `N` is a valid non-out-of-bounds index for array `Arr`.

**The nudge:** Generate valid indices `keyof Arr & `${number}`` and test if `N` is within bounds.
