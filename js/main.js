document.addEventListener('DOMContentLoaded', () => {
  const muteBtn = document.getElementById('mute-btn');
  const music = document.getElementById('bg-music');
  let muted = false;

  muteBtn.addEventListener('click', () => {
    muted = !muted;
    music.muted = muted;
    muteBtn.textContent = muted ? '✕' : '♪';
    muteBtn.classList.toggle('muted', muted);
  });

  const afterClose = document.getElementById('after-close');
  if (afterClose) {
    afterClose.addEventListener('click', () => {
      document.getElementById('after-message').classList.add('hidden');
    });
  }

  document.querySelectorAll(
    '.section-eyebrow, .section-title, .age-inner, .message-wrap, .bulletin-wrap, .gallery-wrap, .finale-inner'
  ).forEach(el => {
    el.classList.add('scroll-reveal');
  });

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    document.querySelectorAll('section').forEach(sec => {
      const nebula = sec.querySelector('.nebula-bg');
      if (nebula) nebula.style.transform = `translateY(${scrollY * 0.25}px)`;
    });
  }, { passive: true });
});
