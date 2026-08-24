## Solution

To solve `35191-medium-trace`, we need to construct a type transformation that satisfies all test cases.

### Mental Model (ELI5)
Think of an object like a dictionary or keyed record. Mapped types let us loop through all keys, filter them, or transform their value types.

### Step-by-Step Walkthrough

1. **Step 1: Analyzing the Requirements & Constraints**:
   We inspect the input parameters, establishing appropriate generic constraints to guarantee type safety.

2. **Step 2: Core Transformation**:
   We build the target type structure:
```ts
type BuildTuple<L extends number, T extends unknown[] = []> = T['length'] extends L ? T : BuildTuple<L, [...T, unknown]>
type Add<A extends number, B extends number> = [...BuildTuple<A>, ...BuildTuple<B>]['length'] & number

type Trace<T extends number[][], Index extends any[] = [], Acc extends number = 0> = Index['length'] extends T['length']
  ? Acc
  : Trace<T, [...Index, 1], Add<Acc, T[Index['length']][Index['length']]>>
```

3. **Step 3: How It Works**:
Calculates the trace (sum of main diagonal elements) of a matrix.

### Key Takeaways
- Type transformations occur strictly at compile time with zero runtime penalty.
- Clean generic constraints and pattern matching ensure robust type safety across all edge cases.

## References
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
