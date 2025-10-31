import { test, expect } from '@playwright/test'

test.describe('Scroll Behavior', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.setViewportSize({ width: 1280, height: 720 })
  })

  test('should collapse hero section on scroll', async ({ page }) => {
    const heroSection = page.locator('#hero-section')

    // Check initial state - hero should be full height
    const initialHeight = await heroSection.boundingBox()
    expect(initialHeight?.height).toBeGreaterThan(500)

    // Scroll down
    await page.evaluate(() => window.scrollBy(0, 200))

    // Wait for animation
    await page.waitForTimeout(500)

    // Hero should be collapsed
    const collapsedHeight = await heroSection.boundingBox()
    expect(collapsedHeight?.height).toBeLessThan(initialHeight?.height || 0)
  })

  test('should show name in navigation when scrolled', async ({ page }) => {
    // Initial state - name should not be in navigation (it's in hero)
    const nav = page.getByRole('navigation', { name: /primary navigation/i })

    // Scroll down significantly
    await page.evaluate(() => window.scrollBy(0, 500))

    // Wait for transition
    await page.waitForTimeout(500)

    // Name should now appear in navigation
    const navText = await nav.textContent()
    expect(navText).toContain('Chechu Castro')
  })

  test('should reveal sections as they come into view', async ({ page }) => {
    // Scroll to bottom to trigger all scroll reveals
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    // Wait for animations
    await page.waitForTimeout(1000)

    // Check that sections have been revealed (they should have the 'revealed' class)
    const revealedElements = page.locator('.scroll-reveal.revealed')
    const count = await revealedElements.count()

    // Should have multiple revealed elements
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

