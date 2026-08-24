#### Hint 1: Parsing query parameters into object
**The goal:** Parse query string (e.g. `"k1=v1&k1=v2&k2"`) into an object with array values for duplicate keys and `true` for valueless keys.

**The nudge:** Split string by `&`. For each key-value pair, merge into output object, converting value to tuple if key already exists.
