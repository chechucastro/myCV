import { test, expect } from '@playwright/test'

test.describe('Theme Toggle', () => {
  test.beforeEach(async ({ page, context }) => {
    // Clear localStorage and set theme to light mode for consistent test behavior
    await context.addInitScript(() => {
      localStorage.clear()
      localStorage.setItem('theme-preference', 'light')
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Scroll enough to make navigation visible (theme toggle is in navigation)
    // Navigation only shows when hero is not visible, so scroll past hero section
    await page.evaluate(() => {
      window.scrollTo(0, window.innerHeight + 200)
    })
    await page.waitForTimeout(2000) // Wait for intersection observer and transitions

    // Ensure navigation is visible before proceeding
    const navigation = page.getByRole('navigation', { name: /primary navigation/i })
    await expect(navigation).toBeVisible({ timeout: 10000 })
  })

  test('should toggle dark mode on and off', async ({ page }) => {
    // Get the theme toggle button (starts in light mode due to beforeEach setup)
    const themeToggle = page.getByRole('button', { name: /enable dark mode/i })

    // Check initial state (light mode)
    const html = page.locator('html')
    await expect(html).not.toHaveClass(/dark/)

    // Click to enable dark mode
    await themeToggle.click()

    // Wait for dark mode class to be added
    await expect(html).toHaveClass(/dark/)

    // Button text should change
    await expect(page.getByRole('button', { name: /disable dark mode/i })).toBeVisible()

    // Click again to disable dark mode
    await page.getByRole('button', { name: /disable dark mode/i }).click()

    // Wait for dark mode class to be removed
    await expect(html).not.toHaveClass(/dark/)

    // Button text should change back
    await expect(page.getByRole('button', { name: /enable dark mode/i })).toBeVisible()
  })

  test('should have correct ARIA attributes', async ({ page }) => {
    // Get the theme toggle button (starts in light mode due to beforeEach setup)
    const themeToggle = page.getByRole('button', { name: /enable dark mode/i })
    await expect(themeToggle).toBeVisible({ timeout: 5000 })

    // Check initial aria-pressed state (light mode = false)
    await expect(themeToggle).toHaveAttribute('aria-pressed', 'false')

    // Click to enable dark mode
    await themeToggle.click()
    await page.waitForTimeout(300)

    // Check updated aria-pressed state (dark mode = true)
    const darkModeButton = page.getByRole('button', { name: /disable dark mode/i })
    await expect(darkModeButton).toBeVisible()
    await expect(darkModeButton).toHaveAttribute('aria-pressed', 'true')
  })

  test('should be keyboard accessible', async ({ page }) => {
    // Get the theme toggle button (starts in light mode due to beforeEach setup)
    const themeToggle = page.getByRole('button', { name: /enable dark mode/i })
    await themeToggle.focus()
    await expect(themeToggle).toBeFocused()

    // Toggle with Enter key
    await page.keyboard.press('Enter')

    const html = page.locator('html')
    await expect(html).toHaveClass(/dark/)
  })
})
