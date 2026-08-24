#### Hint 1: Constructor props typing
**The goal:** Infer prop types from constructor functions (e.g. `String`, `Number`, `[String, Boolean]`, or `{ type: String }`).

**The nudge:** Use `infer` on constructor instances: `T extends StringConstructor ? string : T extends NumberConstructor ? number : ...`.
