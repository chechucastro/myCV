import { test, expect } from '@playwright/test'

test.describe('Theme Toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should toggle dark mode on and off', async ({ page }) => {
    // Get the theme toggle button
    const themeToggle = page.getByRole('button', { name: /enable dark mode/i })

    // Check initial state (light mode)
    const html = page.locator('html')
    await expect(html).not.toHaveClass(/dark/)

    // Click to enable dark mode
    await themeToggle.click()

    // Wait for dark mode class to be added
    await expect(html).toHaveClass(/dark/)

    // Button text should change
    await expect(
      page.getByRole('button', { name: /disable dark mode/i }),
    ).toBeVisible()

    // Click again to disable dark mode
    await page.getByRole('button', { name: /disable dark mode/i }).click()

    // Wait for dark mode class to be removed
    await expect(html).not.toHaveClass(/dark/)

    // Button text should change back
    await expect(
      page.getByRole('button', { name: /enable dark mode/i }),
    ).toBeVisible()
  })

  test('should have correct ARIA attributes', async ({ page }) => {
    const themeToggle = page.getByRole('button', { name: /enable dark mode/i })

    // Check initial aria-pressed state
    await expect(themeToggle).toHaveAttribute('aria-pressed', 'false')

    // Click to enable dark mode
    await themeToggle.click()

    // Check updated aria-pressed state
    const darkModeButton = page.getByRole('button', { name: /disable dark mode/i })
    await expect(darkModeButton).toHaveAttribute('aria-pressed', 'true')
  })

  test('should be keyboard accessible', async ({ page }) => {
    // Tab to focus on elements - the exact number of tabs depends on the page structure
    // Let's focus the theme toggle directly for this test
    const themeToggle = page.getByRole('button', { name: /enable dark mode/i })
    await themeToggle.focus()
    await expect(themeToggle).toBeFocused()

    // Toggle with Enter key
    await page.keyboard.press('Enter')

    const html = page.locator('html')
    await expect(html).toHaveClass(/dark/)
  })
})

