import { nextTick, onUnmounted } from 'vue'

/**
 * Composable for Intersection Observer functionality
 * Follows Single Responsibility Principle - only handles element observation
 * Properly manages observer cleanup for bfcache compatibility
 */
export function useIntersectionObserver() {
  // Track all observers for cleanup
  const observers: IntersectionObserver[] = []

  /**
   * Helper function to observe an element with Intersection Observer
   * @param elementId - ID of the element to observe
   * @param callback - Callback function when element intersects
   * @param options - Intersection Observer options
   * @param once - If true, stops observing after first intersection
   * @returns The observer instance (for manual cleanup if needed)
   */
  const observeElement = (
    elementId: string,
    callback: (entry: IntersectionObserverEntry) => void,
    options: IntersectionObserverInit = { threshold: 0.2, rootMargin: '0px' },
    once: boolean = true,
  ): IntersectionObserver | null => {
    let observer: IntersectionObserver | null = null

    nextTick(() => {
      const element: HTMLElement | null = document.getElementById(elementId)
      if (!element) return

      observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            callback(entry)
            if (once && observer) {
              observer.unobserve(entry.target)
            }
          }
        })
      }, options)

      observers.push(observer)
      observer.observe(element)
    })

    return observer
  }

  /**
   * Setup scroll reveal animations using Intersection Observer
   * @returns The observer instance for cleanup
   */
  const setupScrollReveal = (): IntersectionObserver | null => {
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.05,
      rootMargin: '0px 0px 0px 0px',
    }

    let observer: IntersectionObserver | null = null

    // Observe all scroll-reveal elements
    nextTick(() => {
      observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting && observer) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      }, observerOptions)

      observers.push(observer)

      const checkAndObserve = () => {
        const revealElements: NodeListOf<Element> = document.querySelectorAll('.scroll-reveal')
        revealElements.forEach((el: Element) => {
          // Check if element is already in viewport on initial load
          const rect = el.getBoundingClientRect()
          const viewportHeight =
            window.innerHeight || document.documentElement.clientHeight
          const viewportWidth = window.innerWidth || document.documentElement.clientWidth
          const isInViewport =
            rect.top < viewportHeight &&
            rect.bottom > 0 &&
            rect.left < viewportWidth &&
            rect.right > 0

          if (isInViewport && !el.classList.contains('revealed')) {
            // Immediately reveal elements already in viewport
            el.classList.add('revealed')
          } else if (!el.classList.contains('revealed') && observer) {
            // Observe elements not yet in viewport
            observer.observe(el)
          }
        })
      }

      // Initial check
      checkAndObserve()

      // Fallback: reveal all elements after a delay if still not revealed (mobile safety)
      setTimeout(() => {
        const revealElements: NodeListOf<Element> = document.querySelectorAll('.scroll-reveal')
        revealElements.forEach((el: Element) => {
          if (!el.classList.contains('revealed')) {
            el.classList.add('revealed')
          }
        })
      }, 1000)
    })

    return observer
  }

  /**
   * Cleanup all observers
   * Important for back/forward cache (bfcache) compatibility
   */
  const cleanup = (): void => {
    observers.forEach((observer) => {
      if (observer) {
        observer.disconnect()
      }
    })
    observers.length = 0
  }

  // Automatically cleanup on unmount
  onUnmounted(() => {
    cleanup()
  })

  return {
    observeElement,
    setupScrollReveal,
    cleanup,
  }
}

