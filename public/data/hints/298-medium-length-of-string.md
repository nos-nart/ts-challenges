#### Hint 1: Character tuple accumulator
**The goal:** Return the numeric length of a string literal.

**The nudge:** Recursively split characters and push into a tuple accumulator:
`type LengthOfString<S extends string, Acc extends string[] = []> = S extends `${infer Head}${infer Tail}` ? LengthOfString<Tail, [...Acc, Head]> : Acc['length']`.
