#### Hint 1: Recursive property traversal
**The goal:** Recursively apply the `readonly` modifier to all nested properties in objects and arrays.

**The pitfall:** In TypeScript, functions extend `object` (`() => void extends object` is true). Treating functions as nested objects will incorrectly alter their callable signatures.

#### Hint 2: Distinguishing functions from plain objects
**The nudge:** Exclude functions before recursing:
`type DeepReadonly<T> = { readonly [K in keyof T]: T[K] extends Function ? T[K] : T[K] extends object ? DeepReadonly<T[K]> : T[K] }`.
