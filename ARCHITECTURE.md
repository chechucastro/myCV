# CV Application Architecture

## Overview

This CV application has been done following **SOLID principles** and **component-driven architecture** to improve maintainability, testability, and scalability.

## Project Structure

```
src/
├── types/                      # TypeScript type definitions
│   └── index.ts               # All interfaces and types
│
├── data/                       # Mock data and content
│   └── skills.ts              # Skills data
│
├── config/                     # Configuration constants
│   └── constants.ts           # Application constants (contact info, etc.)
│
├── composables/               # Reusable business logic
│   ├── useTheme.ts           # Theme management (dark/light mode)
│   ├── useScroll.ts          # Scroll tracking logic
│   ├── useIntersectionObserver.ts  # Intersection Observer utilities
│   ├── useFormatters.ts      # Data formatting utilities
│   ├── useAccessibility.ts   # Accessibility announcements
│   ├── useBfcache.ts         # Browser back/forward cache handling
│   ├── useGoogleAnalytics.ts # Google Analytics integration
│   └── useLinkedIn.ts        # LinkedIn integration utilities
│
├── components/
│   ├── atoms/                # Atomic design: smallest UI components
│   │   ├── Badge/            # Badge component with variants
│   │   │   ├── Badge.vue
│   │   │   ├── Badge.const.ts
│   │   │   └── Badge.variants.ts
│   │   ├── BaseButton/       # Base button component with variants
│   │   │   ├── BaseButton.vue
│   │   │   ├── BaseButton.const.ts
│   │   │   └── BaseButton.variants.ts
│   │   ├── BaseCard/         # Base card component with variants
│   │   │   ├── BaseCard.vue
│   │   │   ├── BaseCard.const.ts
│   │   │   └── BaseCard.variants.ts
│   │   ├── SkipToContent/    # Accessibility skip link
│   │   │   └── SkipToContent.vue
│   │   └── ThemeToggle/      # Dark/light mode toggle
│   │       └── ThemeToggle.vue
│   │
│   ├── molecules/            # Atomic design: composed atoms
│   │   ├── ButtonDetails.vue        # Button with details
│   │   ├── CertificationCard.vue    # Certification card
│   │   ├── EducationCard.vue        # Education card
│   │   ├── LanguageSelector.vue     # Language selection dropdown
│   │   ├── PositionCard.vue         # Individual position card
│   │   ├── ProfileSection.vue       # Profile text content
│   │   ├── ProjectCard.vue          # Personal project card
│   │   └── RecommendationCard.vue   # Individual recommendation
│   │
│   └── organisms/           # Atomic design: complex UI sections
│       ├── AppFooter.vue                    # Application footer
│       ├── AppHeader.vue                    # Main header component
│       ├── ArticleSection.vue               # Generic section wrapper
│       ├── CertificationsSection.vue        # Certifications grid
│       ├── CompanyHistorySection.vue        # Company grouping
│       ├── CVArticle.vue                   # Article container
│       ├── CVSidebar.vue                   # Main sidebar container
│       ├── DetailsSection.vue              # Contact and personal details
│       ├── EducationSection.vue            # Education section
│       ├── EmploymentHistorySection.vue    # Employment container
│       ├── HeroSection.vue                 # Hero section with profile
│       ├── LanguagesSection.vue            # Language proficiency
│       ├── NavigationHeader.vue            # Navigation bar header
│       ├── PersonalProjectsSection.vue     # Personal projects section
│       ├── RecommendationsSection.vue      # Recommendations container
│       └── SkillsSection.vue                # Skills with progress bars
│
├── layouts/
│   └── DefaultLayout.vue     # Main layout wrapper
│
├── views/
│   └── HomeView.vue          # Main view
│
├── plugins/
│   └── i18n.ts               # Internationalization plugin
│
├── router/
│   └── index.ts              # Vue Router configuration
│
├── stores/                   # State management (Pinia)
│   ├── counter.ts            # Example counter store
│   └── language.ts           # Language store
│
└── locales/                  # Translation files
    ├── en.json               # English translations
    ├── es.json               # Spanish translations
    └── fr.json               # French translations
```

## SOLID Principles Applied

### Single Responsibility Principle (SRP)

Each component and composable has a single, well-defined purpose:

- **Components**: Each component handles one specific UI concern
- **Composables**: Each composable manages one specific piece of business logic
  - `useTheme`: Only manages theme state
  - `useScroll`: Only tracks scroll position
  - `useFormatters`: Only formats data for display
  - `useAccessibility`: Only handles accessibility announcements
  - `useIntersectionObserver`: Only manages element observation

### Open/Closed Principle (OCP)

Components are open for extension but closed for modification:

- Props-based configuration allows customization without changing component code
- Composables can be extended with new functionality without modifying existing code

### Liskov Substitution Principle (LSP)

Components can be replaced with alternative implementations:

- All section components follow the same interface pattern
- Card components are interchangeable within their context

### Interface Segregation Principle (ISP)

Components receive only the props they need:

- No component is forced to depend on props it doesn't use
- TypeScript interfaces are specific to each component's needs

### Dependency Inversion Principle (DIP)

High-level components depend on abstractions (composables), not concrete implementations:

- View components use composables for business logic
- Business logic is decoupled from UI presentation

## Key Features

### Type Safety

- All interfaces and types centralized in `src/types/`
- Full TypeScript coverage throughout the application
- Strict typing prevents runtime errors

### Composables (Business Logic)

Reusable logic extracted into composables following the Composition API:

- **Theme Management**: Dark/light mode toggle (`useTheme`)
- **Scroll Tracking**: Monitors scroll position for UI updates (`useScroll`)
- **Intersection Observer**: Handles scroll animations and visibility detection (`useIntersectionObserver`)
- **Formatters**: Date formatting, language levels, hierarchy modes (`useFormatters`)
- **Accessibility**: Screen reader announcements (`useAccessibility`)
- **BFCache Handling**: Browser back/forward cache compatibility (`useBfcache`)
- **Google Analytics**: Analytics integration (`useGoogleAnalytics`)
- **LinkedIn Integration**: LinkedIn-specific utilities (`useLinkedIn`)

### Component Hierarchy (Atomic Design Pattern)

The application follows **Atomic Design** principles, organizing components into three levels:

#### Atoms (Smallest UI Components)

Basic building blocks that cannot be broken down further:

- `Badge`: Reusable badge component with variants
- `BaseButton`: Base button component with variants and constants
- `BaseCard`: Base card component with variants and constants
- `SkipToContent`: Accessibility skip link
- `ThemeToggle`: Dark/light mode toggle button

#### Molecules (Composed Atoms)

Simple combinations of atoms that form basic UI elements:

- `ButtonDetails`: Button component with additional details
- `CertificationCard`: Individual certificate card with image and link
- `EducationCard`: Education entry card
- `LanguageSelector`: Language selection dropdown
- `PositionCard`: Individual job position card with details
- `ProfileSection`: Profile text content display
- `ProjectCard`: Personal project card
- `RecommendationCard`: Individual recommendation card with hierarchy badge

#### Organisms (Complex UI Sections)

Complex components composed of molecules and atoms:

- `AppFooter`: Application footer with credits
- `AppHeader`: Main header orchestrator (contains NavigationHeader, ThemeToggle, LanguageSelector, HeroSection)
- `ArticleSection`: Generic section wrapper with conditional rendering
- `CertificationsSection`: Grid layout of certificates
- `CompanyHistorySection`: Groups positions by company
- `CVArticle`: Main article container
- `CVSidebar`: Container for all sidebar sections
- `DetailsSection`: Contact information and social links
- `EducationSection`: Education history section
- `EmploymentHistorySection`: Groups all employment data
- `HeroSection`: Landing hero section with profile image
- `LanguagesSection`: Language proficiency levels
- `NavigationHeader`: Sticky navigation bar content
- `PersonalProjectsSection`: Personal projects grid/list
- `RecommendationsSection`: List of recommendations
- `SkillsSection`: Skills with animated progress bars

## Data Flow

1. **constants.ts** holds application constants (contact info, etc.)
2. **skills.ts** holds skills data
3. **locales/** holds all translatable content (i18n)
4. **HomeView.vue** imports constants and uses i18n for translations
5. Data is passed down to child components via props
6. Components use composables for business logic (formatting, animations, etc.)
7. Components read translations via `useI18n()` composable
8. UI updates reactively based on state changes

## Benefits of This Architecture

### Maintainability

- Easy to locate and modify specific functionality
- Clear separation of concerns
- Self-documenting code structure

### Reusability

- Components can be reused across different views
- Composables can be shared between components
- Types ensure consistency across the application

### Testability

- Each component can be tested in isolation
- Composables can be unit tested independently
- Mock data can be easily injected via props

### Scalability

- New sections can be added by creating new components
- New features can be added via new composables
- Type system catches errors early

### Performance

- Smaller components = better tree-shaking
- Lazy loading opportunities for route-based code splitting
- Composables only imported where needed

## Best Practices Implemented

1. **TypeScript First**: All code is fully typed
2. **Composition API**: Modern Vue 3 patterns throughout
3. **Accessibility**: ARIA labels, semantic HTML, keyboard navigation
4. **Responsive Design**: Mobile-first approach with Tailwind CSS
5. **Dark Mode Support**: Theme toggle with system preference detection
6. **Progressive Enhancement**: Works without JavaScript for basic content
7. **SEO Friendly**: Semantic HTML structure
8. **Performance Optimized**: Lazy loading, intersection observers for animations

## Adding New Features

### Adding a New Section

1. Create a new component in the appropriate atomic design folder (`atoms/`, `molecules/`, or `organisms/`)
2. Define the interface in `src/types/index.ts`
3. Import and use in `ArticleSection.vue` or `CVArticle.vue`
4. Add translations to `src/locales/*.json` files
5. Add constants to `src/config/constants.ts` if needed

### Adding New Business Logic

1. Create a new composable in `src/composables/`
2. Export functions following the pattern `use[Name]`
3. Import and use in relevant components

### Adding New Types

1. Add interfaces/types to `src/types/index.ts`
2. Import where needed using `import type { YourType } from '@/types'`

## Architecture Evolution

The application has evolved from a monolithic structure to a well-organized, scalable architecture:

### Current Structure

- **8 composables** for business logic
- **5 atoms** - Basic UI building blocks
- **8 molecules** - Composed UI elements
- **17 organisms** - Complex UI sections
- **1 types file** with all TypeScript definitions
- **1 simplified view** (~200 lines)
- **i18n support** with 3 languages (EN, ES, FR)
- **Atomic Design Pattern** for component organization

### Key Architectural Decisions

1. **Atomic Design**: Components organized by complexity (atoms → molecules → organisms)
2. **Internationalization**: Content managed through translation files, not hardcoded
3. **Configuration Management**: Constants centralized in `config/constants.ts`
4. **State Management**: Pinia stores for global state (language, etc.)
5. **Composables Pattern**: Business logic extracted and reusable across components

This results in better code organization, easier maintenance, improved testability, and enhanced developer experience.
