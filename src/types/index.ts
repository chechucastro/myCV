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
  startDate: string // ISO date (YYYY-MM-DD) recommended
  endDate?: string // optional -> present if missing
  city?: string // City where the position is located
  workType?: 'remote' | 'hybrid' | 'on-site' // Type of work arrangement
}

export interface CompanyHistory {
  companyKey?: string // Key to look up company name in i18n translations
  companyLogo?: string
  positions: EmploymentPosition[]
}

export interface Education {
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
  projectUrl?: string
  githubUrl?: string
  githubIsPrivate?: boolean // Whether the GitHub repository is private
  projectKey?: number // Index to look up project data in i18n translations
  startDate?: string // ISO date (YYYY-MM-DD)
  endDate?: string // ISO date (YYYY-MM-DD) - optional for ongoing projects
}

export interface Recommendation {
  name: string
  surname: string
  postDate: string // ISO date (YYYY-MM-DD)
  hierarchyMode: HierarchyMode
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
