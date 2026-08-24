## Solution

To solve `4425-medium-greater-than`, we need to construct a type transformation that satisfies all test cases.

### Mental Model (ELI5)
In TypeScript types, arithmetic operators (+, -, *, /) do not exist directly on numbers, so we use tuple lengths as compile-time counters and accumulators.

### Step-by-Step Walkthrough

1. **Step 1: Analyzing the Requirements & Constraints**:
   We inspect the input parameters, establishing appropriate generic constraints to guarantee type safety.

2. **Step 2: Core Transformation**:
   We build the target type structure:
```ts
type GreaterThan<
  T extends number,
  U extends number,
  Count extends any[] = []
> = Count['length'] extends T
  ? false
  : Count['length'] extends U
    ? true
    : GreaterThan<T, U, [...Count, 1]>
```

3. **Step 3: How It Works**:
Increments a counter tuple; the number matching the length first is smaller.

### Key Takeaways
- Type transformations occur strictly at compile time with zero runtime penalty.
- Clean generic constraints and pattern matching ensure robust type safety across all edge cases.

## References
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
