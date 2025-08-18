# Project Brief: Marketing Site for Landing Page Build Service

**Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui,
Framer Motion, Lucide Icons, Plausible Analytics

**Goal**: Generate qualified leads for a landing‑page design/build
service. Users should understand the value within 5 seconds and have
clear CTAs to book a call or view work.

------------------------------------------------------------------------

## 1) Outcomes & KPIs

-   **Primary KPI**: Intro call bookings ("Book a Call").
-   **Secondary KPIs**: Contact form submissions, clicks to portfolio
    items, scroll depth to Pricing.
-   **Non‑goals**: Blogging/CMS; multi‑language (v1).

------------------------------------------------------------------------

## 2) Pages / Routes

-   `/` (single long‑form landing page)
-   `/privacy` (static)
-   `/terms` (static)

------------------------------------------------------------------------

## 3) Information Architecture (section order)

1.  **Hero**
2.  **Trusted by / Logos** (optional strip)
3.  **Core Benefits**
4.  **Process Steps**
5.  **Selected Work**
6.  **Pricing**
7.  **FAQs**
8.  **Final CTA**
9.  **Footer**

------------------------------------------------------------------------

## 4) Design System

### 4.1 Layout

-   **Container**: `.container` max width 1200px (Tailwind:
    `max-w-[1200px] px-4 md:px-6`).
-   **Grid**: 12‑col responsive using Tailwind utilities.
-   **Section vertical rhythm**: `py-20` mobile → `py-28` md+.
-   **Cards**: 12/16/24 padding depending on density
    (`p-6 md:p-8 lg:p-10`).
-   **Rounded**: `rounded-2xl` for cards, `rounded-full` for pills.
-   **Shadows**: subtle soft shadow (`shadow-lg/10` via custom) + 1px
    border (`border-border`).

### 4.2 Typography

-   **Font**: *Atkinson Hyperlegible Mono* (primary), system fallbacks.
-   **Scale (whole rems)**: `H1 3rem`, `H2 2rem`, `H3 1.5rem`,
    `H4 1.25rem`, `Body 1rem`, `Label 0.875rem`.
-   **Line heights**: `H1 1.1`, `H2 1.15`, `H3/H4 1.2`, `Body 1.6`.
-   **Letter‑spacing**: default; for all‑caps labels use tracking‑wide.

### 4.3 Color

-   **Mode**: Dark default + Light toggle.
-   **Palette (HSL CSS vars)**:
    -   `--bg: 222 50% 4%`
    -   `--fg: 220 15% 96%`
    -   `--muted: 220 10% 65%`
    -   `--primary: 260 95% 60%`
    -   `--primary-foreground: 0 0% 100%`
    -   `--card: 222 50% 6%`
    -   `--border: 220 8% 18%`

### 4.4 Motion

-   **Scroll reveal**: fade + 8px rise; `duration 0.5s`,
    `ease-[cubic-bezier(0.16,1,0.3,1)]`.
-   **Micro‑interactions**: button hover scale 1.01; card hover
    translate‑y‑1.
-   **Reduced motion**: respect `prefers-reduced-motion`.

### 4.5 Components (shadcn/ui)

-   Button, Badge, Card, Accordion, Tabs, Dialog (for video), Sheet
    (mobile nav), Navigation Menu, Tooltip, Toggle Theme.

------------------------------------------------------------------------

## 5) Navigation

-   **Structure**: Left logomark; centered nav; right CTA (Get Started).
-   **Items**: Home (/#top), Work (#work), Process (#process), Pricing
    (#pricing), FAQ (#faq), About (#about -- optional), **Get Started**
    (button → #cta).
-   **Sticky**: `sticky top-0 backdrop-blur border-b border-border`.
-   **Mobile**: Hamburger → Sheet menu; CTA remains visible.

------------------------------------------------------------------------

## 6) Section Specs & Copy Wireframes

### 6.1 Hero

-   Full‑width dark hero, centered copy, two CTAs, preview carousel
    below.
-   Content: Eyebrow pill (slot notice), H1 (conversion‑driven pages),
    Sub, CTAs.
-   Visual: screenshot card (rounded‑3xl, glow).

### 6.2 Core Benefits

-   Grid 3×2 with icon + H3 + body.
-   Draft copy: Faster Launches, Revenue‑First UX, High‑Performance, SEO
    Essentials, Analytics‑Ready, Easy to Extend.

### 6.3 Process Steps

-   4‑step timeline, each card with number + text.
-   Discover → Wireframe → Design & Build → Launch & Iterate.

### 6.4 Selected Work (#work)

-   Cards with image, stat, tags.

### 6.5 Pricing (#pricing)

-   **Design**: Matches the provided reference screenshot (dark cards
    with clear separation).
-   **Tiers**:
    -   **Website Design** -- `from £1,250` (Landing page: hero + 6
        sections, copy polish, analytics, 1 revision, deploy).
    -   **Product Design Add‑on** -- `£200/page` (additional product
        pages, visuals, collaborative design).
    -   **Enterprise / Custom** -- Custom Quote (multi‑page, team
        integration, priority support, custom builds).
-   **Buttons**: Primary `Get Started`, Secondary `Or Book a Call`.

### 6.6 FAQs (#faq)

-   Accordion UI styled like reference screenshot.
-   Only one can be open at a time (controlled state). Clicking a new
    item closes the previous.
-   Draft questions: "How long does it take?", "Do you handle
    development too?", "How do we start?", "Who do you work with?",
    "What's the payment like?", "Do you offer ongoing support?", "Are
    there refunds?".

### 6.7 Final CTA

-   Short block with H2, 1‑line value, `Book a Call` button.

### 6.8 Footer

-   Logo, tagline, links, social icons.

------------------------------------------------------------------------

## 7) Technical Requirements

-   Next.js 14 App Router, TS strict, Tailwind + shadcn.
-   Framer Motion for reveals.
-   Plausible analytics.
-   Accordion must support **single open item** behavior.
-   Next/Image for optimized screenshots.
-   Booking → Calendly; form → Resend.
-   Theme toggle with `next-themes`.

------------------------------------------------------------------------

## 8) Components to Build

-   `pricing.tsx`: 3‑tier pricing cards styled like ref screenshot.
-   `faqs.tsx`: Accordion (single open item mode).
-   Rest same as before.

------------------------------------------------------------------------

## 9) Acceptance Criteria

-   Pricing matches reference: dark cards, bold headings, clear
    separation.
-   Accordion works: only one item open at once.
-   Lighthouse ≥ 90 (desktop), ≥ 85 (mobile).
-   All CTAs tracked.

------------------------------------------------------------------------
