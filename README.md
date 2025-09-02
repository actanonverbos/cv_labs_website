# CV Labs Website

A marketing website for a landing page design/build service built with Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, and Sanity CMS.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide Icons
- **CMS**: Sanity CMS
- **Analytics**: Umami Analytics
- **Theme**: Dark/Light mode with next-themes
- **Hosting**: Vercel
- **Version Control**: Github

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── blog/                     # Blog pages (CMS-driven)
│   ├── studio/                   # Sanity Studio admin interface
│   ├── templates/                # Template showcase pages
│   └── page.tsx                  # Main landing page
├── components/
│   ├── sections/                 # Page sections (hero, pricing, etc.)
│   └── ui/                       # shadcn/ui components
├── sanity/                       # Sanity CMS configuration
│   ├── schemaTypes/              # Content schemas
│   └── lib/                      # Sanity client & utilities
└── lib/                          # Utility functions
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env.local` file with your Sanity configuration:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token
```

### 3. Run Development Server

```bash
npm run dev
```

- **Website**: [http://localhost:3000](http://localhost:3000)
- **Sanity Studio**: [http://localhost:3000/studio](http://localhost:3000/studio)

## Content Management with Sanity CMS

### Accessing the CMS

1. Navigate to `/studio` in your browser
2. Sign in with your Sanity account
3. Create and edit content through the visual interface

### Content Types

The CMS includes the following schemas:

- **Posts**: Blog articles with rich text content
- **Authors**: Author profiles and information
- **Categories**: Content categorization
- **Templates**: Showcase templates with images and descriptions
- **Block Content**: Portable text for rich content editing

### Key Files

- `sanity.config.ts` - Main Sanity configuration
- `src/sanity/schemaTypes/` - Content schema definitions
- `src/sanity/lib/client.ts` - Sanity client setup
- `src/lib/sanity.ts` - GROQ queries and data fetching

### Adding New Content Types

1. Create a new schema in `src/sanity/schemaTypes/`
2. Export it in `src/sanity/schemaTypes/index.ts`
3. Add GROQ queries in `src/lib/sanity.ts`
4. Create components to display the content

## Site Structure

### Landing Page Sections

The main landing page (`/`) includes:

1. **Hero** - Main value proposition with CTAs
2. **Benefits** - Core service benefits grid
3. **Process** - 4-step timeline of the service process
4. **Work** - Portfolio showcase
5. **Pricing** - Service tier pricing cards
6. **FAQ** - Accordion-style frequently asked questions
7. **CTA** - Final call-to-action
8. **Footer** - Links and contact information

### Additional Pages

- `/blog` - CMS-driven blog posts
- `/templates` - Template showcase
- `/privacy` - Privacy policy
- `/terms` - Terms of service

## Design System

### Typography
- **Font**: Atkinson Hyperlegible Mono
- **Scale**: H1 (3rem), H2 (2rem), H3 (1.5rem), H4 (1.25rem), Body (1rem)

### Layout
- **Container**: Max-width 1200px with responsive padding
- **Grid**: 12-column responsive grid
- **Spacing**: Consistent vertical rhythm with `py-20` mobile, `py-28` desktop

### Colors (HSL CSS Variables)
- **Background**: `--bg: 222 50% 4%`
- **Foreground**: `--fg: 220 15% 96%`
- **Primary**: `--primary: 260 95% 60%`
- **Muted**: `--muted: 220 10% 65%`

### Motion
- **Scroll Reveal**: Fade + 8px rise with smooth cubic-bezier easing
- **Micro-interactions**: Subtle hover effects (scale 1.01, translate-y-1)
- **Accessibility**: Respects `prefers-reduced-motion`

## Development Guidelines

### Key Features

- **Single Open FAQ**: Accordion component allows only one item open at a time
- **Scroll Animations**: Framer Motion reveals on scroll
- **Theme Toggle**: Dark/light mode support
- **Responsive Design**: Mobile-first approach
- **Performance**: Optimized images with Next/Image
- **Analytics**: Umami integration for tracking

### Component Architecture

- Use TypeScript for all components
- Follow shadcn/ui patterns for consistency
- Implement proper accessibility features
- Use Tailwind classes for styling (no custom CSS)
- Prefix event handlers with "handle" (e.g., `handleClick`)

### Content Editing Workflow

1. **Static Content**: Edit directly in component files
2. **Dynamic Content**: Use Sanity Studio at `/studio`
3. **Images**: Upload through Sanity for optimization
4. **Blog Posts**: Create through CMS with rich text editor

## Deployment

The site is optimized for deployment on Vercel:

```bash
npm run build
npm start
```

### Performance Targets

- Lighthouse Score: ≥90 (desktop), ≥85 (mobile)
- All CTAs properly tracked
- Optimized images and fonts

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity CMS Documentation](https://www.sanity.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion)
