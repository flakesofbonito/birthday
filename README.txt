BIRTHDAY SITE — SETUP GUIDE
============================

FOLDER STRUCTURE
-----------------
birthday/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── stars.js
│   ├── countdown.js
│   ├── main.js
│   ├── typewriter.js
│   ├── notes.js
│   └── lyrics.js
├── assets/
│   └── song.mp3         ← PUT YOUR SONG HERE
└── README.txt


STEP 1 — ADD YOUR SONG
------------------------
Put your mp3 file inside the /assets/ folder.
Rename it exactly: song.mp3

If you want a different filename, change this line in index.html:
  <source src="assets/song.mp3" type="audio/mpeg" />


STEP 2 — FIX THE COUNTDOWN (IMPORTANT)
-----------------------------------------
The lock screen counts down to June 25, PHILIPPINE TIME.
It uses your device clock converted to Asia/Manila timezone.
It will automatically unlock at midnight on June 25 PH time.

If the lock is not showing (goes straight to site):
  → You're testing it on or after June 25. That's correct behavior.
  → To test the lock screen, temporarily change the date check in
    js/countdown.js. Find isUnlocked() and change the date to tomorrow.


STEP 3 — PERSONALIZE THE CONTENT
----------------------------------

HER NAME
  In index.html, find: <h1 id="hero-name">Her Name</h1>
  Replace "Her Name" with her actual name.

HER AGE
  In index.html, find: <div class="big-number" id="age-number">18</div>
  Change 18 to her actual age (17 if born 2008, turning 17 on June 25 2025).

BIRTHDAY MESSAGE (typewriter)
  Open js/typewriter.js
  Replace the MESSAGE variable text with your real message.
  Use \n\n for paragraph breaks. The typewriter effect handles the rest.

BULLETIN BOARD NOTES
  Open index.html, find the <div id="bulletin-board"> section.
  Each .note-back div is one note. Replace the placeholder text.
  You can add or remove notes — just copy/paste a full .note block.

PHOTO GALLERY
  To add a real photo, replace a .photo-slot block:

  BEFORE:
    <div class="photo-slot">
      <div class="photo-placeholder">📷 add photo here</div>
      <p class="photo-caption">caption here</p>
    </div>

  AFTER:
    <div class="photo-slot">
      <img src="assets/photo1.jpg" alt="us" />
      <p class="photo-caption">your caption</p>
    </div>

  Put the photo files inside the /assets/ folder.

FINALE CLOSING LINE
  Find: <p class="finale-sub">write a short closing line here</p>
  Replace with your own words.

JUNE 26 AFTER-MESSAGE
  Find the <div id="after-message"> section in index.html.
  Write your private message inside the .after-text div.
  This only shows at midnight on June 26 PH time.


STEP 4 — LYRICS SYNC (optional)
---------------------------------
Open js/lyrics.js.
Add your song lyrics with timestamps (in seconds):

  const LYRICS = [
    { time: 0,   text: "" },
    { time: 8,   text: "♪ first line of the song" },
    { time: 16,  text: "♪ second line" },
    ...
  ];

Play your song, pause at each lyric line, note the time in seconds.


STEP 5 — HOW TO OPEN LOCALLY
------------------------------
You CANNOT just double-click index.html — audio and some features
require a local server. Use one of these:

OPTION A (easiest — VS Code):
  Install the "Live Server" extension.
  Right-click index.html → "Open with Live Server"

OPTION B (Python):
  Open terminal in the birthday/ folder and run:
  python3 -m http.server 8080
  Then open: http://localhost:8080

OPTION C (Node):
  npm install -g serve
  serve .
  Then open the URL it gives you.


STEP 6 — HOW TO HOST IT (so she can open a link)
--------------------------------------------------
Free options:

NETLIFY (easiest):
  1. Go to netlify.com → Log in → "Add new site" → "Deploy manually"
  2. Drag your entire birthday/ folder onto the upload area
  3. You get a link like: https://something.netlify.app

GITHUB PAGES:
  1. Create a GitHub repo, upload all files
  2. Go to Settings → Pages → Deploy from branch (main, /root)
  3. You get: https://yourusername.github.io/reponame


NOTES ON AUDIO
---------------
- Browsers block autoplay until the user interacts with the page.
- The song starts automatically when the countdown reaches 0 and the
  site reveals itself (the transition counts as interaction).
- If opened directly (already past June 25), the song tries to play
  on load — it may be blocked. The mute/unmute button (♪) in the top
  bar will start it if it didn't autoplay.
- Volume fades in gradually so it's not jarring.


THAT'S IT. Good luck. She's going to love it.
