import { tv, type VariantProps } from 'tailwind-variants'
import type { BorderColor, PaddingSize } from './BaseCard.const'

export const card = tv({
  base: 'group relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border-0 dark:border-neutral-700 dark:from-neutral-800 dark:to-neutral-900 dark:shadow-lg dark:shadow-black/20 flex flex-col h-full',
  variants: {
    borderColor: {
      blue: 'border-l-4 border-slate-100 dark:border-l-4 dark:border-blue-400',
      purple: 'border-l-4 border-slate-100 dark:border-l-4 dark:border-purple-400',
      green: 'border-l-4 border-slate-100 dark:border-l-4 dark:border-green-400',
      orange: 'border-l-4 border-slate-100 dark:border-l-4 dark:border-orange-400',
      gray: 'border-l-4 border-slate-100 dark:border-l-4 dark:border-gray-400',
    },
    padding: {
      sm: 'p-3 sm:p-6',
      md: 'p-6',
      lg: 'p-8',
    },
  },
})

export type CardVariantProps = VariantProps<typeof card>

export interface CardProps {
  borderColor?: BorderColor
  padding?: PaddingSize
}
