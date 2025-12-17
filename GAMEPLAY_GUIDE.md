# Gameplay Guide - Yarn Fever: Mahjong Edition

## Objective

**Clear all balls from the Mahjong stack to win!**

Do this by matching colors and removing them strategically.

## How to Play

### Step 1: Understand the Layout

```
┌─────────────────────────────┐
│    🎯 TARGET SLOTS (4)      │  ← Place balls here
├─────────────────────────────┤
│    🚫 BLOCKER HOLDER (2)    │  ← Temporary storage
├─────────────────────────────┤
│    📚 MAHJONG STACK (3)     │  ← Your main puzzle
└─────────────────────────────┘
```

### Step 2: Pick a Ball

1. Look at the Mahjong stack (bottom area)
2. Only the **top ball** of each stack can be moved
3. Click/drag the ball you want to move
4. Drag it to a target slot or the blocker holder

### Step 3: Complete Sets of 3

- When you place **3 balls of the same color** in a target slot:
  - ✅ All 3 disappear (+ points!)
  - ✅ Slot resets for a new color
  - ✅ Particles celebrate your completion!

### Step 4: Strategic Thinking

**Key Decisions**:
1. **Which color to complete first?**
   - Fast completion = unlock lower layers
   - Slow completion = more options

2. **When to use the blocker holder?**
   - Move blocking balls here temporarily
   - Frees up space in the Mahjong stack
   - Forces you to move them eventually

3. **Manage your 4 target slots**
   - Only 4 slots for (potentially) 10 colors
   - After each triplet, a new color is assigned
   - Strategic sequencing matters!

### Step 5: Win Condition

**You win when:**
- All balls removed from Mahjong stacks (temp slots)
- All target slots are empty or cleared
- Blocker holder is empty

## Game Mechanics Explained

### Mahjong Layers

Each stack has multiple layers:
```
Layer 2: 🔴 ← ONLY this can be picked
Layer 1: 🟢
Layer 0: 🟡 ← Hidden, exposed after layer 1 removed
```

### Target Slots

```
Target Slot #1
│
├─ Capacity: 3 balls max
├─ Color Locked: When filled with one color
│
└─ After 3 matching:
   ✅ Remove all 3
   ✅ Slot empties
   ✅ New random color assigned
```

### Blocker Holder

```
Blocker Slot #1    Blocker Slot #2
├─ 2 balls max      ├─ 2 balls max
├─ Any color        ├─ Any color
└─ For strategy     └─ For strategy
```

## Scoring System

| Action | Points |
|--------|--------|
| Remove triplet (3 balls) | +100 |
| Bonus for lower layers | +10 per layer |
| Perfect completion (<N moves) | +500 |
| **Final Score** | **Base × Multiplier** |

**Formula:**
```
Base = 1000 - (moves × 5) + (level × 100)
Perfect Bonus = +500 (if moves <= level × 3)
Final = Base + Level Bonus + Bonuses
```

## Controls

### Desktop
- **Click & Drag**: Pick up and move a ball
- **Release**: Drop on target

### Mobile/Touch
- **Touch & Drag**: Same as desktop
- **Release**: Drop on target

### Buttons
- **💡 Hint**: Highlights a valid move
- **⏮️ Undo**: Reverse last move
- **🔄 Reset**: Start level over
- **➡️ Next**: Go to next level (after completion)

## Tips & Strategies

### General Tips
1. **Think ahead** - Don't just make random moves
2. **Use hint** - When stuck, get a suggestion
3. **Plan triplets** - Which color to complete first?
4. **Manage space** - 4 slots for 10 colors is tight!
5. **Move blockers early** - Free up lower layers sooner

### Advanced Tactics

#### 1. "Blocker Swap"
- Move blocking balls to holder
- Access layer below
- Move balls from lower layer
- Move blockers back if needed

#### 2. "Color Stacking"
- Complete easier colors first
- Unlock more layers
- Harder colors become easier to access

#### 3. "Slot Management"
- Plan which color uses which slot
- Try to avoid "color conflicts"
- Know when to reset slot strategy

#### 4. "Layer Priority"
- Identify blocking chains
- Remove blockers in optimal order
- Access valuable deep colors

## Difficulty Progression

### Level 1: "Getting Started"
- ✅ Few colors (3)
- ✅ Short stacks (2-3 layers)
- ✅ Practice basic mechanics

### Level 2: "Color Mix"
- ⚡ More colors (4)
- ⚡ Medium stacks (3-4 layers)
- ⚡ More strategic decisions

### Level 3: "Rainbow Challenge"
- 🔥 Many colors (5+)
- 🔥 Deep stacks (4+ layers)
- 🔥 Complex puzzle solving

## What NOT to Do

❌ **Don't:**
- Try to move a blocked ball (won't work)
- Fill targets with mixed colors (wastes space)
- Ignore the blocker holder (it helps!)
- Give up too early (there's always a solution)

## FAQ

**Q: Why can't I pick up this ball?**
A: It's not on top of its stack. Remove the ball above it first.

**Q: My target slot is full but not matching. What do I do?**
A: Use undo to go back, or move one ball to blocker holder.

**Q: Is there a time limit?**
A: No! Take your time and think strategically.

**Q: Can I move balls from target back to temp?**
A: Only if you undo. Otherwise, balls stay where placed.

**Q: What happens if I can't move?**
A: Use Hint to get a suggestion, or Reset to try again.

## Best Practices

1. **Pause and think** before moving
2. **Look for chains** - Removing one unlocks multiple
3. **Balance colors** - Don't get stuck with one hard color
4. **Use blocker holder** - It's part of the puzzle
5. **Take your time** - No rush!

---

**Good luck, and happy puzzling! 🎨✨**
