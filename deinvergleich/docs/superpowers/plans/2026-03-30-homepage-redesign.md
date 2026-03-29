# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign deinvergleich.com homepage with a dark blue-green hero, side-by-side form layout, concentrated trust signals, and conversion-optimized below-fold sections.

**Architecture:** Update the CSS design tokens to a deep blue-green palette, restructure the homepage to embed the multi-step form directly in a dark hero section (value prop left, form right), add trust signal layers (cert badges, expert profile, testimonial near form), and replace the existing below-fold content with process steps, benefits, testimonial, and final CTA sections.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS v4 (@theme tokens), TypeScript, lucide-react icons, Source Serif 4 + Outfit fonts (already loaded).

**Spec:** `docs/superpowers/specs/2026-03-30-homepage-redesign-design.md`

---

### Task 1: Update Design Tokens

**Files:**
- Modify: `src/app/globals.css`

Update the @theme color tokens from teal to the deep blue-green palette defined in the spec. This is the foundation — all subsequent tasks reference these tokens.

- [ ] **Step 1: Update @theme tokens in globals.css**

Replace the existing `@theme` block with the new palette. Keep all non-token CSS (animations, focus styles, touch targets, skip-link) unchanged.

```css
@theme {
  /* Deep blue-green palette */
  --color-hero-dark: #0c2d3a;
  --color-background: #fafbfc;
  --color-foreground: #0c2d3a;
  --color-card: #ffffff;
  --color-card-foreground: #0c2d3a;
  --color-primary: #0e5e6f;
  --color-primary-foreground: #ffffff;
  --color-primary-light: #17919e;
  --color-primary-tint: #5eead4;
  --color-primary-bg: #f0f7f7;
  --color-secondary: #f0f7f7;
  --color-secondary-foreground: #4a6670;
  --color-muted: #f0f7f7;
  --color-muted-foreground: #4a6670;
  --color-muted-foreground-light: #64748b;
  --color-accent: #d97706;
  --color-accent-foreground: #ffffff;
  --color-destructive: #dc2626;
  --color-destructive-foreground: #ffffff;
  --color-border: #dde5e7;
  --color-input: #dde5e7;
  --color-ring: #0e5e6f;
  --color-info: #0c4a6e;
  --color-info-light: #f0f9ff;
  --color-info-border: #bae6fd;
  --color-success: #166534;
  --color-success-light: #f0fdf4;
  --color-success-border: #bbf7d0;

  /* Typography */
  --font-display: var(--font-source-serif), 'Georgia', serif;
  --font-body: var(--font-outfit), system-ui, sans-serif;
}
```

- [ ] **Step 2: Verify the build compiles**

Run: `npx tsc --noEmit && npm run build`
Expected: Clean build, no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "style: update design tokens to deep blue-green palette"
```

---

### Task 2: Update Header to Dark Theme

**Files:**
- Modify: `src/components/UI/Header.tsx`

Change the header from light (`bg-card`) to dark (`bg-hero-dark`) background with white text and amber CTA. The header scrolls the user to the form in the hero.

- [ ] **Step 1: Rewrite Header.tsx**

```tsx
'use client';

import { Search } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-hero-dark border-b border-hero-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-5">
          <a href="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Search className="w-5 h-5 text-primary-foreground" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xl md:text-2xl font-bold text-card font-display block">
                deinvergleich.com
              </span>
              <span className="text-sm text-primary-tint font-medium hidden sm:block font-body">
                Datenschutz-Vergleichsportal
              </span>
            </div>
          </a>

          <button
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-2.5 rounded-lg text-sm font-semibold font-body transition-colors duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            onClick={() => {
              const formInput = document.getElementById('unternehmen');
              if (formInput) {
                formInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => formInput.focus(), 500);
              }
            }}
          >
            Angebote erhalten
          </button>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/UI/Header.tsx
git commit -m "style: update header to dark theme with amber CTA"
```

---

### Task 3: Update Footer to Darker Theme

**Files:**
- Modify: `src/components/UI/Footer.tsx`

Shift footer from `bg-foreground` to explicit `bg-hero-dark` with a darker bottom section using an even darker shade via opacity.

- [ ] **Step 1: Rewrite Footer.tsx**

```tsx
export function Footer() {
  return (
    <footer className="bg-hero-dark py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="text-lg font-semibold text-card mb-4 font-display">
              deinvergleich.com
            </div>
            <p className="text-card/60 text-sm leading-relaxed font-body">
              Einfach, schnell und kostenlos Angebote erhalten
            </p>
          </div>
          <div>
            <div className="text-base font-semibold text-card mb-4 font-body">Kontakt</div>
            <address className="text-card/60 text-sm space-y-2 not-italic font-body">
              <p>Hagenauer Str. 16, 10435 Berlin</p>
              <p>E-Mail: matthias.frank@deinvergleich.com</p>
            </address>
          </div>
          <nav aria-label="Rechtliche Informationen">
            <div className="text-base font-semibold text-card mb-4 font-body">Rechtliches</div>
            <div className="text-card/60 text-sm space-y-2 font-body">
              <a href="/impressum" className="block hover:text-primary-tint transition-colors duration-200">
                Impressum
              </a>
              <a href="/datenschutz" className="block hover:text-primary-tint transition-colors duration-200">
                Datenschutzerklärung
              </a>
            </div>
          </nav>
        </div>
        <div className="border-t border-card/10 mt-8 pt-8 text-center text-card/40 text-sm font-body">
          <p>&copy; {new Date().getFullYear()} deinvergleich.com. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/UI/Footer.tsx
git commit -m "style: update footer to darker blue-green theme"
```

---

### Task 4: Restructure MultiStepForm for Hero Embedding

**Files:**
- Modify: `src/components/MultiStepForm/index.tsx`

Restructure the form to work inside the hero. Remove the outer card wrapper (the hero provides the context). The form card is now white with rounded-top corners, expert strip attaches below with rounded-bottom corners. The `<form>`, aria-live, progress bar, and navigation buttons stay.

- [ ] **Step 1: Rewrite MultiStepForm/index.tsx**

```tsx
'use client';

import ProgressBar from './ProgressBar';
import { useMultiStepForm } from '@/hooks/useMultiStepForm';

interface MultiStepFormProps {
  children: React.ReactNode;
}

export function MultiStepForm({ children }: MultiStepFormProps) {
  const { state, canProceed, nextStep, prevStep, goToStep, submitForm } = useMultiStepForm();

  const handleNext = async () => {
    if (state.currentStep === 3) {
      await submitForm();
    } else {
      await nextStep();
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await handleNext();
        }}
        aria-label="Vergleichsanfrage"
        noValidate
      >
        {/* Form card — white, rounded top */}
        <div className="bg-card rounded-t-xl shadow-2xl overflow-hidden">
          {/* Form title + progress */}
          <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-card-foreground font-body">
                Kostenlos Angebote erhalten
              </span>
              <span className="text-xs font-medium text-primary font-body">
                {state.currentStep + 1} / 4
              </span>
            </div>
            <ProgressBar
              currentStep={state.currentStep}
              totalSteps={4}
              onStepClick={(step) => goToStep(step as 0 | 1 | 2 | 3)}
            />
          </div>

          {/* Form content */}
          <div className="px-4 sm:px-6 py-5 sm:py-6">
            {/* Validation error announcements */}
            <div aria-live="assertive" className="sr-only">
              {Object.values(state.errors).filter(Boolean).length > 0 && (
                <p>
                  Es gibt {Object.values(state.errors).filter(Boolean).length} Fehler im Formular.
                  Bitte korrigieren Sie die markierten Felder.
                </p>
              )}
            </div>

            <div className="slide-in">
              {children}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="px-4 sm:px-6 py-4 bg-primary-bg/50 border-t border-border">
            <NavigationButtons
              currentStep={state.currentStep}
              canProceed={canProceed()}
              isSubmitting={state.isSubmitting}
              onPrev={() => prevStep()}
            />
          </div>
        </div>

        {/* Expert strip — attached below, rounded bottom */}
        <div className="bg-card/95 rounded-b-xl px-4 sm:px-6 py-4 border-t border-border">
          <div className="flex gap-3 items-center mb-3">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold font-body flex-shrink-0">
              MF
            </div>
            <div>
              <div className="text-sm font-semibold text-card-foreground font-body">Matthias Frank</div>
              <div className="text-xs text-muted-foreground font-body">Zert. DSB (TÜV) · ISO 27001 · 10+ J. Erfahrung</div>
            </div>
          </div>
          <div className="text-sm text-secondary-foreground italic border-l-2 border-primary pl-3 font-body leading-relaxed">
            &ldquo;Schnell den perfekten Anbieter gefunden.&rdquo;
            <span className="not-italic text-xs text-muted-foreground ml-1">— A. Kaijo, GF</span>
          </div>
        </div>
      </form>

      {/* Success message */}
      {state.isCompleted && (
        <div role="alert" className="mt-4 bg-success-light border border-success-border rounded-lg p-4">
          <div className="flex items-center gap-3">
            <svg className="h-5 w-5 text-success flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="text-sm font-medium text-success font-body">
              Vielen Dank für Ihre Anfrage! Wir melden uns in Kürze bei Ihnen.
            </p>
          </div>
        </div>
      )}

      {/* Submission error */}
      {state.submitError && (
        <div role="alert" className="mt-4 bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <svg className="h-5 w-5 text-destructive flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-sm font-medium text-destructive font-body">{state.submitError}</p>
          </div>
        </div>
      )}
    </div>
  );
}

interface NavigationButtonsProps {
  currentStep: number;
  canProceed: boolean;
  isSubmitting: boolean;
  onPrev: () => void;
}

function NavigationButtons({
  currentStep,
  canProceed,
  isSubmitting,
  onPrev,
}: NavigationButtonsProps) {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === 3;

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
      <button
        type="button"
        onClick={onPrev}
        disabled={isFirstStep || isSubmitting}
        className={`w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-2 border border-border text-sm font-medium font-body rounded-md transition-colors duration-200 ${
          isFirstStep || isSubmitting
            ? 'text-muted-foreground/50 cursor-not-allowed bg-primary-bg/30'
            : 'text-foreground bg-card hover:bg-primary-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring'
        }`}
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="sm:hidden">Zurück</span>
        <span className="hidden sm:inline">Vorheriger Schritt</span>
      </button>

      <button
        type="submit"
        disabled={!canProceed || isSubmitting}
        className={`w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-2 border border-transparent text-sm font-medium font-body rounded-md text-accent-foreground transition-colors duration-200 min-w-0 sm:min-w-[120px] ${
          !canProceed || isSubmitting
            ? 'bg-muted-foreground/40 cursor-not-allowed'
            : 'bg-accent hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring shadow-sm'
        }`}
      >
        {isSubmitting && (
          <div className="mr-2 flex space-x-1">
            <div className="w-2 h-2 bg-accent-foreground rounded-full loading-dot" />
            <div className="w-2 h-2 bg-accent-foreground rounded-full loading-dot" />
            <div className="w-2 h-2 bg-accent-foreground rounded-full loading-dot" />
          </div>
        )}
        <span className="truncate">
          {isSubmitting ? 'Wird gesendet...' : isLastStep ? 'Jetzt Angebote erhalten' : 'Weiter'}
        </span>
        {!isSubmitting && !isLastStep && (
          <svg className="w-4 h-4 ml-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/MultiStepForm/index.tsx
git commit -m "refactor: restructure MultiStepForm for hero-embedded layout with expert strip"
```

---

### Task 5: Simplify ProgressBar for Compact Form Card

**Files:**
- Modify: `src/components/MultiStepForm/ProgressBar.tsx`

Simplify the progress bar for the compact form card context. Remove the step labels and step circles (they take too much vertical space inside the hero card). Keep just the progress bar line and step count.

- [ ] **Step 1: Rewrite ProgressBar.tsx**

```tsx
import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
  onStepClick?: (step: number) => void;
}

export default function ProgressBar({ currentStep, totalSteps, className = '' }: ProgressBarProps) {
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div
      className={`w-full ${className}`}
      role="progressbar"
      aria-valuenow={currentStep + 1}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-label={`Schritt ${currentStep + 1} von ${totalSteps}`}
    >
      <div className="w-full bg-border rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/MultiStepForm/ProgressBar.tsx
git commit -m "style: simplify progress bar for compact hero form card"
```

---

### Task 6: Update Form Step Components for New Tokens

**Files:**
- Modify: `src/components/MultiStepForm/StepCompany.tsx`
- Modify: `src/components/MultiStepForm/StepContact.tsx`
- Modify: `src/components/MultiStepForm/StepProject.tsx`
- Modify: `src/components/MultiStepForm/StepReview.tsx`

Update all form steps to use the new color tokens. The changes are the same across all steps: replace `text-foreground` label colors, update info/success box colors, ensure all inputs use the new border and ring tokens. Since the steps already use semantic tokens from the previous audit, this is mainly updating the info box accent colors and ensuring consistency.

- [ ] **Step 1: Update StepCompany.tsx info box colors**

In `src/components/MultiStepForm/StepCompany.tsx`, the info box already uses `bg-info-light border-info-border text-info`. No changes needed — tokens will resolve to the new values automatically.

Verify by reading the file and confirming token usage.

- [ ] **Step 2: Update StepContact.tsx success box colors**

In `src/components/MultiStepForm/StepContact.tsx`, the privacy box already uses `bg-success-light border-success-border text-success`. No changes needed.

Verify by reading the file and confirming token usage.

- [ ] **Step 3: Update StepReview.tsx accent colors**

In `src/components/MultiStepForm/StepReview.tsx`, the "Was passiert als Nächstes?" box uses `bg-primary-light border-primary/20 text-primary`. Update `bg-primary-light` to `bg-primary-bg` since the token name changed:

Find: `bg-primary-light border border-primary/20`
Replace: `bg-primary-bg border border-primary/20`

Find: `text-primary/80`
Replace: `text-primary/70`

- [ ] **Step 4: Verify build**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/MultiStepForm/StepCompany.tsx src/components/MultiStepForm/StepContact.tsx src/components/MultiStepForm/StepProject.tsx src/components/MultiStepForm/StepReview.tsx
git commit -m "style: update form step components for new color tokens"
```

---

### Task 7: Replace TrustPoints with Below-Fold Sections

**Files:**
- Modify: `src/components/UI/TrustPoints.tsx`

Replace the current TrustPoints component with four new sections: "So funktioniert's" (3-step process), benefits grid, expanded testimonial, and final CTA strip.

- [ ] **Step 1: Rewrite TrustPoints.tsx**

```tsx
import { ShieldCheck, Clock, BadgeCheck, Building, Scale, Compass } from 'lucide-react';

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Geprüfte DSGVO-Anbieter',
    description: 'Alle Partner sind zertifizierte Datenschutzbeauftragte mit langjähriger Erfahrung.',
  },
  {
    icon: Clock,
    title: 'Schnelle Vermittlung',
    description: 'Passende Angebote von qualifizierten Anbietern innerhalb von 24 Stunden.',
  },
  {
    icon: BadgeCheck,
    title: 'Nur seriöse Anbieter',
    description: 'Jeder Partner durchläuft unseren Qualifizierungsprozess bevor er aufgenommen wird.',
  },
  {
    icon: Building,
    title: 'Für alle Unternehmensgrößen',
    description: 'Von Start-ups bis Konzerne — wir finden den passenden Anbieter.',
  },
  {
    icon: Scale,
    title: 'Kostenloser Vergleich',
    description: 'Unser Service ist für Sie vollständig kostenlos und unverbindlich.',
  },
  {
    icon: Compass,
    title: 'Neutrale Beratung',
    description: 'Wir vermitteln unabhängig und neutral den besten Anbieter für Sie.',
  },
];

export function TrustPoints() {
  return (
    <>
      {/* Trust Bar */}
      <div className="bg-primary-bg border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-primary font-medium font-body">
            <span>✓ Kostenlos</span>
            <span>✓ Unverbindlich</span>
            <span>✓ Antwort in 24h</span>
            <span>✓ DSGVO-konform</span>
          </div>
        </div>
      </div>

      {/* So funktioniert's */}
      <section className="bg-background py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground font-display mb-2">
            So funktioniert&rsquo;s
          </h2>
          <p className="text-muted-foreground font-body mb-10 lg:mb-14">
            In drei einfachen Schritten zum passenden Datenschutz-Anbieter.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { num: '1', title: 'Anfrage stellen', desc: 'Formular ausfüllen — dauert nur 2 Minuten.' },
              { num: '2', title: 'Angebote erhalten', desc: 'Qualifizierte Anbieter kontaktieren Sie innerhalb von 24h.' },
              { num: '3', title: 'Anbieter wählen', desc: 'Vergleichen Sie und wählen Sie den besten für Ihr Unternehmen.' },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold font-body mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="text-base font-semibold text-foreground font-body mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-primary-bg py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10 lg:mb-14">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground font-display mb-3">
              Warum deinvergleich.com?
            </h2>
            <p className="text-muted-foreground font-body">
              Wir verbinden Sie mit zertifizierten Datenschutz-Experten — kostenlos und unverbindlich.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground font-body mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-body">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expanded Testimonial */}
      <section className="bg-background py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-l-4 border-primary pl-6 lg:pl-8 max-w-3xl">
            <blockquote>
              <p className="text-lg lg:text-xl text-foreground font-display italic leading-relaxed">
                &ldquo;Dank deinvergleich.com haben wir schnell den perfekten Datenschutz-Anbieter
                gefunden. Kostenlos, unkompliziert und sehr professionell. Wir können den Service
                jedem Unternehmen empfehlen.&rdquo;
              </p>
              <footer className="mt-4 font-body">
                <strong className="text-foreground text-sm">Amelie Kaijo</strong>
                <span className="text-muted-foreground text-sm"> — Geschäftsführerin, Steuerberatung</span>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-hero-dark py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl lg:text-2xl font-bold text-card font-display mb-3">
            Bereit für den Vergleich?
          </h2>
          <p className="text-card/60 font-body mb-6">
            Kostenlos, unverbindlich, in 2 Minuten.
          </p>
          <button
            onClick={() => {
              const formInput = document.getElementById('unternehmen');
              if (formInput) {
                formInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => formInput.focus(), 500);
              }
            }}
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-lg text-sm font-semibold font-body transition-colors duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            ↑ Jetzt kostenlos vergleichen
          </button>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/UI/TrustPoints.tsx
git commit -m "feat: replace TrustPoints with process, benefits, testimonial, and CTA sections"
```

---

### Task 8: Restructure Homepage with Dark Hero + Side-by-Side Form

**Files:**
- Modify: `src/app/page.tsx`

This is the core layout change. The hero becomes a dark section with the value proposition on the left and the form on the right. Below-fold content is handled by TrustPoints (updated in Task 7).

- [ ] **Step 1: Rewrite page.tsx**

```tsx
'use client';

import { Header } from '@/components/UI/Header';
import { Footer } from '@/components/UI/Footer';
import { MultiStepFormProvider } from '@/hooks/useMultiStepForm';
import { MultiStepForm } from '@/components/MultiStepForm';
import { StepCompany } from '@/components/MultiStepForm/StepCompany';
import { StepContact } from '@/components/MultiStepForm/StepContact';
import { StepProject } from '@/components/MultiStepForm/StepProject';
import { StepReview } from '@/components/MultiStepForm/StepReview';
import { TrustPoints } from '@/components/UI/TrustPoints';
import { useMultiStepForm } from '@/hooks/useMultiStepForm';

function FormContent() {
  const { state } = useMultiStepForm();

  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case 0: return <StepCompany />;
      case 1: return <StepContact />;
      case 2: return <StepProject />;
      case 3: return <StepReview />;
      default: return <StepCompany />;
    }
  };

  return <MultiStepForm>{renderCurrentStep()}</MultiStepForm>;
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main id="main-content">
        {/* Hero — dark bg, side-by-side layout */}
        <section className="bg-gradient-to-br from-hero-dark to-hero-dark/95 py-10 sm:py-14 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              {/* Left: Value proposition */}
              <div className="flex-1 min-w-0 lg:pt-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-card leading-tight font-display mb-6">
                  Finden Sie den perfekten Datenschutz-Experten
                </h1>
                <p className="text-base sm:text-lg text-card/70 leading-relaxed font-body mb-8 max-w-lg">
                  Kostenloser Vergleich qualifizierter DSGVO-Anbieter in Deutschland.
                  Erhalten Sie in wenigen Minuten passende Angebote für Ihr Unternehmen.
                </p>

                {/* Value props */}
                <div className="flex flex-wrap gap-x-5 gap-y-2 mb-8">
                  <span className="text-primary-tint text-sm font-body flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Kostenlos & unverbindlich
                  </span>
                  <span className="text-primary-tint text-sm font-body flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Antwort in 24h
                  </span>
                  <span className="text-primary-tint text-sm font-body flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    In 2 Minuten
                  </span>
                </div>

                {/* Certification badges */}
                <div className="flex flex-wrap gap-2">
                  <span className="bg-card/8 border border-card/12 text-primary-tint px-3 py-1.5 rounded-md text-xs font-medium font-body">
                    ✓ TÜV-zertifiziert
                  </span>
                  <span className="bg-card/8 border border-card/12 text-primary-tint px-3 py-1.5 rounded-md text-xs font-medium font-body">
                    ✓ DEKRA
                  </span>
                  <span className="bg-card/8 border border-card/12 text-primary-tint px-3 py-1.5 rounded-md text-xs font-medium font-body">
                    ✓ ISO 27001
                  </span>
                </div>
              </div>

              {/* Right: Form */}
              <div className="w-full lg:w-[420px] lg:flex-shrink-0">
                <MultiStepFormProvider>
                  <FormContent />
                </MultiStepFormProvider>
              </div>
            </div>
          </div>
        </section>

        {/* Below-fold sections */}
        <TrustPoints />
      </main>

      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npx tsc --noEmit && npm run build`
Expected: Clean build. All pages render.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: restructure homepage with dark hero and side-by-side form layout"
```

---

### Task 9: Update Legal Pages for New Theme

**Files:**
- Modify: `src/app/impressum/page.tsx`
- Modify: `src/app/datenschutz/page.tsx`

Update both legal pages to use the new `bg-background` and `text-foreground` tokens (they already do from the previous audit), and ensure the header/footer render correctly with the dark theme. The main change is verifying they work — the Header and Footer components were updated in Tasks 2–3 and these pages already import them.

- [ ] **Step 1: Verify impressum page renders**

Read `src/app/impressum/page.tsx` and confirm it imports `Header` and `Footer` from the updated components and uses semantic tokens (`bg-background`, `text-foreground`, `bg-card`, `border-border`, etc.). If it does, no changes needed.

- [ ] **Step 2: Verify datenschutz page renders**

Read `src/app/datenschutz/page.tsx` and confirm the same. No changes needed if it already uses semantic tokens.

- [ ] **Step 3: Full build verification**

Run: `npm run build`
Expected: All 4 routes build successfully (/, /impressum, /datenschutz, /api/submit).

- [ ] **Step 4: Commit (only if changes were made)**

```bash
git add src/app/impressum/page.tsx src/app/datenschutz/page.tsx
git commit -m "style: verify legal pages work with new dark theme"
```

---

### Task 10: Visual QA and Final Build

**Files:**
- All modified files

Final verification pass. Start the dev server, check all pages visually, verify the build.

- [ ] **Step 1: Run full build**

Run: `npm run build`
Expected: Clean build, all routes successful.

- [ ] **Step 2: Run type check**

Run: `npx tsc --noEmit`
Expected: No type errors.

- [ ] **Step 3: Start dev server and verify visually**

Run: `npm run dev`

Check these pages:
- `http://localhost:3000` — dark hero, form on right, trust bar, process steps, benefits, testimonial, CTA strip, dark footer
- `http://localhost:3000/impressum` — dark header, content, dark footer
- `http://localhost:3000/datenschutz` — dark header, content, dark footer

Verify on mobile viewport (375px width):
- Hero stacks: copy on top, form card below
- Form card is full width
- Benefits go single column
- Process steps stack vertically

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: homepage redesign complete — dark hero, side-by-side form, trust signals"
```
