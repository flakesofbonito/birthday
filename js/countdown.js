function getPhilippineTime() {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' }));
}

function getUnlockDate() {
  const now = getPhilippineTime();
  const unlock = new Date(now);
  unlock.setMonth(5);
  unlock.setDate(25);
  unlock.setHours(0, 0, 0, 0);
  if (unlock <= now) {
    unlock.setFullYear(now.getFullYear());
  } else {
    unlock.setFullYear(now.getFullYear());
  }
  const candidate = new Date(unlock);
  if (candidate < now) {
    candidate.setFullYear(now.getFullYear() + 1);
  }
  return candidate;
}

function getAfterDate() {
  const after = new Date(getUnlockDate());
  after.setDate(26);
  return after;
}

function isUnlocked() {
  const now = getPhilippineTime();
  const phNow = new Date(now);
  return phNow.getMonth() === 5 && phNow.getDate() >= 25;
}

function isAfterDay() {
  const now = getPhilippineTime();
  return now.getMonth() === 5 && now.getDate() >= 26;
}

function updateCountdown() {
  const now = getPhilippineTime();
  const unlock = getUnlockDate();
  const diff = unlock - now;

  if (diff <= 0) {
    revealSite();
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
}

function revealSite() {
  const lock = document.getElementById('lockscreen');
  const site = document.getElementById('site');

  lock.style.transition = 'opacity 1.2s ease';
  lock.style.opacity = '0';
  setTimeout(() => {
    lock.remove();
    site.classList.remove('hidden');
    onSiteRevealed();
  }, 1300);
}

function onSiteRevealed() {
  const music = document.getElementById('bg-music');
  if (music.src && music.src !== window.location.href) {
    music.volume = 0;
    music.play().catch(() => {});
    let vol = 0;
    const fade = setInterval(() => {
      vol = Math.min(vol + 0.02, 0.55);
      music.volume = vol;
      if (vol >= 0.55) clearInterval(fade);
    }, 120);
  }

  launchConfetti();
  startShootingStars();

  if (isAfterDay()) {
    setTimeout(() => {
      document.getElementById('after-message').classList.remove('hidden');
    }, 4000);
  }

  initScrollReveal();
}

if (true) {
  const lock = document.getElementById('lockscreen');
  lock.style.display = 'none';
  document.getElementById('site').classList.remove('hidden');
  setTimeout(onSiteRevealed, 100);
} else {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

function launchConfetti() {
  const zone = document.getElementById('confetti-zone');
  const colors = ['#c4b5fd', '#a855f7', '#f43f5e', '#fda4af', '#e9d5ff', '#7c3aed'];
  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      const p = document.createElement('div');
      p.className = 'confetti-piece';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.animationDuration = (Math.random() * 3 + 2) + 's';
      p.style.animationDelay = (Math.random() * 2) + 's';
      p.style.width = (Math.random() * 8 + 4) + 'px';
      p.style.height = (Math.random() * 8 + 4) + 'px';
      p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      zone.appendChild(p);
      setTimeout(() => p.remove(), 7000);
    }, i * 30);
  }
}

function startShootingStars() {
  const container = document.getElementById('shooting-stars-container');
  setInterval(() => {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.top = (Math.random() * 60) + 'vh';
    star.style.left = (Math.random() * 40) + 'vw';
    star.style.animation = `shoot ${Math.random() * 1 + 0.6}s linear forwards`;
    container.appendChild(star);
    setTimeout(() => star.remove(), 2000);
  }, 3500);
}

function initScrollReveal() {
  const els = document.querySelectorAll('.scroll-reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}
