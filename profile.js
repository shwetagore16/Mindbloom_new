document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const profileWelcome = document.getElementById('profile-welcome');
    const displayName = document.getElementById('display-name');
    const displayEmail = document.getElementById('display-email');
    const inputName = document.getElementById('input-name');
    const inputEmail = document.getElementById('input-email');
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const toast = document.getElementById('toast-notification');

    // Stats Elements
    const plantStageEl = document.getElementById('stat-plant-stage');
    const journalEntriesEl = document.getElementById('stat-journal-entries');
    const moodEntriesEl = document.getElementById('stat-mood-entries');

    let isEditMode = false;

    // --- Data Loading and Display ---

    function loadProfileData() {
        const user = JSON.parse(localStorage.getItem('mindbloom_user'));
        if (!user) {
            window.location.href = 'login.html'; // Redirect if not logged in
            return;
        }

        // Set welcome message and profile details
        profileWelcome.textContent = `Hello, ${user.name}!`;
        displayName.textContent = user.name;
        displayEmail.textContent = user.email;

        // Load and display stats
        loadStats();
    }

    function loadStats() {
        // Plant Stage
        const plantData = JSON.parse(localStorage.getItem('mindbloom_plantData')) || { xp: 0 };
        const plantStages = [
            { emoji: '\ud83c\udf31', name: 'Seedling', minXp: 0 },
            { emoji: '\ud83c\udf3f', name: 'Herb', minXp: 10 },
            { emoji: '\ud83c\udf38', name: 'Cherry Blossom', minXp: 30 },
            { emoji: '\ud83c\udf3a', name: 'Hibiscus', minXp: 60 },
            { emoji: '\ud83c\udf3b', name: 'Sunflower', minXp: 100 }
        ];
        const currentStage = plantStages.slice().reverse().find(stage => plantData.xp >= stage.minXp);
        plantStageEl.textContent = `${currentStage.emoji} ${currentStage.name}`;

        // Journal Entries
        const journalEntries = JSON.parse(localStorage.getItem('mindbloom_journalEntries')) || [];
        journalEntriesEl.textContent = journalEntries.length;

        // Mood Entries
        const moodEntries = JSON.parse(localStorage.getItem('mindbloom_moodHistory')) || [];
        moodEntriesEl.textContent = moodEntries.length;
    }

    // --- Edit Mode ---

    editProfileBtn.addEventListener('click', () => {
        isEditMode = !isEditMode;
        toggleEditMode();
    });

    function toggleEditMode() {
        if (isEditMode) {
            // Enter edit mode
            displayName.classList.add('hidden');
            displayEmail.classList.add('hidden');
            inputName.classList.remove('hidden');
            inputEmail.classList.remove('hidden');

            inputName.value = displayName.textContent;
            inputEmail.value = displayEmail.textContent;

            editProfileBtn.textContent = 'Save Changes';
        } else {
            // Save changes and exit edit mode
            const user = JSON.parse(localStorage.getItem('mindbloom_user'));
            user.name = inputName.value.trim();
            user.email = inputEmail.value.trim();

            localStorage.setItem('mindbloom_user', JSON.stringify(user));

            // Update display
            displayName.textContent = user.name;
            displayEmail.textContent = user.email;
            profileWelcome.textContent = `Hello, ${user.name}!`;

            // Toggle visibility
            displayName.classList.remove('hidden');
            displayEmail.classList.remove('hidden');
            inputName.classList.add('hidden');
            inputEmail.classList.add('hidden');

            editProfileBtn.textContent = 'Edit Profile';
            showToast('Profile updated successfully!');
        }
    }

    // --- Helper Functions ---
    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // --- Initial Load ---
    loadProfileData();
});
