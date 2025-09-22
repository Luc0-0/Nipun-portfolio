import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    purpose: '',
    company: ''
  });

  useEffect(() => {
    // Check if user has already provided info
    const hasVisited = localStorage.getItem('portfolio_visitor_info');
    if (!hasVisited) {
      // Show modal after a short delay
      setTimeout(() => setIsOpen(true), 2000);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Send to Google Analytics
    if (window.gtag) {
      window.gtag('event', 'visitor_info_submitted', {
        custom_parameter_name: formData.name,
        custom_parameter_email: formData.email,
        custom_parameter_purpose: formData.purpose,
        custom_parameter_company: formData.company,
        event_category: 'engagement',
        event_label: 'welcome_form'
      });

      // Set user properties
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        custom_map: {
          'visitor_name': formData.name,
          'visitor_purpose': formData.purpose
        }
      });
    }

    // Store in localStorage to avoid showing again
    localStorage.setItem('portfolio_visitor_info', JSON.stringify({
      ...formData,
      timestamp: new Date().toISOString()
    }));

    setIsOpen(false);
  };

  const handleSkip = () => {
    if (window.gtag) {
      window.gtag('event', 'welcome_modal_skipped', {
        event_category: 'engagement',
        event_label: 'welcome_form'
      });
    }
    
    localStorage.setItem('portfolio_visitor_info', JSON.stringify({
      skipped: true,
      timestamp: new Date().toISOString()
    }));
    
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-gradient-to-br from-gray-900 to-black border border-amber-400/30 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
          >
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <span className="text-2xl">👋</span>
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-2">Welcome to My Portfolio!</h2>
              <p className="text-gray-300 text-sm">
                I'd love to know more about you to provide a personalized experience
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-amber-400 focus:outline-none transition-colors"
                  required
                />
              </div>
              
              <div>
                <input
                  type="email"
                  placeholder="Email (optional)"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-amber-400 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <select
                  value={formData.purpose}
                  onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-amber-400 focus:outline-none transition-colors"
                >
                  <option value="">What brings you here?</option>
                  <option value="hiring">Looking to hire</option>
                  <option value="collaboration">Potential collaboration</option>
                  <option value="student">Fellow student</option>
                  <option value="inspiration">Seeking inspiration</option>
                  <option value="networking">Networking</option>
                  <option value="other">Just browsing</option>
                </select>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Company/Organization (optional)"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-amber-400 focus:outline-none transition-colors"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleSkip}
                  className="flex-1 px-4 py-3 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Skip
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold rounded-lg hover:from-amber-400 hover:to-orange-400 transition-all transform hover:scale-105"
                >
                  Continue
                </button>
              </div>
            </form>

            <p className="text-xs text-gray-400 text-center mt-4">
              This helps me understand my audience better. Your information is private and secure.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeModal;