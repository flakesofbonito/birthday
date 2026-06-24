const MESSAGE = `Well, Happy Birthday! Medyo rushed na tong website kaya hints of it is made by AI. I tried my best, but I just want you to know na I love you so much and I miss you already, sorry I've made a huge mistake on ending it instead of talking it out. Ayun lang, Enjoy your day!^^`;

function typewrite(text, el, speed = 28) {
  let i = 0;
  const cursor = document.querySelector('.tw-cursor');

  function type() {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
      const delay = text[i - 1] === '\n' ? speed * 6 :
                    text[i - 1] === ',' || text[i - 1] === '.' ? speed * 4 :
                    speed + (Math.random() * 20 - 10);
      setTimeout(type, delay);
    } else {
      if (cursor) cursor.style.display = 'none';
    }
  }

  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      obs.disconnect();
      setTimeout(type, 600);
    }
  }, { threshold: 0.3 });

  obs.observe(el.parentElement.parentElement);
}

document.addEventListener('DOMContentLoaded', () => {
  const textEl = document.getElementById('typewriter-text');
  if (textEl) typewrite(MESSAGE, textEl);
});
