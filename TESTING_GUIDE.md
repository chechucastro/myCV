# Testing Guide

## Overview

This project includes comprehensive testing with both **unit tests (Vitest)** and **end-to-end tests (Playwright)**. Tests follow best practices and cover all critical functionality.

## Test Structure

```
├── src/
│   ├── composables/
│   │   └── __tests__/          # Composable unit tests
│   │       ├── useTheme.spec.ts
│   │       ├── useFormatters.spec.ts
│   │       └── useAccessibility.spec.ts
│   │
│   └── components/
│       └── __tests__/          # Component unit tests
│           ├── ThemeToggle.spec.ts
│           ├── PositionCard.spec.ts
│           ├── CertificationCard.spec.ts
│           └── RecommendationCard.spec.ts
│
└── e2e/                        # End-to-end tests
    ├── cv-homepage.spec.ts     # Homepage functionality
    ├── theme-toggle.spec.ts    # Dark mode toggle
    ├── scroll-behavior.spec.ts # Scroll animations
    ├── accessibility.spec.ts   # Accessibility compliance
    └── responsive.spec.ts      # Responsive design
```

## Running Tests

### All Tests

```bash
# Run all tests (unit + e2e)
npm test
```

### Unit Tests (Vitest)

```bash
# Run unit tests
npm run test:unit

# Run unit tests in watch mode
npm run test:unit -- --watch

# Run with coverage
npm run test:unit:coverage

# Run specific test file
npm run test:unit -- useTheme.spec.ts
```

### End-to-End Tests (Playwright)

```bash
# Run all e2e tests
npm run test:e2e

# Run e2e tests in UI mode (interactive)
npm run test:e2e:ui

# Run specific test file
npm run test:e2e -- cv-homepage.spec.ts

# Run in headed mode (see browser)
npm run test:e2e -- --headed

# Show test report
npm run test:e2e:report

# Run on specific browser
npm run test:e2e -- --project=chromium
npm run test:e2e -- --project=firefox
npm run test:e2e -- --project=webkit
```

## Unit Tests

### Composables Tests

#### `useTheme.spec.ts`
Tests dark mode functionality:
- ✅ Initializes with light mode
- ✅ Toggles dark mode on/off
- ✅ Updates DOM classes correctly
- ✅ Handles multiple toggles

#### `useFormatters.spec.ts`
Tests data formatting functions:
- ✅ Formats dates correctly (ISO to readable)
- ✅ Handles invalid dates gracefully
- ✅ Formats hierarchy modes
- ✅ Converts language levels to numbers
- ✅ Returns correct colors for language levels

#### `useAccessibility.spec.ts`
Tests accessibility features:
- ✅ Announces text to live regions
- ✅ Clears announcements after timeout
- ✅ Handles non-existent regions gracefully
- ✅ Supports multiple announcements

### Component Tests

#### `ThemeToggle.spec.ts`
Tests theme toggle button:
- ✅ Renders correctly
- ✅ Has proper ARIA attributes
- ✅ Shows correct icon based on mode
- ✅ Toggles on click
- ✅ Updates aria-pressed state

#### `PositionCard.spec.ts`
Tests employment position display:
- ✅ Renders position title
- ✅ Displays all description items
- ✅ Shows date range
- ✅ Shows "Present" badge when current
- ✅ Has proper semantic HTML
- ✅ Has correct ARIA labels

#### `CertificationCard.spec.ts`
Tests certification display:
- ✅ Renders certification title
- ✅ Shows issuer information
- ✅ Displays formatted date
- ✅ Renders certificate image
- ✅ Has external link with proper attributes
- ✅ Uses lazy loading for images
- ✅ Has proper ARIA labels

#### `RecommendationCard.spec.ts`
Tests recommendation display:
- ✅ Renders full name
- ✅ Shows job position
- ✅ Displays formatted date
- ✅ Renders comment in quotes
- ✅ Shows correct hierarchy badge
- ✅ Has proper semantic HTML

## End-to-End Tests

### `cv-homepage.spec.ts`
Tests main CV functionality:
- ✅ Hero section displays profile information
- ✅ Skip to content link is accessible
- ✅ Navigation renders with theme toggle
- ✅ Sidebar shows skills with progress bars
- ✅ Sidebar shows language proficiency
- ✅ Contact details are displayed
- ✅ Profile section is visible
- ✅ Employment history displays companies
- ✅ Certifications display with images
- ✅ Recommendations display properly

### `theme-toggle.spec.ts`
Tests dark mode toggle:
- ✅ Toggles dark mode on/off
- ✅ Updates DOM classes
- ✅ Updates button ARIA attributes
- ✅ Is keyboard accessible (Enter key)
- ✅ Changes button text based on state

### `scroll-behavior.spec.ts`
Tests scroll animations:
- ✅ Hero section collapses on scroll
- ✅ Name appears in navigation when scrolled
- ✅ Sections reveal as they come into view
- ✅ Smooth scroll behavior is applied

### `accessibility.spec.ts`
Tests accessibility compliance:
- ✅ No automatic accessibility violations (using axe-core)
- ✅ Proper heading hierarchy (h1, h2, h3)
- ✅ Skip to content link works
- ✅ Proper ARIA landmarks (main, nav, banner)
- ✅ All images have alt text
- ✅ Form elements have labels
- ✅ Keyboard navigation works
- ✅ Links have proper accessibility
- ✅ Live regions for dynamic content
- ✅ Buttons have proper ARIA attributes
- ✅ Semantic HTML structure

### `responsive.spec.ts`
Tests responsive design:
- ✅ Displays correctly on desktop (1920x1080)
- ✅ Displays correctly on tablet (768x1024)
- ✅ Displays correctly on mobile (375x667)
- ✅ Works on iPhone 12
- ✅ Works on iPad Pro
- ✅ Handles viewport resize
- ✅ Touch-friendly buttons on mobile (44x44px minimum)

## Test Coverage

### Composables
- **useTheme**: 100% coverage
- **useFormatters**: 100% coverage
- **useAccessibility**: 100% coverage
- **useScroll**: Tested via E2E
- **useIntersectionObserver**: Tested via E2E

### Components
- **Header Components**: Tested via E2E
- **Sidebar Components**: Tested via E2E
- **Article Components**: Tested via E2E
- **PositionCard**: 100% coverage
- **CertificationCard**: 100% coverage
- **RecommendationCard**: 100% coverage
- **ThemeToggle**: 100% coverage

### E2E Coverage
- ✅ Full user flows
- ✅ Cross-browser (Chrome, Firefox, Safari)
- ✅ Multiple viewports (desktop, tablet, mobile)
- ✅ Accessibility compliance
- ✅ Dark mode functionality
- ✅ Scroll animations
- ✅ Responsive design

## Writing New Tests

### Unit Test Example

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import YourComponent from '../YourComponent.vue'

describe('YourComponent', () => {
  it('should render correctly', () => {
    const wrapper = mount(YourComponent, {
      props: { title: 'Test' }
    })
    
    expect(wrapper.text()).toContain('Test')
  })
})
```

### E2E Test Example

```typescript
import { test, expect } from '@playwright/test'

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should do something', async ({ page }) => {
    await expect(page.getByRole('heading')).toBeVisible()
  })
})
```

## Best Practices

### Unit Tests
1. ✅ Test behavior, not implementation
2. ✅ Use descriptive test names
3. ✅ Keep tests isolated and independent
4. ✅ Mock external dependencies
5. ✅ Test edge cases and error states
6. ✅ Aim for 80%+ code coverage

### E2E Tests
1. ✅ Test critical user flows
2. ✅ Use semantic selectors (roles, labels)
3. ✅ Avoid hard-coded waits (use Playwright's auto-waiting)
4. ✅ Test accessibility
5. ✅ Test across multiple browsers
6. ✅ Keep tests maintainable and readable

### Accessibility Testing
1. ✅ Use axe-core for automated checks
2. ✅ Test keyboard navigation
3. ✅ Test screen reader compatibility
4. ✅ Verify ARIA attributes
5. ✅ Check color contrast
6. ✅ Test with different viewport sizes

## Continuous Integration

### Running Tests in CI

```yaml
# Example GitHub Actions workflow
- name: Install dependencies
  run: npm ci

- name: Install Playwright browsers
  run: npx playwright install --with-deps

- name: Run unit tests
  run: npm run test:unit

- name: Build
  run: npm run build

- name: Run E2E tests
  run: npm run test:e2e
  env:
    CI: true
```

## Debugging Tests

### Unit Tests
```bash
# Run tests in watch mode
npm run test:unit -- --watch

# Run with UI (Vitest UI)
npm run test:unit -- --ui

# Debug specific test
npm run test:unit -- --reporter=verbose YourTest.spec.ts
```

### E2E Tests
```bash
# Run in headed mode (see browser)
npm run test:e2e -- --headed

# Run in debug mode
npm run test:e2e -- --debug

# Use Playwright UI mode (recommended)
npm run test:e2e:ui

# Generate trace
npm run test:e2e -- --trace on
```

## Test Reports

### Unit Test Coverage Report
After running `npm run test:unit:coverage`, open:
```
coverage/index.html
```

### E2E Test Report
After running `npm run test:e2e`, open:
```
playwright-report/index.html
```

Or run:
```bash
npm run test:e2e:report
```

## Troubleshooting

### Common Issues

#### Unit Tests

**Issue**: Tests fail with "Cannot find module"
```bash
# Solution: Check import paths use '@/' alias
import { Component } from '@/components/Component.vue'
```

**Issue**: DOM not updating in tests
```bash
# Solution: Use await nextTick()
import { nextTick } from 'vue'
await nextTick()
```

#### E2E Tests

**Issue**: "Target closed" error
```bash
# Solution: Increase timeout or check if element exists
await page.waitForLoadState('networkidle')
```

**Issue**: Tests pass locally but fail in CI
```bash
# Solution: Ensure baseURL is correct in playwright.config.ts
# CI uses preview server, local uses dev server
```

**Issue**: Accessibility tests fail
```bash
# Solution: Install axe-core
npm install --save-dev @axe-core/playwright
```

## Performance

- Unit tests: ~2-5 seconds
- E2E tests: ~30-60 seconds (all browsers)
- Total test suite: ~1-2 minutes

## Next Steps

1. **Add more unit tests** for remaining components
2. **Add visual regression testing** with Playwright screenshots
3. **Add performance tests** for page load times
4. **Add API tests** when backend integration is added
5. **Set up CI/CD pipeline** for automated testing

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Vue Test Utils](https://test-utils.vuejs.org/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Library](https://testing-library.com/)
- [axe-core](https://github.com/dequelabs/axe-core)

