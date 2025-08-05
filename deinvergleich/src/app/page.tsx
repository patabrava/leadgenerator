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
              
              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600 mt-6 sm:mt-8">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-medium">500+ Anbieter</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Geprüfte Experten</span>
                </div>
              </div>
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
                Einfach, schnell und kostenlos Angebote erhalten"

              </p>
            </div>
            <div>
              <h4 className="text-base font-semibold mb-4">Kontakt</h4>
              <div className="text-gray-300 text-sm space-y-2">
                <p>E-Mail: info@deinvergleich.net</p>
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
