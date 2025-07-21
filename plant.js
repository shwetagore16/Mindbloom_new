document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const plantEmoji = document.getElementById('plant-emoji');
    const plantDisplay = document.getElementById('plant-display');
    const plantMessage = document.getElementById('plant-message');
    const moodCountEl = document.getElementById('mood-count');
    const plantXpEl = document.getElementById('plant-xp');
    const checkinStreakEl = document.getElementById('checkin-streak');
    const waterButton = document.getElementById('water-plant-btn');

    // Plant Growth Stages
    const plantStages = [
        { emoji: '🌱', minXp: 0 },    // Seedling
        { emoji: '🌿', minXp: 10 },   // Herb
        { emoji: '🌸', minXp: 30 },   // Cherry Blossom
        { emoji: '🌺', minXp: 60 },   // Hibiscus
        { emoji: '🌻', minXp: 100 }  // Sunflower
    ];

    // Load or initialize data
    let plantData = JSON.parse(localStorage.getItem('mindbloom_plantData')) || {
        xp: 0,
        lastWatered: null,
        checkinStreak: 0
    };

    function getMoodEntries() {
        return JSON.parse(localStorage.getItem('mindbloom_moodHistory')) || [];
    }

    function saveData() {
        localStorage.setItem('mindbloom_plantData', JSON.stringify(plantData));
    }

    function updatePlantDisplay() {
        const moodEntries = getMoodEntries();
        plantData.xp = moodEntries.length * 5; // 5 XP per mood entry

        const currentStage = plantStages.slice().reverse().find(stage => plantData.xp >= stage.minXp);
        plantEmoji.textContent = currentStage.emoji;

        const nextStage = plantStages.find(stage => plantData.xp < stage.minXp);
        const xpForNextLevel = nextStage ? nextStage.minXp : plantData.xp;

        // Update DOM
        moodCountEl.textContent = moodEntries.length;
        plantXpEl.textContent = `${plantData.xp} / ${xpForNextLevel}`;
        checkinStreakEl.textContent = `${plantData.checkinStreak} Days`;
        
        saveData();
    }

    function isSameDay(date1, date2) {
        if (!date1 || !date2) return false;
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        return d1.getFullYear() === d2.getFullYear() &&
               d1.getMonth() === d2.getMonth() &&
               d1.getDate() === d2.getDate();
    }

    waterButton.addEventListener('click', () => {
        const today = new Date().toISOString();

        if (isSameDay(plantData.lastWatered, today)) {
            plantMessage.textContent = 'Your plant is already happy and hydrated for today!';
            return;
        }

        // Update streak
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (isSameDay(plantData.lastWatered, yesterday.toISOString())) {
            plantData.checkinStreak++;
        } else {
            plantData.checkinStreak = 1; // Reset streak
        }

        plantData.lastWatered = today;
        plantMessage.textContent = 'You watered your plant! It looks happy.';
        
        // Animation
        plantDisplay.classList.add('watered');
        setTimeout(() => {
            plantDisplay.classList.remove('watered');
        }, 800);

        // Clear message after a few seconds
        setTimeout(() => {
            plantMessage.textContent = '';
        }, 4000);

        updatePlantDisplay();
    });

    // Initial Load
    updatePlantDisplay();
});
