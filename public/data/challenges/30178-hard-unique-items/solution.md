## Solution

To solve `30178-hard-unique-items`, we need to construct a type transformation that satisfies all test cases.

### Mental Model (ELI5)
Think of an object like a dictionary or keyed record. Mapped types let us loop through all keys, filter them, or transform their value types.

### Step-by-Step Walkthrough

1. **Step 1: Analyzing the Requirements & Constraints**:
   We inspect the input parameters, establishing appropriate generic constraints to guarantee type safety.

2. **Step 2: Core Transformation**:
   We build the target type structure:
```ts
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false
type Includes<T extends any[], U> = T extends [infer Head, ...infer Tail]
  ? Equal<Head, U> extends true
    ? true
    : Includes<Tail, U>
  : false

type IsUnique<T extends any[], Acc extends any[] = []> = T extends [infer Head, ...infer Tail]
  ? Includes<Acc, Head> extends true
    ? false
    : IsUnique<Tail, [...Acc, Head]>
  : true

declare function uniquely<T extends any[]>(items: T & (IsUnique<T> extends true ? unknown : 'Duplicate items found')): T
```

3. **Step 3: How It Works**:
Validates that tuple elements contain no duplicates.

### Key Takeaways
- Type transformations occur strictly at compile time with zero runtime penalty.
- Clean generic constraints and pattern matching ensure robust type safety across all edge cases.

## References
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
