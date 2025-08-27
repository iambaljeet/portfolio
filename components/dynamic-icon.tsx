import * as LucideIcons from "lucide-react"
import React from "react"

interface DynamicIconProps {
  name: string
  className?: string
  size?: number
}

interface LucideIconProps {
  className?: string
  size?: number
}

export function DynamicIcon({ name, className, size = 16 }: DynamicIconProps) {
  // Get the icon component from lucide-react
  const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<LucideIconProps>>)[name]
  
  if (!IconComponent) {
    // Fallback to a default icon if the specified icon doesn't exist
    const DefaultIcon = LucideIcons.Link
    return <DefaultIcon className={className} size={size} />
  }
  
  return <IconComponent className={className} size={size} />
}

// Export commonly used icons for type safety
export const IconMap = {
  Github: LucideIcons.Github,
  Linkedin: LucideIcons.Linkedin,
  Twitter: LucideIcons.Twitter,
  Globe: LucideIcons.Globe,
  Mail: LucideIcons.Mail,
  Phone: LucideIcons.Phone,
  MapPin: LucideIcons.MapPin,
  ExternalLink: LucideIcons.ExternalLink,
  Link: LucideIcons.Link,
  User: LucideIcons.User,
  Briefcase: LucideIcons.Briefcase,
  Code: LucideIcons.Code,
  FileText: LucideIcons.FileText,
  Award: LucideIcons.Award,
  Star: LucideIcons.Star,
  Heart: LucideIcons.Heart,
  Coffee: LucideIcons.Coffee,
  Zap: LucideIcons.Zap,
  Target: LucideIcons.Target,
  Rocket: LucideIcons.Rocket,
} as const

export type IconName = keyof typeof IconMap
