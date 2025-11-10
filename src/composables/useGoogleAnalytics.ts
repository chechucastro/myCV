/**
 * Composable for Google Tag Manager (GTM) event tracking
 * Uses dataLayer.push() to send events to GTM
 */

/// <reference types="vite/client" />

/**
 * GTM dataLayer entry type
 */
type GTMDataLayerEntry = Record<string, unknown> & {
  event?: string
}

declare global {
  interface Window {
    dataLayer: GTMDataLayerEntry[]
  }
}

/**
 * Initialize dataLayer if it doesn't exist
 * This ensures dataLayer is available even if GTM script hasn't loaded yet
 */
function ensureDataLayer(): void {
  if (typeof window !== 'undefined' && !window.dataLayer) {
    window.dataLayer = []
  }
}

// Initialize dataLayer immediately when module loads
if (typeof window !== 'undefined') {
  ensureDataLayer()
}

/**
 * Track a custom event with GTM
 * @param eventName - Event name (snake_case recommended)
 * @param parameters - Event parameters
 */
export function trackEvent(eventName: string, parameters?: Record<string, unknown>): void {
  if (typeof window === 'undefined') {
    return
  }

  // Ensure dataLayer exists
  ensureDataLayer()

  if (!window.dataLayer) {
    if (import.meta.env.DEV) {
      console.warn('[GTM] dataLayer not available, event not tracked:', eventName, parameters)
    }
    return
  }

  try {
    window.dataLayer.push({
      event: eventName,
      ...(parameters || {}),
    })

    if (import.meta.env.DEV) {
      console.log('[GTM] Event tracked:', eventName, parameters)
    }
  } catch (error) {
    console.error('[GTM] Error tracking event:', error)
  }
}

/**
 * Track a page view with GTM
 * @param pagePath - Page path (defaults to current path)
 * @param pageTitle - Page title (optional)
 */
export function trackPageView(pagePath?: string, pageTitle?: string): void {
  const parameters: Record<string, unknown> = {}

  if (pagePath) {
    parameters.page_path = pagePath
  }

  if (pageTitle) {
    parameters.page_title = pageTitle
  }

  trackEvent('page_view', parameters)
}

/**
 * Track a click event with GTM
 * @param elementName - Name/identifier of the clicked element
 * @param additionalData - Additional event data
 */
export function trackClick(elementName: string, additionalData?: Record<string, unknown>): void {
  trackEvent('click', {
    element_name: elementName,
    ...additionalData,
  })
}

/**
 * Track external link clicks with GTM
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
 * Track theme toggle with GTM
 * @param theme - The theme being switched to ('dark' | 'light')
 */
export function trackThemeToggle(theme: 'dark' | 'light'): void {
  trackEvent('theme_toggle', {
    theme,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Track language change with GTM
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
 * Track section toggle (show more/show all) with GTM
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
 * Composable function that returns GTM tracking methods
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
