'use client';

import { useMultiStepForm } from '@/hooks/useMultiStepForm';
import { COUNTRIES, COMPANY_SIZES, DSB_OPTIONS } from '@/schemas/formSchema';

export function StepReview() {
  const { state, setField } = useMultiStepForm();

  const getCountryLabel = (value: string) => {
    return COUNTRIES.find(country => country.value === value)?.label || value;
  };

  const getCompanySizeLabel = (value: string) => {
    return COMPANY_SIZES.find(size => size.value === value)?.label || value;
  };

  const getDSBLabel = (value: string) => {
    return DSB_OPTIONS.find(option => option.value === value)?.label || value;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3 font-display">
          Zusammenfassung
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-body">
          Bitte überprüfen Sie Ihre Angaben vor dem Absenden.
        </p>
      </div>

      {/* Review Data */}
      <div className="bg-secondary rounded-lg p-6 space-y-6">
        {/* Company Information */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center font-display">
            <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground text-sm font-medium rounded-full mr-3 font-body">
              1
            </span>
            Unternehmensdaten
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-body">
            <div>
              <span className="font-medium text-muted-foreground">Firmenname:</span>
              <p className="text-foreground">{state.data.unternehmen || '—'}</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">PLZ:</span>
              <p className="text-foreground">{state.data.plz || '—'}</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Land:</span>
              <p className="text-foreground">
                {state.data.land ? getCountryLabel(state.data.land) : '—'}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center font-display">
            <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground text-sm font-medium rounded-full mr-3 font-body">
              2
            </span>
            Kontaktdaten
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-body">
            <div>
              <span className="font-medium text-muted-foreground">Name:</span>
              <p className="text-foreground">{state.data.name || '—'}</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Telefon:</span>
              <p className="text-foreground">{state.data.telefonnummer || '—'}</p>
            </div>
            <div className="md:col-span-2">
              <span className="font-medium text-muted-foreground">E-Mail:</span>
              <p className="text-foreground">{state.data.emailadresse || '—'}</p>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center font-display">
            <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground text-sm font-medium rounded-full mr-3 font-body">
              3
            </span>
            Projektdetails
          </h3>
          <div className="space-y-4 text-sm font-body">
            <div>
              <span className="font-medium text-muted-foreground">Externer DSB:</span>
              <p className="text-foreground">
                {state.data.dsbVorhanden ? getDSBLabel(state.data.dsbVorhanden) : '—'}
              </p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Starttermin:</span>
              <p className="text-foreground">
                {state.data.start ? formatDate(state.data.start) : '—'}
              </p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Unternehmensgröße:</span>
              <p className="text-foreground">
                {state.data.unternehmensgroesse ? getCompanySizeLabel(state.data.unternehmensgroesse) : '—'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* GDPR Consent */}
      <div className="border border-border rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="gdpr-consent"
              name="gdprConsent"
              type="checkbox"
              checked={state.data.gdprConsent || false}
              onChange={(e) => setField('gdprConsent', e.target.checked)}
              className={`h-5 w-5 text-primary border-input rounded focus-visible:ring-ring ${
                state.errors.gdprConsent ? 'border-destructive' : ''
              }`}
            />
          </div>
          <div className="ml-3 text-sm font-body">
            <label htmlFor="gdpr-consent" className="font-medium text-foreground cursor-pointer">
              Datenschutzerklärung und Einverständnis *
            </label>
            <p className="text-muted-foreground mt-1">
              Ich stimme der Verarbeitung meiner personenbezogenen Daten gemäß der{' '}
              <a
                href="/datenschutz"
                className="text-primary hover:text-primary/80 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Datenschutzerklärung
              </a>{' '}
              zu. Die Daten werden ausschließlich für die Beratung verwendet und können
              jederzeit widerrufen werden.
            </p>
          </div>
        </div>
        {state.errors.gdprConsent && (
          <p className="mt-2 text-sm text-destructive ml-8 font-body" role="alert">{state.errors.gdprConsent}</p>
        )}
      </div>

      {/* What happens next */}
      <div className="bg-primary-light border border-primary/20 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-primary"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3 font-body">
            <h3 className="text-sm font-medium text-primary">
              Was passiert als Nächstes?
            </h3>
            <div className="mt-2 text-sm text-primary/80">
              <ol className="list-decimal list-inside space-y-1">
                <li>Wir erhalten Ihre Anfrage und prüfen Ihren Bedarf</li>
                <li>Ein Experte meldet sich innerhalb von 24 Stunden bei Ihnen</li>
                <li>Kostenlose Erstberatung (ca. 30 Minuten)</li>
                <li>Unverbindliches Angebot für Ihre DSGVO-Betreuung</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
