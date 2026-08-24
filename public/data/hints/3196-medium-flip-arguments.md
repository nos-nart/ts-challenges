#### Hint 1: Reversing parameter tuples
**The goal:** Flip the argument order of a function type.

**The nudge:** Extract parameters `infer Args`, reverse `Args` using a tuple reverse helper, and return `(...args: Reverse<Args>) => Ret`.
