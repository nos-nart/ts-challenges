#### Hint 1: Extracting public instance keys
**The goal:** Return only public keys of class instance `T`.

**The nudge:** Use `keyof T`. In TypeScript, `keyof` on a class type includes only public properties and methods.
