import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: [
          // Default excludes
          ...configDefaults.coverage.exclude,
          // Exclude all .ts files (non-Vue files)
          '**/*.ts',
          // But include test files explicitly in exclude to not count them
          '**/*.spec.ts',
          '**/*.test.ts',
          // Exclude configuration files
          '*.config.ts',
          // Exclude type definition files
          '**/*.d.ts',
          // Exclude data files
          '**/data/**',
        ],
        include: [
          // Only include .vue files for coverage
          'src/**/*.vue',
        ],
      },
    },
  }),
)
