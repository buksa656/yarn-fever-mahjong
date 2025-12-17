# Architecture Documentation - Yarn Fever: Mahjong Edition

## Overview

This document describes the technical architecture and design decisions for the Yarn Fever Mahjong game.

## Core Mechanics

### 1. Layer System (Mahjong Stack)

**Problem**: Traditional yarn matching games don't have depth. We needed layered interaction.

**Solution**: Implement a layer-based system where:
- Balls are stacked in layers (0 = bottom, increasing upward)
- Only the top layer ball can be picked and moved
- Removing a ball exposes the layer below
- This creates natural puzzle complexity

**Implementation** (`slot.js`):
```javascript
slot.updateLayers();  // Updates layer index for all yarns
yarn.layer = index;   // Tracks which layer this yarn is at
slot.getTopYarn();     // Only ball that can be moved
```

### 2. Triplet Removal System

**Problem**: Need to identify and remove completed color sets.

**Solution**: Check after every move if any target slot has 3 matching colors.

**Implementation** (`game.js`):
```javascript
checkTripletCompletions() {
    this.targetSlots.forEach(slot => {
        if (slot.isComplete()) {
            // Remove all 3 balls
            // Award points
            // Reset slot for next color
            this.resetTargetSlot(slot);
        }
    });
}
```

### 3. Target Slot Reset

**Problem**: After completing a triplet, need to know what color to accept next.

**Solution**: Dynamically assign the next available color from remaining balls.

**Implementation** (`game.js`):
```javascript
resetTargetSlot(slot) {
    // Find colors in temp/blocker slots not yet assigned
    // Assign first available color
    // This forces strategic thinking about which colors to complete
}
```

### 4. Blocker Holder

**Problem**: Players need temporary storage for balls blocking lower layers.

**Solution**: 2 dedicated holder slots (max 2 balls each).

**Benefits**:
- Temporary storage strategy
- Forces thinking about which blockers to move
- Limited space creates puzzle tension

**Implementation** (`game.js`, `renderer.js`):
```javascript
this.blockerSlots = [];  // 2 slots for blocking balls
// Integrated into render pipeline and collision detection
```

## Class Structure

### Yarn (yarn.js)
```
Yarn
├─ color: string (hex color)
├─ id: number
├─ currentSlot: Slot
├─ layer: number (0 = bottom)
├─ isDragged: boolean
├─ dragPosition: {x, y}
├─ showHint: boolean
├─ isTopOfStack(): boolean
└─ getBlockedYarns(): Yarn[]
```

### Slot (slot.js)
```
Slot
├─ id: number
├─ type: 'target' | 'temp' | 'blocker'
├─ capacity: number
├─ yarns: Yarn[]
├─ targetColor: string
├─ addYarn(yarn): boolean
├─ removeYarn(yarn): boolean
├─ canAddYarn(yarn): boolean
├─ isComplete(): boolean (target only)
├─ updateLayers(): void
├─ getTopYarn(): Yarn
└─ canPickYarn(yarn): boolean
```

### Game (game.js)
```
Game
├─ targetSlots: Slot[]
├─ tempSlots: Slot[]
├─ blockerSlots: Slot[]
├─ yarns: Yarn[]
├─ history: Move[]
├─ checkTripletCompletions(): void
├─ resetTargetSlot(slot): void
├─ checkWinCondition(): boolean
├─ moveYarn(yarn, slot): void
└─ ...
```

### Renderer (renderer.js)
```
Renderer
├─ canvas: HTMLCanvasElement
├─ ctx: CanvasRenderingContext2D
├─ drawSlots(slots, type, y): void
├─ drawYarn(yarn, isDragged): void
├─ getYarnScreenPosition(yarn): {x, y}
├─ isYarnAtPosition(yarn, pos): boolean
├─ isSlotAtPosition(slot, pos): boolean
└─ ...
```

## Data Flow

### Move Execution
```
User clicks yarn
    ↓
handleStart() - Find yarn at position
    ↓
Drag yarn with mouse
    ↓
handleEnd() - Find target slot
    ↓
CanAddYarn() validation
    ↓
moveYarn() - Update state
    ↓
checkTripletCompletions() - Check for 3-match
    ↓
if complete: resetTargetSlot() + award points
    ↓
checkWinCondition() - Check Mahjong empty
    ↓
render() - Redraw canvas
```

## Level Configuration

### levels.json Format
```json
{
  "id": 1,
  "name": "Level Name",
  "targetSlots": 4,
  "tempSlots": 3,
  "slotCapacity": 3,
  "blockerCapacity": 2,
  "yarns": [
    {
      "color": "#FF6B9D",
      "layer": 0,      // Which layer (0 = bottom)
      "position": 0    // Which temp slot
    }
  ]
}
```

### Layer Organization
- Layer 0: Bottom (exposed last)
- Layer 1+: Higher layers
- Layer N: Top (exposed first)

## Win Condition

```javascript
// Win when ALL temp slots are empty
const tempEmpty = this.tempSlots.every(slot => slot.yarns.length === 0);
```

This forces players to:
1. Complete triplets in target slots
2. Clear blockers from holder
3. Access and remove all layers from Mahjong stack

## Rendering Pipeline

### Order (back to front)
1. Clear canvas
2. Draw grid pattern
3. Draw section labels
4. Draw **target slots** + yarns
5. Draw **blocker slots** + yarns
6. Draw **temp slots** + yarns (Mahjong)
7. Draw particles
8. Draw dragged yarn (on top)

### Position Calculation
```javascript
// For stacked yarns:
const yOffset = yarnSpacing * stackIndex;
return {
    x: slotCenter.x,
    y: slotBottom.y - yOffset  // Start from bottom, go up
};
```

## Performance Considerations

1. **Canvas Rendering**: Optimized for ~20-30 balls
2. **Hit Detection**: O(n) loop through slots and yarns
3. **Layer Updates**: Only when yarn removed (minimal cost)
4. **Particle Effects**: Temporary, auto-cleared when life < 0

## Future Enhancements

### Power-ups
- Remove top layer (skip blockers)
- Swap colors temporarily
- Freeze one slot

### Difficulty
- Time limits
- More colors (10+)
- Smaller target slot capacity
- More layers per stack

### Features
- Undo history visualization
- Move counter with target
- Sound effects with volume control
- Particle customization
- Difficulty presets

## Testing Checklist

- [ ] Layer system exposes correct balls
- [ ] Only top ball can be picked
- [ ] Triplet completion works
- [ ] Target slot resets to new color
- [ ] Blocker slots work like targets
- [ ] Win condition triggers when temp empty
- [ ] Score calculation is correct
- [ ] Particles render and clear
- [ ] Mobile touch controls work
- [ ] Responsive design adapts

## Code Style

- ES6+ syntax throughout
- Class-based architecture
- Clear method names (verbs)
- Console logging for debugging
- Emoji prefixes for readability

## Browser Compatibility

- Chrome/Edge: ✅ (ES6, Canvas)
- Firefox: ✅ (ES6, Canvas)
- Safari: ✅ (ES6, Canvas)
- Mobile Browsers: ✅ (Touch events handled)
