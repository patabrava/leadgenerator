# Homepage Redesign — deinvergleich.com

## Context

deinvergleich.com is a new lead-generation comparison portal for Datenschutz (GDPR/privacy) service providers in Germany. The site connects businesses with certified external Datenschutzbeauftragte (DSBs) through a multi-step form.

**Business goal:** Maximize lead conversion for a new entrant with no brand recognition yet.

**Available trust assets:**
- TÜV, DEKRA, and ISO 27001 certifications
- Real testimonial from Amelie Kaijo, Geschäftsführerin einer Steuerberatung
- Named expert: Matthias Frank, Zertifizierter Datenschutzbeauftragter (TÜV), Berater für Informationssicherheit (ISO 27001), 10+ Jahre Erfahrung im Datenschutz

**Competitive landscape:** DataGuard, Proliance, activeMind, eRecht24, datenschutzanbieter.de. All use navy blue palettes, sans-serif typography, modal/embedded forms with multiple CTA placements, and prominent certification badges (TÜV/DEKRA) in their hero areas.

---

## Design Decisions

### Color Palette: Deep Blue-Green Hybrid

Shift from the current teal (#0f766e) to a darker, more blue-shifted palette that signals "security" while remaining distinct from pure-navy competitors.

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-hero-dark` | `#0c2d3a` | Hero background, header, footer, final CTA |
| `--color-primary` | `#0e5e6f` | Primary actions, progress bars, badges, links |
| `--color-primary-light` | `#17919e` | Hover states, secondary accents |
| `--color-primary-tint` | `#5eead4` | Trust checkmarks, highlights on dark backgrounds |
| `--color-primary-bg` | `#f0f7f7` | Trust bar, benefits section background |
| `--color-accent` | `#d97706` | CTA buttons (amber — maximum contrast on dark) |
| `--color-accent-foreground` | `#ffffff` | CTA button text |
| `--color-background` | `#fafbfc` | Page background |
| `--color-foreground` | `#0c2d3a` | Body text |
| `--color-muted-foreground` | `#4a6670` | Secondary text |
| `--color-muted-foreground-light` | `#64748b` | Tertiary text, labels |
| `--color-border` | `#dde5e7` | Input borders, dividers |
| `--color-card` | `#ffffff` | Form card, content cards |
| `--color-destructive` | `#dc2626` | Error states |
| `--color-success` | `#166534` | Success states |
| `--color-info` | `#0c4a6e` | Info callouts |

**Rationale:** Every major competitor uses navy. Pure navy would invite direct comparison with DataGuard/Proliance — a fight a new player can't win. The blue-green hybrid reads as "security" while maintaining visual distinctiveness. Amber CTA creates maximum contrast against the dark palette.

### Typography: Serif Display + Sans Body

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| Display | Source Serif 4 | 600, 700 | h1, h2, h3 headings, brand name |
| Body | Outfit | 300–600 | Body text, form labels, buttons, UI elements |

**Rationale:** No competitor in the German Datenschutz space uses serif fonts. The serif display creates an "editorial authority" signal — the site reads as a trusted publication rather than a generic SaaS comparison tool. With the color already shifted toward market conventions, typography becomes the primary visual differentiator.

### Hero Layout: Side-by-Side with Form

The form Step 1 is embedded directly in the hero, visible on page load without scrolling.

**Desktop (≥768px):**
- Left column (~55%): heading, subheading, value props (checkmarks), certification badges
- Right column (~45%): form card (Step 1 fields) with expert profile + mini testimonial attached below

**Mobile (<768px):**
- Single column, stacked: heading → subheading → value props → cert badges → form card → expert + testimonial

**Rationale:** Every successful German Vergleichsportal (Check24, Verivox, datenschutzanbieter.de) embeds the form in the hero. Each scroll event loses ~20% of visitors. For a new site with no brand recognition, visitors will bounce before reaching a below-fold form.

### Trust Signal Placement: Concentrated Near Form

Trust signals are deployed in three layers:

1. **Certification badges** (TÜV, DEKRA, ISO 27001) — in the hero, below the value props on the left side. Semi-transparent pill-shaped badges on the dark background.

2. **Expert profile** — attached directly below the form card (same visual container, rounded bottom corners). Shows avatar initials (MF), name "Matthias Frank", credentials "Zert. DSB (TÜV) · ISO 27001", and "10+ Jahre Erfahrung."

3. **Mini testimonial** — below the expert profile in the same attached container. Left-border quote: "Schnell den perfekten Anbieter gefunden." — A. Kaijo, GF.

**Rationale:** Conversion research shows trust signals have the most impact when placed adjacent to the action point. The expert + testimonial attached to the form card creates a "this person vouches for this form" effect.

---

## Page Structure (Top to Bottom)

### 1. Header

- Dark background (`hero-dark`)
- Left: logo icon (primary bg, search icon) + brand name (serif) + subtitle "Datenschutz-Vergleichsportal"
- Right: amber CTA button "Angebote erhalten" (scrolls to form / focuses first field)
- Sticky on scroll (optional — evaluate impact on mobile)

### 2. Hero Section

Dark gradient background (`hero-dark` to slightly lighter).

**Left column:**
- H1: "Finden Sie den perfekten Datenschutz-Experten" (Source Serif 4, white)
- Subheading: "Kostenloser Vergleich qualifizierter DSGVO-Anbieter in Deutschland. Erhalten Sie in wenigen Minuten passende Angebote für Ihr Unternehmen." (Outfit, muted light)
- Value props: ✓ Kostenlos & unverbindlich · ✓ Antwort in 24h · ✓ In 2 Minuten (tint color)
- Cert badges: TÜV-zertifiziert · DEKRA · ISO 27001 (semi-transparent pills)

**Right column:**
- Form card (white, rounded top corners, elevated shadow):
  - Title: "Kostenlos Angebote erhalten"
  - Progress: "Schritt 1 von 4" + percentage + progress bar
  - Fields: Firmenname, PLZ + Land (side by side)
  - CTA: "Weiter →" (amber)
- Expert strip (attached below, rounded bottom corners):
  - Avatar circle (initials MF, primary color)
  - Name + credentials
  - Mini testimonial with left border

### 3. Trust Bar

Light tinted background (`primary-bg`). Single horizontal strip with 4 items centered:
- Kostenlos · Unverbindlich · Antwort in 24h · DSGVO-konform

### 4. "So funktioniert's" Section

Light background (`background`). Three numbered steps in a horizontal row (stacks on mobile):

1. **Anfrage stellen** — "Formular ausfüllen — dauert nur 2 Minuten."
2. **Angebote erhalten** — "Qualifizierte Anbieter kontaktieren Sie innerhalb von 24h."
3. **Anbieter wählen** — "Vergleichen Sie und wählen Sie den besten für Ihr Unternehmen."

Each step: numbered circle (primary) → title (bold) → description (muted).

### 5. Benefits Section ("Warum deinvergleich.com?")

Tinted background (`primary-bg`). Left-aligned heading with constrained subtitle.

2-column grid (single column on mobile), each benefit: small icon square (primary/10 bg) + title + description. No cards — flat list layout.

Benefits:
- Geprüfte DSGVO-Anbieter
- Schnelle Vermittlung
- Kostenloser Vergleich
- Für alle Unternehmensgrößen
- Nur seriöse Anbieter
- Neutrale Beratung

### 6. Expanded Testimonial

Light background. Left border (3-4px, primary color). Full quote from Amelie Kaijo in serif italic. Attribution below with name + title + company type.

### 7. Final CTA Strip

Dark background (`hero-dark`). Centered layout:
- Heading: "Bereit für den Vergleich?" (serif, white)
- Subtitle: "Kostenlos, unverbindlich, in 2 Minuten."
- Button: "Jetzt kostenlos vergleichen" (amber) — scrolls back to hero form

### 8. Footer

Darkest background. Three columns:
- Brand name + tagline
- Contact info (address, email) in `<address>` tag
- Legal links (Impressum, Datenschutz) in `<nav>` with aria-label
- Copyright with dynamic year

---

## Form Behavior

The multi-step form (4 steps) retains its current architecture but is now embedded in the hero:

- **Step 1 (Company):** Firmenname, PLZ, Land — shown in the hero card
- **Step 2 (Contact):** Name, Telefonnummer, E-Mail — form card expands/transitions in place
- **Step 3 (Project):** DSB status, Starttermin, Unternehmensgröße
- **Step 4 (Review):** Summary + GDPR consent + "Was passiert als Nächstes?"

**On step advancement (Steps 2–4):** The form card remains in its hero position. The left-side hero content can optionally update to show relevant context for each step (e.g., step 2 could show a privacy reassurance message). The page does not scroll or jump.

**On submission success:** The form card shows a success message in place. The expert strip below remains visible.

**On submission error:** An error alert appears above the form card.

**Mobile form:** On mobile, the form is a prominent card below the hero text. Steps transition in place with slide animations (respecting prefers-reduced-motion).

---

## Accessibility Requirements

All accessibility improvements from the previous audit are retained:

- Single `<h1>` (in the hero, not the header)
- `<form>` element wrapping the multi-step form with `aria-label`
- `aria-live="assertive"` for validation errors and submission status
- `aria-hidden="true"` on all decorative SVGs/icons
- `role="alert"` on success and error messages
- Skip-to-content link targeting `#main-content`
- `<nav>` with `aria-label` for footer links
- `prefers-reduced-motion` respected for all animations
- `focus-visible` for keyboard focus indicators
- 44px minimum touch targets on mobile
- `<fieldset>` + `<legend>` for radio groups
- `role="progressbar"` on the progress indicator

---

## Responsive Behavior

**Desktop (≥1024px):** Full side-by-side hero. 2-column benefits. 3-column process steps. 3-column footer.

**Tablet (768px–1023px):** Side-by-side hero with tighter spacing. 2-column benefits. 3-column process steps.

**Mobile (<768px):**
- Hero stacks: copy block → cert badges → form card → expert strip
- Process steps stack vertically
- Benefits go single-column
- Footer stacks to single column
- Trust bar wraps to 2×2 grid
- Form card gets full-width treatment

---

## Files to Change

| File | Change |
|------|--------|
| `src/app/globals.css` | Update @theme tokens to new color palette |
| `src/app/layout.tsx` | No changes (fonts and skip link already in place) |
| `src/app/page.tsx` | Major restructure — dark hero with side-by-side form, new below-fold sections |
| `src/components/UI/Header.tsx` | Dark background, update token colors |
| `src/components/UI/TrustPoints.tsx` | Replace with new below-fold sections (process, benefits, testimonial, final CTA) |
| `src/components/UI/Footer.tsx` | Update to darker shade, keep structure |
| `src/components/MultiStepForm/index.tsx` | Restructure for hero-embedded layout, keep form/aria logic |
| `src/components/MultiStepForm/ProgressBar.tsx` | Update colors to new tokens |
| `src/components/MultiStepForm/StepCompany.tsx` | Update colors to new tokens |
| `src/components/MultiStepForm/StepContact.tsx` | Update colors to new tokens |
| `src/components/MultiStepForm/StepProject.tsx` | Update colors to new tokens |
| `src/components/MultiStepForm/StepReview.tsx` | Update colors to new tokens |
| `src/app/impressum/page.tsx` | Update header/footer colors |
| `src/app/datenschutz/page.tsx` | Update header/footer colors |

---

## Out of Scope

- User authentication or accounts
- Analytics/tracking integration
- Cookie consent banner
- A/B testing infrastructure
- CMS or dynamic content
- Partner logos section (no logos available yet)
- Pricing information (not yet determined)
- Multi-language support
- Blog or content pages beyond legal pages
