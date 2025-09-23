// Global Analytics using Firebase
class GlobalAnalytics {
  constructor() {
    this.apiUrl = 'https://portfolio-analytics-api.vercel.app/api';
    this.sessionId = this.generateSessionId();
    this.visitorId = this.getOrCreateVisitorId();
  }

  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  getOrCreateVisitorId() {
    let visitorId = localStorage.getItem('portfolio_visitor_id');
    if (!visitorId) {
      visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('portfolio_visitor_id', visitorId);
    }
    return visitorId;
  }

  async sendEvent(eventType, data = {}) {
    // Always use localStorage for now to avoid CORS issues
    this.storeLocally(eventType, data);
  }

  storeLocally(eventType, data) {
    const stored = JSON.parse(localStorage.getItem('global_analytics') || '{"events": []}');
    stored.events.push({
      eventType,
      visitorId: this.visitorId,
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
      ...data
    });
    localStorage.setItem('global_analytics', JSON.stringify(stored));
  }

  getStoredData() {
    return JSON.parse(localStorage.getItem('global_analytics') || '{"events": []}');
  }

  async trackPageView(page) {
    await this.sendEvent('page_view', { page });
  }

  async trackProjectClick(projectName) {
    await this.sendEvent('project_click', { projectName });
  }

  async trackBlogView(blogTitle) {
    await this.sendEvent('blog_view', { blogTitle });
  }

  async trackVisit() {
    const deviceType = this.getDeviceType();
    await this.sendEvent('visit', { deviceType });
  }

  getDeviceType() {
    const width = window.innerWidth;
    if (width < 768) return 'Mobile';
    if (width < 1024) return 'Tablet';
    return 'Desktop';
  }

  async getGlobalAnalytics() {
    // Use local data only for now
    const localData = this.getStoredData();
    return this.processAnalyticsData(localData.events || []);
  }

  processAnalyticsData(events) {
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    
    // Filter recent events (last 30 days)
    const recentEvents = events.filter(event => 
      now - new Date(event.timestamp).getTime() < 30 * dayMs
    );

    const uniqueVisitors = new Set(recentEvents.map(e => e.visitorId)).size;
    const totalVisits = recentEvents.filter(e => e.eventType === 'visit').length;
    
    // Page views
    const pageViews = recentEvents.filter(e => e.eventType === 'page_view');
    const pageStats = {};
    pageViews.forEach(event => {
      pageStats[event.page] = (pageStats[event.page] || 0) + 1;
    });

    // Project clicks
    const projectClicks = recentEvents.filter(e => e.eventType === 'project_click');
    const projectStats = {};
    projectClicks.forEach(event => {
      projectStats[event.projectName] = (projectStats[event.projectName] || 0) + 1;
    });

    // Blog views
    const blogViews = recentEvents.filter(e => e.eventType === 'blog_view');
    const blogStats = {};
    blogViews.forEach(event => {
      blogStats[event.blogTitle] = (blogStats[event.blogTitle] || 0) + 1;
    });

    // Device breakdown
    const visits = recentEvents.filter(e => e.eventType === 'visit');
    const deviceStats = {};
    visits.forEach(event => {
      deviceStats[event.deviceType] = (deviceStats[event.deviceType] || 0) + 1;
    });

    return {
      totalVisits,
      uniqueVisitors,
      totalPageViews: pageViews.length,
      pageViews: pageStats,
      projectClicks: projectStats,
      blogViews: blogStats,
      devices: deviceStats,
      topProjects: Object.entries(projectStats)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5),
      topPages: Object.entries(pageStats)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5),
      lastUpdated: new Date().toISOString()
    };
  }
}

export default new GlobalAnalytics();