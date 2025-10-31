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
│   └── cv-data.ts             # CV content (skills, languages, articles, contact info)
│
├── composables/               # Reusable business logic
│   ├── useTheme.ts           # Theme management (dark/light mode)
│   ├── useScroll.ts          # Scroll tracking logic
│   ├── useIntersectionObserver.ts  # Intersection Observer utilities
│   ├── useFormatters.ts      # Data formatting utilities
│   └── useAccessibility.ts   # Accessibility announcements
│
├── components/
│   ├── header/               # Header and navigation components
│   │   ├── AppHeader.vue            # Main header component
│   │   ├── ThemeToggle.vue          # Dark/light mode toggle
│   │   ├── LanguageSelector.vue     # Language selection dropdown
│   │   ├── NavigationHeader.vue     # Navigation bar header
│   │   ├── HeroSection.vue          # Hero section with profile
│   │   └── SkipToContent.vue        # Accessibility skip link
│   │
│   ├── sidebar/              # Sidebar components
│   │   ├── CVSidebar.vue            # Main sidebar container
│   │   ├── SkillsSection.vue        # Skills with progress bars
│   │   ├── LanguagesSection.vue     # Language proficiency
│   │   └── DetailsSection.vue       # Contact and personal details
│   │
│   ├── article/              # Main content components
│   │   ├── CVArticle.vue            # Article container
│   │   ├── ArticleSection.vue       # Generic section wrapper
│   │   └── ProfileSection.vue       # Profile text content
│   │
│   ├── employment/           # Employment history components
│   │   ├── EmploymentHistorySection.vue  # Employment container
│   │   ├── CompanyHistorySection.vue     # Company grouping
│   │   └── PositionCard.vue              # Individual position card
│   │
│   ├── certifications/       # Certification components
│   │   ├── CertificationsSection.vue     # Certifications grid
│   │   └── CertificationCard.vue         # Individual certificate
│   │
│   └── recommendations/      # Recommendation components
│       ├── RecommendationsSection.vue    # Recommendations container
│       └── RecommendationCard.vue        # Individual recommendation
│
├── layouts/
│   └── DefaultLayout.vue     # Main layout wrapper
│
└── views/
    └── HomeView.vue          # Main view (now much simpler)
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

- **Theme Management**: Dark/light mode toggle
- **Scroll Tracking**: Monitors scroll position for UI updates
- **Intersection Observer**: Handles scroll animations and visibility detection
- **Formatters**: Date formatting, language levels, hierarchy modes
- **Accessibility**: Screen reader announcements

### Component Hierarchy

#### Header Components

- `AppHeader`: Main header orchestrator
- `ThemeToggle`: Isolated theme switching logic
- `LanguageSelector`: Standalone language selection
- `NavigationHeader`: Sticky navigation bar content
- `HeroSection`: Landing hero with profile image
- `SkipToContent`: Accessibility skip link

#### Sidebar Components

- `CVSidebar`: Container for all sidebar sections
- `SkillsSection`: Skills with animated progress bars
- `LanguagesSection`: Language proficiency levels
- `DetailsSection`: Contact information and social links

#### Article Components

- `CVArticle`: Main content container
- `ArticleSection`: Generic section wrapper with conditional rendering
- `ProfileSection`: Simple text content display

#### Employment Components

- `EmploymentHistorySection`: Groups all employment data
- `CompanyHistorySection`: Groups positions by company
- `PositionCard`: Individual job position with details

#### Certification Components

- `CertificationsSection`: Grid layout of certificates
- `CertificationCard`: Individual certificate with image and link

#### Recommendation Components

- `RecommendationsSection`: List of recommendations
- `RecommendationCard`: Individual recommendation with hierarchy badge

## Data Flow

1. **cv-data.ts** holds all CV content (skills, languages, articles, contact info)
2. **HomeView.vue** imports and uses this data
3. Data is passed down to child components via props
4. Components use composables for business logic (formatting, animations, etc.)
5. UI updates reactively based on state changes

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

1. Create a new component in the appropriate folder
2. Define the interface in `src/types/index.ts`
3. Import and use in `ArticleSection.vue`
4. Add data to `src/data/cv-data.ts`

### Adding New Business Logic

1. Create a new composable in `src/composables/`
2. Export functions following the pattern `use[Name]`
3. Import and use in relevant components

### Adding New Types

1. Add interfaces/types to `src/types/index.ts`
2. Import where needed using `import type { YourType } from '@/types'`

## Migration Notes

The original monolithic `HomeView.vue` (1218 lines) has been split into:

- **8 composables** for business logic
- **24 focused components** for UI
- **1 types file** with all TypeScript definitions
- **1 simplified view** (now ~250 lines)

This results in better code organization, easier maintenance, and improved developer experience.
