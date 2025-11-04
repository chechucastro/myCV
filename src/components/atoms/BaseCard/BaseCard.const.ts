export const BORDER_COLOR = {
  BLUE: 'blue',
  PURPLE: 'purple',
  GREEN: 'green',
  ORANGE: 'orange',
  GRAY: 'gray',
} as const

export const PADDING_SIZE = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const

export const TAG = {
  ARTICLE: 'article',
  DIV: 'div',
  SECTION: 'section',
} as const

export type BorderColor = (typeof BORDER_COLOR)[keyof typeof BORDER_COLOR]
export type PaddingSize = (typeof PADDING_SIZE)[keyof typeof PADDING_SIZE]
export type Tag = (typeof TAG)[keyof typeof TAG]
