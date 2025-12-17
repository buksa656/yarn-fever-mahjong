// Slot/Container class with enhanced layer system
class Slot {
    constructor(id, type, capacity, targetColor = null) {
        this.id = id;
        this.type = type;  // 'target', 'temp', or 'blocker'
        this.capacity = capacity;
        this.yarns = [];
        this.targetColor = targetColor;
        this.renderPosition = null;
        this.isBlocked = false;  // NEW: For visualization
    }

    // Add yarn with layer tracking
    addYarn(yarn) {
        if (this.yarns.length >= this.capacity) {
            console.warn(`❌ Slot ${this.id} is full (capacity: ${this.capacity})`);
            return false;
        }

        // Update layer for temp/blocker slots
        if (this.type === 'temp' || this.type === 'blocker') {
            yarn.layer = this.yarns.length;  // Stack position = layer
        }

        this.yarns.push(yarn);
        yarn.currentSlot = this;

        // Set target color for target slots
        if (this.type === 'target' && !this.targetColor) {
            this.targetColor = yarn.color;
        }

        return true;
    }

    // Remove yarn
    removeYarn(yarn) {
        const index = this.yarns.indexOf(yarn);
        if (index > -1) {
            this.yarns.splice(index, 1);
            yarn.currentSlot = null;

            // Reset target color if empty
            if (this.yarns.length === 0 && this.type === 'target') {
                this.targetColor = null;
            }

            // Update layers for remaining yarns
            this.updateLayers();
            return true;
        }
        return false;
    }

    // NEW: Update layer indices for all yarns in this slot
    updateLayers() {
        if (this.type === 'temp' || this.type === 'blocker') {
            this.yarns.forEach((yarn, index) => {
                yarn.layer = index;
            });
        }
    }

    // Get top yarn (only this can be moved)
    getTopYarn() {
        return this.yarns[this.yarns.length - 1] || null;
    }

    // NEW: Check if yarn can be picked from this slot
    canPickYarn(yarn) {
        if (this.type === 'temp' || this.type === 'blocker') {
            // In temp/blocker slots, only top yarn can be picked
            return yarn === this.getTopYarn();
        }
        // In target slots, any yarn can be picked (for undo)
        return this.yarns.includes(yarn);
    }

    // Check if yarn can be added
    canAddYarn(yarn) {
        // Check capacity
        if (this.yarns.length >= this.capacity) {
            return false;
        }

        // Blocker slots accept any color
        if (this.type === 'blocker') {
            return true;
        }

        // For target slots, check color matching
        if (this.type === 'target') {
            if (this.targetColor && this.targetColor !== yarn.color) {
                return false;
            }
            return true;
        }

        // Temp slots accept any color
        return true;
    }

    // Check if slot is complete (for target slots)
    isComplete() {
        return this.type === 'target' &&
            this.yarns.length === this.capacity &&
            this.yarns.every(y => y.color === this.targetColor);
    }

    // Get position of yarn in slot
    getYarnPosition(yarn) {
        const index = this.yarns.indexOf(yarn);
        return {
            slotId: this.id,
            type: this.type,
            index: index,
            layer: yarn.layer
        };
    }

    // Clear all yarns
    clear() {
        this.yarns.forEach(yarn => yarn.currentSlot = null);
        this.yarns = [];
        if (this.type === 'target') {
            this.targetColor = null;
        }
    }

    // Get all yarns
    getAllYarns() {
        return [...this.yarns];
    }
}
