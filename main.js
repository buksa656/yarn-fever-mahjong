// Game initialization and main entry point

let game;

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 Initializing Yarn Fever: Mahjong Edition...');
    
    game = new Game();
    game.start();
    
    // Setup button listeners
    setupButtonListeners();
});

function setupButtonListeners() {
    const hintBtn = document.getElementById('hint-btn');
    const undoBtn = document.getElementById('undo-btn');
    const resetBtn = document.getElementById('reset-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (hintBtn) hintBtn.addEventListener('click', () => game.showHint());
    if (undoBtn) undoBtn.addEventListener('click', () => game.undo());
    if (resetBtn) resetBtn.addEventListener('click', () => game.reset());
    if (nextBtn) nextBtn.addEventListener('click', () => game.nextLevel());
}

// Modal handlers
function showLevelComplete(moves, score, isPerfect) {
    const modal = document.getElementById('level-complete-modal');
    if (!modal) return;
    
    document.getElementById('modal-moves').textContent = moves;
    document.getElementById('modal-score').textContent = score;
    
    const perfectBonus = document.getElementById('perfect-bonus');
    if (isPerfect && perfectBonus) {
        perfectBonus.style.display = 'flex';
    } else if (perfectBonus) {
        perfectBonus.style.display = 'none';
    }
    
    modal.style.display = 'flex';
}

function showGameOver(totalScore) {
    const modal = document.getElementById('game-over-modal');
    if (!modal) return;
    
    document.getElementById('final-score').textContent = totalScore;
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
