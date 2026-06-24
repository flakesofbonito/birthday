function getPhilippineTime() {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' }));
}

function getUnlockDate() {
  const now = getPhilippineTime();
  const unlock = new Date(now);
  unlock.setMonth(5);
  unlock.setDate(25);
  unlock.setHours(0, 0, 0, 0);
  if (unlock < now) {
    unlock.setFullYear(now.getFullYear() + 1);
  }
  return unlock;
}

// ── TEMP OVERRIDES (remove after testing) ────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────

function isUnlocked() {
const now = getPhilippineTime();
return now.getMonth() === 5 && now.getDate() >= 25;
}

function isAfterDay() {
const now = getPhilippineTime();
return now.getMonth() === 5 && now.getDate() >= 26;
}

function updateCountdown() {
  const now = getPhilippineTime();
  const unlock = getUnlockDate();
  const diff = unlock - now;

  if (diff <= 0) { revealSite(); return; }

  const totalSeconds = Math.floor(diff / 1000);
  document.getElementById('cd-hours').textContent = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  document.getElementById('cd-minutes').textContent = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  document.getElementById('cd-seconds').textContent = String(totalSeconds % 60).padStart(2, '0');
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
  setTimeout(() => { if (window.startMusic) window.startMusic(); }, 300);
  launchConfetti();
  startShootingStars();
  initScrollReveal();
  initTeaserCountdown();

  if (isAfterDay()) {
    setTimeout(() => {
      document.getElementById('after-message').classList.remove('hidden');
    }, 4000);
  } else {
    const afterPoll = setInterval(() => {
      if (isAfterDay()) {
        clearInterval(afterPoll);
        document.getElementById('after-message').classList.remove('hidden');
      }
    }, 30000);
  }
}

function initTeaserCountdown() {
  // Only show on June 25, hide on June 26+
  if (isAfterDay()) return;

  const section = document.getElementById('teaser-section');
  if (section) section.classList.add('visible');

  function getJune26() {
    const now = getPhilippineTime();
    const target = new Date(now);
    target.setMonth(5);
    target.setDate(26);
    target.setHours(0, 0, 0, 0);
    if (target <= now) target.setFullYear(now.getFullYear() + 1);
    return target;
  }

  function tickTeaser() {
    const now = getPhilippineTime();
    const diff = getJune26() - now;

    if (diff <= 0) {
      // It's June 26 now — hide teaser, show after-message
      if (section) section.classList.remove('visible');
      document.getElementById('after-message').classList.remove('hidden');
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    document.getElementById('tc-hours').textContent = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    document.getElementById('tc-minutes').textContent = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    document.getElementById('tc-seconds').textContent = String(totalSeconds % 60).padStart(2, '0');
  }

  tickTeaser();
  setInterval(tickTeaser, 1000);
}

// ── Entry point ───────────────────────────────────────────────────────────────
if (isUnlocked()) {
  const lock = document.getElementById('lockscreen');
  lock.style.display = 'none';
  document.getElementById('site').classList.remove('hidden');
  setTimeout(onSiteRevealed, 100);
} else {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ── Effects ───────────────────────────────────────────────────────────────────
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
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}
