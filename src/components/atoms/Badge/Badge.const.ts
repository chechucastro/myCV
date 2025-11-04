// Badge component constants and types

export const BADGE_MODE = {
  CLIENT: 'client',
  COLLEAGUE: 'colleague',
  MANAGER: 'manager',
  REPORTS_TO: 'reports_to',
} as const

export type BadgeMode = (typeof BADGE_MODE)[keyof typeof BADGE_MODE]
