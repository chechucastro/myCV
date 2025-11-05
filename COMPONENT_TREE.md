# Component Tree Structure

## Visual Component Hierarchy

```
HomeView.vue (Main View)
│
├── DefaultLayout.vue (Layout Wrapper)
│   │
│   ├── SkipToContent.vue (Atom - Accessibility)
│   │
│   ├── AppHeader.vue (Organism - Header Section)
│   │   │
│   │   ├── NavigationHeader.vue (Organism)
│   │   │   ├── Profile Image
│   │   │   ├── Name
│   │   │   └── Job Title
│   │   │
│   │   ├── ThemeToggle.vue (Atom - Dark/Light Mode)
│   │   │
│   │   ├── LanguageSelector.vue (Molecule - EN/ES/FR)
│   │   │
│   │   └── HeroSection.vue (Organism)
│   │       ├── Animated Background
│   │       ├── Profile Image
│   │       ├── Name
│   │       ├── Job Title
│   │       └── Tech Stack
│   │
│   ├── Main Content
│   │   │
│   │   ├── CVSidebar.vue (Organism - Left Sidebar)
│   │   │   │
│   │   │   ├── SkillsSection.vue (Organism)
│   │   │   │   └── Skill Items with Progress Bars
│   │   │   │       └── [Uses: useIntersectionObserver, useAccessibility]
│   │   │   │
│   │   │   ├── LanguagesSection.vue (Organism)
│   │   │   │   └── Language Items with Level Bars
│   │   │   │       └── [Uses: useFormatters, useIntersectionObserver, useAccessibility]
│   │   │   │
│   │   │   └── DetailsSection.vue (Organism)
│   │   │       ├── Social Links (LinkedIn, GitHub)
│   │   │       ├── Contact (Email)
│   │   │       ├── Address
│   │   │       └── Nationality
│   │   │
│   │   └── CVArticle.vue (Organism - Main Article)
│   │       │
│   │       └── ArticleSection.vue (Organism - Generic Section)
│   │           │
│   │           ├── ProfileSection.vue (Molecule - Profile Text)
│   │           │   └── Simple Text Body
│   │           │
│   │           ├── EmploymentHistorySection.vue (Organism)
│   │           │   │
│   │           │   └── CompanyHistorySection.vue (Organism - Per Company)
│   │           │       │
│   │           │       └── PositionCard.vue (Molecule - Per Position)
│   │           │           ├── Position Title
│   │           │           ├── Date Range
│   │           │           ├── Description Bullets
│   │           │           └── [Uses: useFormatters]
│   │           │
│   │           ├── EducationSection.vue (Organism)
│   │           │   │
│   │           │   └── EducationCard.vue (Molecule - Per Education)
│   │           │       ├── Institution
│   │           │       ├── Degree
│   │           │       ├── Date Range
│   │           │       └── [Uses: useFormatters]
│   │           │
│   │           ├── CertificationsSection.vue (Organism)
│   │           │   │
│   │           │   └── CertificationCard.vue (Molecule - Grid of Cards)
│   │           │       ├── Certificate Image
│   │           │       ├── Title
│   │           │       ├── Issued By
│   │           │       ├── Issue Date
│   │           │       ├── View Certificate Link
│   │           │       └── [Uses: useFormatters]
│   │           │
│   │           ├── PersonalProjectsSection.vue (Organism)
│   │           │   │
│   │           │   └── ProjectCard.vue (Molecule - Per Project)
│   │           │       ├── Project Title
│   │           │       ├── Description
│   │           │       ├── Technologies
│   │           │       └── Links
│   │           │
│   │           └── RecommendationsSection.vue (Organism)
│   │               │
│   │               └── RecommendationCard.vue (Molecule - List of Cards)
│   │                   ├── Name & Surname
│   │                   ├── Job Position
│   │                   ├── Post Date
│   │                   ├── Hierarchy Badge (Atom)
│   │                   ├── Comment/Quote
│   │                   └── [Uses: useFormatters]
│   │
│   └── AppFooter.vue (Organism)
│       └── Footer Credits
```

## Composables Usage Map

```
Composables (Shared Logic)
│
├── useTheme.ts
│   └── Used by: ThemeToggle.vue (Atom)
│       └── Provides: isDark, toggleDark()
│
├── useScroll.ts
│   └── Used by: HomeView.vue
│       └── Provides: isScrolled
│       └── Consumed by: AppHeader, HeroSection
│
├── useIntersectionObserver.ts
│   └── Used by: HomeView.vue, SkillsSection.vue, LanguagesSection.vue
│       └── Provides: observeElement(), setupScrollReveal()
│
├── useFormatters.ts
│   └── Used by: LanguagesSection.vue, PositionCard.vue, CertificationCard.vue, 
│       └──         RecommendationCard.vue, EducationCard.vue
│       └── Provides: formatDate(), formatHierarchyMode(), getLanguageLevelNumber(), 
│           └──        getLanguageLevelColor()
│
├── useAccessibility.ts
│   └── Used by: SkillsSection.vue, LanguagesSection.vue
│       └── Provides: announceToLiveRegion()
│
├── useBfcache.ts
│   └── Used by: HomeView.vue (via pagehide/pageshow handlers)
│       └── Provides: Browser back/forward cache compatibility
│
├── useGoogleAnalytics.ts
│   └── Used by: Application-wide (typically in main.ts or App.vue)
│       └── Provides: Google Analytics tracking
│
└── useLinkedIn.ts
    └── Used by: Components needing LinkedIn integration
        └── Provides: LinkedIn-specific utilities
```

## Data Flow Diagram

```
HomeView.vue (State Management)
│
├── State Variables:
│   ├── isScrolled: boolean (from useScroll)
│   ├── showNameInNav: boolean
│   ├── hasScrolled: boolean
│   └── isHeroVisible: boolean
│
├── Data Sources:
│   ├── CONTACT_INFO from config/constants.ts
│   ├── Skills from data/skills.ts
│   └── Translations from locales/*.json (via i18n)
│
└── Data Flow:
    │
    ├── → AppHeader
    │   ├── :name, :job-title, :tech-stack, :profile-image
    │   ├── → NavigationHeader
    │   ├── → ThemeToggle
    │   ├── → LanguageSelector
    │   └── → HeroSection
    │
    ├── → CVSidebar
    │   ├── Skills from data/skills.ts → SkillsSection
    │   ├── Languages from i18n → LanguagesSection
    │   └── Contact from constants → DetailsSection
    │
    └── → CVArticle
        └── :sections → ArticleSection (for each section)
            │
            ├── Profile section → ProfileSection (reads from i18n)
            ├── Core Competencies section → ProfileSection (reads from i18n)
            ├── Languages section → LanguagesSection (reads from i18n)
            ├── Employment section → EmploymentHistorySection
            │   └── → CompanyHistorySection (for each company, from i18n)
            │       └── → PositionCard (for each position)
            │
            ├── Education section → EducationSection
            │   └── → EducationCard (for each education, from i18n)
            │
            ├── Certifications section → CertificationsSection
            │   └── → CertificationCard (for each cert, from i18n)
            │
            ├── Personal Projects section → PersonalProjectsSection
            │   └── → ProjectCard (for each project, from i18n)
            │
            └── Recommendations section → RecommendationsSection
                └── → RecommendationCard (for each rec, from i18n)
```

## Component Responsibilities

### Container Components (Smart)
Components that manage state or fetch data:
- `HomeView.vue` - Manages scroll state and hero visibility
- `CVSidebar.vue` - Groups sidebar sections, reads from data/i18n
- `CVArticle.vue` - Groups article sections, builds from i18n
- `AppHeader.vue` - Manages header sections and navigation state
- `ArticleSection.vue` - Conditionally renders section components

### Presentational Components (Dumb)
Components that only display data passed via props or read from i18n:
- `SkillsSection.vue` - Displays skills (from data)
- `LanguagesSection.vue` - Displays languages (from i18n)
- `DetailsSection.vue` - Displays contact info (from constants)
- `PositionCard.vue` - Displays one position (from i18n)
- `CertificationCard.vue` - Displays one certification (from i18n)
- `EducationCard.vue` - Displays one education entry (from i18n)
- `ProjectCard.vue` - Displays one project (from i18n)
- `RecommendationCard.vue` - Displays one recommendation (from i18n)
- `ProfileSection.vue` - Displays profile text (from i18n)
- `ThemeToggle.vue` - Displays theme button (Atom)
- `LanguageSelector.vue` - Displays language dropdown (Molecule)
- `Badge.vue` - Displays badge (Atom)

### Layout Components
Components that provide structure:
- `DefaultLayout.vue` - Main layout wrapper
- `HeroSection.vue` - Hero layout (Organism)
- `NavigationHeader.vue` - Nav layout (Organism)
- `AppFooter.vue` - Footer layout (Organism)

### Utility Components
Components for specific utilities:
- `SkipToContent.vue` - Accessibility helper (Atom)
- `BaseButton.vue` - Base button with variants (Atom)
- `BaseCard.vue` - Base card with variants (Atom)

## Interaction Flow

```
User Actions → Component Events → Composable Logic → State Updates → UI Updates

Example 1: Theme Toggle
Click ThemeToggle → toggleDark() → useTheme updates isDark → DOM class added → UI updates

Example 2: Scroll Animation
User scrolls → useScroll tracks → isScrolled updates → AppHeader collapses → HeroSection shrinks

Example 3: Skill Animation
Page loads → useIntersectionObserver detects → SkillsSection visible → Arrows animate → useAccessibility announces

Example 4: Date Display
Data passed → PositionCard receives → useFormatters.formatDate() → Formatted date rendered
```

## Import/Export Flow

```
Types Flow:
src/types/index.ts
    ↓ (export all interfaces)
    └→ All components import types
       └→ Type safety enforced across app

Composables Flow:
src/composables/*.ts
    ↓ (export functions)
    └→ Components import as needed
       └→ Logic reused across components

Constants Flow:
src/config/constants.ts
    ↓ (export constants)
    └→ Components import constants
       └→ Shared configuration values

Data Flow:
src/data/*.ts
    ↓ (export data)
    └→ Components import data
       └→ Static application data

i18n Flow:
src/locales/*.json
    ↓ (translation files)
    └→ Plugins/i18n.ts loads translations
       └→ Components use useI18n() composable
          └→ Dynamic content from translations

Component Flow:
src/components/
    ├── atoms/*/Component.vue
    ├── molecules/Component.vue
    └── organisms/Component.vue
    ↓ (export default component)
    └→ Parent components import
       └→ Composed into views
```

## Folder Organization Rationale (Atomic Design)

```
components/
│
├── atoms/           → Smallest UI components (Badge, Button, Card, etc.)
│   └── Each atom has its own folder with variants and constants
│
├── molecules/       → Composed UI elements (Cards, Selectors, etc.)
│   └── Simple combinations of atoms
│
└── organisms/       → Complex UI sections (Sections, Headers, etc.)
    └── Complex combinations of molecules and atoms
```

**Why Atomic Design?**
- **Hierarchical**: Clear component complexity levels
- **Reusable**: Atoms can be used across many molecules/organisms
- **Maintainable**: Easy to locate components by complexity
- **Scalable**: New components fit naturally into the hierarchy
- **Consistent**: Encourages design system thinking
- **Testable**: Each level can be tested independently

## Component Sizing

```
Atoms (< 100 lines):
- SkipToContent.vue
- ThemeToggle.vue
- Badge.vue
- BaseButton.vue
- BaseCard.vue

Molecules (100-200 lines):
- LanguageSelector.vue
- ProfileSection.vue
- PositionCard.vue
- CertificationCard.vue
- EducationCard.vue
- ProjectCard.vue
- RecommendationCard.vue
- ButtonDetails.vue

Organisms (200+ lines):
- NavigationHeader.vue
- DetailsSection.vue
- CompanyHistorySection.vue
- SkillsSection.vue
- LanguagesSection.vue
- HeroSection.vue (lots of styling/animations)
- AppHeader.vue (orchestrates multiple children)
- CVArticle.vue
- CVSidebar.vue
- ArticleSection.vue
- EmploymentHistorySection.vue
- EducationSection.vue
- CertificationsSection.vue
- PersonalProjectsSection.vue
- RecommendationsSection.vue
- AppFooter.vue

Views:
- HomeView.vue (~200 lines - orchestration + state)
```

## Reusability Score

| Component | Reusability | Reason |
|-----------|-------------|--------|
| **Atoms** | | |
| ThemeToggle | ⭐⭐⭐⭐⭐ | Can be used anywhere |
| Badge | ⭐⭐⭐⭐⭐ | Generic badge component |
| BaseButton | ⭐⭐⭐⭐⭐ | Base button with variants |
| BaseCard | ⭐⭐⭐⭐⭐ | Base card with variants |
| SkipToContent | ⭐⭐⭐⭐⭐ | Generic accessibility helper |
| **Molecules** | | |
| PositionCard | ⭐⭐⭐⭐⭐ | Generic job position display |
| CertificationCard | ⭐⭐⭐⭐⭐ | Generic certificate display |
| EducationCard | ⭐⭐⭐⭐⭐ | Generic education display |
| ProjectCard | ⭐⭐⭐⭐⭐ | Generic project display |
| RecommendationCard | ⭐⭐⭐⭐ | Generic recommendation display |
| LanguageSelector | ⭐⭐⭐⭐ | i18n-aware selector |
| ProfileSection | ⭐⭐⭐⭐ | Generic text section |
| ButtonDetails | ⭐⭐⭐⭐ | Button with details |
| **Organisms** | | |
| SkillsSection | ⭐⭐⭐⭐ | Works with any skill array |
| LanguagesSection | ⭐⭐⭐⭐ | Works with any language array |
| CertificationsSection | ⭐⭐⭐⭐ | Generic certifications grid |
| EducationSection | ⭐⭐⭐⭐ | Generic education list |
| PersonalProjectsSection | ⭐⭐⭐⭐ | Generic projects grid |
| RecommendationsSection | ⭐⭐⭐⭐ | Generic recommendations list |
| HeroSection | ⭐⭐⭐ | CV-specific but customizable |
| AppHeader | ⭐⭐ | CV-specific structure |
| CVSidebar | ⭐⭐ | CV-specific layout |
| CVArticle | ⭐⭐ | CV-specific container |

## Testing Strategy

```
Unit Tests (Each component + composable):
├── useTheme.spec.ts
├── useFormatters.spec.ts
├── ThemeToggle.spec.vue
├── PositionCard.spec.vue
└── ... (one per file)

Integration Tests:
├── CVSidebar.spec.vue (with child sections)
├── EmploymentHistorySection.spec.vue (with companies)
└── AppHeader.spec.vue (with nav + hero)

E2E Tests:
└── cv-page.spec.ts (full page flow)
```

This structure makes testing straightforward as each component has clear inputs (props) and outputs (emitted events or rendered DOM).

