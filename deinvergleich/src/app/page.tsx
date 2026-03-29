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
      case 0:
        return <StepCompany />;
      case 1:
        return <StepContact />;
      case 2:
        return <StepProject />;
      case 3:
        return <StepReview />;
      default:
        return <StepCompany />;
    }
  };

  return (
    <MultiStepForm>
      {renderCurrentStep()}
    </MultiStepForm>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main id="main-content">
        {/* Hero — left-aligned, no gradient */}
        <section className="bg-primary-light py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight font-display">
                Finden Sie den perfekten Datenschutz-Experten
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed font-body">
                Kostenloser Vergleich qualifizierter Datenschutz-Anbieter in Deutschland.
                Erhalten Sie in wenigen Minuten passende Angebote für Ihr Unternehmen.
              </p>
            </div>
          </div>
        </section>

        {/* Form */}
        <section id="form-start" className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <MultiStepFormProvider>
              <FormContent />
            </MultiStepFormProvider>
          </div>
        </section>

        {/* Trust points */}
        <TrustPoints />
      </main>

      <Footer />
    </div>
  );
}
