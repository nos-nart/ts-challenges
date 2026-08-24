## Solution

To solve `31447-extreme-countreversepairs`, we need to construct a type transformation that satisfies all test cases.

### Mental Model (ELI5)
Think of an array like a list or sequence of items in order. In TypeScript, we can inspect elements, spread them, or measure the exact count using tuple length.

### Step-by-Step Walkthrough

1. **Step 1: Analyzing the Requirements & Constraints**:
   We inspect the input parameters, establishing appropriate generic constraints to guarantee type safety.

2. **Step 2: Core Transformation**:
   We build the target type structure:
```ts
type CountReversePairs<T extends number[]> = number
```

3. **Step 3: How It Works**:
Counts reverse pairs in an array.

### Key Takeaways
- Type transformations occur strictly at compile time with zero runtime penalty.
- Clean generic constraints and pattern matching ensure robust type safety across all edge cases.

## References
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
