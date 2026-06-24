document.addEventListener('DOMContentLoaded', () => {
  const notes = document.querySelectorAll('.note');

  notes.forEach(note => {
    note.addEventListener('click', () => {
      const wasOpen = note.classList.contains('open');
      notes.forEach(n => n.classList.remove('open'));
      if (!wasOpen) note.classList.add('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.note')) {
      notes.forEach(n => n.classList.remove('open'));
    }
  });
});
