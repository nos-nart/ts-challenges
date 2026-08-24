## Solution

To solve `21104-medium-findall`, we need to construct a type transformation that satisfies all test cases.

### Mental Model (ELI5)
Think of an object like a dictionary or keyed record. Mapped types let us loop through all keys, filter them, or transform their value types.

### Step-by-Step Walkthrough

1. **Step 1: Analyzing the Requirements & Constraints**:
   We inspect the input parameters, establishing appropriate generic constraints to guarantee type safety.

2. **Step 2: Core Transformation**:
   We build the target type structure:
```ts
type FindAll<
  T extends string,
  P extends string,
  Acc extends number[] = [],
  Count extends any[] = []
> = P extends ''
  ? []
  : T extends `${string}${infer Rest}`
    ? T extends `${P}${string}`
      ? FindAll<Rest, P, [...Acc, Count['length']], [...Count, 1]>
      : FindAll<Rest, P, Acc, [...Count, 1]>
    : Acc
```

3. **Step 3: How It Works**:
Finds all starting indices of substring `P` in string `T`.

### Key Takeaways
- Type transformations occur strictly at compile time with zero runtime penalty.
- Clean generic constraints and pattern matching ensure robust type safety across all edge cases.

## References
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
