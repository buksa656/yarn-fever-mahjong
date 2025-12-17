# Quick Start Guide

## ⏱️ TL;DR (30 seconds)

```bash
1. Clone/Download repo
2. Open index.html in browser
3. Play!
```

No build process. No dependencies. Just HTML, CSS, JavaScript.

## 🚀 Installation

### Option A: Download ZIP
1. Go to https://github.com/buksa656/yarn-fever-mahjong
2. Click "Code" → "Download ZIP"
3. Extract folder
4. Open `index.html` in browser

### Option B: Clone with Git
```bash
git clone https://github.com/buksa656/yarn-fever-mahjong.git
cd yarn-fever-mahjong
open index.html  # macOS
xdg-open index.html  # Linux
start index.html  # Windows
```

### Option C: Live Server (Recommended)
If you have VS Code:
```bash
# Install Live Server extension
# Right-click index.html → "Open with Live Server"
```

## 🎮 Getting Started

### First Game
1. **Open** `index.html` in your browser
2. **See** the game canvas with balls in Mahjong stacks
3. **Click** a top ball to select it
4. **Drag** it to a target slot or blocker holder
5. **Release** to place it
6. **Complete** sets of 3 same-color balls
7. **Clear** all balls from Mahjong stacks to win!

### Understanding the Layout

```
TOP ROW:     🎯 TARGET SLOTS
             → Place 3 balls same color here
             → Balls disappear + get points

MIDDLE ROW:  🛑 BLOCKER HOLDER
             → Temporary storage
             → For blocked balls
             → Max 2 balls each

BOTTOM ROW:  📚 MAHJONG STACK
             → Your main puzzle
             → Layered like Mahjong
             → Only top ball can move
```

## 🗣️ Button Explanations

| Button | What It Does |
|--------|-------------|
| 💡 **Hint** | Shows you a valid move |
| ↩️ **Undo** | Takes back last move |
| 🔄 **Reset** | Restarts current level |
| ➡️ **Next** | Goes to next level (after win) |

## 🏆 Winning Strategy

### Level 1 (Easy)
- Only 3 colors
- Simple stacks
- Just learn mechanics

### Level 2 (Medium)
- 4 colors
- Taller stacks
- Some strategy needed

### Level 3 (Hard)
- 5+ colors
- Complex stacks
- Real puzzle solving

## 🚺a Troubleshooting

### Game won't load
- Try different browser (Chrome, Firefox, Safari)
- Try incognito/private mode
- Clear browser cache

### Can't pick up a ball
- It's not on top of its stack
- Remove the ball above it first
- Layer system requires top-first removal

### Stuck on level
- Use the Hint button
- Try Reset to restart
- Read GAMEPLAY_GUIDE.md for strategy

### Game runs slow
- Close other browser tabs
- Refresh page
- Try different browser

## 📁 Files Overview

```
project/
├── index.html          ← Main page (open this!)
├── style.css            ← Styling
├── game.js              ← Game logic
├── renderer.js          ← Graphics
├── yarn.js              ← Ball class
├─╀ slot.js              ← Container class
├── level.js             ← Level loading
├── main.js              ← Game start
├── utils.js             ← Utilities
├── levels.json          ← Level data
└── README.md            ← This file
```

Only need to open: **index.html** ✓

## 👅 Next Steps

1. **Play** Level 1 to learn mechanics
2. **Read** GAMEPLAY_GUIDE.md for tips
3. **Challenge** yourself on Level 3
4. **Customize** levels.json to create your own levels

## 🕐 Performance Tips

- Works best on modern browsers (2020+)
- Desktop: 60fps smooth
- Laptop: 60fps smooth
- Mobile: Good performance
- Very old devices: May stutter (unavoidable)

## ❓ Common Questions

**Q: Can I play offline?**
A: Yes! It's pure JavaScript. No server needed.

**Q: Can I modify levels?**
A: Yes! Edit `levels.json`. It's JSON format.

**Q: Can I add more levels?**
A: Yes! Add objects to `levels.json` array.

**Q: Is there multiplayer?**
A: Not yet. Single player only.

**Q: Can I save my progress?**
A: Not in current version. Would need localStorage.

**Q: Are there sound effects?**
A: Code structure ready for audio. Currently logs to console.

## 👋 Get Help

- **Read**: GAMEPLAY_GUIDE.md - Detailed gameplay tips
- **Read**: ARCHITECTURE.md - How the game works
- **Read**: FEATURES.md - What's implemented
- **Check**: Browser console (F12) for debug messages
- **Open**: GitHub Issues if something's broken

## 🎉 Have Fun!

Enjoy the game! It combines the puzzle mechanics of Yarn Fever with the layered strategy of Mahjong.

**Happy Puzzling! 🧶✨**

---

**Game created by**: buksa656 🪒
**Last updated**: December 17, 2025
