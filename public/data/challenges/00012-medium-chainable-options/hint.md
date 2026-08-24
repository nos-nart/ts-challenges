#### Hint 1: Accumulating state in generic defaults
**The goal:** Chain configuration calls where each `option(key, value)` adds a property and returns the updated chainable instance.

**The nudge:** Add a default generic parameter `Options = {}` to the `Chainable` interface to track accumulated options.

#### Hint 2: Preventing duplicate keys and updating types
**The pitfall:** Merging with simple intersection `Options & Record<K, V>` can produce `never` if a key is re-added with a different type.

**The nudge:** Constrain key `key: K extends keyof Options ? never : K`, and return `Chainable<Omit<Options, K> & Record<K, V>>`.
