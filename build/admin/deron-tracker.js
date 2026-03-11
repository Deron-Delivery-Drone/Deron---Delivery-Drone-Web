/**
 * Deron Analytics Tracker v1.0
 * Embed this script on deron.vn to track visitors, page views, and user interactions
 *
 * Usage:
 * <script src="https://admin.deron.vn/deron-tracker.js" data-site="deron.vn"></script>
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    apiUrl: 'https://cfrkrxxtwbfxhckjdoqz.supabase.co/rest/v1',
    apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcmtyeHh0d2JmeGhja2pkb3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3NzQyMjIsImV4cCI6MjA0OTM1MDIyMn0.dummy-key', // Replace with actual anon key
    sessionTimeout: 30 * 60 * 1000, // 30 minutes
    heartbeatInterval: 30 * 1000, // 30 seconds
    debug: false,
  };

  // State
  let visitorId = null;
  let sessionId = null;
  let sessionStartTime = null;
  let lastActivityTime = null;
  let pagesViewed = 0;
  let isTabVisible = true;
  let timeOnPage = 0;
  let scrollDepth = 0;

  // Utilities
  const generateId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const log = (...args) => {
    if (CONFIG.debug) {
      console.log('[Deron Tracker]', ...args);
    }
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  const setCookie = (name, value, days = 365) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
  };

  const getDeviceInfo = () => {
    const ua = navigator.userAgent;
    let deviceType = 'desktop';
    let browser = 'Unknown';
    let os = 'Unknown';

    // Detect device type
    if (/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
      deviceType = /iPad|Tablet/i.test(ua) ? 'tablet' : 'mobile';
    }

    // Detect browser
    if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'Chrome';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
    else if (ua.includes('Edg')) browser = 'Edge';
    else if (ua.includes('Opera') || ua.includes('OPR')) browser = 'Opera';

    // Detect OS
    if (ua.includes('Windows')) os = 'Windows';
    else if (ua.includes('Mac')) os = 'macOS';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

    return {
      device_type: deviceType,
      browser,
      os,
      screen_resolution: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language || navigator.userLanguage,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  };

  const getUTMParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      source: params.get('utm_source'),
      medium: params.get('utm_medium'),
      campaign: params.get('utm_campaign'),
      term: params.get('utm_term'),
      content: params.get('utm_content'),
    };
  };

  // API calls
  const sendToApi = async (endpoint, data) => {
    try {
      const response = await fetch(`${CONFIG.apiUrl}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': CONFIG.apiKey,
          'Authorization': `Bearer ${CONFIG.apiKey}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      log('Data sent successfully to', endpoint);
      return true;
    } catch (error) {
      log('Error sending data:', error);
      return false;
    }
  };

  // Initialize visitor
  const initVisitor = () => {
    // Try to get existing visitor ID
    visitorId = getCookie('deron_visitor_id');

    if (!visitorId) {
      visitorId = generateId();
      setCookie('deron_visitor_id', visitorId);
      log('New visitor created:', visitorId);
    } else {
      log('Returning visitor:', visitorId);
    }

    // Check for existing session
    const existingSession = sessionStorage.getItem('deron_session');
    const sessionData = existingSession ? JSON.parse(existingSession) : null;

    if (sessionData && (Date.now() - sessionData.lastActivity) < CONFIG.sessionTimeout) {
      sessionId = sessionData.sessionId;
      pagesViewed = sessionData.pagesViewed;
      sessionStartTime = sessionData.startTime;
      log('Resuming session:', sessionId);
    } else {
      sessionId = generateId();
      sessionStartTime = Date.now();
      pagesViewed = 0;
      startNewSession();
      log('New session started:', sessionId);
    }

    lastActivityTime = Date.now();
    updateSessionStorage();
  };

  const updateSessionStorage = () => {
    sessionStorage.setItem('deron_session', JSON.stringify({
      sessionId,
      pagesViewed,
      startTime: sessionStartTime,
      lastActivity: lastActivityTime,
    }));
  };

  const startNewSession = () => {
    const deviceInfo = getDeviceInfo();
    const utmParams = getUTMParams();

    sendToApi('visitor_sessions', {
      visitor_id: visitorId,
      session_id: sessionId,
      started_at: new Date().toISOString(),
      referrer_source: document.referrer || null,
      landing_page: window.location.pathname,
    });

    // Update or create unique visitor
    sendToApi('unique_visitors', {
      visitor_id: visitorId,
      first_visit: new Date().toISOString(),
      last_visit: new Date().toISOString(),
      visit_count: 1,
      pages_viewed: 1,
      referrer_source: document.referrer || null,
      country: null, // Will be detected server-side
      city: null,
      device_type: deviceInfo.device_type,
      browser: deviceInfo.browser,
      os: deviceInfo.os,
    });
  };

  // Track page view
  const trackPageView = () => {
    pagesViewed++;
    lastActivityTime = Date.now();
    updateSessionStorage();

    const deviceInfo = getDeviceInfo();
    const utmParams = getUTMParams();

    const pageData = {
      visitor_id: visitorId,
      session_id: sessionId,
      event_type: 'pageview',
      page_url: window.location.href,
      page_title: document.title,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
      device_info: deviceInfo,
      geo_info: {
        country: null,
        city: null,
      },
      custom_data: {
        utm: utmParams,
        path: window.location.pathname,
        query: window.location.search,
      },
      created_at: new Date().toISOString(),
    };

    sendToApi('visitor_events', pageData);
    log('Page view tracked:', window.location.pathname);

    // Update daily analytics
    updateDailyAnalytics();
  };

  const updateDailyAnalytics = async () => {
    const today = new Date().toISOString().split('T')[0];

    // Note: In production, this should be handled by a server-side function
    // to properly aggregate counts. This is a simplified client-side approach.
    try {
      // First, try to fetch existing record
      const response = await fetch(
        `${CONFIG.apiUrl}/analytics?date=eq.${today}&select=*`,
        {
          headers: {
            'apikey': CONFIG.apiKey,
            'Authorization': `Bearer ${CONFIG.apiKey}`,
          },
        }
      );

      const data = await response.json();

      if (data && data.length > 0) {
        // Update existing record
        await fetch(`${CONFIG.apiUrl}/analytics?id=eq.${data[0].id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'apikey': CONFIG.apiKey,
            'Authorization': `Bearer ${CONFIG.apiKey}`,
          },
          body: JSON.stringify({
            page_views: data[0].page_views + 1,
          }),
        });
      } else {
        // Create new record
        await fetch(`${CONFIG.apiUrl}/analytics`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': CONFIG.apiKey,
            'Authorization': `Bearer ${CONFIG.apiKey}`,
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify({
            date: today,
            page_views: 1,
            visitors: 1,
            bounce_rate: 0,
            avg_session_time: 0,
          }),
        });
      }
    } catch (error) {
      log('Error updating daily analytics:', error);
    }
  };

  // Track custom events
  const trackEvent = (eventName, eventData = {}) => {
    lastActivityTime = Date.now();
    updateSessionStorage();

    sendToApi('visitor_events', {
      visitor_id: visitorId,
      session_id: sessionId,
      event_type: 'custom',
      page_url: window.location.href,
      page_title: document.title,
      custom_data: {
        event_name: eventName,
        ...eventData,
      },
      created_at: new Date().toISOString(),
    });

    log('Custom event tracked:', eventName, eventData);
  };

  // Track clicks
  const trackClick = (element) => {
    const clickData = {
      tag: element.tagName,
      id: element.id || null,
      class: element.className || null,
      text: element.innerText?.substring(0, 100) || null,
      href: element.href || null,
    };

    sendToApi('visitor_events', {
      visitor_id: visitorId,
      session_id: sessionId,
      event_type: 'click',
      page_url: window.location.href,
      custom_data: clickData,
      created_at: new Date().toISOString(),
    });
  };

  // Track scroll depth
  const trackScrollDepth = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const currentDepth = Math.round((scrollTop / (scrollHeight - clientHeight)) * 100);

    if (currentDepth > scrollDepth) {
      scrollDepth = currentDepth;

      // Track at 25%, 50%, 75%, 100% milestones
      const milestones = [25, 50, 75, 100];
      milestones.forEach(milestone => {
        if (scrollDepth >= milestone && !window[`deron_scroll_${milestone}`]) {
          window[`deron_scroll_${milestone}`] = true;
          trackEvent('scroll_depth', { depth: milestone });
        }
      });
    }
  };

  // Track time on page
  const startTimeTracking = () => {
    const startTime = Date.now();

    const updateTime = () => {
      if (isTabVisible) {
        timeOnPage = Math.round((Date.now() - startTime) / 1000);
      }
    };

    setInterval(updateTime, 1000);
  };

  // Handle session end
  const endSession = () => {
    const duration = Math.round((Date.now() - sessionStartTime) / 1000);

    // Send session end data
    sendToApi('rpc/end_session', {
      p_session_id: sessionId,
      p_duration: duration,
      p_pages_viewed: pagesViewed,
      p_exit_page: window.location.pathname,
    });

    log('Session ended. Duration:', duration, 'Pages:', pagesViewed);
  };

  // Visibility change handler
  const handleVisibilityChange = () => {
    isTabVisible = !document.hidden;

    if (!isTabVisible) {
      // Tab is now hidden - potential session end
      lastActivityTime = Date.now();
      updateSessionStorage();
    }
  };

  // Setup event listeners
  const setupEventListeners = () => {
    // Track scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(trackScrollDepth, 100);
    }, { passive: true });

    // Track visibility
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Track clicks on important elements
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a, button, [data-track]');
      if (target) {
        trackClick(target);
      }
    });

    // Track before unload
    window.addEventListener('beforeunload', endSession);

    // Track page navigation (for SPAs)
    window.addEventListener('popstate', () => {
      setTimeout(trackPageView, 100);
    });

    // Handle SPA navigation by observing URL changes
    let lastUrl = window.location.href;
    new MutationObserver(() => {
      if (window.location.href !== lastUrl) {
        lastUrl = window.location.href;
        trackPageView();
      }
    }).observe(document, { subtree: true, childList: true });
  };

  // Public API
  window.DeronTracker = {
    trackEvent,
    trackPageView,
    getVisitorId: () => visitorId,
    getSessionId: () => sessionId,

    // Track newsletter subscription
    trackSubscription: (email, source = 'website') => {
      sendToApi('followers', {
        email,
        source,
        status: 'pending',
        created_at: new Date().toISOString(),
      });
      trackEvent('newsletter_subscription', { email, source });
    },

    // Track link click (for tracked links)
    trackLinkClick: (slug) => {
      sendToApi('link_clicks', {
        link_id: null, // Will be resolved server-side
        visitor_id: visitorId,
        referrer: document.referrer,
        user_agent: navigator.userAgent,
        clicked_at: new Date().toISOString(),
      });
    },

    // Track content view
    trackContentView: (contentId) => {
      sendToApi('content_views', {
        content_id: contentId,
        visitor_id: visitorId,
        session_id: sessionId,
        referrer: document.referrer,
        time_on_page: timeOnPage,
        scroll_depth: scrollDepth,
        viewed_at: new Date().toISOString(),
      });
    },
  };

  // Initialize
  const init = () => {
    log('Initializing Deron Tracker...');

    initVisitor();
    trackPageView();
    setupEventListeners();
    startTimeTracking();

    log('Deron Tracker initialized');
  };

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
