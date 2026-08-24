#### Hint 1: Unifying type equality
**The goal:** Accurately check if types `A` and `B` are identical, including `any` and `readonly`.

**The nudge:** Use deferred conditional function equality: `(<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false`.
