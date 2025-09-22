// src/components/GoogleAnalytics.jsx
import { useEffect } from 'react';

const GoogleAnalytics = () => {
  useEffect(() => {
    // Create and load gtag script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-JFVMFVEPTQ';
    document.head.appendChild(script1);

    // Initialize gtag with custom parameters
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-JFVMFVEPTQ', {
        custom_map: {
          'custom_parameter_name': 'visitor_name',
          'custom_parameter_email': 'visitor_email',
          'custom_parameter_purpose': 'visitor_purpose',
          'custom_parameter_company': 'visitor_company'
        }
      });
      
      // Track page view
      gtag('event', 'page_view', {
        page_title: 'Nipun Sujesh Portfolio',
        page_location: window.location.href
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