import { test, expect, devices } from '@playwright/test'

test.describe('Responsive Design', () => {
  test('should display correctly on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Hero should be visible
    await expect(page.locator('#hero-section')).toBeVisible()

    // Sidebar and article should be side by side (flex-row)
    const mainContent = page.locator('main > div').first()
    const flexDirection = await mainContent.evaluate(
      (el) => window.getComputedStyle(el).flexDirection,
    )

    // On large screens, should be row layout
    expect(['row', 'row-reverse']).toContain(flexDirection)
  })

  test('should display correctly on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Content should still be accessible
    await expect(page.getByRole('heading', { name: /Chechu Castro/i }).first()).toBeVisible()
    // Check for main content sections - Profile or Core Competencies section
    await expect(
      page.getByRole('heading', { name: /Profile|Core Competencies/i }).first(),
    ).toBeVisible()
  })

  test('should display correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Hero should be visible
    await expect(page.locator('#hero-section')).toBeVisible()

    // Name should be visible
    await expect(page.getByRole('heading', { name: /Chechu Castro/i }).first()).toBeVisible()

    // On mobile, the layout is single column - check that content is accessible
    // The main content should be visible and scrollable
    await expect(page.getByRole('main')).toBeVisible()
  })

  test('should work on iPhone 12', async ({ browser, browserName }) => {
    // Skip this test for Firefox as it doesn't support device emulation
    if (browserName === 'firefox') {
      test.skip()
      return
    }

    const context = await browser.newContext({
      ...devices['iPhone 12'],
    })
    const page = await context.newPage()
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await expect(page.getByRole('heading', { name: /Chechu Castro/i }).first()).toBeVisible()
    await expect(
      page.getByRole('heading', { name: /Profile|Core Competencies/i }).first(),
    ).toBeVisible()

    await context.close()
  })

  test('should work on iPad', async ({ browser, browserName }) => {
    // Skip this test for Firefox as it doesn't support device emulation
    if (browserName === 'firefox') {
      test.skip()
      return
    }

    const context = await browser.newContext({
      ...devices['iPad Pro'],
    })
    const page = await context.newPage()
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await expect(page.getByRole('heading', { name: /Chechu Castro/i }).first()).toBeVisible()
    await expect(
      page.getByRole('heading', { name: /Employment history|Historial de empleo|Historique/i }),
    ).toBeVisible()

    await context.close()
  })

  test('should handle viewport resize', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Start with desktop
    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(page.locator('#hero-section')).toBeVisible()

    // Resize to mobile
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.locator('#hero-section')).toBeVisible()

    // Resize back to desktop
    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(page.locator('#hero-section')).toBeVisible()
  })

  test('should have touch-friendly buttons on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Scroll enough to make navigation visible (theme toggle is in navigation)
    // Navigation only shows when hero is not visible, so scroll past hero section
    await page.evaluate(() => {
      window.scrollTo(0, window.innerHeight + 200)
    })
    await page.waitForTimeout(2000) // Wait for intersection observer and transitions

    // Wait for navigation to be visible
    const navigation = page.getByRole('navigation', { name: /primary navigation/i })
    await expect(navigation).toBeVisible({ timeout: 10000 })

    const themeToggle = page.getByRole('button', { name: /enable dark mode|disable dark mode/i })
    await expect(themeToggle).toBeVisible({ timeout: 5000 })

    const boundingBox = await themeToggle.boundingBox()

    // Button should be reasonably sized for touch (actual implementation is 32px height)
    expect(boundingBox?.width).toBeGreaterThanOrEqual(32)
    expect(boundingBox?.height).toBeGreaterThanOrEqual(32)
  })
})
