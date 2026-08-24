## Solution

To solve `30575-hard-bitwisexor`, we need to construct a type transformation that satisfies all test cases.

### Mental Model (ELI5)
Think of an object like a dictionary or keyed record. Mapped types let us loop through all keys, filter them, or transform their value types.

### Step-by-Step Walkthrough

1. **Step 1: Analyzing the Requirements & Constraints**:
   We inspect the input parameters, establishing appropriate generic constraints to guarantee type safety.

2. **Step 2: Core Transformation**:
   We build the target type structure:
```ts
type BitwiseXOR<A extends string, B extends string> = A extends `${infer A0}${infer ARest}`
  ? B extends `${infer B0}${infer BRest}`
    ? `${A0 extends B0 ? '0' : '1'}${BitwiseXOR<ARest, BRest>}`
    : ''
  : ''
```

3. **Step 3: How It Works**:
Calculates bitwise XOR on equal length binary strings.

### Key Takeaways
- Type transformations occur strictly at compile time with zero runtime penalty.
- Clean generic constraints and pattern matching ensure robust type safety across all edge cases.

## References
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
