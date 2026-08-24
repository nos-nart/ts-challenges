## Solution

To solve `8804-hard-two-sum`, we need to construct a type transformation that satisfies all test cases.

### Mental Model (ELI5)
In TypeScript types, arithmetic operators (+, -, *, /) do not exist directly on numbers, so we use tuple lengths as compile-time counters and accumulators.

### Step-by-Step Walkthrough

1. **Step 1: Analyzing the Requirements & Constraints**:
   We inspect the input parameters, establishing appropriate generic constraints to guarantee type safety.

2. **Step 2: Core Transformation**:
   We build the target type structure:
```ts
type BuildTuple<L extends number, T extends unknown[] = []> = T['length'] extends L ? T : BuildTuple<L, [...T, unknown]>
type Add<A extends number, B extends number> = [...BuildTuple<A>, ...BuildTuple<B>]['length'] & number

type TwoSum<T extends number[], U extends number> = T extends [infer Head extends number, ...infer Tail extends number[]]
  ? U extends Add<Head, Tail[number]>
    ? true
    : TwoSum<Tail, U>
  : false
```

3. **Step 3: How It Works**:
Determines if any two numbers in `T` sum to `U`.

### Key Takeaways
- Type transformations occur strictly at compile time with zero runtime penalty.
- Clean generic constraints and pattern matching ensure robust type safety across all edge cases.

## References
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
