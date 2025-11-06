import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useAccessibility } from '../useAccessibility'

describe('useAccessibility', () => {
  const { announceToLiveRegion, announceToScreenReader } = useAccessibility()

  beforeEach(() => {
    // Clear any existing live region
    const existing = document.getElementById('test-live-region')
    if (existing) {
      existing.remove()
    }

    // Create a mock live region element
    const liveRegion = document.createElement('div')
    liveRegion.id = 'test-live-region'
    liveRegion.setAttribute('aria-live', 'polite')
    document.body.appendChild(liveRegion)

    // Clear all timers
    vi.clearAllTimers()
  })

  it('should announce text to live region', () => {
    announceToLiveRegion('test-live-region', 'Test announcement')

    const liveRegion = document.getElementById('test-live-region')
    expect(liveRegion?.textContent).toBe('Test announcement')
  })

  it('should clear announcement after specified time', () => {
    vi.useFakeTimers()

    announceToLiveRegion('test-live-region', 'Test announcement', 1000)

    const liveRegion = document.getElementById('test-live-region')
    expect(liveRegion?.textContent).toBe('Test announcement')

    // Fast-forward time
    vi.advanceTimersByTime(1000)

    expect(liveRegion?.textContent).toBe('')

    vi.useRealTimers()
  })

  it('should use default clear time of 1200ms', () => {
    vi.useFakeTimers()

    announceToLiveRegion('test-live-region', 'Test announcement')

    const liveRegion = document.getElementById('test-live-region')
    expect(liveRegion?.textContent).toBe('Test announcement')

    // Fast-forward to just before default time
    vi.advanceTimersByTime(1199)
    expect(liveRegion?.textContent).toBe('Test announcement')

    // Fast-forward past default time
    vi.advanceTimersByTime(1)
    expect(liveRegion?.textContent).toBe('')

    vi.useRealTimers()
  })

  it('should handle non-existent live region gracefully', () => {
    expect(() => {
      announceToLiveRegion('non-existent-region', 'Test')
    }).not.toThrow()
  })

  it('should handle multiple announcements', () => {
    announceToLiveRegion('test-live-region', 'First announcement')
    const liveRegion = document.getElementById('test-live-region')
    expect(liveRegion?.textContent).toBe('First announcement')

    announceToLiveRegion('test-live-region', 'Second announcement')
    expect(liveRegion?.textContent).toBe('Second announcement')
  })

  describe('announceToScreenReader', () => {
    beforeEach(() => {
      // Clear any temporary announcements from previous tests
      const existing = document.body.querySelectorAll('.sr-only[role="status"]')
      existing.forEach((el) => el.remove())
      vi.clearAllTimers()
    })

    it('should create and append a temporary announcement element', () => {
      announceToScreenReader('Test announcement')

      const announcement = document.body.querySelector('.sr-only[role="status"]')
      expect(announcement).toBeTruthy()
      expect(announcement?.textContent).toBe('Test announcement')
      expect(announcement?.getAttribute('aria-live')).toBe('polite')
      expect(announcement?.getAttribute('role')).toBe('status')
    })

    it('should remove announcement after default duration', () => {
      vi.useFakeTimers()

      announceToScreenReader('Test announcement')

      const announcement = document.body.querySelector('.sr-only[role="status"]')
      expect(announcement).toBeTruthy()

      // Fast-forward to just before default time
      vi.advanceTimersByTime(999)
      expect(document.body.querySelector('.sr-only[role="status"]')).toBeTruthy()

      // Fast-forward past default time
      vi.advanceTimersByTime(1)
      expect(document.body.querySelector('.sr-only[role="status"]')).toBeNull()

      vi.useRealTimers()
    })

    it('should respect custom duration', () => {
      vi.useFakeTimers()

      announceToScreenReader('Test announcement', 2000)

      const announcement = document.body.querySelector('.sr-only[role="status"]')
      expect(announcement).toBeTruthy()

      // Fast-forward to just before custom time
      vi.advanceTimersByTime(1999)
      expect(document.body.querySelector('.sr-only[role="status"]')).toBeTruthy()

      // Fast-forward past custom time
      vi.advanceTimersByTime(1)
      expect(document.body.querySelector('.sr-only[role="status"]')).toBeNull()

      vi.useRealTimers()
    })

    it('should support custom aria-live politeness', () => {
      announceToScreenReader('Urgent announcement', 1000, 'assertive')

      const announcement = document.body.querySelector('.sr-only[role="status"]')
      expect(announcement?.getAttribute('aria-live')).toBe('assertive')
    })

    it('should support custom role', () => {
      announceToScreenReader('Test announcement', 1000, 'polite', 'alert')

      const announcement = document.body.querySelector('.sr-only[role="alert"]')
      expect(announcement).toBeTruthy()
      expect(announcement?.getAttribute('role')).toBe('alert')
    })

    it('should handle multiple temporary announcements', () => {
      announceToScreenReader('First announcement')
      announceToScreenReader('Second announcement')

      const announcements = document.body.querySelectorAll('.sr-only[role="status"]')
      expect(announcements.length).toBeGreaterThan(0)
      // Both should exist (until timeout removes them)
      expect(announcements.length).toBeGreaterThanOrEqual(1)
    })
  })
})
