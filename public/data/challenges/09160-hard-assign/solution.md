## Solution

To solve `9160-hard-assign`, we need to construct a type transformation that satisfies all test cases.

### Mental Model (ELI5)
Think of an object like a dictionary or keyed record. Mapped types let us loop through all keys, filter them, or transform their value types.

### Step-by-Step Walkthrough

1. **Step 1: Analyzing the Requirements & Constraints**:
   We inspect the input parameters, establishing appropriate generic constraints to guarantee type safety.

2. **Step 2: Core Transformation**:
   We build the target type structure:
```ts
type MergeObj<A, B> = {
  [K in keyof A | keyof B]: K extends keyof B ? B[K] : K extends keyof A ? A[K] : never
}

type Assign<T extends Record<string, any>, U extends any[]> = U extends [infer Head, ...infer Tail]
  ? Head extends Record<string, any>
    ? Assign<MergeObj<T, Head>, Tail>
    : Assign<T, Tail>
  : T
```

3. **Step 3: How It Works**:
Merges a sequence of object sources into target `T`.

### Key Takeaways
- Type transformations occur strictly at compile time with zero runtime penalty.
- Clean generic constraints and pattern matching ensure robust type safety across all edge cases.

## References
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
