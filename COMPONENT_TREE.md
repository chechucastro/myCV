# Component Tree Structure

## Visual Component Hierarchy

```
HomeView.vue (Main View)
│
├── DefaultLayout.vue (Layout Wrapper)
│   │
│   ├── SkipToContent.vue (Accessibility)
│   │
│   ├── AppHeader.vue (Header Section)
│   │   │
│   │   ├── NavigationHeader.vue
│   │   │   ├── Profile Image
│   │   │   ├── Name
│   │   │   └── Job Title
│   │   │
│   │   ├── ThemeToggle.vue (Dark/Light Mode)
│   │   │
│   │   ├── LanguageSelector.vue (EN/ES/FR)
│   │   │
│   │   └── HeroSection.vue
│   │       ├── Animated Background
│   │       ├── Profile Image
│   │       ├── Name
│   │       ├── Job Title
│   │       └── Tech Stack
│   │
│   └── Main Content
│       │
│       ├── CVSidebar.vue (Left Sidebar)
│       │   │
│       │   ├── SkillsSection.vue
│       │   │   └── Skill Items with Progress Bars
│       │   │       └── [Uses: useIntersectionObserver, useAccessibility]
│       │   │
│       │   ├── LanguagesSection.vue
│       │   │   └── Language Items with Level Bars
│       │   │       └── [Uses: useFormatters, useIntersectionObserver, useAccessibility]
│       │   │
│       │   └── DetailsSection.vue
│       │       ├── Social Links (LinkedIn, GitHub)
│       │       ├── Contact (Email)
│       │       ├── Address
│       │       └── Nationality
│       │
│       └── CVArticle.vue (Main Article)
│           │
│           └── ArticleSection.vue (Generic Section)
│               │
│               ├── ProfileSection.vue (Profile Text)
│               │   └── Simple Text Body
│               │
│               ├── EmploymentHistorySection.vue
│               │   │
│               │   └── CompanyHistorySection.vue (Per Company)
│               │       │
│               │       └── PositionCard.vue (Per Position)
│               │           ├── Position Title
│               │           ├── Date Range
│               │           ├── Description Bullets
│               │           └── [Uses: useFormatters]
│               │
│               ├── CertificationsSection.vue
│               │   │
│               │   └── CertificationCard.vue (Grid of Cards)
│               │       ├── Certificate Image
│               │       ├── Title
│               │       ├── Issued By
│               │       ├── Issue Date
│               │       ├── View Certificate Link
│               │       └── [Uses: useFormatters]
│               │
│               └── RecommendationsSection.vue
│                   │
│                   └── RecommendationCard.vue (List of Cards)
│                       ├── Name & Surname
│                       ├── Job Position
│                       ├── Post Date
│                       ├── Hierarchy Badge
│                       ├── Comment/Quote
│                       └── [Uses: useFormatters]
```

## Composables Usage Map

```
Composables (Shared Logic)
│
├── useTheme.ts
│   └── Used by: ThemeToggle.vue
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
│   └── Used by: LanguagesSection.vue, PositionCard.vue, CertificationCard.vue, RecommendationCard.vue
│       └── Provides: formatDate(), formatHierarchyMode(), getLanguageLevelNumber(), getLanguageLevelColor()
│
└── useAccessibility.ts
    └── Used by: SkillsSection.vue, LanguagesSection.vue
        └── Provides: announceToLiveRegion()
```

## Data Flow Diagram

```
HomeView.vue (State Management)
│
├── State Variables:
│   ├── skills: Skill[]
│   ├── languages: Language[]
│   ├── articleSections: ArticleSection[]
│   ├── isScrolled: boolean (from useScroll)
│   └── showNameInNav: boolean
│
└── Data Flow:
    │
    ├── → CVSidebar
    │   ├── :skills → SkillsSection
    │   ├── :languages → LanguagesSection
    │   └── contact props → DetailsSection
    │
    └── → CVArticle
        └── :sections → ArticleSection (for each section)
            │
            ├── section.body → ProfileSection
            ├── section.companyHistory → EmploymentHistorySection
            │   └── → CompanyHistorySection (for each company)
            │       └── → PositionCard (for each position)
            │
            ├── section.certifications → CertificationsSection
            │   └── → CertificationCard (for each cert)
            │
            └── section.recommendations → RecommendationsSection
                └── → RecommendationCard (for each rec)
```

## Component Responsibilities

### Container Components (Smart)
Components that manage state or fetch data:
- `HomeView.vue` - Holds all application data
- `CVSidebar.vue` - Groups sidebar sections
- `CVArticle.vue` - Groups article sections
- `AppHeader.vue` - Manages header sections

### Presentational Components (Dumb)
Components that only display data passed via props:
- `SkillsSection.vue` - Displays skills
- `LanguagesSection.vue` - Displays languages
- `DetailsSection.vue` - Displays contact info
- `PositionCard.vue` - Displays one position
- `CertificationCard.vue` - Displays one certification
- `RecommendationCard.vue` - Displays one recommendation
- `ThemeToggle.vue` - Displays theme button
- `LanguageSelector.vue` - Displays language dropdown

### Layout Components
Components that provide structure:
- `DefaultLayout.vue` - Main layout wrapper
- `HeroSection.vue` - Hero layout
- `NavigationHeader.vue` - Nav layout

### Utility Components
Components for specific utilities:
- `SkipToContent.vue` - Accessibility helper

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

Component Flow:
src/components/*/*.vue
    ↓ (export default component)
    └→ Parent components import
       └→ Composed into views
```

## Folder Organization Rationale

```
components/
│
├── header/          → All header-related UI
├── sidebar/         → All sidebar-related UI
├── article/         → Main content wrappers
├── employment/      → Employment-specific components
├── certifications/  → Certification-specific components
└── recommendations/ → Recommendation-specific components
```

**Why this structure?**
- **Feature-based**: Related components grouped together
- **Scalable**: Easy to add new features in new folders
- **Discoverable**: Clear where to find specific components
- **Modular**: Each folder can be extracted as a module if needed

## Component Sizing

```
Small Components (< 100 lines):
- SkipToContent.vue
- ThemeToggle.vue
- LanguageSelector.vue
- ProfileSection.vue
- PositionCard.vue
- CertificationCard.vue
- RecommendationCard.vue

Medium Components (100-200 lines):
- NavigationHeader.vue
- DetailsSection.vue
- CompanyHistorySection.vue
- SkillsSection.vue
- LanguagesSection.vue

Large Components (200+ lines):
- HeroSection.vue (lots of styling/animations)
- AppHeader.vue (orchestrates multiple children)
- HomeView.vue (data + orchestration)
```

## Reusability Score

| Component | Reusability | Reason |
|-----------|-------------|--------|
| ThemeToggle | ⭐⭐⭐⭐⭐ | Can be used anywhere |
| SkillsSection | ⭐⭐⭐⭐ | Works with any skill array |
| PositionCard | ⭐⭐⭐⭐⭐ | Generic job position display |
| CertificationCard | ⭐⭐⭐⭐⭐ | Generic certificate display |
| RecommendationCard | ⭐⭐⭐⭐ | Generic recommendation display |
| HeroSection | ⭐⭐⭐ | CV-specific but customizable |
| AppHeader | ⭐⭐ | CV-specific structure |

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

