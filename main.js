document.addEventListener('DOMContentLoaded', function() {
    // Check login status
    const loggedIn = localStorage.getItem('mindbloom_loggedIn');
    if (loggedIn !== 'true') {
        window.location.href = 'login.html';
        return; 
    }

    // Set welcome message
    const user = JSON.parse(localStorage.getItem('mindbloom_user'));
    if (user && user.name) {
        document.getElementById('welcome-message').textContent = `Welcome to MindBloom, ${user.name}!`;
    }

    // Handle logout
    const logoutButton = document.getElementById('logout-btn');
    if(logoutButton) {
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('mindbloom_loggedIn');
            localStorage.removeItem('mindbloom_user');
            window.location.href = 'login.html';
        });
    }

    // Motivational Quotes
    const quotes = [
        { text: "The greatest wealth is a quiet mind.", author: "Unknown" },
        { text: "Your calm mind is the ultimate weapon against your challenges.", author: "Bryant McGill" },
        { text: "Almost everything will work again if you unplug it for a few minutes, including you.", author: "Anne Lamott" },
        { text: "Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.", author: "Thich Nhat Hanh" },
        { text: "Within you, there is a stillness and a sanctuary to which you can retreat at any time and be yourself.", author: "Hermann Hesse" }
    ];

    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    
    if(quoteText && quoteAuthor) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteText.textContent = `\"${quotes[randomIndex].text}\"`;
        quoteAuthor.textContent = `- ${quotes[randomIndex].author}`;
    }

    // Staggered Card Animation
    const cards = document.querySelectorAll('.dash-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
    });
});
