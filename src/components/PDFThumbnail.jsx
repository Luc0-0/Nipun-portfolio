// src/components/PDFThumbnail.jsx
// PDF thumbnail component with preview functionality

import React, { useState, useEffect } from 'react';

export default function PDFThumbnail({ 
  pdfUrl, 
  title, 
  className = "",
  showPreview = true,
  fallbackIcon = "📄"
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [thumbnailData, setThumbnailData] = useState(null);

  // Generate a simple PDF thumbnail using canvas
  const generatePDFThumbnail = async (url) => {
    try {
      // For now, we'll create a styled PDF preview card
      // In a production environment, you'd use PDF.js or a server-side service
      return null;
    } catch (error) {
      console.error('Error generating PDF thumbnail:', error);
      return null;
    }
  };

  useEffect(() => {
    if (pdfUrl && showPreview) {
      generatePDFThumbnail(pdfUrl).then((data) => {
        setThumbnailData(data);
        setIsLoading(false);
      }).catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [pdfUrl, showPreview]);

  const handleThumbnailClick = () => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    }
  };

  return (
    <div 
      className={`relative w-full h-32 rounded-lg border border-amber-400/30 bg-gradient-to-br from-amber-500/10 to-transparent overflow-hidden group-hover:border-amber-400/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-amber-400/20 cursor-pointer ${className}`}
      onClick={handleThumbnailClick}
    >
      {showPreview && pdfUrl && !hasError ? (
        <>
          {/* Certificate Preview Card */}
          <div className="w-full h-full bg-white dark:bg-gray-50 flex flex-col p-3 relative overflow-hidden">
            {/* Certificate Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h4 className="text-xs font-bold text-gray-900 mb-1 leading-tight">
                  Nipun Sujesh
                </h4>
                <p className="text-xs text-gray-600 mb-1">
                  has successfully completed
                </p>
                <h5 className="text-xs font-bold text-gray-900 mb-1 leading-tight">
                  {title}
                </h5>
                <p className="text-xs text-gray-500 leading-tight">
                  an online non-credit course authorized by IBM and offered through Coursera
                </p>
              </div>
              
              {/* Coursera Logo Thumbnail */}
              <div className="ml-2 w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg transform rotate-3">
                <div className="text-white text-center">
                  <div className="text-xs font-bold">COURSE</div>
                  <div className="text-xs font-bold">CERTIFICATE</div>
                  <div className="text-xs">Coursera</div>
                </div>
              </div>
            </div>
            
            {/* Certificate Footer */}
            <div className="mt-auto">
              <div className="text-center">
                <div className="text-xs font-semibold text-gray-800 mb-1">
                  Professional Certificate
                </div>
                <div className="text-xs text-gray-600">
                  IBM - Coursera • 2024
                </div>
              </div>
            </div>
            
            {/* Certificate Border Effect */}
            <div className="absolute inset-0 border-2 border-amber-300 rounded-lg opacity-30"></div>
          </div>
          
          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="text-white text-center">
              <div className="w-16 h-16 bg-amber-500 rounded-lg flex items-center justify-center mb-2 mx-auto shadow-lg">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                </svg>
              </div>
              <p className="text-sm font-semibold">View Full Certificate</p>
              <p className="text-xs opacity-90">Click to open PDF</p>
            </div>
          </div>
        </>
      ) : (
        /* Fallback icon when no PDF or error */
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-2xl bg-gradient-to-br from-amber-500 to-amber-600 group-hover:shadow-lg group-hover:shadow-amber-400/50">
              {fallbackIcon}
            </div>
            <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              {hasError ? 'Preview Error' : 'PDF Available'}
            </p>
          </div>
        </div>
      )}
      
      {/* Certificate indicator badge */}
      <div className="absolute top-2 right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
        <span className="text-white text-xs font-bold">✓</span>
      </div>
    </div>
  );
}
