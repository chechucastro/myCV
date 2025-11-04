export const BUTTON_VARIANT = {
  SOLID: 'solid',
  OUTLINE: 'outline',
} as const

export const BUTTON_COLOR = {
  BLUE: 'blue',
  GREEN: 'green',
  PURPLE: 'purple',
  GRAY: 'gray',
  ORANGE: 'orange',
  BLACK: 'black',
} as const

export const BUTTON_SIZE = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const

export const BUTTON_TAG = {
  BUTTON: 'button',
  ANCHOR: 'a',
} as const

export const BUTTON_TYPE = {
  BUTTON: 'button',
  SUBMIT: 'submit',
  RESET: 'reset',
} as const

export type ButtonVariant = (typeof BUTTON_VARIANT)[keyof typeof BUTTON_VARIANT]
export type ButtonColor = (typeof BUTTON_COLOR)[keyof typeof BUTTON_COLOR]
export type ButtonSize = (typeof BUTTON_SIZE)[keyof typeof BUTTON_SIZE]
export type ButtonTag = (typeof BUTTON_TAG)[keyof typeof BUTTON_TAG]
export type ButtonType = (typeof BUTTON_TYPE)[keyof typeof BUTTON_TYPE]
