const profileScreen = document.getElementById('profile-screen');
const appShell = document.getElementById('app-shell');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('nav-links');
const profileCards = document.querySelectorAll('.profile-card');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxCaption = document.getElementById('lightbox-caption');
const letterModal = document.getElementById('letter-modal');
const heartLayer = document.querySelector('.heart-layer');
const particleCleanupTimers = new Set();
const musicToggle = document.querySelector('.music-toggle');
const backgroundAudio = document.getElementById('background-audio');
const replayButton = document.querySelector('.replay-btn');

const playfulMessages = {
  'friend-1': 'Absolutely not. This profile is far too dramatic for the birthday queen.',
  'friend-2': 'This is the main-character profile. It deserves all the spotlight today.',
  'friend-3': 'Pure bestie energy. A legendary vibe with zero chill.',
};

function setBodyScrollLock(isLocked) {
  document.body.classList.toggle('modal-open', isLocked);
}

function closeProfileIntro() {
  profileScreen.classList.remove('active');
  appShell.classList.remove('hidden');
}

function openProfileMessage(profileKey) {
  const message = playfulMessages[profileKey];
  if (!message) return;

  const toast = document.createElement('div');
  toast.className = 'profile-toast';
  toast.textContent = message;
  toast.setAttribute('role', 'status');

  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 1800);
}

profileCards.forEach((card) => {
  card.addEventListener('click', () => {
    const profileKey = card.dataset.profile;

    if (profileKey === 'friend') {
      closeProfileIntro();
      document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
      return;
    }

    openProfileMessage(profileKey);
  });
});

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const scrollButtons = document.querySelectorAll('[data-scroll-target]');
scrollButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const targetSelector = button.dataset.scrollTarget;
    const target = document.querySelector(targetSelector);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const galleryImages = document.querySelectorAll('.gallery-image');
galleryImages.forEach((image) => {
  image.addEventListener('click', () => {
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxTitle.textContent = image.dataset.title || 'Gallery image';
    lightboxCaption.textContent = image.dataset.caption || 'Birthday memory';
    setBodyScrollLock(true);
  });
});

function closeLightbox() {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
  lightboxTitle.textContent = 'Gallery title';
  lightboxCaption.textContent = 'Gallery caption';
  setBodyScrollLock(letterModal.classList.contains('active'));
}

document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (lightbox.classList.contains('active')) {
      closeLightbox();
      return;
    }

    if (letterModal.classList.contains('active')) {
      closeLetter();
    }
  }
});

function openLetter() {
  letterModal.classList.add('active');
  letterModal.setAttribute('aria-hidden', 'false');
  setBodyScrollLock(true);
  createFloatingHearts();
}

function closeLetter() {
  letterModal.classList.remove('active');
  letterModal.setAttribute('aria-hidden', 'true');
  heartLayer.replaceChildren();
  particleCleanupTimers.forEach((timer) => window.clearTimeout(timer));
  particleCleanupTimers.clear();
  setBodyScrollLock(lightbox.classList.contains('active'));
}

function createFloatingHearts() {
  heartLayer.replaceChildren();
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const particleCount = 16;
  const particleTypes = [
    { className: 'spark butterfly', emoji: '🦋' },
    { className: 'spark heart', emoji: '❤️' },
    { className: 'spark butterfly', emoji: '🦋' },
    { className: 'spark heart', emoji: '💗' },
    { className: 'spark butterfly', emoji: '🦋' },
    { className: 'spark heart', emoji: '💕' },
    { className: 'spark butterfly', emoji: '🦋' },
    { className: 'spark heart', emoji: '💖' },
    { className: 'spark butterfly', emoji: '🦋' },
    { className: 'spark heart', emoji: '❤️' },
    { className: 'spark butterfly', emoji: '🦋' },
    { className: 'spark heart', emoji: '💗' },
    { className: 'spark butterfly', emoji: '🦋' },
    { className: 'spark heart', emoji: '💕' },
    { className: 'spark butterfly', emoji: '🦋' },
    { className: 'spark heart', emoji: '💖' },
  ];

  for (let i = 0; i < particleCount; i += 1) {
    const particle = document.createElement('span');
    const particleType = particleTypes[i];
    particle.className = particleType.className;
    particle.textContent = particleType.emoji;
    particle.style.setProperty('--start-x', `${(Math.random() * 100).toFixed(2)}%`);
    particle.style.setProperty('--start-y', `${(12 + Math.random() * 95).toFixed(2)}%`);
    particle.style.setProperty('--drift-x', `${(Math.random() * 180 - 90).toFixed(2)}px`);
    particle.style.setProperty('--rise-y', `-${(55 + Math.random() * 40).toFixed(2)}vh`);
    particle.style.setProperty('--rise-end', `-${(120 + Math.random() * 70).toFixed(2)}vh`);
    const durationSeconds = 5 + Math.random() * 4;
    const delaySeconds = Math.random() * 0.9;
    particle.style.setProperty('--duration', `${durationSeconds.toFixed(2)}s`);
    particle.style.animationDelay = `${delaySeconds.toFixed(2)}s`;
    particle.style.fontSize = `${(1 + Math.random() * 0.8).toFixed(2)}rem`;
    const cleanupTimer = window.setTimeout(() => {
      particleCleanupTimers.delete(cleanupTimer);
      particle.remove();
    }, (durationSeconds + delaySeconds + 0.25) * 1000);
    particleCleanupTimers.add(cleanupTimer);
    particle.addEventListener('animationend', () => {
      window.clearTimeout(cleanupTimer);
      particleCleanupTimers.delete(cleanupTimer);
      particle.remove();
    }, { once: true });
    heartLayer.appendChild(particle);
  }
}

letterModal.addEventListener('click', (event) => {
  if (event.target === letterModal) {
    closeLetter();
  }
});

document.querySelector('.open-letter-btn').addEventListener('click', openLetter);
document.querySelector('.close-letter-btn').addEventListener('click', closeLetter);

replayButton.addEventListener('click', () => {
  if (letterModal.classList.contains('active')) {
    closeLetter();
  }

  closeLightbox();

  window.scrollTo({ top: 0, behavior: 'smooth' });
  profileScreen.classList.remove('active');
  appShell.classList.remove('hidden');
});

function toggleMusic() {
  if (backgroundAudio.paused) {
    backgroundAudio.play().catch(() => {
      musicToggle.classList.remove('is-playing');
    });
    musicToggle.classList.add('is-playing');
    musicToggle.innerHTML = '<i class="fa-solid fa-pause"></i><span>Pause</span>';
  } else {
    backgroundAudio.pause();
    musicToggle.classList.remove('is-playing');
    musicToggle.innerHTML = '<i class="fa-solid fa-music"></i><span>Music</span>';
  }
}

musicToggle.addEventListener('click', toggleMusic);

window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});
