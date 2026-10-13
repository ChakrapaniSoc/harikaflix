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
  createLetterCelebration();
}

function closeLetter() {
  letterModal.classList.remove('active');
  letterModal.setAttribute('aria-hidden', 'true');
  heartLayer.replaceChildren();
  particleCleanupTimers.forEach((timer) => window.clearTimeout(timer));
  particleCleanupTimers.clear();
  setBodyScrollLock(lightbox.classList.contains('active'));
}

function createLetterCelebration() {
  heartLayer.replaceChildren();
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const butterflyHues = [325, 275, 205, 38, 18, 145];
  const heartEmojis = ['❤️', '💗', '💕', '💖', '💘', '💝'];
  const particleCount = 36;
  const letterFrame = document.querySelector('.letter-modal-inner').getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const safeMargin = Math.min(52, Math.max(8, Math.min(viewportWidth, viewportHeight) * 0.035));
  const zones = [
    { side: 'top', span: letterFrame.top - safeMargin, weight: viewportWidth * (letterFrame.top - safeMargin) },
    { side: 'bottom', span: viewportHeight - letterFrame.bottom - safeMargin, weight: viewportWidth * (viewportHeight - letterFrame.bottom - safeMargin) },
    { side: 'left', span: letterFrame.left - safeMargin, weight: letterFrame.height * (letterFrame.left - safeMargin) },
    { side: 'right', span: viewportWidth - letterFrame.right - safeMargin, weight: letterFrame.height * (viewportWidth - letterFrame.right - safeMargin) },
  ].filter((zone) => zone.span > 6 && zone.weight > 0);
  if (zones.length === 0) {
    zones.push({ side: 'top', span: viewportHeight, weight: viewportWidth * viewportHeight });
  }
  const totalZoneWeight = zones.reduce((total, zone) => total + zone.weight, 0);

  for (let i = 0; i < particleCount; i += 1) {
    const isButterfly = i < particleCount / 2;
    const particle = document.createElement('span');
    const glyph = document.createElement('span');
    let zoneTarget = Math.random() * totalZoneWeight;
    const zone = zones.find((candidate) => {
      zoneTarget -= candidate.weight;
      return zoneTarget <= 0;
    }) || zones[zones.length - 1];
    const durationSeconds = 4.4 + Math.random() * 0.9;
    const delaySeconds = Math.random() * 0.35;

    particle.className = isButterfly
      ? `spark butterfly${Math.random() < 0.45 ? ' butterfly-glide' : ''}`
      : 'spark heart';
    glyph.className = 'spark-glyph';
    glyph.textContent = isButterfly
      ? '🦋'
      : heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    particle.appendChild(glyph);

    let startX;
    let startY;
    let driftX;
    let riseY;
    let riseMidY;
    let riseEnd;

    if (zone.side === 'top') {
      startX = 12 + Math.random() * Math.max(1, viewportWidth - 24);
      startY = 4 + Math.random() * Math.max(1, zone.span - 8);
      const riseDistance = Math.max(0, Math.min(startY - 6, 90)) * (0.65 + Math.random() * 0.35);
      driftX = Math.random() * 220 - 110;
      riseY = -riseDistance * 0.45;
      riseMidY = -riseDistance * 0.72;
      riseEnd = -riseDistance;
    } else if (zone.side === 'bottom') {
      const safeTop = letterFrame.bottom + safeMargin;
      startX = 12 + Math.random() * Math.max(1, viewportWidth - 24);
      startY = safeTop + 4 + Math.random() * Math.max(1, zone.span - 8);
      const riseDistance = Math.max(0, Math.min(startY - safeTop - 8, 90)) * (0.65 + Math.random() * 0.35);
      driftX = Math.random() * 220 - 110;
      riseY = -riseDistance * 0.45;
      riseMidY = -riseDistance * 0.72;
      riseEnd = -riseDistance;
    } else {
      const isLeft = zone.side === 'left';
      startX = isLeft
        ? 4 + Math.random() * Math.max(1, zone.span - 8)
        : letterFrame.right + safeMargin + 4 + Math.random() * Math.max(1, zone.span - 8);
      startY = letterFrame.top + 18 + Math.random() * Math.max(1, letterFrame.height - 36);
      driftX = (isLeft ? -1 : 1) * (24 + Math.random() * Math.min(90, zone.span));
      const verticalDrift = Math.random() * 40 - 20;
      riseY = verticalDrift;
      riseMidY = verticalDrift * 1.4;
      riseEnd = verticalDrift * 1.8;
    }

    particle.style.setProperty('--start-x', `${startX.toFixed(2)}px`);
    particle.style.setProperty('--start-y', `${startY.toFixed(2)}px`);
    particle.style.setProperty('--drift-x', `${driftX.toFixed(2)}px`);
    particle.style.setProperty('--drift-mid-x', `${(driftX * -0.35).toFixed(2)}px`);
    particle.style.setProperty('--drift-reverse-x', `${(driftX * -0.55).toFixed(2)}px`);
    particle.style.setProperty('--drift-reverse-mid-x', `${(driftX * -0.45).toFixed(2)}px`);
    particle.style.setProperty('--drift-heart-mid-x', `${(driftX * -0.4).toFixed(2)}px`);
    particle.style.setProperty('--drift-heart-end-x', `${(driftX * -0.5).toFixed(2)}px`);
    particle.style.setProperty('--rise-y', `${riseY.toFixed(2)}px`);
    particle.style.setProperty('--rise-mid-y', `${riseMidY.toFixed(2)}px`);
    particle.style.setProperty('--rise-end', `${riseEnd.toFixed(2)}px`);
    particle.style.setProperty('--hue', `${butterflyHues[i % butterflyHues.length]}deg`);
    particle.style.setProperty('--duration', `${durationSeconds.toFixed(2)}s`);
    particle.style.animationDelay = `${delaySeconds.toFixed(2)}s`;
    particle.style.fontSize = `${(1.05 + Math.random() * 1.1).toFixed(2)}rem`;

    if (particle.classList.contains('butterfly-glide')) {
      particle.style.setProperty('--glide-y', `${(riseY * 0.25).toFixed(2)}px`);
      particle.style.setProperty('--glide-end-y', `${(riseY * 0.4).toFixed(2)}px`);
      particle.style.setProperty('--glide-end-x', `${(driftX * -0.45).toFixed(2)}px`);
    }

    let cleanupTimer;
    const removeParticle = () => {
      window.clearTimeout(cleanupTimer);
      particleCleanupTimers.delete(cleanupTimer);
      particle.remove();
    };

    cleanupTimer = window.setTimeout(() => {
      removeParticle();
    }, (durationSeconds + delaySeconds + 0.1) * 1000);
    particleCleanupTimers.add(cleanupTimer);
    particle.addEventListener('animationend', (event) => {
      if (event.target === particle) removeParticle();
    });
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
