// Utility functions

const YARN_COLORS = [
    '#FF6B9D', // Pink
    '#4ECDC4', // Teal
    '#FFD93D', // Yellow
    '#A8E6CF', // Mint
    '#FF8B94', // Coral
    '#B4A7D6', // Lavender
    '#FFD1DC', // Light Pink
    '#98D8C8', // Seafoam
    '#F7DC6F', // Gold
    '#BB8FCE'  // Purple
];

// Get random color
function getRandomYarnColor() {
    return YARN_COLORS[Math.floor(Math.random() * YARN_COLORS.length)];
}

// Shuffle array (Fisher-Yates)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Format time
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}
