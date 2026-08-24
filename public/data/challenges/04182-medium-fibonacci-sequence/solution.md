## Solution

To solve `4182-medium-fibonacci-sequence`, we need to construct a type transformation that satisfies all test cases.

### Mental Model (ELI5)
In TypeScript types, arithmetic operators (+, -, *, /) do not exist directly on numbers, so we use tuple lengths as compile-time counters and accumulators.

### Step-by-Step Walkthrough

1. **Step 1: Analyzing the Requirements & Constraints**:
   We inspect the input parameters, establishing appropriate generic constraints to guarantee type safety.

2. **Step 2: Core Transformation**:
   We build the target type structure:
```ts
type Fibonacci<
  T extends number,
  Index extends any[] = [1],
  Prev extends any[] = [],
  Current extends any[] = [1]
> = Index['length'] extends T
  ? Current['length']
  : Fibonacci<T, [...Index, 1], Current, [...Prev, ...Current]>
```

3. **Step 3: How It Works**:
Calculates the `T`-th Fibonacci number using tuple length addition.

### Key Takeaways
- Type transformations occur strictly at compile time with zero runtime penalty.
- Clean generic constraints and pattern matching ensure robust type safety across all edge cases.

## References
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
