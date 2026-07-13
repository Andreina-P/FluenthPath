/**
 * LiveRegion — Announce dynamic content changes to screen readers.
 *
 * WCAG 4.1.3: Status messages must be programmatically determinable
 * without receiving focus. This uses the #live-region element
 * (role="status" aria-live="polite") defined in main.ejs.
 *
 * Usage:
 *   LiveRegion.announce('Correct! You earned 15 XP.');
 *   LiveRegion.announce('Exercise 6 of 10 completed.');
 */
const LiveRegion = {
  _el: null,

  /**
   * Get or cache the live region element.
   */
  _getElement() {
    if (!this._el) {
      this._el = document.getElementById('live-region');
    }
    return this._el;
  },

  /**
   * Announce a message to screen readers via the live region.
   *
   * The technique: clear the region first, then set new text after
   * a short delay. This forces screen readers to treat the new text
   * as a change event and announce it, even if the text is the same
   * as the previous announcement.
   *
   * @param {string} message — Text to announce
   * @param {number} delay  — Delay in ms before announcing (default: 100)
   */
  announce(message, delay = 100) {
    const el = this._getElement();
    if (!el) return;

    // Clear first to trigger change detection
    el.textContent = '';

    // Set new message after delay
    setTimeout(() => {
      el.textContent = message;
    }, delay);
  },

  /**
   * Clear the live region (silent).
   */
  clear() {
    const el = this._getElement();
    if (el) el.textContent = '';
  },
};

// Make available globally
window.LiveRegion = LiveRegion;
