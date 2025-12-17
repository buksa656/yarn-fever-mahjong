# 🎨 Yarn Fever: Mahjong Edition

An interactive puzzle game combining **Yarn Fever mechanics** with **Mahjong-style tile matching**. Clear the Mahjong stack and master the art of strategic color matching!

## 🎮 Game Mechanics

### Core Features

#### 1. **Mahjong Stack (Temp Slots)**
- Balls arranged in **layers** - only revealed (top) balls can be moved
- Clearing a ball exposes the next layer
- **Win condition**: Clear all balls from the Mahjong stack
- Visual hierarchy shows which balls are playable

#### 2. **Target Containers**
- **4 Target slots** available
- Support **up to 10 different colors** on the map
- When you place 3 balls of the **same color** in a target slot:
  - All 3 balls are **removed from play** (+points)
  - Target slot is **reset and emptied**
  - Becomes ready to accept balls of **any available color**

#### 3. **Blocker Holder**
- **2 temporary containers** (max 2 balls each)
- For balls that **block access** to lower layers
- Swap blocked balls here temporarily
- Strategy: Clear the holder to access deeper Mahjong layers

#### 4. **Resource Management**
- **Limited target space**: 4 containers vs 10 possible colors
- Forces strategic decisions:
  - Which colors to prioritize?
  - When to complete triplets?
  - How to optimize space usage?

### Game Flow

```
1. Start with Mahjong stack (temp slots) fully loaded
2. Only top (exposed) balls can be grabbed
3. Move balls to target slots or holder
4. Complete sets of 3 same-color balls
5. Remove completed sets → reset target slot
6. Access lower layers by clearing blockers
7. Clear entire Mahjong stack = VICTORY!
```

## 🏆 Win Condition

**Clear all balls from the Mahjong stack** (all temp slots empty)

## 🎯 Scoring System

- **Base points**: Remove each completed color set
- **Layer bonus**: Extra points for accessing deeper layers
- **Efficiency bonus**: Fewer wasted moves = higher score
- **Combo multiplier**: Chain completions for bonus rewards

## 🎨 Color Palette

Up to 10 unique colors:
- Pink `#FF6B9D`
- Teal `#4ECDC4`
- Yellow `#FFD93D`
- Mint `#A8E6CF`
- Coral `#FF8B94`
- Lavender `#B4A7D6`
- Light Pink `#FFD1DC`
- Seafoam `#98D8C8`
- Gold `#F7DC6F`
- Purple `#BB8FCE`

## 🛠️ Technical Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Rendering**: HTML5 Canvas
- **Architecture**: Modular class-based design
- **State Management**: Game class orchestration

## 📁 Project Structure

```
.
├── index.html           # Main HTML entry point
├── style.css            # Styling and layout
├── game.js              # Core game logic & state
├── renderer.js          # Canvas rendering engine
├── slot.js              # Slot/Container class
├── yarn.js              # Ball/Yarn class
├── level.js             # Level management
├── levels.json          # Level configurations
├── main.js              # Game initialization
├── utils.js             # Utility functions
└── README.md            # This file
```

## 🚀 Quick Start

1. **Open in browser**: Simply open `index.html`
2. **No dependencies**: Pure vanilla JavaScript
3. **No build process**: Ready to play immediately

## 🎮 Controls

- **Mouse/Touch**: Drag balls to move them
- **Drop**: Release on target slot or holder
- **Buttons**: Undo, Reset, Hint, Next Level

## 🔧 Architecture Changes

### Key Components Redesigned

#### Slot System
- **Mahjong Stack**: Layers system with "top" logic
- **Target Containers**: Limited (4 max), support triplet removal
- **Blocker Holder**: Temporary storage (2×2 capacity)

#### Game Logic
- **Layer Detection**: Only top balls are movable
- **Triplet Completion**: Auto-removal when 3 same colors collected
- **Target Reset**: Smart reassignment of available colors
- **Blocker Management**: Strategic ball placement for layer access

#### Rendering
- **Layer Visualization**: Stack perspective for Mahjong clarity
- **Blocker Highlighting**: Visual feedback for blocked layers
- **Triplet Animation**: Satisfying removal effects
- **Target Status**: Real-time slot availability display

## 📚 Level Design

Levels increase in complexity:
- **Level 1**: Introduction to mechanics
- **Level 2**: Multiple colors and strategic choices
- **Level 3+**: Dense stacks requiring careful planning

Configure in `levels.json`:
```json
{
  "id": 1,
  "name": "Level Name",
  "targetSlots": 4,
  "tempSlots": 3,
  "slotCapacity": 3,
  "yarns": [
    { "color": "#FF6B9D", "layer": 0, "row": 0, "col": 0 }
  ]
}
```

## 🐛 Development Notes

### Next Features
- [ ] Undo system enhancements for layer management
- [ ] Power-ups: Remove ball layer, swap colors
- [ ] Difficulty settings (time limit, color variants)
- [ ] Leaderboard system
- [ ] Mobile-optimized touch controls

### Known Optimizations
- Render optimization for large ball counts
- Layer calculation caching
- Hit detection using quadtree (future)

## 📝 License

MIT License - Feel free to use and modify!

## 🎉 Credits

Inspired by:
- **Yarn Fever** - Mobile puzzle classic
- **Mahjong** - Ancient tile-matching game
- **Match-3** - Puzzle game genre

---

**Happy Puzzling! 🧶✨**
