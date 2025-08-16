// Basic code protection utilities
export const disableDevTools = () => {
  // Disable right-click
  document.addEventListener('contextmenu', e => e.preventDefault());
  
  // Disable F12, Ctrl+Shift+I, Ctrl+U
  document.addEventListener('keydown', e => {
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.key === 'u')) {
      e.preventDefault();
    }
  });
  
  // Add copyright watermark
  const watermark = document.createElement('div');
  watermark.innerHTML = '© 2024 Nipun Shrestha - All Rights Reserved';
  watermark.style.cssText = 'position:fixed;bottom:10px;right:10px;font-size:10px;color:rgba(255,255,255,0.3);pointer-events:none;z-index:9999;user-select:none;';
  document.body.appendChild(watermark);
};

// Console warning
export const consoleWarning = () => {
  console.clear();
  console.log('%c⚠️ UNAUTHORIZED ACCESS PROHIBITED ⚠️', 'color: red; font-size: 20px; font-weight: bold;');
  console.log('%c© 2024 Nipun Shrestha - All Rights Reserved', 'color: orange; font-size: 16px; font-weight: bold;');
  console.log('%cThis portfolio is copyrighted. Code inspection, copying, or reverse engineering is strictly prohibited.', 'color: red; font-size: 14px;');
  console.log('%cFor licensing inquiries: contact@nipunsujesh.com', 'color: orange; font-size: 12px;');
};

// Detect dev tools
export const detectDevTools = () => {
  let devtools = {open: false, orientation: null};
  const threshold = 160;
  
  setInterval(() => {
    if (window.outerHeight - window.innerHeight > threshold || 
        window.outerWidth - window.innerWidth > threshold) {
      if (!devtools.open) {
        devtools.open = true;
        console.clear();
        document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-size:24px;color:red;">Developer tools detected. Please close to continue.</div>';
      }
    }
  }, 500);
};