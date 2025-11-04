import { ref, onMounted, onUnmounted, type Ref } from 'vue'

/**
 * Composable for managing scroll-related state
 * Follows Single Responsibility Principle - only handles scroll tracking
 * Properly handles back/forward cache (bfcache) compatibility
 */
export function useScroll() {
  const isScrolled: Ref<boolean> = ref<boolean>(false)
  let isScrollListenerActive = false

  const handleScroll = (): void => {
    const scrollY = window.scrollY
    isScrolled.value = scrollY > 50 // Start collapsing after 50px scroll
  }

  /**
   * Initialize scroll listener
   */
  const initScrollListener = (): void => {
    if (!isScrollListenerActive) {
      window.addEventListener('scroll', handleScroll, { passive: true })
      isScrollListenerActive = true
      handleScroll() // Check initial scroll position
    }
  }

  /**
   * Cleanup function for event listeners
   * Called on both unmount and pagehide (bfcache)
   */
  const cleanup = (): void => {
    if (isScrollListenerActive) {
      window.removeEventListener('scroll', handleScroll)
      isScrollListenerActive = false
    }
  }

  /**
   * Handle pagehide event for bfcache compatibility
   */
  const handlePageHide = (event: PageTransitionEvent): void => {
    if (event.persisted) {
      // Page is being cached, clean up event listeners
      cleanup()
    }
  }

  /**
   * Handle pageshow event for bfcache restoration
   */
  const handlePageShow = (event: PageTransitionEvent): void => {
    if (event.persisted) {
      // Page was restored from bfcache, reinitialize scroll tracking
      initScrollListener()
    }
  }

  onMounted(() => {
    initScrollListener()
    window.addEventListener('pagehide', handlePageHide)
    window.addEventListener('pageshow', handlePageShow)
  })

  onUnmounted(() => {
    window.removeEventListener('pagehide', handlePageHide)
    window.removeEventListener('pageshow', handlePageShow)
    cleanup()
  })

  return {
    isScrolled,
  }
}

