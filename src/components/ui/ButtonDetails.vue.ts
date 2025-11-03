
import { computed } from 'vue'
import { tv, type VariantProps } from 'tailwind-variants'

const buttonDetails = tv({
  slots: {
    base: [
      'group',
      'flex',
      'gap-3',
      'rounded-xl',
      'border',
      'border-gray-200',
      'bg-gradient-to-br',
      'from-white',
      'to-gray-50',
      'p-3',
      'shadow-sm',
      'transition-all',
      'duration-300',
      'dark:border-gray-700',
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
        base: 'hover:border-blue-300 dark:hover:border-blue-500',
        value: 'group-hover:text-blue-600 dark:group-hover:text-blue-400',
      },
      gray: {
        base: 'hover:border-gray-400 dark:hover:border-gray-500',
        value: 'group-hover:text-gray-700 dark:group-hover:text-gray-300',
      },
    },
  },
  defaultVariants: {
    alignment: 'center',
    isClickable: false,
    isEmail: false,
    hoverColor: 'blue',
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
  hoverColor: 'blue',
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
export default (await import('vue')).defineComponent({
props: (__VLS_mergePropDefaults({} as __VLS_DefinePropsToOptions<Props>, {
  value: '',
  secondaryValue: '',
  href: undefined,
  ariaLabel: '',
  iconPath: '',
  iconFill: 'currentColor',
  iconClasses: 'text-white',
  showArrow: false,
  alignment: 'center',
  hoverColor: 'blue',
})),
setup() {
() => {
{
// @ts-ignore
(componentType);
// @ts-ignore
(props.href);
// @ts-ignore
(isExternal ? '_blank' : undefined);
// @ts-ignore
(isExternal ? 'noopener noreferrer' : undefined);
// @ts-ignore
(cardClasses);
// @ts-ignore
(props.ariaLabel);
{
// @ts-ignore
(iconContainerClasses);
{
// @ts-ignore
(iconContainerClasses);
{
// @ts-ignore
if (props.iconPath) {
{
// @ts-ignore
(props.iconFill);
// @ts-ignore
(props.iconClasses);
{
// @ts-ignore
(props.iconPath);
}
}
}
}
}
}
{
// @ts-ignore
(contentClasses);
// @ts-ignore
(valueClasses);
{
// @ts-ignore
(contentClasses);
{
{
// @ts-ignore
{  props.label  };
}
}
{
// @ts-ignore
(valueClasses);
{
// @ts-ignore
(valueClasses);
// @ts-ignore
{  props.value  };
}
}
// @ts-ignore
if (hasSecondaryValue) {
{
{
// @ts-ignore
{  props.secondaryValue  };
}
}
}
}
}
{
// @ts-ignore
if (props.showArrow) {
{
{
}
}
}
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
