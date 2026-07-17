# Sanwal Bajwa Portfolio Redesign Guide

## Project Overview

This document defines the design and implementation direction for rebuilding **sanwalbajwa.com** in Next.js.

The visual identity is called **Precision Builder**.

The website should position Sanwal Bajwa as:

- A Software Engineer
- A Full Stack Developer
- A WordPress and WooCommerce specialist
- A developer who builds reliable, scalable, and commercially effective digital products

The final website must feel:

- Technical
- Editorial
- Structured
- Premium
- Approachable
- Fast
- Outcome-focused

Avoid generic developer portfolio patterns such as excessive gradients, floating technology icons, neon backgrounds, particle effects, and crowded skill sections.

---

# 1. Core Design Direction

Use a modern editorial layout inspired by technical publications, architecture portfolios, and premium digital studios.

The design should combine:

- Warm neutral backgrounds
- Strong charcoal typography
- A restrained electric lime accent
- Large project visuals
- Monospace labels
- Structured grids
- Minimal motion
- Clear business-oriented messaging

The design should feel calm and confident rather than flashy.

---

# 2. Color System

Use CSS variables or Tailwind theme tokens.

```css
:root {
  --background: #f4f2ec;
  --surface: #e8e5dd;
  --surface-light: #efede7;

  --text-primary: #151515;
  --text-secondary: #5e5d58;
  --text-muted: #7a7871;

  --border: #cac6bb;
  --border-dark: #333531;

  --dark: #111211;
  --dark-surface: #1a1b19;
  --dark-text: #f4f2ec;

  --accent: #b7f34a;
  --accent-hover: #a3e635;
  --accent-soft: #dcf9a4;

  --success: #7ed957;
  --error: #e85d5d;
}
```

## Color Usage

Use approximately:

- 70% warm neutral backgrounds
- 20% dark charcoal sections and typography
- 10% lime accent

Use lime only for:

- Primary buttons
- Availability indicator
- Active navigation
- Selected filters
- Project metrics
- Important labels
- Hover states
- Small highlighted details

Do not use lime for every heading, icon, border, or paragraph.

---

# 3. Typography

## Recommended Fonts

Use:

- Display and headings: `Manrope`
- Body: `Inter`
- Technical labels: `JetBrains Mono`

Load fonts using `next/font/google`.

Example:

```tsx
import { Inter, Manrope, JetBrains_Mono } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});
```

## Typography Rules

### Headings

- Strong font weight
- Tight line height
- Slight negative letter spacing
- Short line lengths
- Avoid overly decorative text

### Body

- Comfortable line height
- Maximum readable width around 640px
- Use muted text colors for secondary information

### Technical Labels

Use monospace typography for labels such as:

```text
01 / SELECTED WORK
CURRENT STATUS
STACK / NEXT.JS + WORDPRESS
AVAILABLE FOR SELECT PROJECTS
```

Do not use monospace for long paragraphs.

---

# 4. Layout System

Use a maximum content width between `1280px` and `1440px`.

Recommended container:

```css
.container {
  width: min(100% - 32px, 1360px);
  margin-inline: auto;
}
```

## Grid

Use a 12-column desktop grid.

Recommended responsive behavior:

- Desktop: 12 columns
- Tablet: 8 columns
- Mobile: 4 columns

Use strong vertical rhythm and generous section spacing.

Recommended spacing:

```css
--section-space-desktop: 140px;
--section-space-tablet: 96px;
--section-space-mobile: 72px;
```

Avoid overcrowding.

---

# 5. Global Styling Rules

## Border Radius

Use a controlled radius system:

```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-pill: 999px;
```

Apply:

- Buttons: 8px to 10px
- Project media: 12px to 16px
- Cards: 12px
- Tags: pill shape

Avoid large 30px to 40px rounded corners on every section.

## Borders

Prefer subtle borders over heavy shadows.

```css
border: 1px solid var(--border);
```

## Shadows

Use shadows only for selected floating elements.

```css
box-shadow: 0 16px 50px rgba(17, 18, 17, 0.08);
```

## Icons

Use a consistent icon library such as:

- Lucide React

Keep icons simple and mostly outline-based.

---

# 6. Website Structure

Create the homepage in this order:

1. Header
2. Hero
3. Selected Work
4. Capabilities
5. Working Process
6. About
7. Articles and Credentials
8. Contact CTA
9. Footer

---

# 7. Header

## Desktop Header

Include:

- Logo or name: `SANWAL BAJWA`
- Navigation:
  - Work
  - Services
  - About
  - Articles
  - Contact
- Primary CTA:
  - Start a Project

The header should feel clean and compact.

Recommended behavior:

- Sticky on scroll
- Slight translucent background
- Subtle bottom border
- Background blur
- Active section indicator

Example:

```css
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(244, 242, 236, 0.88);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(202, 198, 187, 0.7);
}
```

## Mobile Header

Use:

- Name or compact logo
- Menu button
- Full-screen or slide-down menu
- Clear contact CTA

---

# 8. Hero Section

## Hero Goal

The hero must immediately explain:

- Who Sanwal is
- What he builds
- Who he helps
- What the visitor should do next

## Recommended Content

```text
SANWAL BAJWA

SOFTWARE ENGINEER &
WORDPRESS PRODUCT DEVELOPER

I build high-performance websites, WooCommerce
systems, and scalable web applications for businesses.
```

Primary CTA:

```text
View Selected Work
```

Secondary CTA:

```text
Start a Project
```

## Supporting Metadata

Show compact metadata below or beside the main content:

```text
BASED IN       Lahore, Pakistan
FOCUS          WordPress, WooCommerce, Next.js
EXPERIENCE     2+ years
AVAILABILITY   Open for selected projects
```

## Hero Layout

Desktop:

- Left side: Main headline, paragraph, buttons
- Right side: Professional portrait or featured visual
- Bottom: Metadata strip

Mobile:

- Headline first
- Short description
- Buttons stacked or wrapped
- Portrait below
- Metadata in a 2-column grid

## Hero Visual

Use:

- A rectangular professional portrait
- Editorial crop
- Neutral or dark background
- Small availability indicator
- Optional technical metadata card

Avoid circular profile images.

---

# 9. Selected Work Section

This should be the visual center of the website.

Section label:

```text
01 / SELECTED WORK
```

Heading:

```text
Projects built around performance,
usability, and business outcomes.
```

Show only 3 to 4 strong projects.

## Recommended Projects

Use real projects such as:

1. Prolabs.bio
2. ByRecruit
3. WooCommerce Multi-Vendor System
4. Travel Booking Platform
5. St. Joseph's School Website
6. Shawarma Stop

Select the strongest 3 or 4 for the homepage.

## Project Card Content

Each project should include:

- Project number
- Project name
- Category
- Short outcome-focused description
- Role
- Stack
- Main screenshot
- Link to case study
- Optional metric or result

Example:

```text
01 / WOOCOMMERCE

PROLABS.BIO

Conversion-focused product experience for a
WooCommerce supplement store.

ROLE
WooCommerce Development / CRO

STACK
WordPress / PHP / JavaScript / ShopEngine
```

## Project Layout

Use alternating large case-study blocks:

- Project 1: Text left, image right
- Project 2: Image left, text right
- Project 3: Full-width dark section
- Project 4: Editorial split layout

Do not use a small uniform three-column card grid for all projects.

## Image Treatment

Use consistent project screenshots:

- Same browser frame style
- Same padding
- Same border radius
- Same aspect ratio family
- Neutral or dark visual background
- High-quality screenshots only

Example:

```css
.project-media {
  background: #dedbd2;
  padding: clamp(20px, 4vw, 48px);
  border-radius: 16px;
}
```

---

# 10. Capabilities Section

Section label:

```text
02 / CAPABILITIES
```

Organize services into three groups.

## Group 1: Business Websites

Include:

- Custom WordPress development
- Elementor and Gutenberg builds
- Theme customization
- Performance optimization
- Website redesigns
- Maintenance and support

## Group 2: Commerce Systems

Include:

- WooCommerce customization
- Product-page optimization
- Bundle and recommendation systems
- Checkout improvements
- Custom product fields
- Store integrations

## Group 3: Web Applications

Include:

- Next.js applications
- React interfaces
- Node.js APIs
- Supabase systems
- Authentication
- Dashboards
- Notifications
- Third-party integrations

## Design

Use large numbered rows or editorial columns.

Avoid a cloud of technology logos.

Technologies can appear as small tags below each capability.

---

# 11. Process Section

Section label:

```text
03 / HOW I WORK
```

Use four clear steps:

```text
01 DISCOVER
Understand the business, users, limitations, and goals.

02 DESIGN THE SYSTEM
Define structure, user flow, architecture, and priorities.

03 BUILD & TEST
Develop responsive, maintainable, and tested solutions.

04 LAUNCH & IMPROVE
Deploy, monitor, optimize, and support the final product.
```

## Design

Use:

- Large step numbers
- Horizontal layout on desktop
- Vertical timeline on mobile
- Borders between steps
- Minimal icon usage

---

# 12. About Section

Section label:

```text
04 / ABOUT
```

## Suggested Message

```text
I am a software engineer based in Lahore, Pakistan,
focused on building dependable web products for
businesses and growing teams.

My work combines full-stack engineering with deep
WordPress and WooCommerce experience. I care about
performance, maintainability, usability, and solving
the right business problem.
```

Include:

- Professional portrait
- Short career summary
- Education
- Core focus
- Current availability
- Link to resume

Keep this section concise.

Do not turn it into a full biography.

---

# 13. Articles and Credentials

Section label:

```text
05 / INSIGHTS
```

Display:

- Three featured articles
- A compact certificate strip
- Link to all articles
- Link to resume

## Article Card

Each article should show:

- Category
- Title
- Short excerpt
- Reading time
- Date
- Arrow link

Use subtle card borders.

Avoid overdesigned blog cards.

---

# 14. Contact CTA

The final CTA should use a dark background.

Example:

```text
HAVE A PROJECT IN MIND?

Tell me what you are building, what is currently
not working, and what result you need.

START A CONVERSATION
```

Include:

- Email
- LinkedIn
- Upwork
- Contact form link

Use lime for the main CTA.

The contact section should feel decisive and easy to act on.

---

# 15. Footer

Include:

- Name
- Short positioning statement
- Navigation
- Social links
- Copyright
- Current year
- “Built with Next.js” note

Optional footer line:

```text
Designed and developed by Sanwal Bajwa.
```

---

# 16. Buttons

## Primary Button

```css
.btn-primary {
  background: var(--accent);
  color: var(--text-primary);
  border: 1px solid var(--accent);
  border-radius: 10px;
  padding: 14px 20px;
  font-weight: 700;
}
```

Hover:

- Slightly darker lime
- Arrow moves 3px to the right
- No large scale animation

## Secondary Button

```css
.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border);
}
```

## Dark Section Button

Use:

- Lime background
- Dark text

---

# 17. Links

Use subtle underline or arrow movement.

Example:

```css
.text-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
```

On hover:

- Arrow moves right
- Underline width increases
- Text color remains readable

---

# 18. Motion and Animation

Use subtle animation only.

Recommended effects:

- Fade and rise on section entry
- Image scale from `0.98` to `1`
- Underline slide on links
- Small arrow movement
- Header background transition on scroll
- Soft reveal for project cards

Animation duration:

```css
--motion-fast: 180ms;
--motion-normal: 320ms;
--motion-slow: 520ms;
```

Use easing:

```css
cubic-bezier(0.22, 1, 0.36, 1)
```

Avoid:

- Cursor trails
- Large parallax
- Floating icons
- Constant looping animation
- Rotating skill circles
- Particle backgrounds
- Long loading screens

Respect reduced-motion preferences.

---

# 19. Responsive Design

## Desktop

- 12-column layout
- Large headings
- Split hero
- Alternating case studies
- Horizontal process steps

## Tablet

- Reduce headline scale
- Use 8-column grid
- Stack project content when needed
- Preserve generous spacing

## Mobile

- Use 4-column grid
- Stack all split sections
- Keep buttons easy to tap
- Keep body text at least 16px
- Avoid horizontal scrolling
- Use full-width project media
- Keep navigation simple

Suggested breakpoints:

```ts
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

---

# 20. Accessibility

The implementation must include:

- Semantic HTML
- Proper heading hierarchy
- Keyboard navigation
- Visible focus states
- ARIA labels where needed
- Alt text for all project images
- Sufficient color contrast
- Reduced-motion support
- Form validation messages
- Accessible mobile menu

Do not rely on lime alone to communicate meaning.

---

# 21. Performance Requirements

The site should target:

- Lighthouse Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

Use:

- `next/image`
- Proper image sizing
- WebP or AVIF
- Lazy loading
- Minimal client-side JavaScript
- Server Components by default
- Dynamic imports only when needed
- Optimized fonts
- Metadata API
- Sitemap
- Robots file
- Structured data

Avoid unnecessary animation libraries.

Use Framer Motion only where meaningful.

---

# 22. SEO Structure

Add metadata for:

- Homepage
- Work
- Services
- About
- Articles
- Contact
- Individual case studies

Recommended homepage title:

```text
Sanwal Bajwa — Software Engineer & WordPress Developer
```

Recommended description:

```text
Software engineer and WordPress developer building high-performance websites, WooCommerce systems, and scalable web applications.
```

Include:

- Open Graph images
- Twitter cards
- JSON-LD for Person and ProfessionalService
- Canonical URLs

---

# 23. Suggested Next.js Structure

```text
app/
  layout.tsx
  page.tsx
  globals.css

  work/
    page.tsx
    [slug]/
      page.tsx

  services/
    page.tsx

  about/
    page.tsx

  articles/
    page.tsx
    [slug]/
      page.tsx

  contact/
    page.tsx

components/
  layout/
    Header.tsx
    Footer.tsx
    Container.tsx
    Section.tsx

  home/
    Hero.tsx
    SelectedWork.tsx
    Capabilities.tsx
    Process.tsx
    AboutPreview.tsx
    Insights.tsx
    ContactCTA.tsx

  ui/
    Button.tsx
    Badge.tsx
    SectionLabel.tsx
    ProjectCard.tsx
    ArticleCard.tsx
    AnimatedLink.tsx

data/
  projects.ts
  services.ts
  articles.ts
  experience.ts

public/
  images/
    portrait/
    projects/
    articles/
    og/

lib/
  utils.ts
  metadata.ts
```

---

# 24. Component Guidelines

## Section Component

Each major section should support:

- Section label
- Heading
- Description
- Light or dark theme
- Standard spacing
- Optional divider

## ProjectCard Component

Props should include:

```ts
type ProjectCardProps = {
  index: string;
  title: string;
  category: string;
  summary: string;
  role: string;
  stack: string[];
  image: string;
  href: string;
  theme?: "light" | "dark";
  layout?: "image-left" | "image-right" | "full";
  metric?: string;
};
```

## Button Component

Support:

```ts
type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "inverse";
```

---

# 25. Content Rules

Write content around outcomes rather than tools.

Avoid:

```text
I create amazing websites.
```

Prefer:

```text
I build reliable digital products that are easier to
manage, faster to use, and designed around business goals.
```

Avoid long technology lists in the hero.

Keep technology details inside projects and capability sections.

Focus on:

- Business outcomes
- Performance
- Maintainability
- Conversion
- User experience
- Scalability
- Reliability

---

# 26. Recommended Homepage Copy

## Hero

```text
SOFTWARE ENGINEER &
WORDPRESS PRODUCT DEVELOPER

I build high-performance websites, WooCommerce
systems, and scalable web applications for businesses.
```

## Selected Work Intro

```text
Projects built around performance,
usability, and business outcomes.
```

## Capabilities Intro

```text
From focused business websites to custom commerce
systems and full-stack applications.
```

## About Intro

```text
Engineering reliable digital products with a practical,
business-focused approach.
```

## Contact CTA

```text
HAVE A PROJECT IN MIND?

Tell me what you are building, what is currently
not working, and what result you need.
```

---

# 27. Design Do and Do Not List

## Do

- Use warm neutral backgrounds
- Use strong typography
- Use large real project visuals
- Use a clear grid
- Use lime sparingly
- Use outcome-focused content
- Use subtle motion
- Keep sections spacious
- Maintain consistent screenshot styling
- Prioritize mobile usability

## Do Not

- Use excessive gradients
- Use glowing cards
- Use floating technology logos
- Use generic blob backgrounds
- Use too many colors
- Use large shadows everywhere
- Use identical small project cards
- Use long skill lists
- Use circular profile images
- Use excessive animation
- Make every section rounded
- Overload the hero with technologies

---

# 28. Final Visual Formula

```text
Warm neutral canvas
+ strong charcoal typography
+ restrained lime accent
+ editorial grid
+ technical monospace labels
+ large real project visuals
+ minimal purposeful motion
```

The final website should look like the portfolio of a developer who understands both engineering and business—not a generic resume template.

---

# 29. Copilot Implementation Instruction

When generating or modifying code:

1. Follow this design system consistently.
2. Reuse components instead of duplicating markup.
3. Use TypeScript.
4. Use semantic HTML.
5. Use Tailwind CSS or CSS variables consistently.
6. Keep components small and maintainable.
7. Prefer Server Components.
8. Use Client Components only for interaction.
9. Optimize images and fonts.
10. Maintain accessibility.
11. Avoid unnecessary dependencies.
12. Do not introduce colors outside the approved palette.
13. Do not add decorative effects that conflict with the editorial direction.
14. Keep all layouts responsive.
15. Preserve a premium, minimal, technical appearance.