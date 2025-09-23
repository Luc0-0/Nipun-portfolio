// Portfolio Analytics Utility
class PortfolioAnalytics {
  constructor() {
    this.storageKey = 'portfolio_analytics';
    this.sessionKey = 'portfolio_session';
    this.init();
  }

  init() {
    // Initialize analytics data structure
    const defaultData = {
      totalVisits: 0,
      uniqueVisitors: 0,
      pageViews: {},
      projectClicks: {},
      blogViews: {},
      timeSpent: {},
      referrers: {},
      devices: {},
      lastUpdated: new Date().toISOString()
    };

    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify(defaultData));
    }

    this.trackSession();
  }

  trackSession() {
    const sessionId = this.generateSessionId();
    const sessionData = {
      id: sessionId,
      startTime: Date.now(),
      pages: [],
      actions: []
    };
    
    sessionStorage.setItem(this.sessionKey, JSON.stringify(sessionData));
    this.incrementVisits();
  }

  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  getAnalytics() {
    return JSON.parse(localStorage.getItem(this.storageKey));
  }

  updateAnalytics(updates) {
    const current = this.getAnalytics();
    const updated = { ...current, ...updates, lastUpdated: new Date().toISOString() };
    localStorage.setItem(this.storageKey, JSON.stringify(updated));
  }

  incrementVisits() {
    const data = this.getAnalytics();
    data.totalVisits += 1;
    
    // Check if unique visitor (simple check based on localStorage)
    if (!localStorage.getItem('portfolio_visitor_id')) {
      localStorage.setItem('portfolio_visitor_id', this.generateSessionId());
      data.uniqueVisitors += 1;
    }
    
    this.updateAnalytics(data);
  }

  trackPageView(page) {
    const data = this.getAnalytics();
    data.pageViews[page] = (data.pageViews[page] || 0) + 1;
    this.updateAnalytics(data);

    // Track in session
    const session = JSON.parse(sessionStorage.getItem(this.sessionKey));
    session.pages.push({ page, timestamp: Date.now() });
    sessionStorage.setItem(this.sessionKey, JSON.stringify(session));
  }

  trackProjectClick(projectName) {
    const data = this.getAnalytics();
    data.projectClicks[projectName] = (data.projectClicks[projectName] || 0) + 1;
    this.updateAnalytics(data);
  }

  trackBlogView(blogTitle) {
    const data = this.getAnalytics();
    data.blogViews[blogTitle] = (data.blogViews[blogTitle] || 0) + 1;
    this.updateAnalytics(data);
  }

  trackTimeSpent(page, seconds) {
    const data = this.getAnalytics();
    data.timeSpent[page] = (data.timeSpent[page] || 0) + seconds;
    this.updateAnalytics(data);
  }

  trackDevice() {
    const data = this.getAnalytics();
    const device = this.getDeviceType();
    data.devices[device] = (data.devices[device] || 0) + 1;
    this.updateAnalytics(data);
  }

  getDeviceType() {
    const width = window.innerWidth;
    if (width < 768) return 'Mobile';
    if (width < 1024) return 'Tablet';
    return 'Desktop';
  }

  getTopProjects(limit = 5) {
    const data = this.getAnalytics();
    return Object.entries(data.projectClicks)
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit);
  }

  getTopPages(limit = 5) {
    const data = this.getAnalytics();
    return Object.entries(data.pageViews)
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit);
  }

  getEngagementMetrics() {
    const data = this.getAnalytics();
    const totalPageViews = Object.values(data.pageViews).reduce((a, b) => a + b, 0);
    const avgTimePerPage = Object.values(data.timeSpent).reduce((a, b) => a + b, 0) / totalPageViews || 0;
    
    return {
      totalVisits: data.totalVisits,
      uniqueVisitors: data.uniqueVisitors,
      totalPageViews,
      avgTimePerPage: Math.round(avgTimePerPage),
      bounceRate: data.totalVisits > 0 ? ((data.totalVisits - totalPageViews) / data.totalVisits * 100).toFixed(1) : 0
    };
  }

  exportData() {
    return {
      analytics: this.getAnalytics(),
      session: JSON.parse(sessionStorage.getItem(this.sessionKey) || '{}'),
      exported: new Date().toISOString()
    };
  }

  clearData() {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem('portfolio_visitor_id');
    sessionStorage.removeItem(this.sessionKey);
    this.init();
  }
}

export default new PortfolioAnalytics();