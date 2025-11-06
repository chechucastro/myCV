/**
 * Composable for accessibility-related utilities
 * Follows Single Responsibility Principle - only handles accessibility announcements
 */
export function useAccessibility() {
  /**
   * Announce updates to a live region for assistive tech.
   * Requires an existing element with the specified ID.
   */
  const announceToLiveRegion = (id: string, text: string, clearAfter: number = 1200): void => {
    const live: HTMLElement | null = document.getElementById(id)
    if (!live) return
    live.textContent = text
    window.setTimeout((): void => {
      if (live) live.textContent = ''
    }, clearAfter)
  }

  /**
   * Creates a temporary screen reader announcement element.
   * Useful when you don't have an existing live region element.
   * The element is automatically removed after the specified duration.
   *
   * @param message - The message to announce
   * @param duration - How long to keep the element before removing it (in milliseconds). Default: 1000ms
   * @param ariaLive - The aria-live politeness level. Default: 'polite'
   * @param role - The ARIA role. Default: 'status'
   */
  const announceToScreenReader = (
    message: string,
    duration: number = 1000,
    ariaLive: 'polite' | 'assertive' | 'off' = 'polite',
    role: string = 'status',
  ): void => {
    // Check if we're in a browser environment
    if (typeof document === 'undefined') return

    // Create announcement element
    const announcement = document.createElement('div')
    announcement.setAttribute('role', role)
    announcement.setAttribute('aria-live', ariaLive)
    announcement.className = 'sr-only'
    announcement.textContent = message

    // Append to body
    document.body.appendChild(announcement)

    // Remove after specified duration
    window.setTimeout(() => {
      if (announcement.parentNode) {
        announcement.parentNode.removeChild(announcement)
      }
    }, duration)
  }

  return {
    announceToLiveRegion,
    announceToScreenReader,
  }
}
