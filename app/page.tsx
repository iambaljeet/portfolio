"use client"

import { Resume } from "@/components/resume"
import { SmartHeader } from "@/components/smart-header"
import { useEffect, useState } from "react"
import { resumeRepository } from "@/lib/resume-repository"
import { ResumeData } from "@/types/resume"

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const data = await resumeRepository.getResumeData()
        setResumeData(data)
      } catch (error) {
        console.error('Failed to fetch resume data:', error)
      }
    }

    fetchResumeData()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Smart Header with user name on scroll */}
      <SmartHeader userName={resumeData?.personalInfo.name} />

      {/* Main content */}
      <main className="container mx-auto py-8">
        <Resume />
      </main>
    </div>
  )
}
