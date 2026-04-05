// ===== OPEN SURPRISE =====
function openSurprise() {
    document.getElementById('introScreen').classList.add('hidden');
    launchConfetti();
    createFloatingHearts();
}

// ===== COUNTDOWN TIMER =====
function updateCountdown() {
    const now = new Date();
    let birthday = new Date(now.getFullYear(), 3, 5); // April 5 (month is 0-indexed)

    // If birthday has passed this year, set to next year
    if (now > new Date(now.getFullYear(), 3, 5, 23, 59, 59)) {
        birthday = new Date(now.getFullYear() + 1, 3, 5);
    }

    // Check if today is the birthday
    const isBirthdayToday = (now.getMonth() === 3 && now.getDate() === 5);

    if (isBirthdayToday) {
        document.getElementById('countdownWrapper').style.display = 'none';
        document.getElementById('birthdayToday').classList.add('active');

        const age = now.getFullYear() - 1998;
        document.getElementById('ageBadge').textContent = `🎂 ${age} Years Beautiful 🎂`;
    } else {
        document.getElementById('countdownWrapper').style.display = 'block';
        document.getElementById('birthdayToday').classList.remove('active');

        let diff = birthday - now;

        const years = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
        diff -= years * 365.25 * 24 * 60 * 60 * 1000;

        const months = Math.floor(diff / (30.44 * 24 * 60 * 60 * 1000));
        diff -= months * 30.44 * 24 * 60 * 60 * 1000;

        const days = Math.floor(diff / (24 * 60 * 60 * 1000));
        diff -= days * 24 * 60 * 60 * 1000;

        const hours = Math.floor(diff / (60 * 60 * 1000));
        diff -= hours * 60 * 60 * 1000;

        const minutes = Math.floor(diff / (60 * 1000));
        diff -= minutes * 60 * 1000;

        const seconds = Math.floor(diff / 1000);

        document.getElementById('years').textContent = years;
        document.getElementById('months').textContent = months;
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ===== CONFETTI =====
function launchConfetti() {
    const container = document.getElementById('confetti');
    container.classList.add('active');
    const colors = ['#ff6b9d', '#c44dff', '#ffd700', '#ff9ec6', '#00d4ff', '#ff4757', '#2ed573', '#ffa502'];

    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.width = Math.random() * 12 + 5 + 'px';
            confetti.style.height = Math.random() * 12 + 5 + 'px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            container.appendChild(confetti);

            setTimeout(() => confetti.remove(), 5000);
        }, i * 20);
    }

    setTimeout(() => container.classList.remove('active'), 6000);
}

// ===== FLOATING HEARTS =====
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    const hearts = ['💖', '💕', '💗', '💝', '🌸', '✨', '🦋', '🌹'];

    function addHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = Math.random() * 1.5 + 0.8 + 'rem';
        heart.style.animationDuration = Math.random() * 8 + 6 + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(heart);

        setTimeout(() => heart.remove(), 15000);
    }

    setInterval(addHeart, 800);
    for (let i = 0; i < 10; i++) setTimeout(addHeart, i * 300);
}

// ===== PARTICLES =====
function createParticles() {
    const container = document.getElementById('particles');
    const colors = ['rgba(255,107,157,0.3)', 'rgba(196,77,255,0.3)', 'rgba(255,215,0,0.2)'];

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 6 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animationDuration = Math.random() * 15 + 10 + 's';
        particle.style.animationDelay = Math.random() * 10 + 's';
        container.appendChild(particle);
    }
}
createParticles();

// ===== BLOW CANDLES =====
function blowCandles() {
    const flames = document.querySelectorAll('.flame');
    flames.forEach((flame, index) => {
        setTimeout(() => {
            flame.style.transition = 'all 0.5s ease';
            flame.style.opacity = '0';
            flame.style.transform = 'translateX(-50%) scale(0)';
        }, index * 200);
    });

    setTimeout(() => {
        document.getElementById('blowMessage').style.display = 'block';
        launchConfetti();
    }, 1200);
}

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

// ===== SPARKLE CURSOR =====
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.92) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.textContent = ['✨', '💖', '⭐', '🌟'][Math.floor(Math.random() * 4)];
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    }
});

// ===== MUSIC TOGGLE (placeholder) =====
let musicPlaying = false;
function toggleMusic() {
    const btn = document.getElementById('musicBtn');
    musicPlaying = !musicPlaying;
    if (musicPlaying) {
        btn.textContent = '🎶';
        btn.classList.add('playing');
        // You can add actual audio here:
        const audio = new Audio('happybirthday.mp3');
        audio.play();
    } else {
        btn.textContent = '🎵';
        btn.classList.remove('playing');
    }
}

// ===== EASTER EGG: Double-click for extra confetti =====
document.addEventListener('dblclick', () => {
    launchConfetti();
});