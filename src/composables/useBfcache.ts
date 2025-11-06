import { onMounted, onUnmounted } from 'vue'

/**
 * Composable for handling back/forward cache (bfcache) compatibility
 * Ensures proper cleanup and restoration of page state
 */
export function useBfcache() {
  let cleanupFunctions: (() => void)[] = []

  /**
   * Register a cleanup function to be called when page is cached
   */
  const registerCleanup = (cleanup: () => void): void => {
    cleanupFunctions.push(cleanup)
  }

  /**
   * Execute all registered cleanup functions
   */
  const executeCleanup = (): void => {
    cleanupFunctions.forEach((cleanup) => {
      try {
        cleanup()
      } catch (error) {
        console.warn('[BFCache] Error during cleanup:', error)
      }
    })
  }

  /**
   * Handle pagehide event - called when page is being cached
   */
  const handlePageHide = (event: PageTransitionEvent): void => {
    // If page is being cached (bfcache), clean up resources
    if (event.persisted) {
      executeCleanup()
    }
  }

  /**
   * Handle pageshow event - called when page is restored from cache
   */
  const handlePageShow = (event: PageTransitionEvent): void => {
    // If page was restored from bfcache, reinitialize if needed
    if (event.persisted) {
      // Page was restored from bfcache
      // The page state should be preserved, but we might need to reinitialize some things
      // For now, we'll let Vue handle the restoration naturally
    }
  }

  onMounted(() => {
    // Add event listeners for bfcache handling
    window.addEventListener('pagehide', handlePageHide)
    window.addEventListener('pageshow', handlePageShow)
  })

  onUnmounted(() => {
    // Clean up event listeners
    window.removeEventListener('pagehide', handlePageHide)
    window.removeEventListener('pageshow', handlePageShow)
    // Execute cleanup functions
    executeCleanup()
    cleanupFunctions = []
  })

  return {
    registerCleanup,
  }
}
