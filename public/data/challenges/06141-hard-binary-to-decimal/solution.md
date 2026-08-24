## Solution

To solve `6141-hard-binary-to-decimal`, we need to construct a type transformation that satisfies all test cases.

### Mental Model (ELI5)
In TypeScript types, arithmetic operators (+, -, *, /) do not exist directly on numbers, so we use tuple lengths as compile-time counters and accumulators.

### Step-by-Step Walkthrough

1. **Step 1: Analyzing the Requirements & Constraints**:
   We inspect the input parameters, establishing appropriate generic constraints to guarantee type safety.

2. **Step 2: Core Transformation**:
   We build the target type structure:
```ts
type BuildTuple<L extends number, T extends unknown[] = []> = T['length'] extends L ? T : BuildTuple<L, [...T, unknown]>
type Double<T extends number> = [...BuildTuple<T>, ...BuildTuple<T>]['length'] & number
type Add<A extends number, B extends number> = [...BuildTuple<A>, ...BuildTuple<B>]['length'] & number

type BinaryToDecimal<S extends string, Acc extends number = 0> = S extends `${infer Head}${infer Tail}`
  ? BinaryToDecimal<Tail, Head extends '1' ? Add<Double<Acc>, 1> : Double<Acc>>
  : Acc
```

3. **Step 3: How It Works**:
Converts binary strings to decimal integers using tuple arithmetic.

### Key Takeaways
- Type transformations occur strictly at compile time with zero runtime penalty.
- Clean generic constraints and pattern matching ensure robust type safety across all edge cases.

## References
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
