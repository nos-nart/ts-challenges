#### Hint 1: Picking deep nested path unions
**The goal:** Pick properties along paths like `"a.b" | "c"` and merge results.

**The nudge:** Resolve each dot-path into a nested object type and compute the intersection of all paths.
