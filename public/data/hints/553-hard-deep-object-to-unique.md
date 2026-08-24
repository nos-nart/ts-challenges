#### Hint 1: Unique symbol branding across nested paths
**The goal:** Attach unique brand symbols to every nested object based on its location path.

**The nudge:** Intersect each nested object with `{ readonly [SymbolKey]?: PathTuple }`.
