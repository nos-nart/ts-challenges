#### Hint 1: Dynamic route parameter extractor
**The goal:** Parse route paths like `"/posts/[id]/[...slug]"` and return parameter object.

**The nudge:** Match `[...slug]` for catch-all (array type), `[id]` for required param, and `[[...slug]]` for optional param.
