#### Hint 1: Typing Pinia store definitions
**The goal:** Bind `this` in `getters` and `actions` while mapping getters to their returned values in store instances.

**The nudge:** Map getters `{ [K in keyof G]: G[K] extends () => infer R ? R : never }` and inject into `this` context.
