import { test, expect } from '@playwright/test'

test.describe('Vue App', () => {
  test('visits the app root url', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('load')

    // Check that the page loads correctly
    await expect(page).toHaveTitle(/CV|Chechu/i)

    // Check that the main heading exists
    await expect(page.getByRole('heading', { name: /Chechu Castro/i })).toBeVisible()
  })

  test('renders the CV layout correctly', async ({ page }) => {
    await page.goto('/')

    // Check main structural elements exist
    await expect(page.getByRole('banner')).toBeVisible()
    
    // Navigation is conditionally visible (only shows after scroll)
    // Use locator instead of getByRole since navigation might be hidden with v-show
    const navigation = page.locator('nav[role="navigation"]')
    await expect(navigation).toBeAttached()
    
    // Scroll to trigger navigation visibility
    await page.evaluate(() => {
      window.scrollTo(0, 200)
    })
    // Wait for navigation to become visible
    await expect(navigation).toBeVisible({ timeout: 2000 })
    
    // Now navigation should be visible
    await expect(navigation).toBeVisible()
    
    await expect(page.getByRole('main')).toBeVisible()
  })
})
