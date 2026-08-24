## Solution

To solve `30430-medium-tower-of-hanoi`, we need to construct a type transformation that satisfies all test cases.

### Mental Model (ELI5)
Think of an object like a dictionary or keyed record. Mapped types let us loop through all keys, filter them, or transform their value types.

### Step-by-Step Walkthrough

1. **Step 1: Analyzing the Requirements & Constraints**:
   We inspect the input parameters, establishing appropriate generic constraints to guarantee type safety.

2. **Step 2: Core Transformation**:
   We build the target type structure:
```ts
type Hanoi<
  N extends number,
  From = 'A',
  To = 'B',
  Helper = 'C',
  Count extends any[] = []
> = Count['length'] extends N
  ? []
  : [
      ...Hanoi<N, From, Helper, To, [...Count, 1]>,
      [From, To],
      ...Hanoi<N, Helper, To, From, [...Count, 1]>
    ]
```

3. **Step 3: How It Works**:
Generates Tower of Hanoi move pairs recursively.

### Key Takeaways
- Type transformations occur strictly at compile time with zero runtime penalty.
- Clean generic constraints and pattern matching ensure robust type safety across all edge cases.

## References
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
