// src/components/GoogleAnalytics.jsx
import { useEffect } from 'react';

const GoogleAnalytics = () => {
  useEffect(() => {
    // Get tracking ID from environment or use default
    const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || 'G-JFVMFVEPTQ';

    // Create and load gtag script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script1);

    // Initialize gtag with custom parameters
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_TRACKING_ID}', {
        // Cross-domain tracking for nipun.space and old domain
        linker: {
          domains: ['nipun.space', 'nipun-portfolio.netlify.app']
        },
        // Custom dimensions mapping
        custom_map: {
          'custom_parameter_name': 'visitor_name',
          'custom_parameter_email': 'visitor_email',
          'custom_parameter_purpose': 'visitor_purpose',
          'custom_parameter_company': 'visitor_company'
        },
        // Cookie settings for better tracking
        cookie_flags: 'SameSite=None;Secure'
      });
      
      // Track page view with enhanced data
      gtag('event', 'page_view', {
        page_title: 'Nipun Sujesh Portfolio',
        page_location: window.location.href,
        page_path: window.location.pathname
      });
    `;
    document.head.appendChild(script2);

    // Track initial visit
    const trackVisit = () => {
      if (window.gtag) {
        window.gtag('event', 'portfolio_visit', {
          event_category: 'engagement',
          event_label: 'initial_visit',
          value: 1
        });
      }
    };

    // Delay tracking to ensure gtag is loaded
    setTimeout(trackVisit, 1000);

    // Cleanup
    return () => {
      if (document.head.contains(script1)) document.head.removeChild(script1);
      if (document.head.contains(script2)) document.head.removeChild(script2);
    };
  }, []);

  return null;
};

export default GoogleAnalytics;