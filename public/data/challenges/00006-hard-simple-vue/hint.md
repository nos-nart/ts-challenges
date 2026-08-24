#### Hint 1: Typing `this` in options objects
**The goal:** Correctly bind `this` inside `computed` and `methods` to data, computed properties, and methods.

**The nudge:** Declare `SimpleVue<D, C, M>(options: { data: (this: {}) => D, computed: C & ThisType<D>, methods: M & ThisType<D & { [K in keyof C]: ReturnType<C[K]> } & M> })`.
