## Solution

To solve `651-hard-length-of-string-2`, we need to construct a type transformation that satisfies all test cases.

### Mental Model (ELI5)
Think of string manipulation like pattern matching text at compile time, extracting prefixes, suffixes, or substrings using template literal types.

### Step-by-Step Walkthrough

1. **Step 1: Analyzing the Requirements & Constraints**:
   We inspect the input parameters, establishing appropriate generic constraints to guarantee type safety.

2. **Step 2: Core Transformation**:
   We build the target type structure:
```ts
type StringToTuple<S extends string, Acc extends any[] = []> = S extends `${infer Head}${infer Tail}`
  ? StringToTuple<Tail, [...Acc, Head]>
  : Acc

type LengthOfString<S extends string> = StringToTuple<S>['length']
```

3. **Step 3: How It Works**:
Computes string length efficiently.

### Key Takeaways
- Type transformations occur strictly at compile time with zero runtime penalty.
- Clean generic constraints and pattern matching ensure robust type safety across all edge cases.

## References
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
