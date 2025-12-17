# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-12-17

### 🌟 Initial Release

#### Added
- Core Mahjong layer system
  - Balls stacked in layers
  - Only top ball can be moved
  - Layer indices automatically update
- Triplet removal mechanics
  - Auto-detect 3 matching colors
  - Instant removal with celebration particles
  - Points awarded per triplet
- Target slot management
  - 4 target containers
  - Supports up to 10 colors
  - Dynamic color assignment
- Blocker holder
  - 2 dedicated temporary slots
  - Max 2 balls each
  - Strategic storage option
- Game mechanics
  - Move system with validation
  - Undo functionality
  - Hint system
  - Reset level option
  - Win condition (clear Mahjong)
- UI/UX
  - Canvas-based rendering
  - Drag and drop controls
  - Touch support
  - Responsive design
  - Modal dialogs
  - Stats display
- Level system
  - 3 levels included
  - JSON-based configuration
  - Customizable layouts
  - Progressive difficulty
- Particle system
  - Celebration effects
  - Physics-based animation
  - Auto-cleanup
- Documentation
  - README with overview
  - Gameplay guide
  - Architecture documentation
  - Development guide
  - Features list
  - Quick start guide

#### Technical
- Vanilla JavaScript (ES6+)
- HTML5 Canvas rendering
- No external dependencies
- Pure client-side (no backend)
- ~400 lines of game code
- ~300 lines of rendering code
- ~150 lines of utilities

#### Supported Platforms
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Future Versions

#### Planned for v1.1
- [ ] Sound effects and music
- [ ] LocalStorage for progress saving
- [ ] Animation speed settings
- [ ] Color theme options
- [ ] Statistics tracking

#### Planned for v1.2
- [ ] Power-ups system
- [ ] Time-limited challenges
- [ ] Daily challenges
- [ ] Difficulty presets
- [ ] Leaderboard (local)

#### Planned for v2.0
- [ ] Level editor
- [ ] Multiplayer (competitive)
- [ ] Achievements/badges
- [ ] Advanced statistics
- [ ] Cloud save (optional)
- [ ] Progressive Web App
- [ ] Mobile app versions

---

**Project Status**: 🌟 MVP Complete & Fully Functional
**Last Updated**: December 17, 2025
