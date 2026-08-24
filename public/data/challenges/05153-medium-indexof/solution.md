## Solution

To solve `5153-medium-indexof`, we need to construct a type transformation that satisfies all test cases.

### Mental Model (ELI5)
Think of an object like a dictionary or keyed record. Mapped types let us loop through all keys, filter them, or transform their value types.

### Step-by-Step Walkthrough

1. **Step 1: Analyzing the Requirements & Constraints**:
   We inspect the input parameters, establishing appropriate generic constraints to guarantee type safety.

2. **Step 2: Core Transformation**:
   We build the target type structure:
```ts
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false
type IndexOf<T extends any[], U, Acc extends any[] = []> = T extends [infer Head, ...infer Tail]
  ? Equal<Head, U> extends true
    ? Acc['length']
    : IndexOf<Tail, U, [...Acc, 1]>
  : -1
```

3. **Step 3: How It Works**:
Finds the first index of matching element `U` using strict equality.

### Key Takeaways
- Type transformations occur strictly at compile time with zero runtime penalty.
- Clean generic constraints and pattern matching ensure robust type safety across all edge cases.

## References
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
