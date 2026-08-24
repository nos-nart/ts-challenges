## Solution

To solve `956-hard-deeppick`, we need to construct a type transformation that satisfies all test cases.

### Mental Model (ELI5)
Think of an object like a dictionary or keyed record. Mapped types let us loop through all keys, filter them, or transform their value types.

### Step-by-Step Walkthrough

1. **Step 1: Analyzing the Requirements & Constraints**:
   We inspect the input parameters, establishing appropriate generic constraints to guarantee type safety.

2. **Step 2: Core Transformation**:
   We build the target type structure:
```ts
type DeepPick<T, Paths extends string> = (
  Paths extends any ? Paths extends `${infer Head}.${infer Tail}`
    ? Head extends keyof T ? { [K in Head]: DeepPick<T[Head], Tail> } : never
    : Paths extends keyof T ? { [K in Paths]: T[Paths] } : never
  : never
) extends infer U ? (U extends any ? (x: U) => void : never) extends (x: infer I) => void ? I : never : never
```

3. **Step 3: How It Works**:
Picks nested paths from object `T` and intersects results.

### Key Takeaways
- Type transformations occur strictly at compile time with zero runtime penalty.
- Clean generic constraints and pattern matching ensure robust type safety across all edge cases.

## References
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
