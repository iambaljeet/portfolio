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
    const metadata = await resumeRepository.getMetadata();
    const personalInfo = await resumeRepository.getPersonalInfo();
    const socialLinks = await resumeRepository.getSocialLinks();
    
    // Find Twitter handle for Twitter card
    const twitterLink = socialLinks.find((link: SocialLink) => 
      link.text.toLowerCase().includes("twitter") || link.url.includes("twitter.com") || link.url.includes("x.com")
    );
    const twitterHandle = twitterLink?.url?.replace(/https?:\/\/(twitter\.com|x\.com)\//, "@");
    
    return {
      title: metadata.title,
      description: metadata.description,
      keywords: metadata.keywords,
      authors: [{ name: metadata.author }],
      creator: metadata.author,
      openGraph: {
        title: metadata.title,
        description: metadata.description,
        type: "profile",
        locale: "en_US",
        url: metadata.siteUrl,
        siteName: `${personalInfo.name} - Resume`,
      },
      twitter: {
        card: "summary",
        title: metadata.title,
        description: metadata.description,
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
