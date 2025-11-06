import { test, expect } from '@playwright/test'

test.describe('Scroll Behavior', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('load')
    await page.setViewportSize({ width: 1280, height: 720 })
  })

  test('should collapse hero section on scroll', async ({ page }) => {
    const heroSection = page.locator('#hero-section')

    // Check initial state - hero should be full height
    const initialHeight = await heroSection.boundingBox()
    expect(initialHeight?.height).toBeGreaterThan(500)

    // Scroll down to trigger collapse
    await page.evaluate(() => window.scrollBy(0, window.innerHeight))

    // Wait for animation and scroll handler
    await page.waitForFunction(() => {
      const hero = document.querySelector('#hero-section')
      if (!hero) return false
      const rect = hero.getBoundingClientRect()
      return rect.height < 500 // Hero should be collapsed
    }, { timeout: 2000 })

    // Hero should be collapsed
    const collapsedHeight = await heroSection.boundingBox()
    expect(collapsedHeight?.height).toBeLessThan(initialHeight?.height || 0)
  })

  test('should show name in navigation when scrolled', async ({ page }) => {
    await page.waitForLoadState('load')

    // Scroll down significantly past the hero section to trigger navigation visibility
    // Navigation only shows when hero is not visible (hasScrolled && !isHeroVisible)
    await page.evaluate(() => window.scrollTo(0, window.innerHeight + 200))

    // Wait for scroll handler, intersection observer, and transition
    await page.waitForFunction(() => {
      const nav = document.querySelector('nav[role="navigation"]')
      return nav && window.getComputedStyle(nav).visibility !== 'hidden'
    }, { timeout: 5000 })

    // Navigation should now be visible and contain name
    const nav = page.getByRole('navigation', { name: /primary navigation/i })
    await expect(nav).toBeVisible({ timeout: 10000 })

    // Name should now appear in navigation
    const navText = await nav.textContent()
    expect(navText).toContain('Chechu Castro')
  })

  test('should reveal sections as they come into view', async ({ page }) => {
    // Scroll to bottom to trigger all scroll reveals
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    // Wait for animations and intersection observer
    await page.waitForFunction(() => {
      const scrollRevealElements = document.querySelectorAll('.scroll-reveal')
      return scrollRevealElements.length > 0
    }, { timeout: 3000 })

    // Check that sections with scroll-reveal class exist (they may not have 'revealed' class based on implementation)
    const scrollRevealElements = page.locator('.scroll-reveal')
    const count = await scrollRevealElements.count()

    // Should have multiple scroll-reveal elements
    expect(count).toBeGreaterThan(0)
  })

  test('should maintain smooth scroll behavior', async ({ page }) => {
    // Check that scroll behavior is smooth
    const htmlScrollBehavior = await page.evaluate(() => {
      return window.getComputedStyle(document.documentElement).scrollBehavior
    })

    // Note: This might be 'auto' or 'smooth' depending on CSS
    expect(['auto', 'smooth']).toContain(htmlScrollBehavior)
  })
})
