/**
 * Composable for accessibility-related utilities
 * Follows Single Responsibility Principle - only handles accessibility announcements
 */
export function useAccessibility() {
  /**
   * Announce updates to a live region for assistive tech.
   */
  const announceToLiveRegion = (id: string, text: string, clearAfter: number = 1200): void => {
    const live: HTMLElement | null = document.getElementById(id)
    if (!live) return
    live.textContent = text
    window.setTimeout((): void => {
      if (live) live.textContent = ''
    }, clearAfter)
  }

  return {
    announceToLiveRegion,
  }
}

