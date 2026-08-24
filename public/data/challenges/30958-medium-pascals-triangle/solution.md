## Solution

To solve `30958-medium-pascals-triangle`, we need to construct a type transformation that satisfies all test cases.

### Mental Model (ELI5)
Think of an object like a dictionary or keyed record. Mapped types let us loop through all keys, filter them, or transform their value types.

### Step-by-Step Walkthrough

1. **Step 1: Analyzing the Requirements & Constraints**:
   We inspect the input parameters, establishing appropriate generic constraints to guarantee type safety.

2. **Step 2: Core Transformation**:
   We build the target type structure:
```ts
type BuildTuple<L extends number, T extends unknown[] = []> = T['length'] extends L ? T : BuildTuple<L, [...T, unknown]>
type Add<A extends number, B extends number> = [...BuildTuple<A>, ...BuildTuple<B>]['length'] & number

type NextRow<Row extends number[], Prev extends number = 0, Acc extends number[] = []> = Row extends [infer Head extends number, ...infer Tail extends number[]]
  ? NextRow<Tail, Head, [...Acc, Add<Prev, Head>]>
  : [...Acc, 1]

type Pascal<N extends number, Rows extends number[][] = [[1]]> = Rows['length'] extends N
  ? Rows
  : Rows extends [...infer _, infer Last extends number[]]
    ? Pascal<N, [...Rows, NextRow<Last>]>
    : []
```

3. **Step 3: How It Works**:
Computes Pascal's triangle rows up to depth `N`.

### Key Takeaways
- Type transformations occur strictly at compile time with zero runtime penalty.
- Clean generic constraints and pattern matching ensure robust type safety across all edge cases.

## References
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
