// Music Control
const bgMusic = document.getElementById('bgMusic');
const musicIcon = document.getElementById('musicIcon');
let isPlaying = false;
let currentSlide = 0;
const totalSlides = 12;

// Check PIN
function checkPin() {
    const pin = document.getElementById('pinInput').value;
    const errorMsg = document.getElementById('errorMsg');
    
    if (pin === '1427') {
        errorMsg.textContent = '';
        showSection('home');
        playMusic();
    } else if (pin === '') {
        errorMsg.textContent = 'Masukkan PIN dulu sayang! 💕';
    } else {
        errorMsg.textContent = 'PIN salah sayang, coba lagi ya! 💕';
        document.getElementById('pinInput').value = '';
    }
}

// Enter key support for PIN
document.getElementById('pinInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkPin();
    }
});

// Show Section
function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Navigation
function goToGallery() {
    showSection('gallery');
    initializeDots();
}

function goToHome() {
    showSection('home');
}

// Music Functions
function playMusic() {
    bgMusic.play().then(() => {
        isPlaying = true;
        musicIcon.textContent = '🔊';
    }).catch(err => {
        console.log('Autoplay prevented:', err);
        isPlaying = false;
        musicIcon.textContent = '🔇';
    });
}

function toggleMusic() {
    if (isPlaying) {
        bgMusic.pause();
        musicIcon.textContent = '🔇';
        isPlaying = false;
    } else {
        playMusic();
    }
}

// Carousel Functions
function updateCarousel() {
    const track = document.querySelector('.carousel-track');
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots();
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateCarousel();
    } else {
        currentSlide = 0;
        updateCarousel();
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateCarousel();
    } else {
        currentSlide = totalSlides - 1;
        updateCarousel();
    }
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

// Initialize Dots
function initializeDots() {
    const dotsContainer = document.querySelector('.carousel-dots');
    dotsContainer.innerHTML = '';
    
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Keyboard Navigation for Carousel
document.addEventListener('keydown', function(e) {
    const gallery = document.getElementById('gallery');
    if (gallery.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    }
});

// Touch/Swipe Support for Mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const gallery = document.getElementById('gallery');
    if (gallery.classList.contains('active')) {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            prevSlide();
        }
    }
}

// Try autoplay on first interaction
document.addEventListener('click', function initAudio() {
    if (!isPlaying) {
        playMusic();
    }
}, { once: true });