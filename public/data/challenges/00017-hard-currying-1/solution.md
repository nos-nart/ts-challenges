## Solution

To solve `17-hard-currying-1`, we need to construct a type transformation that satisfies all test cases.

### Mental Model (ELI5)
Function types allow us to pattern match parameters and return types using `infer`, currying, or binding context with `ThisType`.

### Step-by-Step Walkthrough

1. **Step 1: Analyzing the Requirements & Constraints**:
   We inspect the input parameters, establishing appropriate generic constraints to guarantee type safety.

2. **Step 2: Core Transformation**:
   We build the target type structure:
```ts
type Curried<F> = F extends (...args: infer Args) => infer Ret
  ? Args extends [infer First, ...infer Rest]
    ? Rest['length'] extends 0
      ? (arg: First) => Ret
      : (arg: First) => Curried<(...args: Rest) => Ret>
    : () => Ret
  : never

declare function Currying<F>(fn: F): Curried<F>
```

3. **Step 3: How It Works**:
Recursively transforms multi-parameter function signatures into unary curried function chains.

### Key Takeaways
- Type transformations occur strictly at compile time with zero runtime penalty.
- Clean generic constraints and pattern matching ensure robust type safety across all edge cases.

## References
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
