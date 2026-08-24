Converting a union (`'a' | 'b'`) into a tuple (`['a', 'b']`) requires extracting union members one by one in sequence.

#### How It Works
1. Convert the union to an intersection of overloaded function signatures: `((a: A) => void) & ((b: B) => void)`.
2. Infer the return or parameter of the overloaded function. TypeScript picks the last overload, isolating a single member of the union.
3. Exclude that member from the union and recurse until the union is `never`.

```ts
type UnionToIntersection<U> = 
  (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

type LastInUnion<U> = 
  UnionToIntersection<U extends any ? (x: U) => void : never> extends (x: infer Last) => void ? Last : never

type UnionToTuple<U, Last = LastInUnion<U>> = 
  [U] extends [never] ? [] : [...UnionToTuple<Exclude<U, Last>>, Last]

type Result = UnionToTuple<'a' | 'b' | 'c'> // ['a', 'b', 'c']
```
