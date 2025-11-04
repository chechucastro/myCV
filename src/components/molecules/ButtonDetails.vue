<template>
  <component
    :is="componentType"
    :href="props.href"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
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
          <span class="text-xs text-gray-500 dark:text-gray-400">{{ props.label }}</span>
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

    <slot name="trailing">
      <svg
        v-if="props.showArrow"
        class="ml-auto h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1 dark:text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </slot>
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
      'flex',
      'gap-3',
      'rounded-xl',
      'border',
      'border-purple-200',
      'dark:border-purple-700',
      'bg-gradient-to-br',
      'from-white',
      'to-gray-50',
      'p-3',
      'shadow-sm',
      'transition-all',
      'duration-300',
      'dark:from-gray-800',
      'dark:to-gray-800/50',
    ],
    iconContainer: [
      'flex',
      'h-10',
      'w-10',
      'flex-shrink-0',
      'items-center',
      'justify-center',
      'rounded-lg',
      'shadow-sm',
    ],
    content: ['flex', 'flex-col'],
    value: ['text-sm', 'font-medium', 'text-gray-900', 'dark:text-white'],
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
        base: 'cursor-pointer hover:scale-[1.02] hover:shadow-md',
        iconContainer: 'transition-transform duration-300 group-hover:scale-110',
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
        base: 'hover:border-purple-300 dark:hover:border-purple-500',
        value: 'group-hover:text-purple-600 dark:group-hover:text-purple-400',
      },
      purple: {
        base: 'hover:border-purple-300 dark:hover:border-purple-500',
        value: 'group-hover:text-purple-600 dark:group-hover:text-purple-400',
      },
      gray: {
        base: 'hover:border-purple-300 dark:hover:border-purple-500',
        value: 'group-hover:text-purple-600 dark:group-hover:text-purple-400',
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
