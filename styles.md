# CV Labs Website - Style Guide

## Design System Overview

Our design system is built on modern web standards with a focus on accessibility, performance, and user experience. We use a combination of custom CSS variables, Tailwind CSS utilities, and component-based architecture.

## Color System

### Theme Support
We support both light and dark modes using CSS custom properties that automatically switch based on the `dark` class on the document element.

#### Light Mode Colors
- **Background**: `hsl(0 0% 100%)` - Pure white
- **Foreground**: `hsl(222 84% 4.9%)` - Dark slate
- **Primary**: `hsl(260 95% 60%)` - Purple accent
- **Muted**: `hsl(210 40% 96%)` - Light gray
- **Border**: `hsl(214.3 31.8% 91.4%)` - Subtle borders

#### Dark Mode Colors
- **Background**: `hsl(0 0% 0%)` - Pure black
- **Foreground**: `hsl(220 15% 96%)` - Light gray
- **Card**: `hsl(252 14% 7%)` - Dark card background
- **Muted**: `hsl(252 14% 7%)` - Dark muted
- **Border**: `hsl(252 14% 11%)` - Dark borders

### Usage
- Use `text-foreground` for primary text
- Use `text-muted-foreground` for secondary text
- Use `bg-background` for main backgrounds
- Use `bg-card` for elevated surfaces
- Use `text-primary` for accent colors

## Typography

### Font Families
- **Primary**: Manrope - Modern, clean sans-serif for body text and headings
- **Monospace**: IBM Plex Mono - Used for labels, badges, and technical content

### Typography Scale

#### Headings
```css
h1: 2.5rem (40px) → 3.5rem (56px) on md+
    font-weight: 700, line-height: 1.1, letter-spacing: -0.02em

h2: 1.875rem (30px) → 2.25rem (36px) on md+
    font-weight: 600, line-height: 1.2, letter-spacing: -0.01em

h3: 1.25rem (20px) → 1.5rem (24px) on md+
    font-weight: 600, line-height: 1.3

h4: 1.125rem (18px)
    font-weight: 600, line-height: 1.4
```

#### Body Text
```css
p: 1rem (16px)
   font-weight: 400, line-height: 1.7

.text-lg: 1.125rem (18px)
          line-height: 1.7
```

#### Utility Classes
```css
.label: 0.875rem (14px)
        font-weight: 500
        font-family: IBM Plex Mono

.eyebrow: IBM Plex Mono
          font-weight: 500
          letter-spacing: 0.025em
```

## Spacing System

### Container Widths
- **Standard Container**: `max-w-[1200px]` with `px-4 md:px-6`
- **Tight Container**: `max-w-[800px]` with `px-4 md:px-6` - Used for content sections

### Section Spacing
- **Standard Sections**: `py-16 md:py-20`
- **Hero Sections**: `py-20 md:py-28`
- **Compact Sections**: `py-12 md:py-16`

### Component Spacing
- **Card Padding**: `p-6` (24px)
- **Card Gap**: `gap-6` (24px) between elements
- **Button Padding**: `px-4 py-2` (default), `px-6 py-3` (large)
- **Section Margins**: `mb-6`, `mb-8`, `mb-12` for progressive spacing

## Component Library

### Buttons

#### Variants
```tsx
// Primary button (default)
<Button>Primary Action</Button>

// Secondary button
<Button variant="outline">Secondary Action</Button>

// Ghost button
<Button variant="ghost">Subtle Action</Button>

// Frosted glass effect
<Button variant="frosted">Frosted Button</Button>
```

#### Sizes
```tsx
<Button size="sm">Small</Button>      // h-8, px-3
<Button size="default">Default</Button> // h-9, px-4
<Button size="lg">Large</Button>      // h-10, px-6
```

### Cards

#### Basic Structure
```tsx
<Card className="p-6">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    Main content area
  </CardContent>
  <CardFooter>
    Footer actions
  </CardFooter>
</Card>
```

#### Styling
- **Background**: `bg-card` with theme support
- **Border**: `border border-border` with subtle borders
- **Border Radius**: `rounded-xl` (12px)
- **Shadow**: `shadow-sm` for subtle elevation

### Badges

#### Usage
```tsx
// Eyebrow badges (IBM Plex Mono)
<Badge className="eyebrow">FEATURED</Badge>

// Standard badges
<Badge variant="secondary">Tag</Badge>
```

### Navigation

#### Mobile Navigation
- Uses sheet component for mobile menu
- Hamburger menu with smooth transitions
- Full-height overlay with navigation items

#### Desktop Navigation
- Horizontal navigation with hover states
- Theme toggle integration
- Responsive typography

## Layout Patterns

### Hero Section
- **Container**: Standard container with center alignment
- **Max Width**: `max-w-4xl mx-auto` for content
- **Spacing**: Large vertical padding with progressive reveal
- **Elements**: Eyebrow badge → Headline → Description → CTAs → Preview

### Content Sections
- **Container**: Tight container for better readability
- **Header Pattern**: Badge → Title → Description
- **Grid Layouts**: Responsive grids with consistent gaps

### Pricing Cards
- **Layout**: Grid with responsive columns
- **Card Structure**: Title/Price → Description → Features → CTA
- **Feature Icons**: Theme-aware monochrome icons
- **Spacing**: Reduced gap between description and features, increased gap between feature items

## Animation System

### Scroll Reveal
- **Staggered Delays**: 0.1s increments for sequential elements
- **Easing**: Smooth CSS transitions
- **Performance**: Intersection Observer based

### Ticker Animation
- **Duration**: 30s linear infinite
- **Direction**: Right to left scroll
- **Seamless Loop**: Duplicated content for continuous animation

### Micro-interactions
- **Hover Scale**: `transform: scale(1.01)` on hover
- **Button Transitions**: 200ms color transitions
- **Radar Ping**: 2s infinite animation for status indicators

## Accessibility

### Color Contrast
- All text meets WCAG AA contrast ratios
- Theme switching maintains accessibility standards
- Focus states are clearly visible

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Logical tab order throughout the interface
- Focus indicators are prominent

### Semantic HTML
- Proper heading hierarchy
- Semantic sectioning elements
- ARIA labels where needed

## Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Typography Scaling
- Headings scale up on larger screens
- Body text remains consistent
- Line heights optimized for readability

### Layout Adaptations
- Mobile-first approach
- Flexible grids that stack on mobile
- Touch-friendly button sizes (minimum 44px)

## Performance Considerations

### CSS Strategy
- Custom properties for theming
- Minimal runtime JavaScript for theme switching
- CSS-only animations where possible

### Font Loading
- Google Fonts with `display=swap`
- Preloaded for better performance
- Fallback fonts specified

### Image Optimization
- WebP format support
- Responsive images with srcset
- Lazy loading for below-fold content

## Code Standards

### CSS Classes
- Use Tailwind utilities first
- Custom CSS only when necessary
- BEM methodology for custom components

### Component Structure
- One component per file
- TypeScript for type safety
- Proper prop interfaces

### Naming Conventions
- PascalCase for components
- camelCase for variables and functions
- kebab-case for CSS classes

## Theme Implementation

### CSS Variables
All theme colors are implemented as CSS custom properties that automatically switch based on the `dark` class:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222 84% 4.9%;
  /* ... */
}

.dark {
  --background: 0 0% 0%;
  --foreground: 220 15% 96%;
  /* ... */
}
```

### Component Theming
Components use theme-aware classes:
- `bg-background` instead of hardcoded colors
- `text-foreground` for adaptive text color
- `border-border` for consistent borders

This system ensures all components automatically adapt to theme changes without additional JavaScript.
