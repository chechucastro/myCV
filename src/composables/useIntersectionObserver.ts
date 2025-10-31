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
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
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
      const revealElements: NodeListOf<Element> = document.querySelectorAll('.scroll-reveal')
      revealElements.forEach((el: Element) => observer.observe(el))
    })
  }

  return {
    observeElement,
    setupScrollReveal,
  }
}

