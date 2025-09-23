import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import analytics from "../utils/analytics";
import globalAnalytics from "../utils/globalAnalytics";

const AnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);

  useEffect(() => {
    // Check if user is admin (stored in localStorage)
    const adminStatus = localStorage.getItem("portfolio_admin") === "true";
    setIsAdmin(adminStatus);

    if (adminStatus) {
      loadAnalytics();
      const interval = setInterval(loadAnalytics, 30000);
      return () => clearInterval(interval);
    }
  }, []);

  const loadAnalytics = async () => {
    try {
      const globalData = await globalAnalytics.getGlobalAnalytics();
      setAnalyticsData(globalData);
    } catch (error) {
      const data = analytics.getAnalytics();
      const metrics = analytics.getEngagementMetrics();
      const topProjects = analytics.getTopProjects();
      const topPages = analytics.getTopPages();
      setAnalyticsData({ ...data, metrics, topProjects, topPages });
    }
  };

  const toggleVisibility = () => {
    if (!isAdmin) {
      setShowAdminPrompt(true);
      return;
    }
    setIsVisible(!isVisible);
  };

  const handleAdminLogin = (password) => {
    // Simple password check - in production, use proper authentication
    if (password === "luc328") {
      localStorage.setItem("portfolio_admin", "true");
      setIsAdmin(true);
      setShowAdminPrompt(false);
      loadAnalytics();
      const interval = setInterval(loadAnalytics, 30000);
    } else {
      alert("Incorrect password");
    }
  };

  const clearAnalytics = () => {
    if (confirm("Are you sure you want to clear all analytics data?")) {
      analytics.clearData();
      loadAnalytics();
    }
  };

  // Admin login prompt
  if (showAdminPrompt) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h3 className="text-white text-lg font-bold mb-4">
            Admin Access Required
          </h3>
          <input
            type="password"
            placeholder="Enter admin password"
            className="w-full p-2 bg-gray-800 text-white rounded mb-4"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleAdminLogin(e.target.value);
              }
            }}
          />
          <div className="flex gap-2">
            <button
              onClick={() => setShowAdminPrompt(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Don't return null - we want the button to always show
  if (!isAdmin) {
    // Show button but no dashboard content
    return (
      <>
        {/* Analytics Toggle Button - Always visible */}
        <motion.button
          onClick={toggleVisibility}
          className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          📊
        </motion.button>
      </>
    );
  }

  if (!analyticsData) return null;

  return (
    <>
      {/* Analytics Toggle Button - Always visible */}
      <motion.button
        onClick={toggleVisibility}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        📊
      </motion.button>

      {/* Analytics Dashboard */}
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed top-0 right-0 h-full w-80 bg-gray-900 text-white shadow-2xl z-40 overflow-y-auto"
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Portfolio Analytics</h3>
              <button
                onClick={toggleVisibility}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Key Metrics */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-3 text-blue-400">
                Global Overview
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-800 p-3 rounded">
                  <div className="text-2xl font-bold text-green-400">
                    {analyticsData.totalVisits || 0}
                  </div>
                  <div className="text-xs text-gray-400">Total Visits</div>
                </div>
                <div className="bg-gray-800 p-3 rounded">
                  <div className="text-2xl font-bold text-blue-400">
                    {analyticsData.uniqueVisitors || 0}
                  </div>
                  <div className="text-xs text-gray-400">Unique Visitors</div>
                </div>
                <div className="bg-gray-800 p-3 rounded">
                  <div className="text-2xl font-bold text-purple-400">
                    {analyticsData.totalPageViews || 0}
                  </div>
                  <div className="text-xs text-gray-400">Page Views</div>
                </div>
                <div className="bg-gray-800 p-3 rounded">
                  <div className="text-2xl font-bold text-yellow-400">
                    🌍
                  </div>
                  <div className="text-xs text-gray-400">Global Data</div>
                </div>
              </div>
            </div>

            {/* Top Pages */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-3 text-blue-400">
                Popular Pages
              </h4>
              <div className="space-y-2">
                {(analyticsData.topPages || []).map(([page, views], index) => (
                  <div
                    key={page}
                    className="flex justify-between items-center bg-gray-800 p-2 rounded"
                  >
                    <span className="text-sm truncate">{page}</span>
                    <span className="text-xs bg-blue-600 px-2 py-1 rounded">
                      {views}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Projects */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-3 text-blue-400">
                Popular Projects
              </h4>
              <div className="space-y-2">
                {(analyticsData.topProjects || []).map(([project, clicks], index) => (
                  <div
                    key={project}
                    className="flex justify-between items-center bg-gray-800 p-2 rounded"
                  >
                    <span className="text-sm truncate">{project}</span>
                    <span className="text-xs bg-green-600 px-2 py-1 rounded">
                      {clicks}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Device Breakdown */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-3 text-blue-400">
                Devices
              </h4>
              <div className="space-y-2">
                {Object.entries(analyticsData.devices || {}).map(
                  ([device, count]) => (
                    <div
                      key={device}
                      className="flex justify-between items-center bg-gray-800 p-2 rounded"
                    >
                      <span className="text-sm">{device}</span>
                      <span className="text-xs bg-purple-600 px-2 py-1 rounded">
                        {count}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={loadAnalytics}
                className="w-full bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-sm transition-colors"
              >
                Refresh Data
              </button>
              <button
                onClick={clearAnalytics}
                className="w-full bg-red-600 hover:bg-red-700 px-3 py-2 rounded text-sm transition-colors"
              >
                Clear Analytics
              </button>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              Last updated:{" "}
              {new Date(analyticsData.lastUpdated).toLocaleTimeString()}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default AnalyticsDashboard;
