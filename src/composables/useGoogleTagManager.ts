import { inject } from 'vue'
import type { GoogleTagManager } from '@/plugins/gtm'

/**
 * Composable for accessing Google Tag Manager functionality
 * @returns GTM instance with methods for tracking events
 */
export function useGoogleTagManager() {
  const gtm = inject<GoogleTagManager>('gtm')

  if (!gtm) {
    console.warn('[GTM] Google Tag Manager not initialized')
  }

  /**
   * Tracks a custom event with optional data
   * @param event - Event name
   * @param data - Optional event data
   */
  const trackEvent = (event: string, data?: Record<string, any>) => {
    gtm?.trackEvent(event, data)
  }

  /**
   * Pushes custom data to the data layer
   * @param data - Data to push
   */
  const push = (data: Record<string, any>) => {
    gtm?.push(data)
  }

  /**
   * Tracks a page view
   * @param pagePath - Page path (defaults to current route path)
   * @param pageTitle - Page title (optional)
   */
  const trackPageView = (pagePath?: string, pageTitle?: string) => {
    const data: Record<string, any> = {
      event: 'pageview',
    }

    if (pagePath) {
      data.pagePath = pagePath
    }

    if (pageTitle) {
      data.pageTitle = pageTitle
    }

    push(data)
  }

  /**
   * Tracks a click event
   * @param elementName - Name of the element clicked
   * @param data - Additional data
   */
  const trackClick = (elementName: string, data?: Record<string, any>) => {
    trackEvent('click', {
      elementName,
      ...data,
    })
  }

  /**
   * Tracks form submission
   * @param formName - Name of the form
   * @param data - Additional data
   */
  const trackFormSubmission = (formName: string, data?: Record<string, any>) => {
    trackEvent('form_submission', {
      formName,
      ...data,
    })
  }

  /**
   * Tracks user interactions
   * @param category - Interaction category
   * @param action - Interaction action
   * @param label - Optional label
   * @param value - Optional value
   */
  const trackInteraction = (
    category: string,
    action: string,
    label?: string,
    value?: number,
  ) => {
    trackEvent('interaction', {
      category,
      action,
      label,
      value,
    })
  }

  return {
    trackEvent,
    push,
    trackPageView,
    trackClick,
    trackFormSubmission,
    trackInteraction,
    isInitialized: gtm?.isInitialized() || false,
  }
}

