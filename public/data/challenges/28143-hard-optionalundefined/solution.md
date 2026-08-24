## Solution

To solve `28143-hard-optionalundefined`, we need to construct a type transformation that satisfies all test cases.

### Mental Model (ELI5)
Think of an object like a dictionary or keyed record. Mapped types let us loop through all keys, filter them, or transform their value types.

### Step-by-Step Walkthrough

1. **Step 1: Analyzing the Requirements & Constraints**:
   We inspect the input parameters, establishing appropriate generic constraints to guarantee type safety.

2. **Step 2: Core Transformation**:
   We build the target type structure:
```ts
type OptionalUndefined<T, Props extends keyof T = keyof T> = {
  [K in Props as undefined extends T[K] ? K : never]?: T[K]
} & {
  [K in Props as undefined extends T[K] ? never : K]: T[K]
} extends infer O ? { [K in keyof O]: O[K] } : never
```

3. **Step 3: How It Works**:
Makes properties whose value includes `undefined` optional.

### Key Takeaways
- Type transformations occur strictly at compile time with zero runtime penalty.
- Clean generic constraints and pattern matching ensure robust type safety across all edge cases.

## References
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
