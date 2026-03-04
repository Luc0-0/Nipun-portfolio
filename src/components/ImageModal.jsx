import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export const ImageModal = ({ isOpen, src, alt, onClose }) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const imageRef = React.useRef(null);

  const handleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        if (imageRef.current?.requestFullscreen) {
          await imageRef.current.requestFullscreen();
          setIsFullscreen(true);
        }
      } else {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
          setIsFullscreen(false);
        }
      }
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  };

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col"
          >
            {/* Image container */}
            <div className="bg-[var(--color-bg-elevated)] rounded-lg overflow-hidden border border-[var(--color-border)] flex-1 flex items-center justify-center relative group">
              <img
                ref={imageRef}
                src={src}
                alt={alt}
                className="w-full h-full object-contain"
              />

              {/* Fullscreen button in corner */}
              <motion.button
                onClick={handleFullscreen}
                className="absolute bottom-4 right-4 bg-black/70 hover:bg-black/90 text-white rounded-lg p-3 transition-all opacity-0 group-hover:opacity-100"
                aria-label="Toggle fullscreen"
                title="Fullscreen"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M8 3H5a2 2 0 00-2 2v3m16-5h3a2 2 0 012 2v3M3 16v3a2 2 0 002 2h3m13 0h3a2 2 0 002-2v-3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.button>
            </div>

            {/* Close button above */}
            <button
              onClick={onClose}
              className="absolute -top-10 right-0 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-2 text-sm"
              aria-label="Close modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              ESC
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const ExpandableImage = ({ src, alt, className = "" }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const imgRef = React.useRef(null);

  const handleFullscreenClick = async (e) => {
    e.stopPropagation();
    try {
      if (imgRef.current?.requestFullscreen) {
        await imgRef.current.requestFullscreen();
      }
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  };

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <div
        className={`relative cursor-pointer group ${className}`}
        onClick={() => setIsOpen(true)}
      >
        <img ref={imgRef} src={src} alt={alt} className="w-full h-auto display-block transition-all duration-300" />
        
        {/* Fullscreen button in corner - always visible */}
        <button
          onClick={handleFullscreenClick}
          className="absolute bottom-4 right-4 z-10 bg-black/70 hover:bg-black/90 text-white rounded-lg p-2 transition-all cursor-pointer"
          aria-label="Expand image fullscreen"
          type="button"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M8 3H5a2 2 0 00-2 2v3m0 6v3a2 2 0 002 2h3m6 0h3a2 2 0 002-2v-3m0-6V5a2 2 0 00-2-2h-3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Center expand icon on hover */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="bg-[var(--color-accent)] text-obsidian-900 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M8 3H5a2 2 0 00-2 2v3m0 6v3a2 2 0 002 2h3m6 0h3a2 2 0 002-2v-3m0-6V5a2 2 0 00-2-2h-3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 pointer-events-none"
        >
          Click to expand
        </motion.div>
      </div>

      <ImageModal
        isOpen={isOpen}
        src={src}
        alt={alt}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};
