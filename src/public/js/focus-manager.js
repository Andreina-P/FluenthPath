/**
 * FocusManager — Utility to move keyboard focus after dynamic content changes.
 *
 * WCAG relevance:
 * - 2.4.3 (Focus order): Focus must move logically when content changes.
 * - 2.4.7 (Focus visible): Target must be visually focused.
 * - 2.4.11 (Focus not obscured): Scrolls element into view.
 *
 * Usage:
 *   FocusManager.moveTo('#feedback-heading');
 *   FocusManager.moveTo(document.getElementById('error-summary'));
 */
const FocusManager = {
  /**
   * Move focus to a specific element.
   * The element should have tabindex="-1" so it can receive
   * programmatic focus without appearing in the natural tab order.
   *
   * @param {string|Element} target — CSS selector or DOM element
   */
  moveTo(target) {
    const el = typeof target === 'string'
      ? document.querySelector(target)
      : target;

    if (!el) return;

    // Ensure element can receive focus
    if (!el.hasAttribute('tabindex')) {
      el.setAttribute('tabindex', '-1');
    }

    // Move focus
    el.focus({ preventScroll: false });

    // Scroll into view — ensures focus is not obscured (WCAG 2.4.11)
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  },
};

// Auto-focus elements marked with data-autofocus on page load
document.addEventListener('DOMContentLoaded', () => {
  const autoTarget = document.querySelector('[data-autofocus]');
  if (autoTarget) {
    FocusManager.moveTo(autoTarget);
  }
});

// Make available globally
window.FocusManager = FocusManager;
