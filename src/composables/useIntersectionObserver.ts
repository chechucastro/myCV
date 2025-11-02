import { nextTick } from 'vue'

/**
 * Composable for Intersection Observer functionality
 * Follows Single Responsibility Principle - only handles element observation
 */
export function useIntersectionObserver() {
  /**
   * Helper function to observe an element with Intersection Observer
   * @param elementId - ID of the element to observe
   * @param callback - Callback function when element intersects
   * @param options - Intersection Observer options
   * @param once - If true, stops observing after first intersection
   */
  const observeElement = (
    elementId: string,
    callback: (entry: IntersectionObserverEntry) => void,
    options: IntersectionObserverInit = { threshold: 0.2, rootMargin: '0px' },
    once: boolean = true,
  ): void => {
    nextTick(() => {
      const element: HTMLElement | null = document.getElementById(elementId)
      if (!element) return

      const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            callback(entry)
            if (once) {
              observer.unobserve(entry.target)
            }
          }
        })
      }, options)

      observer.observe(element)
    })
  }

  /**
   * Setup scroll reveal animations using Intersection Observer
   */
  const setupScrollReveal = (): void => {
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.05,
      rootMargin: '0px 0px 0px 0px',
    }

    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    // Observe all scroll-reveal elements
    nextTick(() => {
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
          } else if (!el.classList.contains('revealed')) {
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
  }

  return {
    observeElement,
    setupScrollReveal,
  }
}

