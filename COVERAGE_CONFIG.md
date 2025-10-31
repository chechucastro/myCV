# Test Coverage Configuration

## Overview

The test coverage is configured to **only include Vue components** (`.vue` files) and **exclude all TypeScript files** (`.ts` files) from coverage reports.

## Why Exclude .ts Files?

In this project:
- **`.ts` files** contain:
  - Composables (business logic)
  - Type definitions
  - Data/mock files
  - Configuration files

- **`.vue` files** contain:
  - Component templates
  - Component logic
  - Component styles

Since composables and utilities are already thoroughly tested via unit tests, we focus coverage reports on Vue components only to see which components need more template/integration testing.

## Configuration

### Location
`vitest.config.ts`

### Settings

```typescript
coverage: {
  provider: 'v8',
  reporter: ['text', 'json', 'html'],
  exclude: [
    ...configDefaults.coverage.exclude,
    '**/*.ts',        // Exclude all .ts files
    '**/*.spec.ts',   // Exclude test files
    '**/*.test.ts',   // Exclude test files
    '*.config.ts',    // Exclude config files
    '**/*.d.ts',      // Exclude type definitions
    '**/data/**',     // Exclude data files
  ],
  include: [
    'src/**/*.vue',   // Only include .vue files
  ],
}
```

## Running Coverage

```bash
# Run tests with coverage (Vue components only)
npm run test:unit:coverage

# View coverage report
open coverage/index.html
```

## Coverage Reports

After running coverage, reports are generated in:
- **Text**: Console output
- **JSON**: `coverage/coverage-final.json`
- **HTML**: `coverage/index.html` (interactive report)

## What's Covered

✅ **Included in Coverage:**
- `src/**/*.vue` - All Vue component files
  - Component templates
  - Component scripts
  - Component logic

❌ **Excluded from Coverage:**
- `**/*.ts` - All TypeScript files
  - Composables (tested separately)
  - Type definitions
  - Utilities
  - Data files
  - Configuration files
- Test files (`.spec.ts`, `.test.ts`)
- Node modules
- E2E tests

## Understanding the Reports

### HTML Report (`coverage/index.html`)

The interactive HTML report shows:
- **Overall coverage percentage** for Vue components
- **File-by-file breakdown**
- **Line-by-line coverage** (green = covered, red = not covered)
- **Branch coverage** (if/else statements)
- **Function coverage**

### Coverage Metrics

- **Statements**: % of code statements executed
- **Branches**: % of if/else branches taken
- **Functions**: % of functions called
- **Lines**: % of lines executed

## Example Output

```bash
npm run test:unit:coverage

 % Coverage report from v8
--------------------|---------|----------|---------|---------|
File                | % Stmts | % Branch | % Funcs | % Lines |
--------------------|---------|----------|---------|---------|
All files           |   85.71 |    66.66 |     100 |   85.71 |
 ThemeToggle.vue    |     100 |      100 |     100 |     100 |
 PositionCard.vue   |   83.33 |       50 |     100 |   83.33 |
 ...                |     ... |      ... |     ... |     ... |
--------------------|---------|----------|---------|---------|
```

## Customizing Coverage

### Include More Files

To include specific `.ts` files:

```typescript
include: [
  'src/**/*.vue',
  'src/utils/specific-file.ts',  // Include specific .ts file
],
```

### Exclude Specific Vue Files

To exclude certain Vue components:

```typescript
exclude: [
  ...configDefaults.coverage.exclude,
  '**/*.ts',
  'src/components/unused/**',  // Exclude specific folder
],
```

### Change Coverage Thresholds

Add minimum coverage requirements:

```typescript
coverage: {
  // ... other config
  thresholds: {
    lines: 80,       // Minimum 80% line coverage
    functions: 80,   // Minimum 80% function coverage
    branches: 70,    // Minimum 70% branch coverage
    statements: 80,  // Minimum 80% statement coverage
  },
}
```

## Alternative: Include .ts Files

If you want to include `.ts` files in coverage, update `vitest.config.ts`:

```typescript
coverage: {
  provider: 'v8',
  reporter: ['text', 'json', 'html'],
  exclude: [
    ...configDefaults.coverage.exclude,
    '**/*.spec.ts',   // Only exclude test files
    '**/*.test.ts',
    '*.config.ts',
    '**/*.d.ts',
    '**/data/**',
  ],
  include: [
    'src/**/*.vue',
    'src/**/*.ts',    // Include all .ts files
  ],
}
```

## Best Practices

1. **Focus on What Matters**: Coverage metrics are guidelines, not goals
2. **Test Behavior**: Focus on testing user-facing behavior
3. **Avoid 100% Coverage Obsession**: Aim for meaningful tests, not just coverage numbers
4. **Use Coverage to Find Gaps**: Use reports to identify untested code paths
5. **Combined with E2E**: Remember that E2E tests also cover functionality

## Troubleshooting

### Coverage Provider Error

If you get an error about missing coverage provider:

```bash
npm install --save-dev @vitest/coverage-v8
```

### No Coverage Generated

Make sure you're running:
```bash
npm run test:unit:coverage
```

Not just:
```bash
npm run test:unit
```

### Coverage Report Not Found

The coverage folder is generated after running tests with coverage. Make sure:
1. Tests actually run
2. At least one test passes
3. Check `coverage/` folder exists

## Files Affected

- `vitest.config.ts` - Main coverage configuration
- `package.json` - Added `@vitest/coverage-v8` dependency
- Coverage reports generated in `coverage/` folder (gitignored)

## Summary

✅ **Configuration Complete**
- Vue components (`.vue` files) tracked in coverage
- TypeScript files (`.ts` files) excluded from coverage
- Composables tested separately via unit tests
- Clean, focused coverage reports
- Easy to understand what components need more testing

Run `npm run test:unit:coverage` to see your Vue component coverage! 📊

