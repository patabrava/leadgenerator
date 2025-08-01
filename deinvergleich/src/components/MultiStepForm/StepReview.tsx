'use client';

import { useMultiStepForm } from '@/hooks/useMultiStepForm';
import { COUNTRIES, COMPANY_SIZES, DSB_OPTIONS } from '@/schemas/formSchema';

export function StepReview() {
  const { state, setField } = useMultiStepForm();

  // Helper functions to get display labels
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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Zusammenfassung
        </h2>
        <p className="text-gray-600">
          Bitte überprüfen Sie Ihre Angaben vor dem Absenden.
        </p>
      </div>

      {/* Review Data */}
      <div className="bg-gray-50 rounded-lg p-6 space-y-6">
        {/* Company Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="inline-flex items-center justify-center w-6 h-6 bg-indigo-600 text-white text-sm font-medium rounded-full mr-3">
              1
            </span>
            Unternehmensdaten
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Firmenname:</span>
              <p className="text-gray-900">{state.data.unternehmen || '—'}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">PLZ:</span>
              <p className="text-gray-900">{state.data.plz || '—'}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Land:</span>
              <p className="text-gray-900">
                {state.data.land ? getCountryLabel(state.data.land) : '—'}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="inline-flex items-center justify-center w-6 h-6 bg-indigo-600 text-white text-sm font-medium rounded-full mr-3">
              2
            </span>
            Kontaktdaten
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Name:</span>
              <p className="text-gray-900">{state.data.name || '—'}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Telefon:</span>
              <p className="text-gray-900">{state.data.telefonnummer || '—'}</p>
            </div>
            <div className="md:col-span-2">
              <span className="font-medium text-gray-700">E-Mail:</span>
              <p className="text-gray-900">{state.data.emailadresse || '—'}</p>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="inline-flex items-center justify-center w-6 h-6 bg-indigo-600 text-white text-sm font-medium rounded-full mr-3">
              3
            </span>
            Projektdetails
          </h3>
          <div className="space-y-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Externer DSB:</span>
              <p className="text-gray-900">
                {state.data.dsbVorhanden ? getDSBLabel(state.data.dsbVorhanden) : '—'}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Starttermin:</span>
              <p className="text-gray-900">
                {state.data.start ? formatDate(state.data.start) : '—'}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Unternehmensgröße:</span>
              <p className="text-gray-900">
                {state.data.unternehmensgroesse ? getCompanySizeLabel(state.data.unternehmensgroesse) : '—'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* GDPR Consent */}
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="gdpr-consent"
              name="gdprConsent"
              type="checkbox"
              checked={state.data.gdprConsent || false}
              onChange={(e) => setField('gdprConsent', e.target.checked)}
              className={`focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded ${
                state.errors.gdprConsent ? 'border-red-300' : ''
              }`}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="gdpr-consent" className="font-medium text-gray-700 cursor-pointer">
              Datenschutzerklärung und Einverständnis *
            </label>
            <p className="text-gray-600 mt-1">
              Ich stimme der Verarbeitung meiner personenbezogenen Daten gemäß der{' '}
              <a 
                href="/datenschutz" 
                className="text-indigo-600 hover:text-indigo-500 underline"
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
          <p className="mt-2 text-sm text-red-600 ml-7">{state.errors.gdprConsent}</p>
        )}
      </div>

      {/* What happens next */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-indigo-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-indigo-800">
              Was passiert als Nächstes?
            </h3>
            <div className="mt-2 text-sm text-indigo-700">
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
