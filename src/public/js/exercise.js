/**
 * exercise.js — Exercise interaction logic.
 *
 * WCAG 3.3.4: The Continue/Check button uses aria-disabled="true"
 * (NOT the HTML disabled attribute) so it remains in the Tab order
 * and NVDA announces it as "dimmed". JavaScript prevents submission
 * until an answer is selected, then removes aria-disabled.
 *
 * WCAG 2.1.1: All interactions are keyboard-native.
 * WCAG 4.1.3: Changes announced via LiveRegion.
 */
document.addEventListener('DOMContentLoaded', () => {

  const submitBtn  = document.getElementById('exercise-submit');
  const form       = document.getElementById('exercise-form');
  const selectHint = document.getElementById('select-hint');

  if (!submitBtn || !form) return;

  /* ── Multiple choice: enable on radio selection ──────── */
  const radios = form.querySelectorAll('input[type="radio"][name="answer"]');

  if (radios.length > 0) {
    radios.forEach(radio => {
      radio.addEventListener('change', () => {
        enableSubmit();
        LiveRegion.announce('Option selected. You can now continue.');
      });
    });
  }

  /* ── Translate / Listening: enable when input has text ── */
  const textInput = form.querySelector('input[type="text"][name="answer"]');

  if (textInput) {
    textInput.addEventListener('input', () => {
      if (textInput.value.trim().length > 0) {
        enableSubmit();
      } else {
        disableSubmit();
      }
    });
  }

  /* ── Word bank: enabled by word-bank.js when sentence has words ── */
  // word-bank.js calls window.ExerciseForm.enableSubmit() directly.

  /* ── Speaking: button is always enabled (no evaluation) ── */
  const speakingBtn = document.getElementById('speaking-done');
  if (speakingBtn) {
    // Speaking exercises don't use the disabled pattern
    // The "I practiced this" button submits directly
  }

  /* ── Prevent submission while aria-disabled ──────────── */
  form.addEventListener('submit', (e) => {
    if (submitBtn.getAttribute('aria-disabled') === 'true') {
      e.preventDefault();
      // Move focus to the hint text so screen reader reads it
      if (selectHint) selectHint.focus();
    }
  });

  /* ── Enable / Disable helpers ────────────────────────── */
  function enableSubmit() {
    submitBtn.removeAttribute('aria-disabled');
    submitBtn.classList.remove('btn--inactive');
    if (selectHint) selectHint.style.display = 'none';
  }

  function disableSubmit() {
    submitBtn.setAttribute('aria-disabled', 'true');
    submitBtn.classList.add('btn--inactive');
    if (selectHint) selectHint.style.display = '';
  }

  // Expose for word-bank.js
  window.ExerciseForm = { enableSubmit, disableSubmit };

});
