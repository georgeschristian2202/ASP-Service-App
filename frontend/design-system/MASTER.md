# ASP Services Gabon - Design System Master

**Project**: Professional Showcase Website for ASP Services Gabon  
**Industry**: Graphic Design & Management (B2B)  
**Brand Identity**: Professional, Trustworthy, Modern, Results-Driven

---

## 1. COLOR PALETTE

### Primary Colors (from Logo)

```
asp-blue-900: #1E3A8A     // Deep professional blue (logo primary)
asp-blue-700: #1D4ED8     // Standard blue (interactive elements)
asp-blue-600: #2563EB     // Light blue (hover states)
asp-blue-500: #3B82F6     // Accent blue (backgrounds, CTAs)
asp-blue-100: #DBEAFE     // Very light blue (sections)

asp-black: #0F172A        // Deep slate (primary text, logo text)
asp-gray-800: #1E293B     // Dark gray (secondary text)
asp-gray-600: #475569     // Medium gray (muted text)
asp-gray-400: #94A3B8     // Light gray (borders)
asp-gray-200: #E2E8F0     // Very light gray (dividers)
asp-gray-100: #F1F5F9     // Background gray (sections)

asp-white: #FFFFFF        // Pure white (backgrounds, cards, logo background)
```

### Usage Guidelines

- **Primary Actions**: `asp-blue-700` with hover to `asp-blue-900`
- **Secondary Actions/CTAs**: `asp-blue-500` with hover to `asp-blue-700`
- **Body Text**: `asp-black` (#0F172A)
- **Muted Text**: `asp-gray-600` (#475569)
- **Backgrounds**: `asp-white` or `asp-gray-100`
- **Section Dividers**: `asp-blue-100` or `asp-gray-100`

---

## 2. TYPOGRAPHY

### Font Families

**Primary (Headings)**: Inter, system-ui, sans-serif  
**Secondary (Body)**: Inter, system-ui, sans-serif  
**Monospace (Code/Technical)**: 'Courier New', monospace

### Type Scale

```
Display: 4rem (64px) / line-height: 1.1 / weight: 700 (bold)
H1: 3rem (48px) / line-height: 1.2 / weight: 700
H2: 2.25rem (36px) / line-height: 1.3 / weight: 600
H3: 1.875rem (30px) / line-height: 1.4 / weight: 600
H4: 1.5rem (24px) / line-height: 1.5 / weight: 600
H5: 1.25rem (20px) / line-height: 1.5 / weight: 500

Body Large: 1.125rem (18px) / line-height: 1.75 / weight: 400
Body: 1rem (16px) / line-height: 1.625 / weight: 400
Body Small: 0.875rem (14px) / line-height: 1.5 / weight: 400
Caption: 0.75rem (12px) / line-height: 1.5 / weight: 400
```

### Font Weights

- **Regular**: 400 (body text)
- **Medium**: 500 (emphasis)
- **Semibold**: 600 (subheadings)
- **Bold**: 700 (headings, CTAs)

---

## 3. SPACING SYSTEM

Based on 4px base unit:

```
xs: 0.25rem (4px)
sm: 0.5rem (8px)
md: 0.75rem (12px)
base: 1rem (16px)
lg: 1.5rem (24px)
xl: 2rem (32px)
2xl: 3rem (48px)
3xl: 4rem (64px)
4xl: 6rem (96px)
5xl: 8rem (128px)
```

### Layout Spacing

- **Section Padding (Vertical)**: 5xl (128px desktop), 3xl (64px mobile)
- **Section Padding (Horizontal)**: xl (32px desktop), lg (24px mobile)
- **Card Padding**: xl (32px)
- **Component Spacing**: lg (24px between major elements)
- **Element Spacing**: md (12px between related items)

---

## 4. LAYOUT & GRID

### Container Widths

```
max-w-7xl: 1280px (main content container)
max-w-6xl: 1152px (text-heavy pages)
max-w-4xl: 896px (forms, single column)
max-w-prose: 65ch (article content)
```

### Grid System

- **Desktop**: 12-column grid with 32px gutters
- **Tablet**: 8-column grid with 24px gutters
- **Mobile**: 4-column grid with 16px gutters

### Breakpoints

```
sm: 640px   // Mobile landscape
md: 768px   // Tablet portrait
lg: 1024px  // Tablet landscape / Small desktop
xl: 1280px  // Desktop
2xl: 1536px // Large desktop
```

---

## 5. COMPONENTS

### Buttons

**Primary Button**
- Background: `asp-blue-700`
- Text: `asp-white`
- Padding: `py-3 px-8` (12px × 32px)
- Border Radius: `rounded-lg` (8px)
- Hover: `asp-blue-900` background
- Transition: `transition-colors duration-200`

**Secondary Button (CTA)**
- Background: `asp-blue-500`
- Text: `asp-white`
- Padding: `py-3 px-8`
- Border Radius: `rounded-lg`
- Hover: `asp-blue-700` background
- Transition: `transition-colors duration-200`

**Ghost Button**
- Background: `transparent`
- Border: `2px solid asp-blue-700`
- Text: `asp-blue-700`
- Padding: `py-3 px-8`
- Hover: `asp-blue-700` background, `asp-white` text

### Cards

**Service Card**
- Background: `asp-white`
- Border: `1px solid asp-gray-200`
- Border Radius: `rounded-xl` (12px)
- Padding: `p-8` (32px)
- Shadow: `shadow-md hover:shadow-xl`
- Hover: `scale-[1.02]` transform
- Transition: `transition-all duration-300`

**Image Card (Portfolio)**
- Background: `asp-white`
- Border Radius: `rounded-lg` (8px)
- Overflow: `hidden`
- Shadow: `shadow-lg`
- Hover: Image `scale-110`, overlay appears

### Navigation

**Desktop Navigation**
- Background: `asp-white/95` backdrop-blur
- Height: `80px`
- Position: `fixed top-0` with shadow on scroll
- Links: `asp-gray-800` text, `asp-blue-700` on hover
- Logo Height: `48px`

**Mobile Navigation**
- Hamburger menu icon
- Full-screen overlay with `asp-blue-900` background
- Links: `asp-white` text
- Animated slide-in from right

### Footer

- Background: `asp-blue-900`
- Text: `asp-white` and `asp-gray-400`
- Padding: `py-16 px-8` (64px vertical)
- Links: Hover to `asp-blue-500`

---

## 6. EFFECTS & INTERACTIONS

### Shadows

```
sm: 0 1px 2px rgba(0, 0, 0, 0.05)
md: 0 4px 6px rgba(0, 0, 0, 0.07)
lg: 0 10px 15px rgba(0, 0, 0, 0.1)
xl: 0 20px 25px rgba(0, 0, 0, 0.12)
2xl: 0 25px 50px rgba(0, 0, 0, 0.15)
```

### Transitions

- **Standard**: `transition-all duration-200 ease-in-out`
- **Hover States**: `duration-200`
- **Page Transitions**: `duration-300`
- **Modal/Overlay**: `duration-400`

### Border Radius

```
sm: 4px (small elements, tags)
md: 6px (buttons, inputs)
lg: 8px (cards, images)
xl: 12px (large cards)
2xl: 16px (hero sections)
full: 9999px (pills, avatars)
```

### Hover Effects

- **Buttons**: Color change + subtle shadow increase
- **Cards**: Scale 1.02 + shadow xl
- **Links**: Color change + underline animation
- **Images**: Scale 1.1 (within overflow-hidden container)

---

## 7. IMAGERY

### Photo Style

- **Professional**: High-quality photos of work (signage, floor marking, printing)
- **Before/After**: Side-by-side comparisons for projects
- **Equipment**: Clean shots of MUTOH plotter, Xerox printers
- **Team**: Professional but approachable team photos

### Image Treatments

- **Aspect Ratios**: 16:9 (hero), 4:3 (portfolio), 1:1 (team)
- **Filters**: Slight contrast boost, professional color grading
- **Overlays**: Dark gradient (rgba(15, 23, 42, 0.6)) for text legibility on hero images

---

## 8. ICONS

**Icon Library**: Heroicons (outline for general, solid for filled states)

**Icon Sizing**:
- Small: 16px (w-4 h-4)
- Medium: 20px (w-5 h-5)
- Large: 24px (w-6 h-6)
- XL: 32px (w-8 h-8)

**Icon Colors**:
- Primary: `asp-blue-700`
- Accent: `asp-blue-500`
- Muted: `asp-gray-600`

---

## 9. FORMS

### Input Fields

- Border: `1px solid asp-gray-400`
- Border Radius: `rounded-md` (6px)
- Padding: `py-3 px-4` (12px × 16px)
- Focus: `ring-2 ring-asp-blue-500` outline
- Text: `asp-black` (16px)

### Labels

- Text: `asp-gray-800` (14px, weight 500)
- Margin Bottom: `mb-2` (8px)

### Validation

- Error Border: `blue-700` (keep consistency with brand)
- Error Text: `asp-blue-900` (14px)
- Success Border: `asp-blue-500`

---

## 10. ACCESSIBILITY

### Color Contrast

- All text meets WCAG AA standards (4.5:1 minimum)
- Primary button contrast: 7:1+ (AAA compliant)
- Focus indicators: 3:1 minimum contrast

### Interactive Elements

- All buttons have `cursor-pointer`
- Focus states visible with `ring-2` outline
- `aria-label` on icon-only buttons
- `alt` text on all images

### Motion

- Respect `prefers-reduced-motion` for animations
- No auto-playing videos without controls
- Smooth scroll behavior configurable

---

## 11. CONTENT STRATEGY

### Tone of Voice

- **Professional**: Expert terminology, B2B language
- **Confident**: Results-focused, capability-driven
- **Clear**: Direct communication, no jargon overload
- **Action-Oriented**: Strong CTAs, immediate value proposition

### Content Hierarchy

1. **Primary Message**: What ASP Services does (headline)
2. **Value Proposition**: Why choose ASP Services (subheading)
3. **Services Overview**: Key offerings (cards)
4. **Social Proof**: Client testimonials, portfolio (images + quotes)
5. **Call to Action**: WhatsApp contact, quote request (prominent buttons)

---

## 12. ANTI-PATTERNS TO AVOID

❌ **No emoji icons** in professional UI (use SVG icons)  
❌ **No Comic Sans or playful fonts** (B2B context requires professionalism)  
❌ **No auto-playing media** without user control  
❌ **No layout shift on hover** (use scale within containers)  
❌ **No light gray text on white** (asp-gray-400 minimum)  
❌ **No missing focus states** (accessibility requirement)  
❌ **No generic stock photos** (use actual work photos from attachments)  

---

## 13. PAGE-SPECIFIC GUIDELINES

### Homepage (Landing)

**Structure**:
1. Hero Section (full viewport, background image, overlay, headline, CTA)
2. Services Overview (3-column grid on desktop)
3. About Preview (2-column: text + image)
4. Portfolio Highlight (image gallery, 4 items)
5. Contact CTA (WhatsApp button, phone number)

**Hero**:
- Background: Signage/floor marking photo from attachments
- Overlay: `bg-asp-blue-900/70`
- Headline: 48px, white, bold
- CTA Button: `asp-blue-500` (bright accent for visibility)

### Services Page

**Layout**:
- Intro section (centered text, max-w-4xl)
- Service cards grid (2-column on tablet, 1-column mobile)
- Each card: Icon + Title + Description + "Demander un devis" CTA

**Services to Include** (from strategic document):
1. Signalétique (Panneaux, enseignes)
2. Marquage au sol (Parking, zones industrielles)
3. Impression grand format (Traceur MUTOH)
4. Consommables Xerox (Vente et support)
5. Impression sur T-shirts (Personnalisation textile)

### About Page

**Content**:
- Company story and mission
- Equipment showcase (MUTOH, Xerox)
- Team section (if photos available)
- Values and approach
- Location and facilities

### Portfolio (Réalisations)

**Layout**:
- Masonry grid or standard 3-column grid
- Filter by category (signage, floor marking, printing, etc.)
- Lightbox modal for full-size images
- Before/after slider for relevant projects

### Contact Page

**Elements**:
- Contact form (name, email, phone, message, service type)
- Contact information card (address, phone, WhatsApp, email)
- Google Maps embed (Likouala en face de l'église Hebron, Libreville)
- Business hours
- Social media links (if available)

---

## 14. NUXT.JS SPECIFIC GUIDELINES

### File Structure

```
/assets           → Images, fonts, global CSS
/components       → Reusable Vue components
/layouts          → Layout templates (default, empty)
/pages            → File-based routing (index, services, about, etc.)
/public           → Static files (favicon, logo, attachments)
/composables      → Reusable composition functions
/middleware       → Route middleware
nuxt.config.ts    → Configuration
tailwind.config.js → Tailwind customization
```

### Component Naming

- PascalCase for components: `TheNavigation.vue`, `ServiceCard.vue`
- Prefix layout components with `The`: `TheHeader.vue`, `TheFooter.vue`
- Descriptive names: `HeroSection.vue`, `ContactForm.vue`

### Performance

- Image optimization with Nuxt Image module
- Lazy loading for below-fold content
- Code splitting per route
- Preload critical assets (fonts, hero image)

---

**Version**: 1.0  
**Last Updated**: June 17, 2026  
**Author**: ASP Services Gabon Web Development Team
