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
                    Kostenlos &amp; unverbindlich
                  </span>
                  <span className="text-primary-tint text-sm font-body flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Antwort in 24h
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
