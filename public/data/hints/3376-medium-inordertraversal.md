#### Hint 1: In-order tree traversal
**The goal:** Return tuple of tree node values in in-order sequence (left, root, right).

**The nudge:** If `T` is non-null: `[...InorderTraversal<T['left']>, T['val'], ...InorderTraversal<T['right']>]`.
