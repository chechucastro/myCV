import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useAccessibility } from '../useAccessibility'

describe('useAccessibility', () => {
  const { announceToLiveRegion } = useAccessibility()

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
})

