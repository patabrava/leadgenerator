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
      <div className="w-full max-w-4xl mx-auto">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await handleNext();
          }}
          aria-label="Vergleichsanfrage"
          noValidate
        >
          {/* Main form container */}
          <div className="bg-card rounded-lg sm:rounded-xl shadow-lg overflow-hidden border border-border">
            {/* Progress bar */}
            <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-secondary border-b border-border">
              <ProgressBar
                currentStep={state.currentStep}
                totalSteps={4}
                onStepClick={(step) => goToStep(step as 0 | 1 | 2 | 3)}
              />
            </div>

            {/* Form content */}
            <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
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
            <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-secondary border-t border-border">
              <NavigationButtons
                currentStep={state.currentStep}
                canProceed={canProceed()}
                isSubmitting={state.isSubmitting}
                onPrev={() => prevStep()}
              />
            </div>
          </div>
        </form>

        {/* Success message */}
        {state.isCompleted && (
          <div role="alert" className="mt-6 sm:mt-8 bg-success-light border border-success-border rounded-lg p-4 sm:p-6">
            <div className="flex items-start sm:items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-success mt-0.5 sm:mt-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm sm:text-base font-medium text-success leading-relaxed font-body">
                  Vielen Dank für Ihre Anfrage! Wir melden uns in Kürze bei Ihnen.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Submission error message */}
        {state.submitError && (
          <div role="alert" className="mt-6 sm:mt-8 bg-destructive/10 border border-destructive/20 rounded-lg p-4 sm:p-6">
            <div className="flex items-start sm:items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-destructive mt-0.5 sm:mt-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm sm:text-base font-medium text-destructive leading-relaxed font-body">
                  {state.submitError}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
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
      {/* Previous button */}
      <button
        type="button"
        onClick={onPrev}
        disabled={isFirstStep || isSubmitting}
        className={`w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-2 border border-border text-sm font-medium font-body rounded-md transition-colors duration-200 ${
          isFirstStep || isSubmitting
            ? 'text-muted-foreground/50 cursor-not-allowed bg-secondary'
            : 'text-foreground bg-card hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring'
        }`}
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="sm:hidden">Zurück</span>
        <span className="hidden sm:inline">Vorheriger Schritt</span>
      </button>

      {/* Next / Submit button */}
      <button
        type="submit"
        disabled={!canProceed || isSubmitting}
        className={`w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-2 border border-transparent text-sm font-medium font-body rounded-md text-primary-foreground transition-colors duration-200 min-w-0 sm:min-w-[120px] ${
          !canProceed || isSubmitting
            ? 'bg-muted-foreground/40 cursor-not-allowed'
            : 'bg-primary hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring shadow-sm'
        }`}
      >
        {isSubmitting && (
          <div className="mr-2 flex space-x-1">
            <div className="w-2 h-2 bg-primary-foreground rounded-full loading-dot" />
            <div className="w-2 h-2 bg-primary-foreground rounded-full loading-dot" />
            <div className="w-2 h-2 bg-primary-foreground rounded-full loading-dot" />
          </div>
        )}

        <span className="truncate">
          {isSubmitting
            ? 'Wird gesendet...'
            : isLastStep
            ? 'Jetzt Angebote erhalten'
            : 'Weiter'
          }
        </span>

        {!isSubmitting && !isLastStep && (
          <svg
            className="w-4 h-4 ml-2 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
      </button>
    </div>
  );
}
