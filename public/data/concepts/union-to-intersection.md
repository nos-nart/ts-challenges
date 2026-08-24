Transforming a union type (`A | B`) into an intersection type (`A & B`) relies on conditional type distribution and function parameter contravariance.

#### The Mechanism
Function arguments are contravariant in TypeScript. When `infer` appears in a contravariant position across multiple union candidates, TypeScript infers an intersection rather than a union.

```ts
type UnionToIntersection<U> = 
  (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

type Example = UnionToIntersection<{ a: string } | { b: number }>
// { a: string } & { b: number }
```

#### Why It Works
1. `U extends any ? (k: U) => void : never` distributes over the union `U`, producing `((k: A) => void) | ((k: B) => void)`.
2. Matching that union of functions against `(k: infer I) => void` forces TypeScript to find a type `I` that satisfies both function parameters simultaneously, which is `A & B`.
