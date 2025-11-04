import type { App } from 'vue'

export interface GTMConfig {
  id: string
  enabled?: boolean
  debug?: boolean
  loadScript?: boolean
}

/**
 * Google Tag Manager Plugin
 * Initializes GTM by injecting the required scripts into the document
 */
export class GoogleTagManager {
  private config: GTMConfig
  private initialized = false

  constructor(config: GTMConfig) {
    this.config = {
      enabled: true,
      debug: false,
      loadScript: true,
      ...config,
    }
  }

  /**
   * Initializes the GTM data layer and loads the GTM script
   */
  initialize(): void {
    if (this.initialized || !this.config.enabled) {
      return
    }

    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return
    }

    try {
      // Initialize the data layer
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js',
      })

      if (this.config.loadScript) {
        this.loadGTMScript()
      }

      this.initialized = true

      if (this.config.debug) {
        console.log('[GTM] Initialized with ID:', this.config.id)
      }
    } catch (error) {
      console.error('[GTM] Failed to initialize:', error)
    }
  }

  /**
   * Loads the GTM script dynamically
   */
  private loadGTMScript(): void {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtm.js?id=${this.config.id}`

    const firstScript = document.getElementsByTagName('script')[0]
    firstScript.parentNode?.insertBefore(script, firstScript)
  }

  /**
   * Pushes an event to the data layer
   */
  push(data: Record<string, any>): void {
    if (!this.config.enabled) {
      return
    }

    if (typeof window === 'undefined' || !window.dataLayer) {
      console.warn('[GTM] Data layer not initialized')
      return
    }

    window.dataLayer.push(data)

    if (this.config.debug) {
      console.log('[GTM] Event pushed:', data)
    }
  }

  /**
   * Tracks a custom event
   */
  trackEvent(event: string, data?: Record<string, any>): void {
    this.push({
      event,
      ...data,
    })
  }

  /**
   * Checks if GTM is initialized
   */
  isInitialized(): boolean {
    return this.initialized
  }
}

// Declare the dataLayer type for TypeScript
declare global {
  interface Window {
    dataLayer: Record<string, any>[]
  }
}

/**
 * Vue plugin for Google Tag Manager
 */
export default {
  install: (app: App, config: GTMConfig) => {
    const gtm = new GoogleTagManager(config)
    gtm.initialize()

    // Make GTM instance available globally
    app.config.globalProperties.$gtm = gtm

    // Provide GTM instance for composition API
    app.provide('gtm', gtm)
  },
}

