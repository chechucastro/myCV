/**
 * Composable for Google Analytics 4 (GA4) event tracking
 * Uses gtag.js directly for tracking events
 */

declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

/**
 * Track a custom event with GA4
 * @param eventName - Event name (snake_case recommended)
 * @param parameters - Event parameters
 */
export function trackEvent(eventName: string, parameters?: Record<string, any>): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    if (import.meta.env.DEV) {
      console.warn('[GA4] gtag not available, event not tracked:', eventName, parameters)
    }
    return
  }

  try {
    window.gtag('event', eventName, parameters || {})
    
    if (import.meta.env.DEV) {
      console.log('[GA4] Event tracked:', eventName, parameters)
    }
  } catch (error) {
    console.error('[GA4] Error tracking event:', error)
  }
}

/**
 * Track a page view
 * @param pagePath - Page path (defaults to current path)
 * @param pageTitle - Page title (optional)
 */
export function trackPageView(pagePath?: string, pageTitle?: string): void {
  const parameters: Record<string, any> = {}
  
  if (pagePath) {
    parameters.page_path = pagePath
  }
  
  if (pageTitle) {
    parameters.page_title = pageTitle
  }

  trackEvent('page_view', parameters)
}

/**
 * Track a click event
 * @param elementName - Name/identifier of the clicked element
 * @param additionalData - Additional event data
 */
export function trackClick(elementName: string, additionalData?: Record<string, any>): void {
  trackEvent('click', {
    element_name: elementName,
    ...additionalData,
  })
}

/**
 * Track external link clicks
 * @param destination - Where the link goes (e.g., 'LinkedIn', 'GitHub')
 * @param url - The URL being clicked
 */
export function trackExternalLink(destination: string, url: string): void {
  trackEvent('external_link_click', {
    link_destination: destination,
    link_url: url,
  })
}

/**
 * Track theme toggle
 * @param theme - The theme being switched to ('dark' | 'light')
 */
export function trackThemeToggle(theme: 'dark' | 'light'): void {
  trackEvent('theme_toggle', {
    theme,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Track language change
 * @param fromLocale - Previous language locale
 * @param toLocale - New language locale
 */
export function trackLanguageChange(fromLocale: string, toLocale: string): void {
  trackEvent('language_change', {
    from_language: fromLocale,
    to_language: toLocale,
  })
}

/**
 * Track section toggle (show more/show all)
 * @param sectionName - Name of the section being toggled
 * @param action - Action taken ('show_more' | 'show_less' | 'show_all' | 'collapse')
 */
export function trackSectionToggle(sectionName: string, action: string): void {
  trackEvent('section_toggle', {
    section_name: sectionName,
    action,
  })
}

/**
 * Composable function that returns tracking methods
 */
export function useGoogleAnalytics() {
  return {
    trackEvent,
    trackPageView,
    trackClick,
    trackExternalLink,
    trackThemeToggle,
    trackLanguageChange,
    trackSectionToggle,
  }
}

