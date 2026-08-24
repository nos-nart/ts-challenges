TypeScript does not have built-in arithmetic operators for type-level numbers. Instead, arithmetic is simulated by building tuples of specific lengths and reading their `['length']` property.

#### Building Tuples
```ts
type BuildTuple<L extends number, T extends unknown[] = []> = 
  T['length'] extends L ? T : BuildTuple<L, [...T, unknown]>

type FiveElements = BuildTuple<5> // [unknown, unknown, unknown, unknown, unknown]
```

#### Addition
Concatenate two tuples and measure the resulting length:
```ts
type Add<A extends number, B extends number> = 
  [...BuildTuple<A>, ...BuildTuple<B>]['length']

type Seven = Add<3, 4> // 7
```

#### Subtraction
Match the smaller tuple prefix out of the larger tuple:
```ts
type Subtract<A extends number, B extends number> = 
  BuildTuple<A> extends [...BuildTuple<B>, ...infer Rest] ? Rest['length'] : never

type Two = Subtract<5, 3> // 2
```
