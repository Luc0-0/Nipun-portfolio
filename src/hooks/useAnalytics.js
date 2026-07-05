import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import analytics from '../utils/analytics';
import globalAnalytics from '../utils/globalAnalytics';

export const useAnalytics = () => {
  const location = useLocation();
  const startTime = useRef(Date.now());
  const currentPage = useRef('');

  useEffect(() => {
    // Track page view locally and globally
    const page = location.pathname || 'home';
    analytics.trackPageView(page);
    analytics.trackDevice();
    globalAnalytics.trackPageView(page);
    
    // Track visit on first page load
    if (!currentPage.current) {
      globalAnalytics.trackVisit();
    }
    
    // Update current page and reset timer
    if (currentPage.current) {
      const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
      analytics.trackTimeSpent(currentPage.current, timeSpent);
    }
    
    currentPage.current = page;
    startTime.current = Date.now();

    // Track time spent when leaving page
    return () => {
      if (currentPage.current) {
        const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
        analytics.trackTimeSpent(currentPage.current, timeSpent);
      }
    };
  }, [location]);

  const trackProjectClick = (projectName) => {
    analytics.trackProjectClick(projectName);
    globalAnalytics.trackProjectClick(projectName);
  };

  const trackBlogView = (blogTitle) => {
    analytics.trackBlogView(blogTitle);
    globalAnalytics.trackBlogView(blogTitle);
  };

  const trackCustomEvent = (eventName, data = {}) => {
    // For future custom event tracking
    console.log('Custom event:', eventName, data);
  };

  return {
    trackProjectClick,
    trackBlogView,
    trackCustomEvent
  };
};