#### Hint 1: Intersecting with number
**The goal:** Return true if and only if type `T` is `any`.

**The nudge:** Check `0 extends (1 & T) ? true : false`. Only `any` causes `1 & any` to allow `0`.
