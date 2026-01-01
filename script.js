// ==========================================
// ROMANTIC WEBSITE - MULTI-PAGE SCRIPT
// Premium Love Gift 💕
// ========================================== //

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    
    initializeMusic();
    
    // Skip heavy animations on mobile
    if (!isMobile) {
        initializeAnimations();
        createFloatingHearts();
        createSparkles();
    }
    
    initializeScrollAnimations();
    initializePageSpecificEffects();
    console.log('💕 Love website loaded successfully! 💕');
});

// ==========================================
// MUSIC CONTROL (PERSISTENT ACROSS PAGES)
// ==========================================
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
let isMusicPlaying = false;

function initializeMusic() {
    if (!bgMusic || !musicToggle) return;
    
    // Check if music was playing from previous page
    const musicState = sessionStorage.getItem('musicPlaying');
    const musicTime = sessionStorage.getItem('musicTime');
    
    // Set volume
    bgMusic.volume = 0.3;
    
    // Restore music state
    if (musicState === 'true') {
        if (musicTime) {
            bgMusic.currentTime = parseFloat(musicTime);
        }
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            musicToggle.classList.remove('paused');
        }).catch(() => {
            isMusicPlaying = false;
            musicToggle.classList.add('paused');
            musicToggle.querySelector('.music-icon').textContent = '🔇';
        });
    } else {
        // Try autoplay on first page
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    isMusicPlaying = true;
                    musicToggle.classList.remove('paused');
                    sessionStorage.setItem('musicPlaying', 'true');
                })
                .catch(() => {
                    isMusicPlaying = false;
                    musicToggle.classList.add('paused');
                    musicToggle.querySelector('.music-icon').textContent = '🔇';
                });
        }
    }
    
    musicToggle.addEventListener('click', toggleMusic);
    
    // Save music state before page unload
    window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('musicPlaying', isMusicPlaying);
        if (bgMusic) {
            sessionStorage.setItem('musicTime', bgMusic.currentTime);
        }
    });
}

function toggleMusic() {
    if (!bgMusic) return;
    
    if (isMusicPlaying) {
        bgMusic.pause();
        isMusicPlaying = false;
        musicToggle.classList.add('paused');
        musicToggle.querySelector('.music-icon').textContent = '🔇';
        sessionStorage.setItem('musicPlaying', 'false');
    } else {
        bgMusic.play();
        isMusicPlaying = true;
        musicToggle.classList.remove('paused');
        musicToggle.querySelector('.music-icon').textContent = '🎵';
        sessionStorage.setItem('musicPlaying', 'true');
    }
    
    createRipple(musicToggle);
}

// ==========================================
// PAGE-SPECIFIC EFFECTS
// ==========================================
function initializePageSpecificEffects() {
    const body = document.body;
    
    // Page 2: Memories - Photo card interactions
    if (body.classList.contains('page-memories')) {
        initializeMemoriesPage();
    }
    
    // Page 3: Videos - Glass card effects
    if (body.classList.contains('page-videos')) {
        initializeVideosPage();
    }
    
    // Page 4: Messages - Flip card effects
    if (body.classList.contains('page-messages')) {
        initializeMessagesPage();
    }
    
    // Page 5: Reasons - Timeline scroll animations
    if (body.classList.contains('page-reasons')) {
        initializeReasonsPage();
    }
    
    // Page 6: Thanks - Celebration effects
    if (body.classList.contains('page-thanks')) {
        initializeThanksPage();
    }
}

function initializeMemoriesPage() {
    const photoCards = document.querySelectorAll('.photo-card');
    photoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.placeholder-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'all 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.placeholder-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

function initializeVideosPage() {
    const videoCards = document.querySelectorAll('.glass-video-card');
    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            const playIcon = this.querySelector('.play-icon');
            if (playIcon) {
                playIcon.textContent = '⏸️';
                setTimeout(() => {
                    playIcon.textContent = '▶️';
                }, 300);
            }
            createRipple(this);
        });
    });
}

function initializeMessagesPage() {
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
}

function initializeReasonsPage() {
    // Scroll-based animations for timeline
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.1 });
    
    const reasonItems = document.querySelectorAll('.reason-item');
    reasonItems.forEach(item => observer.observe(item));
}

function initializeThanksPage() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    
    // Reduced effects on mobile
    if (!isMobile) {
        createConfetti();
        createHeartsRain();
        setInterval(createConfetti, 8000);
    }
}

// Magic effect for Forever button
function createMagicEffect() {
    const hearts = ['💕', '💖', '💗', '💓', '💝', '💘'];
    const body = document.body;
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: fixed;
                left: 50%;
                top: 50%;
                font-size: ${Math.random() * 2 + 1}rem;
                animation: explodeHeart 2s ease-out forwards;
                pointer-events: none;
                z-index: 9999;
                transform: translate(-50%, -50%);
            `;
            body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 2000);
        }, i * 30);
    }
}

// Add explosion animation
const explosionStyle = document.createElement('style');
explosionStyle.textContent = `
    @keyframes explodeHeart {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(
                calc(-50% + ${Math.random() * 400 - 200}px),
                calc(-50% + ${Math.random() * 400 - 200}px)
            ) scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(explosionStyle);

// ==========================================
// NAVIGATION SYSTEM REMOVED
// (Now using traditional links between pages)
// ==========================================

// ==========================================
// FLOATING HEARTS ANIMATION
// ==========================================
function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    if (!container) return;
    
    const heartEmojis = ['💕', '💖', '💗', '💓', '💝'];
    
    // Create multiple hearts
    for (let i = 0; i < 4; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 2 + 1}rem;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.3 + 0.2};
            animation: floatHeart ${Math.random() * 10 + 10}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
            pointer-events: none;
        `;
        container.appendChild(heart);
    }
}

// ==========================================
// SPARKLES EFFECT
// ==========================================
function createSparkles() {
    const sparklesContainer = document.querySelector('.sparkles');
    if (!sparklesContainer) return;
    
    setInterval(() => {
        if (Math.random() > 0.9) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            sparkle.textContent = '✨';
            sparkle.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                font-size: ${Math.random() * 1.5 + 0.5}rem;
                animation: sparkleFade 2s ease-out forwards;
                pointer-events: none;
            `;
            sparklesContainer.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 2000);
        }
    }, 1000);
}

// ==========================================
// CONFETTI ANIMATION
// ==========================================
function createConfetti() {
    const confettiContainer = document.querySelector('.confetti');
    if (!confettiContainer) return;
    
    const confettiItems = ['✨', '🌟', '💫', '⭐'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.textContent = confettiItems[Math.floor(Math.random() * confettiItems.length)];
            confetti.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                top: -10%;
                font-size: ${Math.random() * 1.5 + 1}rem;
                animation: confettiFall ${Math.random() * 2 + 3}s ease-in forwards;
                pointer-events: none;
            `;
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 200);
    }
}

// ==========================================
// HEARTS RAIN ANIMATION
// ==========================================
function createHeartsRain() {
    const heartsContainer = document.querySelector('.hearts-rain');
    if (!heartsContainer) return;
    
    const hearts = ['💕', '💖', '💗', '💓'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            top: -10%;
            font-size: ${Math.random() * 1.5 + 1}rem;
            animation: heartsRain ${Math.random() * 3 + 4}s linear forwards;
            pointer-events: none;
        `;
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 7000);
    }, 1500);
}

// ==========================================
// RIPPLE EFFECT
// ==========================================
function createRipple(element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        to {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
        }
    }
    
    @keyframes sparkleFade {
        0% {
            opacity: 1;
            transform: scale(0);
        }
        50% {
            opacity: 1;
            transform: scale(1.2);
        }
        100% {
            opacity: 0;
            transform: scale(1) translateY(-30px);
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// BUTTON INTERACTIONS
// ==========================================
function initializeAnimations() {
    // Add ripple effect to all buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRipple(this);
        });
    });
    
    // Add glow effect on hover
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
}

// ==========================================
// SCROLL EFFECTS & PARALLAX
// ==========================================
function initializeScrollAnimations() {
    // Add parallax effect to floating elements
    window.addEventListener('mousemove', (e) => {
        const floatingEmojis = document.querySelectorAll('.floating-emojis .emoji, .celebration-emoji');
        floatingEmojis.forEach((emoji, index) => {
            const speed = (index + 1) * 0.02;
            const x = (window.innerWidth - e.pageX * speed) / 100;
            const y = (window.innerHeight - e.pageY * speed) / 100;
            emoji.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// ==========================================
// BUTTON INTERACTIONS
// ==========================================
function initializeAnimations() {
    // Add ripple effect to all buttons
    const buttons = document.querySelectorAll('button, .nav-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRipple(this);
        });
    });
}

// ==========================================
// CONFETTI ANIMATION
// ==========================================
function createConfetti() {
    const confettiContainer = document.querySelector('.confetti-container');
    if (!confettiContainer) return;
    
    const confettiItems = ['✨', '🌟', '💫', '⭐', '🎉'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.textContent = confettiItems[Math.floor(Math.random() * confettiItems.length)];
            confetti.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                top: -10%;
                font-size: ${Math.random() * 1.5 + 1}rem;
                animation: confettiFall ${Math.random() * 2 + 3}s ease-in forwards;
                pointer-events: none;
            `;
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 200);
    }
}

// Add confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        0% {
            top: -10%;
            opacity: 1;
            transform: rotate(0deg);
        }
        100% {
            top: 110%;
            opacity: 0;
            transform: rotate(360deg);
        }
    }
`;
document.head.appendChild(confettiStyle);

// ==========================================
// HEARTS RAIN ANIMATION
// ==========================================
function createHeartsRain() {
    const heartsContainer = document.querySelector('.hearts-rain-container');
    if (!heartsContainer) return;
    
    const hearts = ['💕', '💖', '💗', '💓'];
    
    const interval = setInterval(() => {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            top: -10%;
            font-size: ${Math.random() * 1.5 + 1}rem;
            animation: heartsRain ${Math.random() * 3 + 4}s linear forwards;
            pointer-events: none;
        `;
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 7000);
    }, 800);
    
    // Stop after 20 seconds to avoid too many elements
    setTimeout(() => clearInterval(interval), 20000);
}

// Add hearts rain animation
const heartsRainStyle = document.createElement('style');
heartsRainStyle.textContent = `
    @keyframes heartsRain {
        0% {
            top: -10%;
            opacity: 1;
        }
        100% {
            top: 110%;
            opacity: 0.3;
        }
    }
`;
document.head.appendChild(heartsRainStyle);

// ==========================================
// VISIBILITY CHANGE - PAUSE MUSIC
// ==========================================
document.addEventListener('visibilitychange', () => {
    if (document.hidden && bgMusic && isMusicPlaying) {
        bgMusic.pause();
    } else if (!document.hidden && bgMusic && isMusicPlaying) {
        bgMusic.play();
    }
});

// ==========================================
// CONSOLE MESSAGE
// ==========================================
console.log('%c💕 Made with love! 💕', 'font-size: 20px; color: #FFB6C1; font-weight: bold;');
console.log('%cThis website was crafted with care for someone very special! 🥰', 'font-size: 14px; color: #FFC0CB;');

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

// Mobile-specific optimizations
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

if (isMobile) {
    // Disable heavy visual effects on mobile
    document.querySelectorAll('.orb, .floating-flowers, .sparkles-container').forEach(el => {
        el.style.display = 'none';
    });
    
    // Reduce animation duration for remaining elements
    document.documentElement.style.setProperty('--animation-speed', '0.5');
}

// Passive event listeners for better scroll performance
document.addEventListener('touchstart', function() {}, { passive: true });
document.addEventListener('touchmove', function() {}, { passive: true });

// Smooth page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

console.log('✨ All systems ready! Enjoy your romantic journey! 💖');
