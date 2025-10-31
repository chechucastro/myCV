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
  position: string
  startDate: string // ISO date (YYYY-MM-DD) recommended
  endDate?: string // optional -> present if missing
  description: string[] // bullet points
}

export interface CompanyHistory {
  company: string
  positions: EmploymentPosition[]
}

export interface Certification {
  title: string
  issuedBy: string
  issuedDate: string // ISO date (YYYY-MM-DD)
  certificateImage: string // URL or path to certificate image
  certificateLink: string // External link to verify certificate
}

export interface Recommendation {
  name: string
  surname: string
  jobPosition: string
  postDate: string // ISO date (YYYY-MM-DD)
  hierarchyMode: HierarchyMode
  postComment: string
}

export interface ArticleSection {
  title: string
  body?: string | string[]
  companyHistory?: CompanyHistory[]
  certifications?: Certification[]
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

