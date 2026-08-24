## Solution

To solve `2822-hard-split`, we need to construct a type transformation that satisfies all test cases.

### Mental Model (ELI5)
Think of string manipulation like pattern matching text at compile time, extracting prefixes, suffixes, or substrings using template literal types.

### Step-by-Step Walkthrough

1. **Step 1: Analyzing the Requirements & Constraints**:
   We inspect the input parameters, establishing appropriate generic constraints to guarantee type safety.

2. **Step 2: Core Transformation**:
   We build the target type structure:
```ts
type Split<S extends string, SEP extends string> = string extends S
  ? string[]
  : S extends `${infer Head}${SEP}${infer Tail}`
    ? [Head, ...Split<Tail, SEP>]
    : SEP extends ''
      ? []
      : S extends ''
        ? ['']
        : [S]
```

3. **Step 3: How It Works**:
Splits string `S` by delimiter `SEP` into a tuple of parts.

### Key Takeaways
- Type transformations occur strictly at compile time with zero runtime penalty.
- Clean generic constraints and pattern matching ensure robust type safety across all edge cases.

## References
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
