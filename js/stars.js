const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let stars = [];
let W, H;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

function initStars() {
  stars = [];
  const count = Math.floor((W * H) / 2800);
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.6 + 0.2,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.85 ? '#c4b5fd' : Math.random() > 0.6 ? '#e9d5ff' : '#ffffff'
    });
  }
}

function drawStars(t) {
  ctx.clearRect(0, 0, W, H);
  stars.forEach(s => {
    const twinkle = (Math.sin(t * s.speed * 60 + s.phase) + 1) / 2;
    ctx.globalAlpha = s.alpha * (0.4 + 0.6 * twinkle);
    ctx.fillStyle = s.color;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

function loop(t) {
  drawStars(t);
  requestAnimationFrame(loop);
}

resize();
initStars();
window.addEventListener('resize', () => { resize(); initStars(); });
requestAnimationFrame(loop);
