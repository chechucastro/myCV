<template>
  <component
    :is="componentType"
    :href="props.href"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    :download="props.download"
    :class="cardClasses"
    :aria-label="props.ariaLabel"
    @click="handleClick"
  >
    <slot name="icon-container" :iconContainerClasses="iconContainerClasses">
      <div :class="iconContainerClasses">
        <slot name="icon">
          <svg
            v-if="props.iconPath"
            viewBox="0 0 24 24"
            :fill="props.iconFill"
            class="h-5 w-5"
            :class="props.iconClasses"
            aria-hidden="true"
            focusable="false"
          >
            <path :d="props.iconPath" />
          </svg>
        </slot>
      </div>
    </slot>

    <slot name="content" :contentClasses="contentClasses" :valueClasses="valueClasses">
      <div :class="contentClasses">
        <slot name="label">
          <span class="text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wide uppercase">{{ props.label }}</span>
        </slot>

        <slot name="value" :valueClasses="valueClasses">
          <span :class="valueClasses">{{ props.value }}</span>
        </slot>

        <slot name="secondary-value" v-if="hasSecondaryValue">
          <span class="text-sm text-gray-600 dark:text-gray-300">
            {{ props.secondaryValue }}
          </span>
        </slot>
      </div>
    </slot>

    <svg
      v-if="props.showArrow"
      class="ml-auto h-5 w-5 flex-shrink-0 text-gray-500 transition-all duration-500 group-hover:translate-x-2 group-hover:text-purple-500 dark:text-gray-400 dark:group-hover:text-purple-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
    </svg>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { tv, type VariantProps } from 'tailwind-variants'
import { trackExternalLink } from '@/composables/useGoogleAnalytics'

const buttonDetails = tv({
  slots: {
    base: [
      'group',
      'relative',
      'flex',
      'gap-4',
      'rounded-2xl',
      'border',
      'border-gray-200/50',
      'dark:border-gray-700/50',
      'bg-white/80',
      'dark:bg-gray-800/80',
      'backdrop-blur-sm',
      'p-4',
      'shadow-lg',
      'shadow-gray-200/50',
      'dark:shadow-gray-900/50',
      'transition-all',
      'duration-500',
      'ease-out',
      'overflow-hidden',
      'before:absolute',
      'before:inset-0',
      'before:rounded-2xl',
      'before:bg-gradient-to-br',
      'before:from-purple-500/0',
      'before:to-blue-500/0',
      'before:opacity-0',
      'before:transition-opacity',
      'before:duration-500',
      'before:-z-10',
    ],
    iconContainer: [
      'flex',
      'h-12',
      'w-12',
      'flex-shrink-0',
      'items-center',
      'justify-center',
      'rounded-xl',
      'shadow-lg',
      'transition-all',
      'duration-500',
      'ease-out',
    ],
    content: ['flex', 'flex-col', 'gap-1', 'flex-1', 'min-w-0'],
    value: ['text-sm', 'font-semibold', 'text-gray-900', 'dark:text-white', 'transition-colors', 'duration-300'],
  },
  variants: {
    alignment: {
      start: {
        base: 'items-start',
      },
      center: {
        base: 'items-center',
      },
    },
    isClickable: {
      true: {
        base: [
          'cursor-pointer',
          'hover:scale-[1.03]',
          'hover:shadow-2xl',
          'hover:shadow-purple-500/20',
          'dark:hover:shadow-purple-500/30',
          'hover:-translate-y-1',
          'active:scale-[0.98]',
          'active:translate-y-0',
          'before:hover:opacity-100',
          'before:hover:from-purple-500/5',
          'before:hover:to-blue-500/5',
          'dark:before:hover:from-purple-500/10',
          'dark:before:hover:to-blue-500/10',
        ],
        iconContainer: [
          'group-hover:scale-110',
          'group-hover:rotate-3',
          'group-active:scale-95',
          'group-active:rotate-0',
        ],
      },
    },
    isEmail: {
      true: {
        content: 'min-w-0 flex-1',
        value: 'truncate',
      },
    },
    hoverColor: {
      blue: {
        base: 'hover:border-blue-300/50 dark:hover:border-blue-500/50',
        value: 'group-hover:text-blue-600 dark:group-hover:text-blue-400',
      },
      purple: {
        base: 'hover:border-purple-300/50 dark:hover:border-purple-500/50',
        value: 'group-hover:text-purple-600 dark:group-hover:text-purple-400',
      },
      gray: {
        base: 'hover:border-gray-300/50 dark:hover:border-gray-500/50',
        value: 'group-hover:text-gray-600 dark:group-hover:text-gray-400',
      },
    },
  },
  defaultVariants: {
    alignment: 'center',
    isClickable: false,
    isEmail: false,
    hoverColor: 'purple',
  },
})

type ButtonDetailsVariants = VariantProps<typeof buttonDetails>

interface Props {
  label: string
  value?: string
  secondaryValue?: string
  href?: string
  ariaLabel?: string
  iconPath?: string
  iconFill?: string
  iconClasses?: string
  iconBgClass: string
  showArrow?: boolean
  alignment?: ButtonDetailsVariants['alignment']
  hoverColor?: ButtonDetailsVariants['hoverColor']
  download?: boolean | string
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  secondaryValue: '',
  href: undefined,
  ariaLabel: '',
  iconPath: '',
  iconFill: 'currentColor',
  iconClasses: 'text-white',
  showArrow: false,
  alignment: 'center',
  hoverColor: 'purple',
  download: undefined,
})

const isExternal = computed<boolean>(() => {
  return Boolean(props.href && (props.href.startsWith('http') || props.href.startsWith('mailto:')))
})

const componentType = computed<string>(() => {
  return props.href ? 'a' : 'div'
})

const isClickable = computed(() => Boolean(props.href))
const isEmail = computed(() => props.label === 'Email')

const styles = computed(() =>
  buttonDetails({
    alignment: props.alignment,
    isClickable: isClickable.value,
    isEmail: isEmail.value,
    hoverColor: isClickable.value ? props.hoverColor : undefined,
  }),
)

const cardClasses = computed(() => styles.value.base())
const iconContainerClasses = computed(() => `${styles.value.iconContainer()} ${props.iconBgClass}`)
const contentClasses = computed(() => styles.value.content())
const valueClasses = computed(() => styles.value.value())
const hasSecondaryValue = computed(() => Boolean(props.secondaryValue))

/**
 * Handle click events on external links
 */
const handleClick = (event: Event) => {
  if (isExternal.value && props.href) {
    // Extract destination name from label or URL
    const destination = props.label || extractDomainFromUrl(props.href)
    trackExternalLink(destination, props.href)
  }
}

/**
 * Extract domain name from URL for tracking
 */
const extractDomainFromUrl = (url: string): string => {
  try {
    if (url.startsWith('mailto:')) {
      return 'Email'
    }
    const urlObj = new URL(url)
    const hostname = urlObj.hostname.replace('www.', '')
    // Capitalize first letter
    return hostname.split('.')[0].charAt(0).toUpperCase() + hostname.split('.')[0].slice(1)
  } catch {
    return 'External Link'
  }
}
</script>
