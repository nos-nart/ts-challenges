#### Hint 1: Filtering non-literal keys
**The goal:** Strip index signatures (`[key: string]: any`) from object types.

**The nudge:** Key remapping: `[K in keyof T as string extends K ? never : number extends K ? never : symbol extends K ? never : K]: T[K]`.
