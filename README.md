# Professional Resume Web Application

A modern, responsive resume web application built with Next.js, featuring dark/light theme support, repository pattern architecture, and professional design.

## Features

- 🌓 **Dark/Light Theme Toggle** - Seamless switching between themes with system preference detection
- 📱 **Mobile Responsive** - Optimized for all device sizes
- ⚡ **Fast Loading** - Built with Next.js 15 and Turbopack
- 🎨 **Modern UI** - Clean design using shadcn/ui components
- 🏗️ **Repository Pattern** - Clean architecture with data abstraction
- 🗃️ **JSON Data Source** - Easy to update resume data via JSON file
- 📄 **Professional Layout** - Well-structured resume format

## Architecture

The application follows the Repository Pattern for clean data management:

- **Data Layer**: JSON file containing all resume data
- **Repository Layer**: Abstraction for data access with async methods
- **Presentation Layer**: React components consuming data via repository
- **Type Safety**: Full TypeScript support with defined interfaces

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **next-themes** - Theme management
- **Lucide React** - Beautiful icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Building for Production

```bash
npm run build
npm start
```

## Data Management

### JSON Data Structure

All resume data is stored in `/data/resume-data.json` with the following structure:

### Repository Pattern

The application uses a repository pattern for data access:

```typescript
// Access all data
const resumeData = await resumeRepository.getResumeData()

// Access specific sections
const personalInfo = await resumeRepository.getPersonalInfo()
const socialLinks = await resumeRepository.getSocialLinks()
const experiences = await resumeRepository.getExperiences()
const education = await resumeRepository.getEducation()
const technicalSkills = await resumeRepository.getTechnicalSkills()
```

## Customization

### Updating Resume Data

1. Edit `/data/resume-data.json` with your information
2. The application will automatically load the updated data
3. All changes are type-safe and validated

### Adding New Sections

1. Update the JSON structure in `/data/resume-data.json`
2. Add corresponding TypeScript interfaces in `/types/resume.ts`
3. Extend the repository in `/lib/resume-repository.ts`
4. Update the component in `/components/resume.tsx`

### Styling

The application uses Tailwind CSS for styling:
- Modify component classes in `/components/resume.tsx`
- Update theme colors in `/app/globals.css`
- Customize component variants in `/components/ui/`

## File Structure

```
├── app/
│   ├── globals.css          # Global styles and theme variables
│   ├── layout.tsx           # Root layout with theme provider
│   └── page.tsx             # Main page component
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── resume.tsx           # Main resume component
│   ├── theme-provider.tsx   # Theme context provider
│   ├── theme-toggle.tsx     # Theme switch component
│   ├── dynamic-icon.tsx     # Dynamic Lucide icon component
├── data/
│   └── resume-data.json     # Resume data source
├── lib/
│   ├── resume-repository.ts # Data access layer
├── types/
│   └── resume.ts           # TypeScript interfaces
└── public/                 # Static assets
```

## Features Overview

### Theme Support
- Light theme for bright environments
- Dark theme for low-light viewing
- System theme detection
- Persistent theme selection

### Resume Sections
- **Personal Information** - Contact details and social links
- **Professional Summary** - Brief overview of experience and skills
- **Technical Skills** - Categorized technical competencies
- **Professional Experience** - Detailed work history with achievements
- **Education** - Academic background
- **Key Achievements** - Highlighted metrics and accomplishments

### Repository Benefits
- **Separation of Concerns** - Data access separated from presentation
- **Easy Testing** - Repository can be easily mocked for testing
- **Future Extensibility** - Easy to switch to API or database
- **Type Safety** - Full TypeScript support throughout the data flow

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with every push

### Other Platforms
The application can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- Digital Ocean App Platform
- AWS Amplify

## Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions. The deployment process:

1. **Automatic Deployment**: Every push to the `main` branch triggers the deployment workflow
2. **Static Export**: Next.js builds and exports static files to the `out` directory
3. **GitHub Pages**: The static files are deployed to GitHub Pages automatically

### Manual Deployment

You can also trigger deployment manually:
1. Go to the Actions tab in your GitHub repository
2. Select "Deploy Next.js to GitHub Pages" workflow
3. Click "Run workflow" button

### Local Build Test

To test the static export locally:

```bash
npm run build
# The static files will be generated in the 'out' directory
```

### GitHub Pages Setup

To enable GitHub Pages for your repository:

1. Go to your repository Settings
2. Navigate to "Pages" section
3. Under "Source", select "GitHub Actions"
4. The site will be available at `https://yourusername.github.io/portfolio`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Contact Information:**
- Email: ibaljeet@outlook.com
- GitHub: [iambaljeet](https://github.com/iambaljeet)
- LinkedIn: [devbaljeet](https://linkedin.com/in/devbaljeet)
