#### Hint 1: Type aliases
**The goal:** Make the generic or type alias `HelloWorld` resolve to the primitive string type.

**The pitfall:** Using `any` bypasses TypeScript type checking, but the test expectation requires strict type equality with `string`.

#### Hint 2: The solution
**The nudge:** In TypeScript, a type alias assigns a name to a type. Replace `any` directly with `string`: `type HelloWorld = string`.
