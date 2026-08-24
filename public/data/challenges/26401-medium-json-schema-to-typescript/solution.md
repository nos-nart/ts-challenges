## Solution

To solve `26401-medium-json-schema-to-typescript`, we need to construct a type transformation that satisfies all test cases.

### Mental Model (ELI5)
Think of an object like a dictionary or keyed record. Mapped types let us loop through all keys, filter them, or transform their value types.

### Step-by-Step Walkthrough

1. **Step 1: Analyzing the Requirements & Constraints**:
   We inspect the input parameters, establishing appropriate generic constraints to guarantee type safety.

2. **Step 2: Core Transformation**:
   We build the target type structure:
```ts
type TypeMap = {
  string: string
  number: number
  boolean: boolean
}

type JSONSchema2TS<T> = T extends { type: infer Type extends keyof TypeMap }
  ? TypeMap[Type]
  : T extends { type: 'object'; properties: infer Props }
    ? { [K in keyof Props]: JSONSchema2TS<Props[K]> }
    : T extends { type: 'array'; items: infer Items }
      ? JSONSchema2TS<Items>[]
      : any
```

3. **Step 3: How It Works**:
Parses basic JSON Schema objects into TypeScript types.

### Key Takeaways
- Type transformations occur strictly at compile time with zero runtime penalty.
- Clean generic constraints and pattern matching ensure robust type safety across all edge cases.

## References
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
