# ButtonDetails Component

A flexible, reusable UI component for displaying card-based information with icons, labels, and optional links. Built with Vue 3 Composition API, TypeScript, and extensive slot support.

## Features

✅ **Flexible Slot System** - Override any part of the component  
✅ **TypeScript Support** - Fully typed props and scoped slots  
✅ **SOLID Principles** - Clean, maintainable architecture  
✅ **Accessibility** - ARIA labels and semantic HTML  
✅ **Responsive** - Adapts to all screen sizes  
✅ **Theme Support** - Light and dark mode compatible  

---

## Basic Usage

### Simple Props-Based Usage

```vue
<ButtonDetails
  label="Email"
  value="john@example.com"
  href="mailto:john@example.com"
  aria-label="Send an email"
  icon-bg-class="bg-blue-500"
  :icon-path="emailIconPath"
/>
```

---

## Available Slots

The component provides **7 customizable slots** for maximum flexibility:

### 1. **`icon-container`** Slot

Replace the entire icon container.

**Scoped Slot Props:**
- `iconContainerClasses` - Computed CSS classes for the container

```vue
<ButtonDetails label="Custom" value="Value">
  <template #icon-container="{ iconContainerClasses }">
    <div :class="iconContainerClasses">
      <img src="/avatar.jpg" alt="Avatar" class="h-full w-full rounded-lg" />
    </div>
  </template>
</ButtonDetails>
```

---

### 2. **`icon`** Slot

Replace just the icon (keeps the default container).

```vue
<ButtonDetails label="Custom Icon" value="Value" icon-bg-class="bg-purple-500">
  <template #icon>
    <i class="fas fa-star text-white text-xl"></i>
  </template>
</ButtonDetails>
```

---

### 3. **`content`** Slot

Replace the entire content area.

**Scoped Slot Props:**
- `contentClasses` - Computed CSS classes for content container
- `valueClasses` - Computed CSS classes for value text

```vue
<ButtonDetails label="Custom Content" icon-bg-class="bg-green-500">
  <template #content="{ contentClasses, valueClasses }">
    <div :class="contentClasses">
      <h3 class="text-lg font-bold">Custom Title</h3>
      <p :class="valueClasses">Custom description with full control</p>
      <span class="text-xs text-gray-400">Extra info</span>
    </div>
  </template>
</ButtonDetails>
```

---

### 4. **`label`** Slot

Replace just the label (keeps default content structure).

```vue
<ButtonDetails value="john@example.com" icon-bg-class="bg-blue-500">
  <template #label>
    <span class="text-xs font-bold text-blue-600 uppercase">
      📧 Email Address
    </span>
  </template>
</ButtonDetails>
```

---

### 5. **`value`** Slot

Replace the main value display.

**Scoped Slot Props:**
- `valueClasses` - Computed CSS classes for value

```vue
<ButtonDetails label="Status" icon-bg-class="bg-green-500">
  <template #value="{ valueClasses }">
    <span :class="[valueClasses, 'flex items-center gap-2']">
      <span class="h-2 w-2 rounded-full bg-green-500"></span>
      Online
    </span>
  </template>
</ButtonDetails>
```

---

### 6. **`secondary-value`** Slot

Replace the secondary value (only shown if `secondaryValue` prop exists).

```vue
<ButtonDetails
  label="Address"
  value="123 Main St"
  secondary-value="New York"
  icon-bg-class="bg-red-500"
>
  <template #secondary-value>
    <span class="text-xs text-gray-500 flex items-center gap-1">
      <i class="fas fa-map-marker-alt"></i>
      New York, USA
    </span>
  </template>
</ButtonDetails>
```

---

### 7. **`trailing`** Slot

Add custom content at the end (badges, arrows, etc.).

```vue
<ButtonDetails label="Premium" value="Active" icon-bg-class="bg-yellow-500">
  <template #trailing>
    <span class="rounded-full bg-yellow-500 px-2 py-1 text-xs text-white">
      PRO
    </span>
  </template>
</ButtonDetails>
```

---

## Props API

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `iconBgClass` | `string` | Background classes for icon container (e.g., `"bg-blue-500"`) |

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `''` | Display label for the detail |
| `value` | `string` | `''` | Main value to display |
| `secondaryValue` | `string` | `''` | Secondary value (e.g., country) |
| `href` | `string` | `undefined` | Optional link URL |
| `ariaLabel` | `string` | `''` | ARIA label for accessibility |
| `iconPath` | `string` | `''` | SVG path data for icon |
| `iconFill` | `string` | `'currentColor'` | Icon fill color |
| `iconClasses` | `string` | `'text-white'` | Additional icon classes |
| `showArrow` | `boolean` | `false` | Show external link arrow |
| `hoverBorderColor` | `string` | `'hover:border-blue-300 dark:hover:border-blue-500'` | Border color on hover |
| `valueHoverColor` | `string` | `'group-hover:text-blue-600 dark:group-hover:text-blue-400'` | Value text hover color |
| `alignment` | `'start' \| 'center'` | `'center'` | Content vertical alignment |
| `isClickable` | `boolean` | `true` | Whether the card is clickable |

---

## Advanced Examples

### Example 1: Social Media Link with Custom Styling

```vue
<ButtonDetails
  href="https://twitter.com/user"
  aria-label="Visit Twitter profile"
  icon-bg-class="bg-[#1DA1F2]"
  hover-border-color="hover:border-[#1DA1F2]"
  :show-arrow="true"
>
  <template #icon>
    <i class="fab fa-twitter text-white text-xl"></i>
  </template>
  
  <template #label>
    <span class="text-xs font-semibold text-gray-500">Twitter</span>
  </template>
  
  <template #value>
    <span class="text-sm font-medium text-gray-900">@username</span>
  </template>
</ButtonDetails>
```

---

### Example 2: Status Card with Badge

```vue
<ButtonDetails
  label="Server Status"
  icon-bg-class="bg-gradient-to-br from-green-400 to-emerald-600"
  :is-clickable="false"
>
  <template #icon>
    <i class="fas fa-server text-white"></i>
  </template>
  
  <template #value>
    <span class="text-sm font-medium text-green-600">
      Online
    </span>
  </template>
  
  <template #trailing>
    <span class="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
      <span class="h-2 w-2 rounded-full bg-green-600 animate-pulse"></span>
    </span>
  </template>
</ButtonDetails>
```

---

### Example 3: Fully Custom Card

```vue
<ButtonDetails
  href="/profile"
  icon-bg-class="bg-gradient-to-br from-purple-500 to-pink-500"
>
  <template #icon-container="{ iconContainerClasses }">
    <div :class="[iconContainerClasses, 'relative']">
      <img src="/avatar.jpg" alt="Profile" class="h-full w-full rounded-lg object-cover" />
      <span class="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white"></span>
    </div>
  </template>
  
  <template #content>
    <div class="flex min-w-0 flex-1 flex-col">
      <div class="flex items-center gap-2">
        <span class="text-sm font-semibold text-gray-900">John Doe</span>
        <i class="fas fa-check-circle text-blue-500 text-xs"></i>
      </div>
      <span class="text-xs text-gray-500">Software Engineer</span>
      <div class="mt-1 flex gap-2">
        <span class="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">Vue.js</span>
        <span class="rounded bg-green-100 px-2 py-0.5 text-xs text-green-700">TypeScript</span>
      </div>
    </div>
  </template>
  
  <template #trailing>
    <i class="fas fa-chevron-right text-gray-400"></i>
  </template>
</ButtonDetails>
```

---

## TypeScript Support

The component is fully typed with TypeScript:

```typescript
import type { ButtonDetailsProps } from '@/components/molecules/ButtonDetails.vue'

// All props are typed
const props: ButtonDetailsProps = {
  label: 'Email',
  value: 'test@example.com',
  iconBgClass: 'bg-blue-500',
}
```

---

## Accessibility

The component follows accessibility best practices:

- ✅ Semantic HTML (`<a>` for links, `<div>` for static content)
- ✅ ARIA labels support
- ✅ Keyboard navigation support
- ✅ Focus states
- ✅ Screen reader friendly
- ✅ Proper `rel="noopener noreferrer"` for external links

---

## Styling

The component uses Tailwind CSS and supports:

- ✅ Light/Dark mode (`dark:` variants)
- ✅ Hover states
- ✅ Transitions and animations
- ✅ Responsive design
- ✅ Custom gradients

---

## Best Practices

1. **Use props for simple cases** - They're easier to maintain
2. **Use slots for customization** - When you need unique layouts
3. **Combine props and slots** - Use props for styling, slots for content
4. **Always provide ARIA labels** - For clickable elements
5. **Use scoped slot props** - To maintain consistent styling

---

## Browser Support

- ✅ All modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ Supports Vue 3.x

---

## Related Components

Consider using:
- `Button.vue` - For action buttons
- `Card.vue` - For content cards
- `Badge.vue` - For status indicators

---

## Contributing

When extending this component:
1. Maintain TypeScript typing
2. Follow SOLID principles
3. Add new props with sensible defaults
4. Document new slots
5. Ensure accessibility
6. Test with dark mode

---

## License

Part of the my-cv project.

