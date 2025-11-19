import { test, expect, type Page } from '@playwright/test'

test.describe('CV Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('load')
  })

  // Helper function to scroll to a section by heading text
  async function scrollToSection(
    page: Page,
    headingTexts: string[],
    options?: { timeout?: number },
  ) {
    await page.evaluate(
      (texts: string[]) => {
        const heading = Array.from(document.querySelectorAll('h2')).find((h2) =>
          texts.some((text) => h2.textContent?.toLowerCase().includes(text.toLowerCase())),
        )
        if (heading) {
          heading.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      },
      headingTexts,
    )

    await page.waitForFunction(
      (texts: string[]) => {
        const heading = Array.from(document.querySelectorAll('h2')).find((h2) =>
          texts.some((text) => h2.textContent?.toLowerCase().includes(text.toLowerCase())),
        )
        if (!heading) return false
        const rect = heading.getBoundingClientRect()
        return rect.top >= 0 && rect.top <= window.innerHeight
      },
      headingTexts,
      { timeout: options?.timeout || 3000 },
    )
  }

  test('should display hero section with profile information', async ({ page }) => {
    // Check hero section is visible
    await expect(page.locator('#hero-section')).toBeVisible()

    // Check profile image is displayed
    await expect(page.locator('img[alt="Chechu Castro"]').first()).toBeVisible()

    // Check name is displayed (h1 in hero section)
    await expect(page.getByRole('heading', { name: /Chechu Castro/i }).first()).toBeVisible()

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
    // Navigation is hidden initially and only shows after scroll when hero disappears
    // Scroll down significantly past hero section to trigger navigation visibility
    await page.evaluate(() => {
      window.scrollTo(0, window.innerHeight + 200)
    })
    // Wait for intersection observer and transitions
    await page.waitForFunction(
      () => {
        const nav = document.querySelector('nav[role="navigation"]')
        return nav && window.getComputedStyle(nav).visibility !== 'hidden'
      },
      { timeout: 5000 },
    )

    // Check navigation exists and is visible
    const navigation = page.getByRole('navigation', { name: /primary navigation/i })
    await expect(navigation).toBeVisible({ timeout: 10000 })

    // Check theme toggle button exists
    await expect(
      page.getByRole('button', { name: /enable dark mode|disable dark mode/i }),
    ).toBeVisible({ timeout: 5000 })
  })

  test('should display sidebar with skills', async ({ page }) => {
    // Skills are displayed in the "Core Competencies" section under "Other Skills" heading
    await scrollToSection(page, ['other skills', 'otras habilidades', 'autres compétences'])

    // Check that skills are visible in the article content (not sidebar)
    // Skills are sorted by level descending, so top skills should be visible
    // Find skill elements by their ID pattern - they're in divs with id="skill-name-X"
    // First, ensure the skills section is in viewport
    const skillsSection = page.locator('section').filter({
      has: page.getByRole('heading', {
        name: /other skills|otras habilidades|autres compétences/i,
      }),
    })
    await expect(skillsSection).toBeVisible()

    // Check for Vue skill (level 90) - it should be in the first or second column
    // Skills are in list items, find by the skill name text in the div
    const vueSkillDiv = page.locator('div[id^="skill-name-"]', { hasText: 'Vue' })
    await expect(vueSkillDiv.first()).toBeVisible({ timeout: 5000 })

    // Check for HTML skill (level 95) - it should be visible in first column
    const htmlSkillDiv = page.locator('div[id^="skill-name-"]', { hasText: 'HTML' })
    await expect(htmlSkillDiv.first()).toBeVisible()
  })

  test('should expand skills when show more button is clicked', async ({ page }) => {
    await scrollToSection(page, ['other skills', 'otras habilidades', 'autres compétences'])

    // Check for Show More button (skills are shown in columns, may need to expand)
    const showMoreButton = page.getByRole('button', {
      name: /show more|show less|mostrar más|mostrar menos|afficher plus|afficher moins/i,
    })

    // Try to click the button and verify expansion
    // If button doesn't exist, the click will timeout and test will fail appropriately
    await showMoreButton.first().click({ timeout: 2000 })

    // Verify TypeScript becomes visible after expansion
    await expect(page.getByText('TypeScript', { exact: true })).toBeVisible({ timeout: 2000 })
  })

  test('should display sidebar with languages', async ({ page }) => {
    await scrollToSection(page, ['Languages', 'Idiomas', 'Langues'])

    // Check languages section heading (handles translations)
    await expect(page.getByRole('heading', { name: /Languages|Idiomas|Langues/i })).toBeVisible()

    // Check some languages are visible (they're in article sections, not sidebar)
    // Languages are in divs with id="lang-name-X" containing translated names
    const spanishDiv = page
      .locator('div[id^="lang-name-"]')
      .filter({ hasText: /Spanish|Español|Espagnol/i })
    await expect(spanishDiv.first()).toBeVisible({ timeout: 5000 })

    const englishDiv = page
      .locator('div[id^="lang-name-"]')
      .filter({ hasText: /English|Inglés|Anglais/i })
    await expect(englishDiv.first()).toBeVisible()

    const frenchDiv = page
      .locator('div[id^="lang-name-"]')
      .filter({ hasText: /French|Francés|Français/i })
    await expect(frenchDiv.first()).toBeVisible()
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
    await scrollToSection(page, ['Education', 'Educación', 'Formation'], { timeout: 2000 })

    // Check Education section heading
    await expect(
      page.getByRole('heading', { name: /Education|Educación|Formation/i }),
    ).toBeVisible()
  })

  test('should display employment history section', async ({ page }) => {
    await scrollToSection(
      page,
      ['Employment history', 'Historial de empleo', 'Historique'],
      { timeout: 2000 },
    )

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
    await scrollToSection(page, ['certifications'], { timeout: 2000 })

    // Check Certifications section heading
    await expect(
      page.getByRole('heading', {
        name: /Licenses & certifications|Licencias y certificaciones|Licences et certifications/i,
      }),
    ).toBeVisible()

    // Check certification titles (scroll into view if needed)
    // Based on actual data: "Tailwind CSS 4 Essential Training" and "TypeScript Essential Training"
    await expect(page.getByText(/Tailwind CSS 4 Essential Training/i)).toBeVisible()
    await expect(page.getByText(/TypeScript Essential Training/i)).toBeVisible()

    // Check View Certificate links exist
    const certLinks = page.getByRole('link', { name: /view.*certificate/i })
    await expect(certLinks.first()).toBeVisible()
  })

  test('should display personal projects section', async ({ page }) => {
    await scrollToSection(
      page,
      ['personal projects', 'proyectos personales', 'projets personnels'],
      { timeout: 2000 },
    )

    // Check Personal projects section heading
    await expect(
      page.getByRole('heading', {
        name: /Personal projects|Proyectos personales|Projets personnels/i,
      }),
    ).toBeVisible()
  })

  test('should display recommendations section', async ({ page }) => {
    await scrollToSection(
      page,
      ['Recommendations', 'Recomendaciones', 'Recommandations'],
      { timeout: 2000 },
    )

    // Check Recommendations section heading
    await expect(
      page.getByRole('heading', { name: /Recommendations|Recomendaciones|Recommandations/i }),
    ).toBeVisible()

    // Check some recommender names (checking first names as they appear in the data)
    await expect(page.getByText(/Divya/i)).toBeVisible()
    await expect(page.getByText(/Vasil/i)).toBeVisible()
  })
})
