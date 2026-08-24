## Solution

To solve `151-extreme-query-string-parser`, we need to construct a type transformation that satisfies all test cases.

### Mental Model (ELI5)
Think of string manipulation like pattern matching text at compile time, extracting prefixes, suffixes, or substrings using template literal types.

### Step-by-Step Walkthrough

1. **Step 1: Analyzing the Requirements & Constraints**:
   We inspect the input parameters, establishing appropriate generic constraints to guarantee type safety.

2. **Step 2: Core Transformation**:
   We build the target type structure:
```ts
type MergeParam<T, K extends string, V = true> = K extends keyof T
  ? T[K] extends any[]
    ? V extends T[K][number]
      ? T
      : { [P in keyof T]: P extends K ? [...T[P], V] : T[P] }
    : V extends T[K]
      ? T
      : { [P in keyof T]: P extends K ? [T[P], V] : T[P] }
  : T & { [P in K]: V }

type ParseQueryString<S extends string, Acc = {}> = S extends `${infer Param}&${infer Rest}`
  ? ParseQueryString<Rest, Param extends `${infer K}=${infer V}` ? MergeParam<Acc, K, V> : Param extends '' ? Acc : MergeParam<Acc, Param>>
  : S extends `${infer K}=${infer V}`
    ? MergeParam<Acc, K, V>
    : S extends ''
      ? Acc
      : MergeParam<Acc, S>
```

3. **Step 3: How It Works**:
Parses URL query string parameters into an object with array values for duplicate keys.

### Key Takeaways
- Type transformations occur strictly at compile time with zero runtime penalty.
- Clean generic constraints and pattern matching ensure robust type safety across all edge cases.

## References
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
