// Level management system
class LevelManager {
    constructor() {
        this.levels = [];
        this.currentIndex = 0;
        this.loadLevels();
    }

    async loadLevels() {
        try {
            const response = await fetch('levels.json');
            const data = await response.json();
            this.levels = data.levels;
            console.log(`✅ Loaded ${this.levels.length} levels`);
        } catch (error) {
            console.error('❌ Failed to load levels:', error);
            this.createDefaultLevels();
        }
    }

    async getLevel(levelNum) {
        if (!this.levels || this.levels.length === 0) {
            await this.loadLevels();
        }

        const level = this.levels.find(l => l.id === levelNum);
        return level || null;
    }

    getLevelCount() {
        return this.levels.length;
    }

    createDefaultLevels() {
        this.levels = [
            {
                id: 1,
                name: 'Getting Started',
                targetSlots: 4,
                tempSlots: 3,
                slotCapacity: 3,
                blockerCapacity: 2,
                yarns: [
                    { color: '#FF6B9D', layer: 0, position: 0 },
                    { color: '#FF6B9D', layer: 0, position: 1 },
                    { color: '#FF6B9D', layer: 1, position: 0 },
                    { color: '#4ECDC4', layer: 0, position: 2 },
                    { color: '#4ECDC4', layer: 1, position: 1 },
                    { color: '#4ECDC4', layer: 2, position: 0 },
                    { color: '#FFD93D', layer: 1, position: 2 },
                    { color: '#FFD93D', layer: 2, position: 1 },
                    { color: '#FFD93D', layer: 2, position: 2 }
                ]
            },
            {
                id: 2,
                name: 'Color Mix',
                targetSlots: 4,
                tempSlots: 3,
                slotCapacity: 3,
                blockerCapacity: 2,
                yarns: [
                    { color: '#FF6B9D', layer: 0, position: 0 },
                    { color: '#4ECDC4', layer: 0, position: 1 },
                    { color: '#FFD93D', layer: 0, position: 2 },
                    { color: '#A8E6CF', layer: 1, position: 0 },
                    { color: '#FF6B9D', layer: 1, position: 1 },
                    { color: '#4ECDC4', layer: 1, position: 2 },
                    { color: '#FFD93D', layer: 2, position: 0 },
                    { color: '#A8E6CF', layer: 2, position: 1 },
                    { color: '#FF6B9D', layer: 2, position: 2 },
                    { color: '#4ECDC4', layer: 2, position: 0 },
                    { color: '#FFD93D', layer: 2, position: 1 },
                    { color: '#A8E6CF', layer: 2, position: 2 }
                ]
            },
            {
                id: 3,
                name: 'Rainbow Challenge',
                targetSlots: 4,
                tempSlots: 4,
                slotCapacity: 3,
                blockerCapacity: 2,
                yarns: [
                    { color: '#FF6B9D', layer: 0, position: 0 },
                    { color: '#FF6B9D', layer: 0, position: 1 },
                    { color: '#FF6B9D', layer: 1, position: 0 },
                    { color: '#4ECDC4', layer: 0, position: 2 },
                    { color: '#4ECDC4', layer: 1, position: 1 },
                    { color: '#4ECDC4', layer: 1, position: 2 },
                    { color: '#FFD93D', layer: 0, position: 3 },
                    { color: '#FFD93D', layer: 1, position: 3 },
                    { color: '#FFD93D', layer: 2, position: 0 },
                    { color: '#A8E6CF', layer: 2, position: 1 },
                    { color: '#A8E6CF', layer: 2, position: 2 },
                    { color: '#A8E6CF', layer: 2, position: 3 },
                    { color: '#FF8B94', layer: 2, position: 0 },
                    { color: '#FF8B94', layer: 2, position: 1 },
                    { color: '#FF8B94', layer: 2, position: 2 }
                ]
            }
        ];
    }
}
