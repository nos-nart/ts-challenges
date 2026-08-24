## Solution

To solve `27133-medium-square`, we need to construct a type transformation that satisfies all test cases.

### Mental Model (ELI5)
In TypeScript types, arithmetic operators (+, -, *, /) do not exist directly on numbers, so we use tuple lengths as compile-time counters and accumulators.

### Step-by-Step Walkthrough

1. **Step 1: Analyzing the Requirements & Constraints**:
   We inspect the input parameters, establishing appropriate generic constraints to guarantee type safety.

2. **Step 2: Core Transformation**:
   We build the target type structure:
```ts
type BuildTuple<L extends number, T extends unknown[] = []> = T['length'] extends L
  ? T
  : BuildTuple<L, [...T, unknown]>

type Multiply<A extends number, B extends number, Count extends any[] = [], Acc extends any[] = []> = Count['length'] extends B
  ? Acc['length']
  : Multiply<A, B, [...Count, 1], [...Acc, ...BuildTuple<A>]>

type Square<N extends number> = `${N}` extends `-${infer P extends number}`
  ? Multiply<P, P>
  : Multiply<N, N>
```

3. **Step 3: How It Works**:
Calculates `N * N` using tuple multiplication.

### Key Takeaways
- Type transformations occur strictly at compile time with zero runtime penalty.
- Clean generic constraints and pattern matching ensure robust type safety across all edge cases.

## References
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
