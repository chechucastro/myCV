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
    await expect(page.getByText(/UI Frontend Web Developer/i)).toBeVisible()
  })

  test('should have accessible skip to content link', async ({ page }) => {
    // Check skip link exists and is in the DOM
    const skipLink = page.getByRole('link', { name: /skip to main content/i })
    await expect(skipLink).toBeAttached()

    // Verify it can be focused programmatically
    await skipLink.focus()
    await expect(skipLink).toBeFocused()
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
    // Check skills section heading (handles translations)
    await expect(page.getByRole('heading', { name: /Skills/i })).toBeVisible()

    // Check some skills are visible in the Skills section specifically
    // Note: Only top 5 skills are shown initially (sorted by level), so check for high-level skills
    const skillsSection = page.getByLabel(/Skills/i)
    await expect(skillsSection.getByText('Vue', { exact: true })).toBeVisible()
    await expect(skillsSection.getByText('HTML')).toBeVisible()

    // Check for Show More button (there should be more than 5 skills)
    const showMoreButton = skillsSection.getByRole('button', { name: /show more|show less/i })

    // Assert button exists before interacting
    await expect(showMoreButton.first()).toBeVisible()

    // Click to show more skills to verify the functionality
    await showMoreButton.first().click()
    await page.waitForTimeout(500)

    // Now TypeScript should be visible (it has level 50)
    await expect(skillsSection.getByText('TypeScript')).toBeVisible()
  })

  test('should display sidebar with languages', async ({ page }) => {
    // Check languages section heading (handles translations)
    await expect(page.getByRole('heading', { name: /Languages/i })).toBeVisible()

    // Check some languages are visible in the Languages section specifically
    const languagesSection = page.getByLabel(/Languages/i)
    await expect(languagesSection.getByText(/Spanish/i)).toBeVisible()
    await expect(languagesSection.getByText(/English/i)).toBeVisible()
    await expect(languagesSection.getByText(/French/i)).toBeVisible()
  })

  test('should display contact details', async ({ page }) => {
    // Check Details section (handles translations)
    await expect(page.getByRole('heading', { name: /Details/i })).toBeVisible()

    // Check email link
    await expect(page.getByRole('link', { name: /send an email/i })).toBeVisible()

    // Check GitHub link
    await expect(page.getByRole('link', { name: /open github profile/i })).toBeVisible()
  })

  test('should display profile section', async ({ page }) => {
    // Check Profile section heading
    await expect(page.getByRole('heading', { name: /Profile/i })).toBeVisible()
  })

  test('should display education section', async ({ page }) => {
    // Scroll to education section if needed
    await page.evaluate(() => {
      const educationSection = Array.from(document.querySelectorAll('h2')).find(
        (h2) =>
          h2.textContent?.includes('Education') ||
          h2.textContent?.includes('Educación') ||
          h2.textContent?.includes('Formation'),
      )
      if (educationSection) {
        educationSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    })
    await page.waitForTimeout(500)

    // Check Education section heading
    await expect(
      page.getByRole('heading', { name: /Education|Educación|Formation/i }),
    ).toBeVisible()
  })

  test('should display employment history section', async ({ page }) => {
    // Scroll to employment section if needed
    await page.evaluate(() => {
      const employmentSection = Array.from(document.querySelectorAll('h2')).find(
        (h2) =>
          h2.textContent?.includes('Employment history') ||
          h2.textContent?.includes('Historial de empleo') ||
          h2.textContent?.includes('Historique'),
      )
      if (employmentSection) {
        employmentSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    })
    await page.waitForTimeout(500)

    // Check Employment history section heading (handles translations)
    await expect(
      page.getByRole('heading', { name: /Employment history|Historial de empleo|Historique/i }),
    ).toBeVisible()

    // Check company names (using translation-aware approach)
    await expect(page.getByText(/Fairlyne/i)).toBeVisible()

    // Check that at least one position is visible
    const positionHeadings = page.locator('article[aria-label="Employment entry"] h4')
    await expect(positionHeadings.first()).toBeVisible()
  })

  test('should display certifications section', async ({ page }) => {
    // Scroll to certifications section if needed
    await page.evaluate(() => {
      const certSection = Array.from(document.querySelectorAll('h2')).find((h2) =>
        h2.textContent?.includes('certifications'),
      )
      if (certSection) {
        certSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    })
    await page.waitForTimeout(500)

    // Check Certifications section heading
    await expect(
      page.getByRole('heading', {
        name: /Licenses & certifications|Licencias y certificaciones|Licences et certifications/i,
      }),
    ).toBeVisible()

    // Check certification titles (scroll into view if needed)
    await expect(page.getByText(/Vue.js 3 Certification/i)).toBeVisible()
    await expect(page.getByText(/TypeScript Fundamentals/i)).toBeVisible()
    await expect(page.getByText(/Tailwind CSS Mastery/i)).toBeVisible()

    // Check View Certificate links exist
    const certLinks = page.getByRole('link', { name: /view.*certificate/i })
    await expect(certLinks.first()).toBeVisible()
  })

  test('should display personal projects section', async ({ page }) => {
    // Scroll to personal projects section if needed
    await page.evaluate(() => {
      const projectsSection = Array.from(document.querySelectorAll('h2')).find(
        (h2) =>
          h2.textContent?.toLowerCase().includes('personal projects') ||
          h2.textContent?.toLowerCase().includes('proyectos personales') ||
          h2.textContent?.toLowerCase().includes('projets personnels'),
      )
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    })
    await page.waitForTimeout(500)

    // Check Personal projects section heading
    await expect(
      page.getByRole('heading', {
        name: /Personal projects|Proyectos personales|Projets personnels/i,
      }),
    ).toBeVisible()
  })

  test('should display recommendations section', async ({ page }) => {
    // Scroll to recommendations section if needed
    await page.evaluate(() => {
      const recSection = Array.from(document.querySelectorAll('h2')).find(
        (h2) =>
          h2.textContent?.includes('Recommendations') ||
          h2.textContent?.includes('Recomendaciones') ||
          h2.textContent?.includes('Recommandations'),
      )
      if (recSection) {
        recSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    })
    await page.waitForTimeout(500)

    // Check Recommendations section heading
    await expect(
      page.getByRole('heading', { name: /Recommendations|Recomendaciones|Recommandations/i }),
    ).toBeVisible()

    // Check some recommender names (checking first names as they appear in the data)
    await expect(page.getByText(/Divya/i)).toBeVisible()
    await expect(page.getByText(/Vasil/i)).toBeVisible()
  })
})
