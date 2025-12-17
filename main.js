// Game initialization and main entry point

let game;

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 Initializing Yarn Fever: Mahjong Edition...');
    
    try {
        game = new Game();
        if (game && game.canvas) {
            game.start();
            console.log('✅ Game started successfully');
        } else {
            console.error('❌ Game initialization failed');
        }
    } catch (error) {
        console.error('❌ Error initializing game:', error);
    }
    
    // Setup button listeners
    setupButtonListeners();
});

function setupButtonListeners() {
    const hintBtn = document.getElementById('hint-btn');
    const undoBtn = document.getElementById('undo-btn');
    const resetBtn = document.getElementById('reset-btn');
    const nextBtn = document.getElementById('next-btn');
    const modalNextBtn = document.getElementById('modal-next-btn');
    
    if (hintBtn) {
        hintBtn.addEventListener('click', () => {
            if (game) game.showHint();
        });
    }
    
    if (undoBtn) {
        undoBtn.addEventListener('click', () => {
            if (game) game.undo();
        });
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (game) game.reset();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (game) game.nextLevel();
        });
    }
    
    if (modalNextBtn) {
        modalNextBtn.addEventListener('click', () => {
            if (game) {
                game.nextLevel();
                closeModal();
            }
        });
    }
}

// Modal handlers
function showLevelComplete(moves, score, isPerfect) {
    const modal = document.getElementById('level-complete-modal');
    if (!modal) return;
    
    const movesEl = document.getElementById('modal-moves');
    const scoreEl = document.getElementById('modal-score');
    const perfectBonus = document.getElementById('perfect-bonus');
    
    if (movesEl) movesEl.textContent = moves;
    if (scoreEl) scoreEl.textContent = score;
    
    if (perfectBonus) {
        perfectBonus.style.display = isPerfect ? 'flex' : 'none';
    }
    
    modal.style.display = 'flex';
}

function showGameOver(totalScore) {
    const modal = document.getElementById('game-over-modal');
    if (!modal) return;
    
    const scoreEl = document.getElementById('final-score');
    if (scoreEl) scoreEl.textContent = totalScore;
    
    modal.style.display = 'flex';
}

function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => modal.style.display = 'none');
}

// Close modals on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (game && game.renderer) {
        game.renderer.resize();
    }
});

console.log('🌟 Yarn Fever: Mahjong Edition ready!');
