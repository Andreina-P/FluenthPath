/**
 * word-bank.js — Accessible word bank for sentence building.
 *
 * Replaces drag-and-drop with keyboard-native buttons.
 * WCAG 2.1.1: All via Tab + Enter/Space.
 * WCAG 2.5.7: No dragging movements required.
 * WCAG 4.1.3: Changes announced via LiveRegion.
 *
 * Each word is a <button> with aria-pressed.
 * Pressing Enter/Space appends the word to the sentence builder.
 * "Remove last word" button undoes the last addition.
 * A hidden <input name="answer"> is synced with the current sentence.
 */
document.addEventListener('DOMContentLoaded', () => {

  const container   = document.getElementById('word-bank');
  const builder     = document.getElementById('sentence-builder');
  const hiddenInput = document.getElementById('word-bank-answer');
  const removeBtn   = document.getElementById('word-bank-remove');
  const placeholder = document.getElementById('builder-placeholder');

  if (!container || !builder || !hiddenInput) return;

  const selectedWords = [];

  /* ── Word button click ───────────────────────────────── */
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.word-bank__btn');
    if (!btn || btn.getAttribute('aria-pressed') === 'true') return;

    const word = btn.dataset.word;
    selectedWords.push(word);

    // Mark button as used
    btn.setAttribute('aria-pressed', 'true');
    btn.classList.add('word-bank__btn--used');

    updateBuilder();
    LiveRegion.announce(`Added "${word}". Current sentence: ${selectedWords.join(' ')}`);
  });

  /* ── Remove last word ────────────────────────────────── */
  if (removeBtn) {
    removeBtn.addEventListener('click', () => {
      if (selectedWords.length === 0) {
        LiveRegion.announce('No words to remove.');
        return;
      }

      const removed = selectedWords.pop();

      // Find the button for this word and re-enable it
      const buttons = container.querySelectorAll('.word-bank__btn');
      for (let i = buttons.length - 1; i >= 0; i--) {
        if (buttons[i].dataset.word === removed &&
            buttons[i].getAttribute('aria-pressed') === 'true') {
          buttons[i].setAttribute('aria-pressed', 'false');
          buttons[i].classList.remove('word-bank__btn--used');
          break;
        }
      }

      updateBuilder();
      LiveRegion.announce(`Removed "${removed}". Current sentence: ${selectedWords.join(' ') || 'empty'}`);
    });
  }

  /* ── Sync hidden input and visual builder ────────────── */
  function updateBuilder() {
    const sentence = selectedWords.join(' ');
    hiddenInput.value = sentence;

    // Update visual builder
    if (selectedWords.length === 0) {
      builder.innerHTML = '';
      if (placeholder) {
        builder.appendChild(placeholder);
        placeholder.style.display = '';
      }
      // Disable submit
      if (window.ExerciseForm) window.ExerciseForm.disableSubmit();
    } else {
      if (placeholder) placeholder.style.display = 'none';
      builder.innerHTML = selectedWords.map(w =>
        `<span class="sentence-builder__word">${escapeHtml(w)}</span>`
      ).join('');
      // Enable submit
      if (window.ExerciseForm) window.ExerciseForm.enableSubmit();
    }
  }

  /* ── Escape HTML to prevent XSS ──────────────────────── */
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

});
