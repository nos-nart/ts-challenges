## Solution

To solve `4518-medium-fill`, we need to construct a type transformation that satisfies all test cases.

### Mental Model (ELI5)
Think of an array like a list or sequence of items in order. In TypeScript, we can inspect elements, spread them, or measure the exact count using tuple length.

### Step-by-Step Walkthrough

1. **Step 1: Analyzing the Requirements & Constraints**:
   We inspect the input parameters, establishing appropriate generic constraints to guarantee type safety.

2. **Step 2: Core Transformation**:
   We build the target type structure:
```ts
type Fill<
  T extends any[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  Count extends any[] = [],
  Flag extends boolean = Count['length'] extends Start ? true : false
> = Count['length'] extends End
  ? T
  : T extends [infer Head, ...infer Tail]
    ? Flag extends true
      ? [N, ...Fill<Tail, N, Start, End, [...Count, 1], true>]
      : [Head, ...Fill<Tail, N, Start, End, [...Count, 1], [...Count, 1]['length'] extends Start ? true : false>]
    : []
```

3. **Step 3: How It Works**:
Fills elements with `N` within index range `[Start, End)`.

### Key Takeaways
- Type transformations occur strictly at compile time with zero runtime penalty.
- Clean generic constraints and pattern matching ensure robust type safety across all edge cases.

## References
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
