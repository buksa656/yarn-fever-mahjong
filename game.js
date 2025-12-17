// Main game logic with Mahjong mechanics and triplet system
class Game {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        if (!this.canvas) {
            console.error('❌ Canvas not found!');
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size if not set
        if (!this.canvas.width || this.canvas.width === 0) {
            this.canvas.width = 800;
            this.canvas.height = 600;
        }
        
        console.log(`✅ Canvas: ${this.canvas.width}x${this.canvas.height}`);
        
        this.renderer = new Renderer(this.canvas, this.ctx);
        this.levelManager = new LevelManager();
        this.currentLevel = 1;
        this.moves = 0;
        this.score = 0;
        this.totalScore = 0;
        this.completedLevels = 0;
        this.yarns = [];
        this.targetSlots = [];
        this.tempSlots = [];
        this.blockerSlots = [];  // NEW: Blocker holder
        this.selectedYarn = null;
        this.draggedYarn = null;
        this.history = [];
        this.particles = [];
        this.gameLoopId = null;
        this.setupEventListeners();
        this.loadSettings();
        
        console.log('✅ Game initialized');
    }

    start() {
        console.log('🎮 Starting game...');
        this.loadLevel(this.currentLevel);
    }

    async loadLevel(levelNum) {
        console.log(`📍 Loading level ${levelNum}...`);
        const levelData = await this.levelManager.getLevel(levelNum);
        if (!levelData) {
            console.log('🎉 All levels completed!');
            if (typeof showGameOver === 'function') {
                showGameOver(this.totalScore + this.score);
            }
            return;
        }

        console.log(`✅ Level ${levelNum} data loaded:`, levelData);
        this.currentLevel = levelNum;
        this.moves = 0;
        this.score = 0;
        this.history = [];
        this.particles = [];

        // Create target slots (max 4)
        this.targetSlots = [];
        const targetCount = Math.min(levelData.targetSlots || 4, 4);
        for (let i = 0; i < targetCount; i++) {
            this.targetSlots.push(new Slot(i, 'target', levelData.slotCapacity || 3, null));
        }

        // Create blocker holder (2 slots, max 2 balls each)
        this.blockerSlots = [];
        for (let i = 0; i < 2; i++) {
            this.blockerSlots.push(new Slot(i, 'blocker', levelData.blockerCapacity || 2, null));
        }

        // Create temp slots (Mahjong stack)
        this.tempSlots = [];
        const tempCount = levelData.tempSlots || 3;
        for (let i = 0; i < tempCount; i++) {
            this.tempSlots.push(new Slot(i, 'temp', 6, null));  // Temp can hold 6 (for stacking)
        }

        console.log(`Created ${this.targetSlots.length} target, ${this.tempSlots.length} temp, ${this.blockerSlots.length} blocker slots`);

        // Create yarns and place them based on layer data
        this.yarns = [];
        console.log(`🎨 Creating ${levelData.yarns.length} yarns...`);

        // Organize yarns by temp slot
        const yarnsBySlot = {};
        levelData.yarns.forEach((yarnData, index) => {
            // Find which temp slot this yarn belongs to (based on position)
            const slotIndex = yarnData.position || (index % tempCount);
            if (!yarnsBySlot[slotIndex]) {
                yarnsBySlot[slotIndex] = [];
            }
            yarnsBySlot[slotIndex].push({ color: yarnData.color, layer: yarnData.layer || 0, index });
        });

        // Sort by layer (ascending) and add to slots
        Object.keys(yarnsBySlot).forEach(slotIdx => {
            const slot = this.tempSlots[slotIdx];
            if (!slot) return;
            
            const yarnsForSlot = yarnsBySlot[slotIdx].sort((a, b) => a.layer - b.layer);
            
            yarnsForSlot.forEach(yarnData => {
                const yarn = new Yarn(yarnData.color, yarnData.index);
                slot.addYarn(yarn);
                this.yarns.push(yarn);
            });
        });

        // Assign initial target colors (rotate through unique colors)
        const uniqueColors = [...new Set(levelData.yarns.map(y => y.color))];
        this.targetSlots.forEach((slot, i) => {
            if (i < uniqueColors.length) {
                slot.targetColor = uniqueColors[i];
            }
        });

        console.log(`✅ Created ${this.yarns.length} yarns in Mahjong stacks`);
        this.updateUI();
        this.startGameLoop();
    }

    startGameLoop() {
        console.log('🎮 Starting game loop...');
        if (this.gameLoopId) cancelAnimationFrame(this.gameLoopId);
        
        const loop = () => {
            this.particles = this.particles.filter(p => p.life > 0);
            this.particles.forEach(p => p.update());
            
            this.renderer.render(
                this.yarns,
                this.targetSlots,
                this.tempSlots,
                this.blockerSlots,
                this.draggedYarn,
                this.particles
            );
            
            this.gameLoopId = requestAnimationFrame(loop);
        };
        
        this.gameLoopId = requestAnimationFrame(loop);
    }

    setupEventListeners() {
        if (!this.canvas) return;
        
        // Mouse events
        this.canvas.addEventListener('mousedown', (e) => this.handleStart(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.handleEnd(e));
        this.canvas.addEventListener('mouseleave', (e) => this.handleEnd(e));

        // Touch events
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.handleStart(e.touches[0]);
        });
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.handleMove(e.touches[0]);
        });
        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.handleEnd(e.changedTouches[0]);
        });
    }

    handleStart(e) {
        const pos = this.renderer.getMousePos(e);
        const clickedYarn = this.findYarnAt(pos);
        
        if (clickedYarn && clickedYarn.isTopOfStack()) {
            console.log('🎯 Picked yarn:', clickedYarn.color);
            this.selectedYarn = clickedYarn;
            this.draggedYarn = clickedYarn;
            this.draggedYarn.isDragged = true;
        }
    }

    handleMove(e) {
        if (this.draggedYarn) {
            const pos = this.renderer.getMousePos(e);
            this.draggedYarn.dragPosition = pos;
        }
    }

    handleEnd(e) {
        if (this.draggedYarn) {
            const pos = this.renderer.getMousePos(e);
            const targetSlot = this.findSlotAt(pos);
            
            if (targetSlot && targetSlot.canAddYarn(this.draggedYarn)) {
                console.log('✅ Dropping to slot:', targetSlot.type, targetSlot.id);
                this.moveYarn(this.draggedYarn, targetSlot);
                this.createParticles(pos);
            } else {
                console.log('❌ Cannot drop here');
            }
            
            this.draggedYarn.dragPosition = null;
            this.draggedYarn.isDragged = false;
            this.draggedYarn = null;
            
            // Check for triplet completions
            this.checkTripletCompletions();
            this.checkWinCondition();
        }
    }

    moveYarn(yarn, targetSlot) {
        const sourceSlot = yarn.currentSlot;
        
        if (sourceSlot) {
            this.history.push({
                yarn: yarn,
                from: sourceSlot,
                to: targetSlot
            });
            
            sourceSlot.removeYarn(yarn);
        }
        
        targetSlot.addYarn(yarn);
        this.moves++;
        this.updateUI();
        this.playSound('move');
    }

    // NEW: Check for triplet completions (3 balls of same color in target)
    checkTripletCompletions() {
        let completionsFound = false;
        
        this.targetSlots.forEach(slot => {
            if (slot.isComplete()) {
                console.log(`🌟 Triplet completed: ${slot.targetColor}`);
                
                // Award points
                this.score += 100;
                this.totalScore += 100;
                
                // Remove yarns
                const yarnsToRemove = [...slot.yarns];
                yarnsToRemove.forEach(yarn => {
                    slot.removeYarn(yarn);
                    this.yarns = this.yarns.filter(y => y !== yarn);
                });
                
                // Reset slot for next color
                this.resetTargetSlot(slot);
                
                // Create celebration particles
                if (slot.renderPosition) {
                    for (let i = 0; i < 20; i++) {
                        const angle = (i / 20) * Math.PI * 2;
                        const velocity = {
                            x: Math.cos(angle) * 5,
                            y: Math.sin(angle) * 5
                        };
                        this.particles.push(new Particle(
                            slot.renderPosition.x + slot.renderPosition.width / 2,
                            slot.renderPosition.y + slot.renderPosition.height / 2,
                            velocity
                        ));
                    }
                }
                
                this.playSound('triplet');
                completionsFound = true;
            }
        });
        
        if (completionsFound) {
            this.updateUI();
        }
    }

    // NEW: Reset target slot to accept next color
    resetTargetSlot(slot) {
        slot.targetColor = null;  // Clear target color
        
        // Find an available color from temp slots that's not already assigned
        const assignedColors = this.targetSlots
            .filter(s => s.targetColor !== null)
            .map(s => s.targetColor);
        
        // Get unique colors still in temp/blocker slots
        const remainingColors = new Set();
        [...this.tempSlots, ...this.blockerSlots].forEach(tempSlot => {
            tempSlot.yarns.forEach(yarn => {
                if (!assignedColors.includes(yarn.color)) {
                    remainingColors.add(yarn.color);
                }
            });
        });
        
        // Assign the first available color
        if (remainingColors.size > 0) {
            slot.targetColor = Array.from(remainingColors)[0];
            console.log(`🏹 Slot reset to: ${slot.targetColor}`);
        }
    }

    findYarnAt(pos) {
        const allSlots = [...this.targetSlots, ...this.tempSlots, ...this.blockerSlots];
        
        for (const slot of allSlots) {
            const yarn = slot.getTopYarn();
            if (yarn && this.renderer.isYarnAtPosition(yarn, pos)) {
                return yarn;
            }
        }
        return null;
    }

    findSlotAt(pos) {
        const allSlots = [...this.targetSlots, ...this.tempSlots, ...this.blockerSlots];
        
        for (const slot of allSlots) {
            if (this.renderer.isSlotAtPosition(slot, pos)) {
                return slot;
            }
        }
        return null;
    }

    checkWinCondition() {
        // Win when all temp slots are empty (Mahjong cleared)
        const tempEmpty = this.tempSlots.every(slot => slot.yarns.length === 0);
        
        if (tempEmpty) {
            console.log('🌟 LEVEL COMPLETE!');
            const baseScore = 1000;
            const movesPenalty = Math.min(this.moves * 5, 500);
            const levelBonus = this.currentLevel * 100;
            const isPerfect = this.moves <= this.currentLevel * 3;
            
            this.score = Math.max(baseScore - movesPenalty, 100) + levelBonus;
            if (isPerfect) this.score += 500;
            
            this.totalScore += this.score;
            this.completedLevels++;
            this.updateUI();
            this.playSound('levelComplete');
            
            if (typeof showLevelComplete === 'function') {
                showLevelComplete(this.moves, this.score, isPerfect);
            }
            return true;
        }
        return false;
    }

    undo() {
        if (this.history.length === 0) return;
        
        const lastMove = this.history.pop();
        lastMove.to.removeYarn(lastMove.yarn);
        lastMove.from.addYarn(lastMove.yarn);
        
        this.moves++;
        this.updateUI();
        this.playSound('undo');
    }

    reset() {
        this.loadLevel(this.currentLevel);
    }

    showHint() {
        console.log('💡 Searching for hint...');
        this.yarns.forEach(y => y.showHint = false);
        
        const allSlots = [...this.targetSlots, ...this.tempSlots, ...this.blockerSlots];
        
        for (const sourceSlot of allSlots) {
            const yarn = sourceSlot.getTopYarn();
            if (yarn) {
                for (const targetSlot of allSlots) {
                    if (targetSlot !== sourceSlot && targetSlot.canAddYarn(yarn)) {
                        console.log('💡 Hint found!');
                        yarn.showHint = true;
                        this.playSound('hint');
                        setTimeout(() => { yarn.showHint = false; }, 2000);
                        return;
                    }
                }
            }
        }
        
        console.log('❌ No valid moves!');
        alert('No hints available. Try undoing some moves!');
    }

    nextLevel() {
        console.log(`➡️ Going to level ${this.currentLevel + 1}`);
        this.currentLevel++;
        this.loadLevel(this.currentLevel);
    }

    createParticles(pos) {
        if (!this.settings.particlesEnabled) return;
        
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const velocity = {
                x: Math.cos(angle) * 3,
                y: Math.sin(angle) * 3
            };
            this.particles.push(new Particle(pos.x, pos.y, velocity));
        }
    }

    playSound(type) {
        if (!this.settings.soundEnabled) return;
        console.log('🔊 Sound:', type);
    }

    loadSettings() {
        this.settings = {
            soundEnabled: true,
            particlesEnabled: true
        };
    }

    updateUI() {
        const levelEl = document.getElementById('level-display');
        const movesEl = document.getElementById('moves-display');
        const scoreEl = document.getElementById('score-display');
        const countEl = document.getElementById('level-count');
        
        if (levelEl) levelEl.textContent = this.currentLevel;
        if (movesEl) movesEl.textContent = this.moves;
        if (scoreEl) scoreEl.textContent = this.totalScore + this.score;
        if (countEl) countEl.textContent = `${this.completedLevels}/3`;
    }
}

// Particle class for effects
class Particle {
    constructor(x, y, velocity) {
        this.x = x;
        this.y = y;
        this.vx = velocity.x;
        this.vy = velocity.y;
        this.life = 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.1;  // gravity
        this.life -= 0.02;
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(255, 107, 157, ${this.life})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
        ctx.fill();
    }
}
