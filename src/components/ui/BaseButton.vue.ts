
import { computed } from 'vue'
import { tv } from 'tailwind-variants'

defineOptions({
  name: 'BaseButton',
})

export type ButtonVariant = 'solid' | 'outline'
export type ButtonColor = 'blue' | 'green' | 'purple' | 'gray' | 'orange'
export type ButtonSize = 'sm' | 'md' | 'lg'
export type ButtonTag = 'button' | 'a'

interface Props {
  variant?: ButtonVariant
  color?: ButtonColor
  size?: ButtonSize
  fullWidth?: boolean
  disabled?: boolean
  tag?: ButtonTag
  href?: string
  external?: boolean
  buttonType?: 'button' | 'submit' | 'reset'
  ariaLabel?: string
  customClasses?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'solid',
  color: 'blue',
  size: 'md',
  fullWidth: false,
  disabled: false,
  tag: 'button',
  external: true,
  buttonType: 'button',
})

const button = tv({
  base: [
    'inline-flex items-center justify-center gap-2',
    'font-semibold',
    'cursor-pointer',
    'transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ],
  variants: {
    variant: {
      solid: 'shadow-sm',
      outline: ['border-2 bg-transparent', 'dark:focus:ring-offset-neutral-900'],
    },
    color: {
      blue: '',
      green: '',
      purple: '',
      gray: '',
      orange: '',
    },
    size: {
      sm: 'rounded-md px-3 py-1.5 text-xs',
      md: 'rounded-lg px-4 py-2 text-sm',
      lg: 'rounded-lg px-5 py-3 text-sm',
    },
    fullWidth: {
      true: 'w-full',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: 'solid',
      color: 'blue',
      class: 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 focus:ring-blue-500',
    },
    {
      variant: 'outline',
      color: 'blue',
      class: 'border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/30 focus:ring-blue-500',
    },
    {
      variant: 'solid',
      color: 'green',
      class: 'bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 focus:ring-green-500',
    },
    {
      variant: 'outline',
      color: 'green',
      class: 'border-green-600 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/30 focus:ring-green-500',
    },
    {
      variant: 'solid',
      color: 'purple',
      class: 'bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 focus:ring-purple-500',
    },
    {
      variant: 'outline',
      color: 'purple',
      class: 'border-purple-600 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/30 focus:ring-purple-500',
    },
    {
      variant: 'solid',
      color: 'gray',
      class: 'bg-gray-600 text-white hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-gray-500',
    },
    {
      variant: 'outline',
      color: 'gray',
      class: 'border-gray-600 text-gray-600 hover:bg-gray-50 dark:border-gray-400 dark:text-gray-400 dark:hover:bg-gray-900/30 focus:ring-gray-500',
    },
    {
      variant: 'solid',
      color: 'orange',
      class: 'bg-orange-600 text-white hover:bg-orange-700 dark:bg-orange-700 dark:hover:bg-orange-600 focus:ring-orange-500',
    },
    {
      variant: 'outline',
      color: 'orange',
      class: 'border-orange-600 text-orange-600 hover:bg-orange-50 dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-900/30 focus:ring-orange-500',
    },
  ],
})

const buttonClasses = computed(() => {
  const baseClasses = button({
    variant: props.variant,
    color: props.color,
    size: props.size,
    fullWidth: props.fullWidth,
  })
  return props.customClasses ? `${baseClasses} ${props.customClasses}` : baseClasses
})
export default (await import('vue')).defineComponent({
props: (__VLS_mergePropDefaults({} as __VLS_DefinePropsToOptions<Props>, {
  variant: 'solid',
  color: 'blue',
  size: 'md',
  fullWidth: false,
  disabled: false,
  tag: 'button',
  external: true,
  buttonType: 'button',
})),
setup() {
() => {
{
// @ts-ignore
(tag);
// @ts-ignore
(tag === 'a' ? href : undefined);
// @ts-ignore
(tag === 'a' && external ? '_blank' : undefined);
// @ts-ignore
(tag === 'a' && external ? 'noopener noreferrer' : undefined);
// @ts-ignore
(tag === 'button' ? buttonType : undefined);
// @ts-ignore
(disabled);
// @ts-ignore
(ariaLabel);
// @ts-ignore
(buttonClasses);
{
}
}
};
return { };
},
});
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_DefinePropsToOptions<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? { type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>> } : { type: import('vue').PropType<T[K]>, required: true } };
declare function __VLS_mergePropDefaults<P, D>(props: P, defaults: D): {
			[K in keyof P]: K extends keyof D ? P[K] & {
				default: D[K]
			} : P[K]
		}
