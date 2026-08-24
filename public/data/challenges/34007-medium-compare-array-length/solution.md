## Solution

To solve `34007-medium-compare-array-length`, we need to construct a type transformation that satisfies all test cases.

### Mental Model (ELI5)
Think of an array like a list or sequence of items in order. In TypeScript, we can inspect elements, spread them, or measure the exact count using tuple length.

### Step-by-Step Walkthrough

1. **Step 1: Analyzing the Requirements & Constraints**:
   We inspect the input parameters, establishing appropriate generic constraints to guarantee type safety.

2. **Step 2: Core Transformation**:
   We build the target type structure:
```ts
type CompareArrayLength<A extends any[], B extends any[]> = A['length'] extends B['length']
  ? 0
  : A extends [any, ...infer ARest]
    ? B extends [any, ...infer BRest]
      ? CompareArrayLength<ARest, BRest>
      : 1
    : -1
```

3. **Step 3: How It Works**:
Compares lengths of arrays `A` and `B`.

### Key Takeaways
- Type transformations occur strictly at compile time with zero runtime penalty.
- Clean generic constraints and pattern matching ensure robust type safety across all edge cases.

## References
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
