// Yarn/Ball class with layer awareness
class Yarn {
    constructor(color, id) {
        this.color = color;
        this.id = id;
        this.currentSlot = null;
        this.isDragged = false;
        this.dragPosition = null;
        this.showHint = false;
        this.layer = 0;  // NEW: Layer information
        this.isBlocked = false;  // NEW: Tracking if ball is blocked by another
        this.particles = [];
    }

    // Get current position data
    getPosition() {
        if (this.currentSlot) {
            return this.currentSlot.getYarnPosition(this);
        }
        return { x: 0, y: 0 };
    }

    // Check if this yarn is on top of the stack (can be moved)
    isTopOfStack() {
        if (!this.currentSlot) return false;
        return this.currentSlot.getTopYarn() === this;
    }

    // NEW: Check if yarn is blocking another yarn below
    getBlockedYarns() {
        if (!this.currentSlot || this.currentSlot.type !== 'temp') {
            return [];
        }
        
        const index = this.currentSlot.yarns.indexOf(this);
        if (index === -1) return [];
        
        // All yarns below this one are blocked
        return this.currentSlot.yarns.slice(0, index);
    }

    // NEW: Highlight this yarn
    highlight() {
        this.showHint = true;
    }

    // NEW: Unhighlight
    unhighlight() {
        this.showHint = false;
    }

    // Serialize for save/load
    serialize() {
        return {
            color: this.color,
            id: this.id,
            layer: this.layer
        };
    }
}
