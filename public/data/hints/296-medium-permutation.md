#### Hint 1: The never base case
**The goal:** Generate all permutations of union `T` as tuples.

**The pitfall:** Checking `T extends never` directly distributes over `never` and returns `never`. Wrap `[T] extends [never]`.

#### Hint 2: Distributive recursive permutation
**The nudge:** Preserve the full union in a default generic `K = T`. Distribute over `T` and recurse on the excluded subset:
`type Permutation<T, K = T> = [T] extends [never] ? [] : K extends any ? [K, ...Permutation<Exclude<T, K>>] : never`.
