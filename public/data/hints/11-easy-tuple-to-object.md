#### Hint 1: From Tuple to Union
**The Goal:** Convert the values of the array/tuple into a union of types.

**The Nudge:** If you have an array `['a', 'b']`, how do you get the union `'a' | 'b'`? Think about "indexed access" using a special number index that represents *any* element in the array.

#### Hint 2: The Loop (Mapped Types)
**The Goal:** Use the union values as keys for your new object.

**The Nudge:** Now that you have a union of strings (from Hint 1), how do you iterate over them to create object keys? Use the `[P in Union]` syntax.

#### Hint 3: The Value
**The Goal:** Set the value of each key to be the same as the key itself.

**The Nudge:** In this challenge, the key and the value are identical. If `P` is your current key in the loop, what should the value type be?
