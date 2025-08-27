import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { resumeRepository } from "@/lib/resume-repository";
import { SocialLink } from "@/types/resume";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

async function generateMetadata(): Promise<Metadata> {
  try {
    const personalInfo = await resumeRepository.getPersonalInfo();
    const socialLinks = await resumeRepository.getSocialLinks();
    const experiences = await resumeRepository.getExperiences();
    const professionalSummary = await resumeRepository.getProfessionalSummary();
    
    // Get current role from the most recent experience
    const currentRole = experiences[0]?.roles[0]?.title || "Professional";
    
    // Extract skills for description
    const skills = await resumeRepository.getSkills();
    const topSkills = skills.technical.slice(0, 5).join(", ");
    
    const title = `${personalInfo.name} - ${currentRole}`;
    const description = `Professional resume of ${personalInfo.name}, ${professionalSummary} Skilled in ${topSkills}.`;
    
    // Find Twitter handle
    const twitterLink = socialLinks.find((link: SocialLink) => link.text.toLowerCase().includes("twitter") || link.url.includes("twitter.com"));
    const twitterHandle = twitterLink?.url?.replace("https://twitter.com/", "@") || twitterLink?.url?.replace("https://x.com/", "@");
    
    return {
      title,
      description,
      keywords: [
        personalInfo.name,
        currentRole,
        ...skills.technical.slice(0, 8),
        ...personalInfo.location.split(", "),
      ],
      authors: [{ name: personalInfo.name }],
      creator: personalInfo.name,
      openGraph: {
        title,
        description,
        type: "profile",
        locale: "en_US",
        url: "https://iambaljeet.github.io/portfolio/",
        siteName: `${personalInfo.name} - Resume`,
      },
      twitter: {
        card: "summary",
        title,
        description,
        creator: twitterHandle,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
        },
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    // Fallback metadata
    return {
      title: "Professional Resume",
      description: "Professional resume showcasing experience and skills",
    };
  }
}

export const metadata: Metadata = await generateMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
