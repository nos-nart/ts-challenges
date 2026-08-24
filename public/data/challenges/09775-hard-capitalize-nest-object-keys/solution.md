## Solution

To solve `9775-hard-capitalize-nest-object-keys`, we need to construct a type transformation that satisfies all test cases.

### Mental Model (ELI5)
Think of string manipulation like pattern matching text at compile time, extracting prefixes, suffixes, or substrings using template literal types.

### Step-by-Step Walkthrough

1. **Step 1: Analyzing the Requirements & Constraints**:
   We inspect the input parameters, establishing appropriate generic constraints to guarantee type safety.

2. **Step 2: Core Transformation**:
   We build the target type structure:
```ts
type CapitalizeNestObjectKeys<T> = T extends readonly any[]
  ? { [K in keyof T]: CapitalizeNestObjectKeys<T[K]> }
  : T extends object
    ? { [K in keyof T as Capitalize<K & string>]: CapitalizeNestObjectKeys<T[K]> }
    : T
```

3. **Step 3: How It Works**:
Recursively capitalizes all property keys.

### Key Takeaways
- Type transformations occur strictly at compile time with zero runtime penalty.
- Clean generic constraints and pattern matching ensure robust type safety across all edge cases.

## References
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
