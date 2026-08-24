#### Hint 1: Filtering non-underscore keys
**The goal:** Return object with only public properties (keys not starting with `_`).

**The nudge:** Key remapping: `[K in keyof T as K extends `_${string}` ? never : K]: T[K]`.
