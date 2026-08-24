#### Hint 1: Omitting nested dot-path keys
**The goal:** Remove property at path `"a.b.c"` from nested object `T`.

**The nudge:** Split path `P extends `${infer Head}.${infer Tail}``. If path matches directly, omit key; otherwise map key and recurse on matching child object.
