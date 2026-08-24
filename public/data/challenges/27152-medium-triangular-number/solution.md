## Solution

To solve `27152-medium-triangular-number`, we need to construct a type transformation that satisfies all test cases.

### Mental Model (ELI5)
In TypeScript types, arithmetic operators (+, -, *, /) do not exist directly on numbers, so we use tuple lengths as compile-time counters and accumulators.

### Step-by-Step Walkthrough

1. **Step 1: Analyzing the Requirements & Constraints**:
   We inspect the input parameters, establishing appropriate generic constraints to guarantee type safety.

2. **Step 2: Core Transformation**:
   We build the target type structure:
```ts
type Triangular<
  N extends number,
  Step extends any[] = [],
  Acc extends any[] = []
> = Step['length'] extends N
  ? Acc['length']
  : Triangular<N, [...Step, 1], [...Acc, ...Step, 1]>
```

3. **Step 3: How It Works**:
Computes triangular number sum from 1 to `N`.

### Key Takeaways
- Type transformations occur strictly at compile time with zero runtime penalty.
- Clean generic constraints and pattern matching ensure robust type safety across all edge cases.

## References
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
