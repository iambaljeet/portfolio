export interface MetaData {
  title: string
  description: string
  keywords: string[]
  author: string
  siteUrl: string
}

export interface PersonalInfo {
  name: string
  title: string
  location: string
  phone: string
  email: string
}

export interface SocialLink {
  id: string
  text: string
  url: string
  icon: string // lucide icon name or custom icon identifier
  type: 'social' | 'contact' | 'portfolio' | 'custom'
  color?: string // custom color for the link
  bgColor?: string // custom background color
  hoverColor?: string // custom hover color
}

export interface RoleDetails {
  title: string
  period: string
  achievements?: string[]
  technologies?: string[]
}

export interface ExperienceItem {
  company: string
  location?: string
  roles: RoleDetails[]
}

export interface EducationItem {
  degree: string
  institution: string
  year: string
  location: string
}

export interface KeyAchievement {
  value: string
  description: string
}

export interface TechnicalSkills {
  [category: string]: string[]
}

export interface ResumeData {
  metadata: MetaData
  personalInfo: PersonalInfo
  socialLinks: SocialLink[]
  professionalSummary: string
  technicalSkills: TechnicalSkills
  experiences: ExperienceItem[]
  education: EducationItem[]
  keyAchievements: KeyAchievement[]
}
