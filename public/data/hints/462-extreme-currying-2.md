#### Hint 1: Multi-argument partial application
**The goal:** Curry function allowing calling with any number of arguments at each step until all parameters are satisfied.

**The nudge:** Signature accepts `(...args: infer Passed)`. If `Passed` satisfies all remaining parameters, return result; otherwise return another curried function with remaining parameters.
