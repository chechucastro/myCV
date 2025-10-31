import { test, expect } from '@playwright/test'

test.describe('CV Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display hero section with profile information', async ({ page }) => {
    // Check hero section is visible
    await expect(page.locator('#hero-section')).toBeVisible()

    // Check profile image is displayed
    await expect(page.locator('img[alt="Chechu Castro"]').first()).toBeVisible()

    // Check name is displayed
    await expect(page.getByRole('heading', { name: /Chechu Castro/i })).toBeVisible()

    // Check job title is displayed
    await expect(page.getByText('UI Frontend Web Developer')).toBeVisible()

    // Check tech stack is displayed
    await expect(page.getByText(/VueJS.*Quasar.*Nuxt.*TailwindCSS/i)).toBeVisible()
  })

  test('should have accessible skip to content link', async ({ page, browserName }) => {
    // Check skip link exists and is in the DOM
    const skipLink = page.getByRole('link', { name: /skip to main content/i })
    await expect(skipLink).toBeAttached()

    // Verify it can be focused
    if (browserName !== 'webkit') {
      // Tab to focus on skip link
      await page.keyboard.press('Tab')
      await page.waitForTimeout(100)
      await expect(skipLink).toBeFocused()
    } else {
      // For WebKit, just verify the link can receive focus programmatically
      await skipLink.focus()
      await expect(skipLink).toBeFocused()
    }
  })

  test('should display navigation with theme toggle', async ({ page }) => {
    // Check navigation exists
    await expect(page.getByRole('navigation', { name: /primary navigation/i })).toBeVisible()

    // Check theme toggle button exists
    await expect(
      page.getByRole('button', { name: /enable dark mode|disable dark mode/i }),
    ).toBeVisible()
  })

  test('should display sidebar with skills', async ({ page }) => {
    // Check skills section heading
    await expect(page.getByRole('heading', { name: 'Skills' })).toBeVisible()

    // Check some skills are visible in the Skills section specifically
    const skillsSection = page.getByLabel('Skills')
    await expect(skillsSection.getByText('Vue', { exact: true })).toBeVisible()
    await expect(skillsSection.getByText('JavaScript')).toBeVisible()
    await expect(skillsSection.getByText('TypeScript')).toBeVisible()
  })

  test('should display sidebar with languages', async ({ page }) => {
    // Check languages section heading
    await expect(page.getByRole('heading', { name: 'Languages' })).toBeVisible()

    // Check some languages are visible in the Languages section specifically
    const languagesSection = page.getByLabel('Languages')
    await expect(languagesSection.getByText('Spanish')).toBeVisible()
    await expect(languagesSection.getByText('English')).toBeVisible()
    await expect(languagesSection.getByText('French')).toBeVisible()
  })

  test('should display contact details', async ({ page }) => {
    // Check Details section
    await expect(page.getByRole('heading', { name: 'Details' })).toBeVisible()

    // Check email link
    await expect(page.getByRole('link', { name: /send an email/i })).toBeVisible()

    // Check LinkedIn link
    await expect(
      page.getByRole('link', { name: /open linkedin profile/i }),
    ).toBeVisible()

    // Check GitHub link
    await expect(page.getByRole('link', { name: /open github profile/i })).toBeVisible()
  })

  test('should display profile section', async ({ page }) => {
    // Check Profile section heading
    await expect(page.getByRole('heading', { name: 'Profile' })).toBeVisible()
  })

  test('should display employment history section', async ({ page }) => {
    // Check Employment history section heading
    await expect(page.getByRole('heading', { name: 'Employment history' })).toBeVisible()

    // Check company names
    await expect(page.getByText('Fairlyne')).toBeVisible()
    await expect(page.getByText('Freelance / Contract')).toBeVisible()

    // Check position titles using role to be more specific
    await expect(
      page.getByRole('heading', { name: 'Senior UI Frontend Developer' }),
    ).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Frontend Architect' })).toBeVisible()
  })

  test('should display certifications section', async ({ page }) => {
    // Check Certifications section heading
    await expect(
      page.getByRole('heading', { name: 'Licenses & certifications' }),
    ).toBeVisible()

    // Check certification titles
    await expect(page.getByText('Vue.js 3 Certification')).toBeVisible()
    await expect(page.getByText('TypeScript Fundamentals')).toBeVisible()
    await expect(page.getByText('Tailwind CSS Mastery')).toBeVisible()

    // Check View Certificate links exist
    const certLinks = page.getByRole('link', { name: /view.*certificate/i })
    await expect(certLinks.first()).toBeVisible()
  })

  test('should display recommendations section', async ({ page }) => {
    // Check Recommendations section heading
    await expect(page.getByRole('heading', { name: 'Recommendations' })).toBeVisible()

    // Check some recommender names (checking first names as they appear in the data)
    await expect(page.getByText(/Sarah/)).toBeVisible()
    await expect(page.getByText(/Michael/)).toBeVisible()
    await expect(page.getByText(/Elena/)).toBeVisible()
  })
})

