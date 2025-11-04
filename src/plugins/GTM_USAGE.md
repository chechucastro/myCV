# Google Tag Manager Integration

This project includes a Google Tag Manager (GTM) plugin and composable for tracking analytics events.

## Configuration

GTM is initialized in `src/main.ts` with the following configuration:

```typescript
app.use(gtm, {
  id: 'GTM-5PZSPQJ5',
  enabled: true,
  debug: import.meta.env.DEV, // Debug mode enabled in development
})
```

## Usage

### Using the Composable (Recommended)

The `useGoogleTagManager` composable provides a clean API for tracking events:

```vue
<script setup lang="ts">
import { useGoogleTagManager } from '@/composables/useGoogleTagManager'

const { trackEvent, trackClick, trackPageView, trackInteraction } = useGoogleTagManager()

// Track a custom event
const handleButtonClick = () => {
  trackEvent('button_click', {
    buttonName: 'Download CV',
    location: 'header',
  })
}

// Track a click
const handleLinkClick = () => {
  trackClick('LinkedIn Profile', {
    category: 'external_link',
  })
}

// Track user interactions
const handleSkillHover = (skillName: string) => {
  trackInteraction('skill', 'hover', skillName)
}

// Track page view (useful in router guards)
const trackPage = () => {
  trackPageView('/about', 'About Page')
}
</script>

<template>
  <button @click="handleButtonClick">Download CV</button>
  <a @click="handleLinkClick">LinkedIn</a>
</template>
```

### Available Methods

#### `trackEvent(event: string, data?: Record<string, any>)`
Track a custom event with optional data.

```typescript
trackEvent('video_play', {
  videoId: '123',
  videoTitle: 'Introduction',
  duration: 120,
})
```

#### `trackClick(elementName: string, data?: Record<string, any>)`
Track element clicks.

```typescript
trackClick('Contact Button', {
  section: 'footer',
  destination: 'email',
})
```

#### `trackPageView(pagePath?: string, pageTitle?: string)`
Track page views.

```typescript
trackPageView('/projects', 'Projects Page')
```

#### `trackFormSubmission(formName: string, data?: Record<string, any>)`
Track form submissions.

```typescript
trackFormSubmission('Contact Form', {
  formType: 'inquiry',
  fields: ['name', 'email', 'message'],
})
```

#### `trackInteraction(category: string, action: string, label?: string, value?: number)`
Track user interactions with GA-style parameters.

```typescript
trackInteraction('navigation', 'scroll', 'header', 50)
```

#### `push(data: Record<string, any>)`
Push custom data to the data layer.

```typescript
push({
  event: 'custom_event',
  userId: '123',
  userType: 'premium',
})
```

### Router Integration

Track page views automatically on route changes:

```typescript
// In src/router/index.ts
import { useGoogleTagManager } from '@/composables/useGoogleTagManager'

router.afterEach((to, from) => {
  const { trackPageView } = useGoogleTagManager()
  trackPageView(to.path, to.meta.title as string || document.title)
})
```

### Common Use Cases

#### Track Button Clicks
```vue
<button @click="trackClick('Download Resume', { format: 'PDF' })">
  Download Resume
</button>
```

#### Track External Links
```vue
<a 
  :href="linkedInUrl" 
  target="_blank"
  @click="trackEvent('external_link', { 
    destination: 'LinkedIn',
    url: linkedInUrl 
  })"
>
  View LinkedIn
</a>
```

#### Track Section Visibility
```vue
<script setup lang="ts">
import { onMounted } from 'vue'
import { useGoogleTagManager } from '@/composables/useGoogleTagManager'

const { trackEvent } = useGoogleTagManager()

onMounted(() => {
  trackEvent('section_view', {
    section: 'experience',
    timestamp: new Date().toISOString(),
  })
})
</script>
```

#### Track Theme Toggle
```vue
<script setup lang="ts">
const { trackEvent } = useGoogleTagManager()

const toggleTheme = (newTheme: 'dark' | 'light') => {
  trackEvent('theme_change', {
    theme: newTheme,
    source: 'header_toggle',
  })
  // ... theme toggle logic
}
</script>
```

#### Track Language Selection
```vue
<script setup lang="ts">
const { trackEvent } = useGoogleTagManager()

const changeLanguage = (locale: string) => {
  trackEvent('language_change', {
    from: currentLocale.value,
    to: locale,
  })
  // ... language change logic
}
</script>
```

## Debug Mode

Debug mode is automatically enabled in development (`import.meta.env.DEV`). 

When enabled, all GTM events will be logged to the console:

```
[GTM] Initialized with ID: GTM-5PZSPQJ5
[GTM] Event pushed: { event: 'button_click', buttonName: 'Download CV' }
```

## Configuration Options

The GTM plugin accepts the following options:

```typescript
interface GTMConfig {
  id: string          // GTM Container ID (required)
  enabled?: boolean   // Enable/disable GTM (default: true)
  debug?: boolean     // Enable debug logging (default: false)
  loadScript?: boolean // Load GTM script automatically (default: true)
}
```

## TypeScript Support

Full TypeScript support is included. The GTM instance is available via:

- Composition API: `inject('gtm')`
- Options API: `this.$gtm`

## Testing

In test environments, you may want to disable GTM:

```typescript
app.use(gtm, {
  id: 'GTM-5PZSPQJ5',
  enabled: import.meta.env.PROD, // Only enable in production
})
```

## Data Layer

All events are pushed to `window.dataLayer` which GTM uses to process and forward data to configured tags.

You can inspect the data layer in your browser console:

```javascript
console.log(window.dataLayer)
```

