#### Hint 1: Finding all substring occurrences
**The goal:** Return array of start indices for all occurrences of substring `P` in string `T`.

**The nudge:** Use string pattern matching and an index counter tuple. Match head character, test if string starts with `P`, and shift forward by 1 character each step.
