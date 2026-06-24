const LYRICS = [
  { time: 0,   text: "" },
  { time: 5,   text: "♪ your song starts here" },
  { time: 12,  text: "♪ add your lyric lines..." },
  { time: 20,  text: "♪ with the timestamp in seconds" },
  { time: 30,  text: "♪ edit this file: js/lyrics.js" },
  { time: 42,  text: "♪ set time: to match each line" },
  { time: 55,  text: "♪ and text: to the lyric" },
  { time: 70,  text: "♪ it'll sync automatically ✦" },
];

document.addEventListener('DOMContentLoaded', () => {
  const music = document.getElementById('bg-music');
  const lyricEl = document.getElementById('lyric-line');

  let lastIndex = -1;

  function updateLyric() {
    const t = music.currentTime;
    let current = -1;
    for (let i = 0; i < LYRICS.length; i++) {
      if (t >= LYRICS[i].time) current = i;
      else break;
    }

    if (current !== lastIndex) {
      lastIndex = current;
      const line = LYRICS[current]?.text || '';
      lyricEl.classList.remove('visible');
      setTimeout(() => {
        lyricEl.textContent = line;
        if (line) lyricEl.classList.add('visible');
      }, 300);
    }
  }

  setInterval(updateLyric, 500);
});
