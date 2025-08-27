"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Mail, MapPin, Phone } from "lucide-react"
import { useEffect, useState } from "react"
import { resumeRepository } from "@/lib/resume-repository"
import { ResumeData } from "@/types/resume"
import { DynamicIcon } from "@/components/dynamic-icon"

export function Resume() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const data = await resumeRepository.getResumeData()
        setResumeData(data)
      } catch (error) {
        console.error('Failed to fetch resume data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchResumeData()
  }, [])

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-8 bg-background text-foreground">
        <div className="animate-pulse space-y-8">
          <div className="h-48 bg-muted rounded-lg"></div>
          <div className="h-32 bg-muted rounded-lg"></div>
          <div className="h-64 bg-muted rounded-lg"></div>
        </div>
      </div>
    )
  }

  if (!resumeData) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-8 bg-background text-foreground">
        <Card className="border-2">
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground">Failed to load resume data.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { personalInfo, socialLinks, professionalSummary, technicalSkills, experiences, education, keyAchievements } = resumeData

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-background text-foreground">
      {/* Header Section */}
      <Card className="border-2">
        <CardHeader className="text-center space-y-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{personalInfo.name}</h1>
            <p className="text-xl text-muted-foreground mt-2">{personalInfo.title}</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{personalInfo.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <a href={`tel:${personalInfo.phone}`} className="hover:underline">
                {personalInfo.phone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a href={`mailto:${personalInfo.email}`} className="hover:underline">
                {personalInfo.email}
              </a>
            </div>
          </div>

          <div className="flex justify-center flex-wrap gap-3">
            {socialLinks.map((link) => (
              <a 
                key={link.id}
                href={link.url}
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 ${link.bgColor} ${link.color} rounded-lg ${link.hoverColor} transition-colors`}
              >
                <DynamicIcon name={link.icon} className="h-4 w-4" />
                <span>{link.text}</span>
              </a>
            ))}
          </div>
        </CardHeader>
      </Card>

      {/* Professional Summary */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl">Professional Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            {professionalSummary}
          </p>
        </CardContent>
      </Card>

      {/* Professional Experience */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl">Professional Experience</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {experiences.map((exp, companyIndex) => (
            <div key={companyIndex} className="space-y-4">
              {/* Company Header */}
              <div className="border-l-4 border-primary pl-4">
                <h3 className="text-xl font-semibold text-primary">{exp.company}</h3>
                {exp.location && (
                  <p className="text-sm text-muted-foreground">{exp.location}</p>
                )}
              </div>

              {/* Roles within the company */}
              <div className="space-y-4 ml-6">
                {exp.roles.map((role, roleIndex) => (
                  <div key={roleIndex} className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h4 className="text-lg font-semibold">{role.title}</h4>
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">
                        {role.period}
                      </div>
                    </div>
                    
                    {role.achievements && role.achievements.length > 0 && (
                      <ul className="space-y-2 text-muted-foreground">
                        {role.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                            <span className="leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {role.technologies && role.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {role.technologies.map((tech, techIndex) => (
                          <Badge key={`${companyIndex}-${roleIndex}-${techIndex}-${tech}`} variant="neutral" className="text-xs border-dashed">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {roleIndex < exp.roles.length - 1 &&
                      exp.roles[roleIndex] &&
                      ((exp.roles[roleIndex].achievements?.length ?? 0) > 0 ||
                      (exp.roles[roleIndex].technologies?.length ?? 0) > 0) && (
                        <div className="h-px bg-border/50 my-3"></div>
                    )}
                  </div>
                ))}
              </div>

              {companyIndex < experiences.length - 1 && <Separator className="mt-6" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Technical Skills */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl">Technical Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(technicalSkills).map(([category, skills]) => (
            <div key={category}>
              <h3 className="font-semibold text-lg mb-2">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="neutral" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Education */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl">Education</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {education.map((edu, index) => (
            <div key={index} className="space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-lg">{edu.degree}</h3>
                  <p className="text-muted-foreground">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground">{edu.location}</p>
                </div>
                <div className="text-sm font-medium text-primary">
                  {edu.year}
                </div>
              </div>
              {index < education.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Key Achievements */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl">Key Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {keyAchievements.map((achievement, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary">{achievement.value}</span>
                  <span className="text-sm text-muted-foreground">{achievement.description}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
