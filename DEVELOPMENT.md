# Development Guide

## 🛠️ Setting Up Dev Environment

### Requirements
- A text editor (VS Code, Sublime, etc.)
- A modern browser
- Git (optional)

### No Build Tools Needed!
This project uses vanilla JavaScript - no npm, webpack, or build process.

## 📄 Project Structure

```
root/
├── index.html           # DOM structure
├── style.css            # Styling & layout
├── levels.json          # Level definitions
├─══ src/                 # Game code
│  ├── yarn.js            # Ball class
│  ├── slot.js            # Container class
│  ├── level.js           # Level manager
│  ├── game.js            # Game engine
│  ├── renderer.js        # Graphics engine
│  ├── main.js            # Initialization
│  ├── utils.js           # Utilities
│  └── utils.js           # Helpers
└── docs/
   ├── README.md
   ├── GAMEPLAY_GUIDE.md
   ├── ARCHITECTURE.md
   └── DEVELOPMENT.md
```

## 🚀 Running Locally

### VS Code + Live Server
```bash
# Install Live Server extension
# Right-click index.html
# Select "Open with Live Server"
# Automatically opens at http://localhost:5500
```

### Python
```bash
# Python 3
python -m http.server 8000

# Then open http://localhost:8000
```

### Node.js
```bash
npm install -g http-server
http-server

# Opens http://localhost:8080
```

## 🔕 How to Debug

### Browser DevTools (F12)
```javascript
// All debug logs are prefixed with emoji:
// 🎮 = Game event
// 🎨 = Yarn event
// 🞯 = Slot event
// ✅ = Success
// ❌ = Error
// 💡 = Info
```

### Common Debug Points
```javascript
// In game.js
console.log(`📓 Loading level ${levelNum}...`);
console.log(`✅ Level ${levelNum} data loaded:`, levelData);
console.log(`🏹 Slot reset to: ${slot.targetColor}`);

// In main.js
console.log('🎮 Initializing Yarn Fever: Mahjong Edition...');
```

### Check Game State
```javascript
// In browser console:
game.currentLevel              // Current level
game.moves                     // Number of moves
game.score                     // Current score
game.yarns                     // All balls
game.targetSlots              // Target containers
game.tempSlots                // Mahjong stacks
game.blockerSlots             // Blocker holder
```

## ✍️ Making Changes

### Adding a New Level

1. **Edit `levels.json`**:
```json
{
  "id": 4,
  "name": "Ultra Challenge",
  "targetSlots": 4,
  "tempSlots": 5,
  "slotCapacity": 3,
  "blockerCapacity": 2,
  "yarns": [
    { "color": "#FF6B9D", "layer": 0, "position": 0 }
  ]
}
```

2. **Refresh browser** - New level automatically loads

### Changing Level Difficulty

```json
// EASIER:
{
  "targetSlots": 4,        // More target slots = easier
  "tempSlots": 2,          // Fewer temp slots = fewer colors
  "slotCapacity": 3,       // More space per slot
  "blockerCapacity": 3     // More blocker space
}

// HARDER:
{
  "targetSlots": 3,        // Fewer targets = harder
  "tempSlots": 4,          // More temp slots = more colors
  "slotCapacity": 2,       // Less space per slot
  "blockerCapacity": 1     // Less blocker space
}
```

### Modifying Colors

**In `utils.js`**:
```javascript
const YARN_COLORS = [
    '#FF6B9D',  // Your custom hex colors
    '#4ECDC4',
    // Add more colors here
];
```

**In `levels.json`**:
```json
{
  "color": "#YOUR_HEX_COLOR",
  "layer": 0
}
```

### Customizing Styling

**In `style.css`**:
```css
:root {
    --primary-color: #FF6B9D;      /* Main color */
    --secondary-color: #667eea;    /* Secondary */
    --success-color: #66BB6A;      /* Win color */
    /* Customize these */
}
```

## 🪧 Code Organization

### Class Hierarchy
```
Yarn
  - color
  - layer
  - isDragged
  - isTopOfStack()

Slot
  - type (target/temp/blocker)
  - yarns[]
  - canAddYarn()
  - canPickYarn()
  - addYarn() / removeYarn()

Game
  - targetSlots[]
  - tempSlots[]
  - blockerSlots[]
  - moveYarn()
  - checkTripletCompletions()
  - checkWinCondition()

Renderer
  - drawSlots()
  - drawYarn()
  - getMousePos()
```

## 🕌 Coding Conventions

### Naming
```javascript
// Classes: PascalCase
class GameManager { }

// Functions: camelCase
function moveYarn() { }

// Variables: camelCase
let currentSlot = null;

// Constants: UPPER_SNAKE_CASE
const MAX_TARGETS = 4;

// Booleans: is/can/has prefix
let isComplete = false;
let canMove = true;
let hasError = false;
```

### Comments
```javascript
// NEW: for significant additions
// FIXED: for bug fixes
// TODO: for planned features
// DEPRECATED: for old code to remove
// IMPORTANT: for critical logic

// NEW: Layer system for Mahjong mechanic
this.layer = 0;
```

### Emoji Logging
```javascript
console.log('📓 Info');      // Information
console.log('✅ Success');      // Success
console.log('❌ Error');       // Error
console.log('💡 Debug');     // Debug info
console.log('🔊 Sound');     // Sound related
console.log('🎮 Game');      // Game events
console.log('🎨 Yarn');      // Yarn events
console.log('🞯 Slot');      // Slot events
console.log('🔄 Reset');     // Reset
```

## 👘 Code Review Checklist

Before committing:
- [ ] No console errors
- [ ] Console logs use appropriate emoji
- [ ] Variable names are descriptive
- [ ] Functions have single responsibility
- [ ] Comments explain 'why', not 'what'
- [ ] No commented-out code (unless TODO)
- [ ] No console.log spam
- [ ] Performance is acceptable
- [ ] Mobile touch works
- [ ] All levels playable

## 📄 Git Workflow

```bash
# Create branch for feature
git checkout -b feature/new-feature-name

# Make changes
# Test locally

# Commit with clear message
git commit -m "feat: Add new feature description"

# Push to GitHub
git push origin feature/new-feature-name

# Create Pull Request on GitHub
```

### Commit Message Format
```
feat: Add new feature
fix: Fix bug description
refactor: Reorganize code
docs: Update documentation
style: Format changes only
test: Add tests
```

## 🔃 Testing Locally

### Test Checklist
- [ ] Level loads correctly
- [ ] Can pick top ball
- [ ] Can't pick blocked ball
- [ ] Can drag to any slot
- [ ] Triplet detection works
- [ ] Points awarded correctly
- [ ] Target resets after triplet
- [ ] Win condition triggers
- [ ] Hint button works
- [ ] Undo button works
- [ ] Reset button works
- [ ] Next button appears after win
- [ ] Score updates correctly
- [ ] Particles display
- [ ] Mobile touch works
- [ ] Responsive on all sizes

## 🛨️ Performance Optimization

### Bottleneck Areas
1. **Rendering** - Most expensive operation
2. **Hit detection** - O(n) per frame
3. **Particle updates** - Can be many particles

### Optimization Tips
```javascript
// Cache calculations
const slotPos = slot.renderPosition;  // Reuse

// Filter early
const validMoves = slots.filter(s => s.canAddYarn(yarn));

// Use early return
if (!yarn) return false;
if (!slot) return false;

// Clean up timers
setTimeout(() => {
    clearTimeout(timer);  // Always clean up
}, delay);
```

## 📅 Release Checklist

Before releasing new version:
- [ ] All levels tested
- [ ] No console errors
- [ ] Documentation updated
- [ ] README reflects changes
- [ ] Version number updated (if using versions)
- [ ] Commit with release message
- [ ] Tag release in GitHub

## 🪩 Troubleshooting Development

### Game won't load
```javascript
// Check browser console (F12)
// Look for:
// - CORS errors
// - Syntax errors
// - Missing files
```

### Levels not loading
```javascript
// Check:
// - levels.json is in root
// - JSON is valid (use jsonlint.com)
// - ID numbers are unique
```

### Performance issues
```javascript
// Check:
// - How many particles?
// - How many balls?
// - Are there infinite loops?
// - Open DevTools Performance tab
```

---

**Happy coding! 🋄✨**
