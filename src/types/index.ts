/**
 * Core type definitions for the CV application
 */

export type LanguageLevel = 'Native' | 'Fluent' | 'Professional' | 'Conversational' | 'Basic'
export type HierarchyMode = 'client' | 'colleague' | 'manager' | 'reports_to'

export interface Skill {
  name: string
  level: number // 0 - 100
}

export interface Language {
  name: string
  level: LanguageLevel
}

export interface EmploymentPosition {
  position?: string // Deprecated - use i18n translations instead
  startDate: string // ISO date (YYYY-MM-DD) recommended
  endDate?: string // optional -> present if missing
  description?: string[] // bullet points - Deprecated - use i18n instead
  techStack?: string // tech stack used in this position - Deprecated - use i18n instead
}

export interface CompanyHistory {
  company?: string // Deprecated - use companyKey and i18n instead
  companyKey?: string // Key to look up company name in i18n translations
  companyLogo?: string
  positions: EmploymentPosition[]
}

export interface Education {
  degree?: string // Deprecated - use educationKey and i18n instead
  institution?: string // Deprecated - use educationKey and i18n instead
  fieldOfStudy?: string // Deprecated - use educationKey and i18n instead
  location?: string // Deprecated - use educationKey and i18n instead
  description?: string // Deprecated - use educationKey and i18n instead
  educationKey?: number // Index to look up education data in i18n translations
  startDate: string // ISO date (YYYY-MM-DD)
  endDate?: string // ISO date (YYYY-MM-DD) - optional for ongoing education
}

export interface Certification {
  title: string
  issuedBy: string
  issuedDate: string // ISO date (YYYY-MM-DD)
  certificateImage: string // URL or path to certificate image
  certificateLink: string // External link to verify certificate
}

export interface PersonalProject {
  title?: string // Deprecated - use projectKey and i18n instead
  description?: string // Deprecated - use projectKey and i18n instead
  techStack?: string // Deprecated - use projectKey and i18n instead
  projectUrl?: string
  githubUrl?: string
  projectKey?: number // Index to look up project data in i18n translations
  startDate?: string // ISO date (YYYY-MM-DD)
  endDate?: string // ISO date (YYYY-MM-DD) - optional for ongoing projects
}

export interface Recommendation {
  name: string
  surname: string
  jobPosition?: string // Deprecated - use i18n translations instead
  postDate: string // ISO date (YYYY-MM-DD)
  hierarchyMode: HierarchyMode
  postComment?: string // Deprecated - use i18n translations instead
  linkedInUrl?: string // LinkedIn profile URL
}

export interface ArticleSection {
  title: string
  body?: string | string[]
  companyHistory?: CompanyHistory[]
  education?: Education[]
  certifications?: Certification[]
  personalProjects?: PersonalProject[]
  recommendations?: Recommendation[]
}

export interface ContactInfo {
  name: string
  jobTitle: string
  techStack: string
  profileImage: string
  linkedin: {
    url: string
    handle: string
  }
  github: {
    url: string
    handle: string
  }
  email: string
  address: string
  country: string
  nationality: string
}
