## Solution

To solve `55-hard-union-to-intersection`, we need to construct a type transformation that satisfies all test cases.

### Mental Model (ELI5)
Think of a union like a set of possibilities (like "circle | square | triangle"). Conditional types automatically distribute across each possibility individually.

### Step-by-Step Walkthrough

1. **Step 1: Analyzing the Requirements & Constraints**:
   We inspect the input parameters, establishing appropriate generic constraints to guarantee type safety.

2. **Step 2: Core Transformation**:
   We build the target type structure:
```ts
type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never
```

3. **Step 3: How It Works**:
Distributes `U` into function parameter positions. Function arguments are contravariant, causing TypeScript to infer an intersection type `I`.

### Key Takeaways
- Type transformations occur strictly at compile time with zero runtime penalty.
- Clean generic constraints and pattern matching ensure robust type safety across all edge cases.

## References
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
