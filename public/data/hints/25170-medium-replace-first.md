#### Hint 1: Replacing the first matching element
**The goal:** In tuple `T`, replace the first item matching `From` with `To`.

**The nudge:** Match `[infer Head, ...infer Tail]`. If `Head extends From`, return `[To, ...Tail]`, else `[Head, ...ReplaceFirst<Tail, From, To>]`.
