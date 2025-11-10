<template>
  <component
    :is="tag"
    :href="tag === 'a' ? href : undefined"
    :target="tag === 'a' && external ? '_blank' : undefined"
    :rel="tag === 'a' && external ? 'noopener noreferrer' : undefined"
    :download="tag === 'a' && download ? download : undefined"
    :type="tag === 'button' ? buttonType : undefined"
    :disabled="disabled"
    :aria-label="ariaLabel"
    :class="buttonClasses"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ButtonVariant, ButtonColor, ButtonSize, ButtonTag } from './BaseButton.const'
import { button } from './BaseButton.variants'

// Re-export
export type { ButtonVariant, ButtonColor, ButtonSize, ButtonTag }

defineOptions({
  name: 'BaseButton',
})

interface Props {
  variant?: ButtonVariant
  color?: ButtonColor
  size?: ButtonSize
  fullWidth?: boolean
  disabled?: boolean
  tag?: ButtonTag
  href?: string
  external?: boolean
  download?: string | boolean
  buttonType?: 'button' | 'submit' | 'reset'
  ariaLabel?: string
  customClasses?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'solid',
  color: 'purple',
  size: 'md',
  fullWidth: false,
  disabled: false,
  tag: 'button',
  external: true,
  buttonType: 'button',
})

const buttonClasses = computed<string>(() => {
  const baseClasses = button({
    variant: props.variant,
    color: props.color,
    size: props.size,
    fullWidth: props.fullWidth,
  })
  return props.customClasses ? `${baseClasses} ${props.customClasses}` : baseClasses
})
</script>
