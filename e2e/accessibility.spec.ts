import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should have proper heading hierarchy', async ({ page }) => {
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all()

    // Should have at least one h1
    const h1Count = await page.locator('h1').count()
    expect(h1Count).toBeGreaterThanOrEqual(1)

    // Headings should be present
    expect(headings.length).toBeGreaterThan(0)
  })

  test('should have skip to content link', async ({ page, browserName }) => {
    await page.waitForLoadState('networkidle')
    
    const skipLink = page.getByRole('link', { name: /skip to main content/i })
    await expect(skipLink).toBeAttached()

    // Skip link should navigate to main content
    await expect(skipLink).toHaveAttribute('href', '#maincontent')

    // Focus test is browser-dependent, especially in WebKit
    if (browserName !== 'webkit') {
      await page.keyboard.press('Tab')
      await page.waitForTimeout(200)
      const focusedElement = await page.evaluate(() => document.activeElement?.tagName)
      // Should be focused on skip link or the next focusable element
      expect(['A', 'BUTTON']).toContain(focusedElement)
    } else {
      // For WebKit, just verify the link can be focused programmatically
      await skipLink.focus()
      await page.waitForTimeout(100)
      await expect(skipLink).toBeFocused()
    }
  })

  test('should have proper ARIA landmarks', async ({ page }) => {
    // Check for main landmark
    await expect(page.getByRole('main')).toBeVisible()

    // Navigation is conditionally visible (only shows after scroll)
    // Use locator instead of getByRole since navigation might be hidden with v-show
    const navigation = page.locator('nav[role="navigation"]')
    await expect(navigation).toBeAttached()

    // Scroll to trigger navigation visibility
    await page.evaluate(() => {
      window.scrollTo(0, 200)
    })
    await page.waitForTimeout(500)

    // Now navigation should be visible
    await expect(navigation).toBeVisible()

    // Check for banner landmark
    await expect(page.getByRole('banner')).toBeVisible()
  })

  test('should have alt text for images', async ({ page }) => {
    const images = await page.locator('img').all()

    for (const img of images) {
      const alt = await img.getAttribute('alt')
      // Alt attribute should exist (can be empty for decorative images)
      expect(alt).not.toBeNull()
    }
  })

  test('should have proper form labels', async ({ page }) => {
    // Scroll to make navigation visible (language selector is in navigation)
    await page.evaluate(() => {
      window.scrollTo(0, 200)
    })
    await page.waitForTimeout(500)

    // Language selector should have a proper label or aria-label
    const select = page.locator('select#language, select[name="language"]')
    await expect(select.first()).toBeVisible()

    const selectElement = select.first()
    const nameAttr = await selectElement.getAttribute('name')
    const ariaLabel = await selectElement.getAttribute('aria-label')
    
    expect(nameAttr || ariaLabel).toBeTruthy()
  })

  test('should have proper link accessibility', async ({ page }) => {
    const links = await page.getByRole('link').all()

    for (const link of links) {
      // Links should have text or aria-label
      const text = await link.textContent()
      const ariaLabel = await link.getAttribute('aria-label')

      expect(text || ariaLabel).toBeTruthy()

      // External links should have proper attributes
      const href = await link.getAttribute('href')
      if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
        const target = await link.getAttribute('target')
        const rel = await link.getAttribute('rel')

        if (target === '_blank') {
          expect(rel).toContain('noopener')
        }
      }
    }
  })

  test('should have live regions for dynamic content', async ({ page }) => {
    // Check for live regions used in skills/languages announcements
    const liveRegions = page.locator('[aria-live]')
    const count = await liveRegions.count()

    expect(count).toBeGreaterThan(0)
  })

  test('should have proper button ARIA attributes', async ({ page }) => {
    const buttons = await page.getByRole('button').all()

    for (const button of buttons) {
      // Buttons should have accessible text
      const text = await button.textContent()
      const ariaLabel = await button.getAttribute('aria-label')

      expect(text || ariaLabel).toBeTruthy()
    }
  })

  test('should have proper semantic HTML', async ({ page }) => {
    // Check for semantic elements
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('main')).toBeVisible()
    
    // Navigation is conditionally visible, so check if it's attached to DOM
    const nav = page.locator('nav')
    await expect(nav).toBeAttached()
    
    // Scroll to trigger navigation visibility if needed
    await page.evaluate(() => {
      window.scrollTo(0, 200)
    })
    await page.waitForTimeout(500)
    
    // Check for main article with aria-label
    await expect(page.getByRole('article', { name: 'Main article content' })).toBeVisible()
    // Check for sections (article sections)
    await expect(page.locator('section').first()).toBeVisible()
    // Check for article elements (employment entries, recommendations, etc.)
    await expect(page.locator('article').first()).toBeVisible()
  })
})
