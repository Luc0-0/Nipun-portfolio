// Basic code protection utilities
export const disableDevTools = () => {
  // Allow Google Analytics and essential scripts
  if (window.gtag || window.dataLayer) {
    return; // Don't block if Google Analytics is present
  }
  
  // Disable right-click (but allow on development)
  if (window.location.hostname !== 'localhost') {
    document.addEventListener('contextmenu', e => e.preventDefault());
  }
  
  // Add copyright watermark
  const watermark = document.createElement('div');
  watermark.innerHTML = '© 2024 Nipun Sujesh - All Rights Reserved';
  watermark.style.cssText = 'position:fixed;bottom:10px;right:10px;font-size:10px;color:rgba(255,255,255,0.3);pointer-events:none;z-index:9999;user-select:none;';
  document.body.appendChild(watermark);
};

// Console warning
export const consoleWarning = () => {
  // Don't clear console if Google Analytics is present
  if (!window.gtag && !window.dataLayer) {
    console.clear();
  }
  console.log('%c© 2024 Nipun Sujesh - All Rights Reserved', 'color: orange; font-size: 16px; font-weight: bold;');
  console.log('%cFor licensing inquiries: nipunsujesh28@gmail.com', 'color: orange; font-size: 12px;');
};

// Detect dev tools (disabled to allow Google Analytics)
export const detectDevTools = () => {
  // Disabled to prevent interference with Google Analytics
  // Google Analytics needs browser APIs that this function blocks
  return;
};