#### Hint 1: Recursive Tower of Hanoi moves
**The goal:** Generate move pairs `[From, To]` to solve Tower of Hanoi for `N` disks.

**The nudge:** Classic recursion: move `N-1` disks from `From` to `Helper`, move disk `N` from `From` to `To`, move `N-1` disks from `Helper` to `To`.
