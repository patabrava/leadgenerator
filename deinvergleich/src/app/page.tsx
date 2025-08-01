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
      
      {/* Hero Section with Form */}
      <MultiStepFormProvider>
        <FormContent />
      </MultiStepFormProvider>

      {/* Trust Points Section */}
      <TrustPoints />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">deinvergleich.net</h3>
              <p className="text-gray-300 text-sm">
                Ihr professioneller Partner für DSGVO-Compliance und Datenschutz. 
                Rechtssicher, zuverlässig und kostengünstig.
              </p>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Kontakt</h4>
              <div className="text-gray-300 text-sm space-y-2">
                <p>E-Mail: info@deinvergleich.net</p>
                <p>Telefon: +49 (0) 123 456 789</p>
                <p>Mo-Fr: 9:00 - 18:00 Uhr</p>
              </div>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Rechtliches</h4>
              <div className="text-gray-300 text-sm space-y-2">
                <a href="/impressum" className="block hover:text-white transition-colors">
                  Impressum
                </a>
                <a href="/datenschutz" className="block hover:text-white transition-colors">
                  Datenschutzerklärung
                </a>
                <a href="/agb" className="block hover:text-white transition-colors">
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
