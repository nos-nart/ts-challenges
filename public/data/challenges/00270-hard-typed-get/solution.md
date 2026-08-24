## Solution

To solve `270-hard-typed-get`, we need to construct a type transformation that satisfies all test cases.

### Mental Model (ELI5)
Think of an object like a dictionary or keyed record. Mapped types let us loop through all keys, filter them, or transform their value types.

### Step-by-Step Walkthrough

1. **Step 1: Analyzing the Requirements & Constraints**:
   We inspect the input parameters, establishing appropriate generic constraints to guarantee type safety.

2. **Step 2: Core Transformation**:
   We build the target type structure:
```ts
type Get<T, K> = K extends keyof T
  ? T[K]
  : K extends `${infer Head}.${infer Tail}`
    ? Head extends keyof T
      ? Get<T[Head], Tail>
      : never
    : never
```

3. **Step 3: How It Works**:
Traverses dot-separated path strings to look up nested property types.

### Key Takeaways
- Type transformations occur strictly at compile time with zero runtime penalty.
- Clean generic constraints and pattern matching ensure robust type safety across all edge cases.

## References
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
