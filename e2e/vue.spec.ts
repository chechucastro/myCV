import { test, expect } from '@playwright/test'

test.describe('Vue App', () => {
  test('visits the app root url', async ({ page }) => {
    await page.goto('/')

    // Check that the page loads correctly
    await expect(page).toHaveTitle(/CV/)

    // Check that the main heading exists
    await expect(page.getByRole('heading', { name: /Chechu Castro/i })).toBeVisible()
  })

  test('renders the CV layout correctly', async ({ page }) => {
    await page.goto('/')

    // Check main structural elements exist
    await expect(page.getByRole('banner')).toBeVisible()
    await expect(page.getByRole('navigation')).toBeVisible()
    await expect(page.getByRole('main')).toBeVisible()
  })
})
