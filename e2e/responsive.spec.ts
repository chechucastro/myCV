import { test, expect, devices } from '@playwright/test'

test.describe('Responsive Design', () => {
  test('should display correctly on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/')

    // Hero should be visible
    await expect(page.locator('#hero-section')).toBeVisible()

    // Sidebar and article should be side by side (flex-row)
    const mainContent = page.locator('main > div').first()
    const flexDirection = await mainContent.evaluate((el) =>
      window.getComputedStyle(el).flexDirection,
    )

    // On large screens, should be row layout
    expect(['row', 'row-reverse']).toContain(flexDirection)
  })

  test('should display correctly on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')

    // Content should still be accessible
    await expect(page.getByRole('heading', { name: /Chechu Castro/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Skills' })).toBeVisible()
  })

  test('should display correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Hero should be visible
    await expect(page.locator('#hero-section')).toBeVisible()

    // Name should be visible
    await expect(page.getByRole('heading', { name: /Chechu Castro/i })).toBeVisible()

    // Sidebar and article should stack (flex-col)
    const mainContent = page.locator('main > div').first()
    const flexDirection = await mainContent.evaluate((el) =>
      window.getComputedStyle(el).flexDirection,
    )

    // On small screens, should be column layout
    expect(['column', 'column-reverse']).toContain(flexDirection)
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

    await expect(page.getByRole('heading', { name: /Chechu Castro/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Skills' })).toBeVisible()

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

    await expect(page.getByRole('heading', { name: /Chechu Castro/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Employment history' })).toBeVisible()

    await context.close()
  })

  test('should handle viewport resize', async ({ page }) => {
    await page.goto('/')

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

    const themeToggle = page.getByRole('button', { name: /enable dark mode|disable dark mode/i })
    const boundingBox = await themeToggle.boundingBox()

    // Button should be reasonably sized for touch (actual implementation is 32px height)
    expect(boundingBox?.width).toBeGreaterThanOrEqual(32)
    expect(boundingBox?.height).toBeGreaterThanOrEqual(32)
  })
})

