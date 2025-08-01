'use client';

import { Header } from '@/components/UI/Header';
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Main Content Container - Responsive Layout */}
      <main className="min-h-screen">
        {/* Hero Section - Mobile-first responsive design */}
        <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 sm:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 lg:mb-12">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                Finden Sie den perfekten
                <span className="text-indigo-600 block mt-1">Datenschutz-Experten</span>
              </h1>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Kostenloser Vergleich qualifizierter Datenschutz-Anbieter in Deutschland. 
                Erhalten Sie in wenigen Minuten passende Angebote für Ihr Unternehmen.
              </p>
            </div>
          </div>
        </section>

        {/* Form and Trust Points Section - Stacked Layout */}
        <section className="pb-16 sm:pb-20 lg:pb-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Form Section */}
            <div className="mb-12 lg:mb-16">
              <MultiStepFormProvider>
                <FormContent />
              </MultiStepFormProvider>
            </div>
            
            {/* Trust Points Section - Below Form */}
            <TrustPoints />
          </div>
        </section>
      </main>

      {/* Footer - Enhanced responsive layout */}
      <footer className="bg-gray-900 text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4">deinvergleich.net</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Ihr professioneller Partner für DSGVO-Compliance und Datenschutz. 
                Rechtssicher, zuverlässig und kostengünstig.
              </p>
            </div>
            <div>
              <h4 className="text-base font-semibold mb-4">Kontakt</h4>
              <div className="text-gray-300 text-sm space-y-2">
                <p>E-Mail: info@deinvergleich.net</p>
                <p>Telefon: +49 (0) 123 456 789</p>
                <p>Mo-Fr: 9:00 - 18:00 Uhr</p>
              </div>
            </div>
            <div>
              <h4 className="text-base font-semibold mb-4">Rechtliches</h4>
              <div className="text-gray-300 text-sm space-y-2">
                <a href="/impressum" className="block hover:text-white transition-colors duration-200">
                  Impressum
                </a>
                <a href="/datenschutz" className="block hover:text-white transition-colors duration-200">
                  Datenschutzerklärung
                </a>
                <a href="/agb" className="block hover:text-white transition-colors duration-200">
                  AGB
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 deinvergleich.net. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
