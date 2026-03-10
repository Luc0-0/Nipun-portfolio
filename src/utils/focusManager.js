/**
 * Focus Manager - Prevents unwanted auto-focus on page load
 */

export const preventAutoFocus = () => {
  // Blur any active element when page loads
  if (document.activeElement && document.activeElement !== document.body) {
    document.activeElement.blur();
  }
};

export const setupFocusManagement = () => {
  // Prevent auto-focus on page transitions
  document.addEventListener('focus', (e) => {
    if (e.target === document || e.target === window) {
      return;
    }
    // Let intentional focus events through
  }, true);
};
