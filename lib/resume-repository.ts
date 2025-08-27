import { ResumeData } from '@/types/resume'
import resumeData from '@/data/resume-data.json'

export interface ResumeRepository {
  getResumeData(): Promise<ResumeData>
  getPersonalInfo(): Promise<ResumeData['personalInfo']>
  getSocialLinks(): Promise<ResumeData['socialLinks']>
  getExperiences(): Promise<ResumeData['experiences']>
  getEducation(): Promise<ResumeData['education']>
  getTechnicalSkills(): Promise<ResumeData['technicalSkills']>
  getKeyAchievements(): Promise<ResumeData['keyAchievements']>
  getProfessionalSummary(): Promise<string>
}

class JsonResumeRepository implements ResumeRepository {
  private data: ResumeData

  constructor() {
    this.data = resumeData as ResumeData
  }

  async getResumeData(): Promise<ResumeData> {
    return this.data
  }

  async getPersonalInfo(): Promise<ResumeData['personalInfo']> {
    return this.data.personalInfo
  }

  async getSocialLinks(): Promise<ResumeData['socialLinks']> {
    return this.data.socialLinks
  }

  async getExperiences(): Promise<ResumeData['experiences']> {
    return this.data.experiences
  }

  async getEducation(): Promise<ResumeData['education']> {
    return this.data.education
  }

  async getTechnicalSkills(): Promise<ResumeData['technicalSkills']> {
    return this.data.technicalSkills
  }

  async getKeyAchievements(): Promise<ResumeData['keyAchievements']> {
    return this.data.keyAchievements
  }

  async getProfessionalSummary(): Promise<string> {
    return this.data.professionalSummary
  }
}

// Export singleton instance
export const resumeRepository: ResumeRepository = new JsonResumeRepository()
