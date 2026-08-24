## Solution

To solve `13580-hard-replace-union`, we need to construct a type transformation that satisfies all test cases.

### Mental Model (ELI5)
Think of string manipulation like pattern matching text at compile time, extracting prefixes, suffixes, or substrings using template literal types.

### Step-by-Step Walkthrough

1. **Step 1: Analyzing the Requirements & Constraints**:
   We inspect the input parameters, establishing appropriate generic constraints to guarantee type safety.

2. **Step 2: Core Transformation**:
   We build the target type structure:
```ts
type ReplaceUnion<T, Pairs extends [any, any][]> = T extends any
  ? Pairs extends [infer Head extends [any, any], ...infer Tail extends [any, any][]]
    ? T extends Head[0] ? Head[1] : ReplaceUnion<T, Tail>
    : T
  : never
```

3. **Step 3: How It Works**:
Substitutes union members matching replacement pairs.

### Key Takeaways
- Type transformations occur strictly at compile time with zero runtime penalty.
- Clean generic constraints and pattern matching ensure robust type safety across all edge cases.

## References
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
