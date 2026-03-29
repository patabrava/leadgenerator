'use client';

import { useMultiStepForm } from '@/hooks/useMultiStepForm';
import { COUNTRIES } from '@/schemas/formSchema';

export function StepCompany() {
  const { state, setField } = useMultiStepForm();

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3 font-display">
          Unternehmensdaten
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-body">
          Bitte geben Sie die grundlegenden Informationen zu Ihrem Unternehmen ein.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Company Name */}
        <div>
          <label htmlFor="unternehmen" className="block text-sm font-medium text-foreground mb-2 font-body">
            Firmenname *
          </label>
          <input
            type="text"
            id="unternehmen"
            name="unternehmen"
            value={state.data.unternehmen || ''}
            onChange={(e) => setField('unternehmen', e.target.value)}
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg shadow-sm transition-colors text-sm sm:text-base font-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring ${
              state.errors.unternehmen
                ? 'border-destructive focus-visible:ring-destructive focus-visible:border-destructive'
                : 'border-input hover:border-muted-foreground/50'
            }`}
            placeholder="Ihre Firma GmbH"
          />
          {state.errors.unternehmen && (
            <p className="mt-2 text-sm text-destructive leading-relaxed font-body" role="alert">{state.errors.unternehmen}</p>
          )}
        </div>

        {/* Postal Code and Country Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label htmlFor="plz" className="block text-sm font-medium text-foreground mb-2 font-body">
              Postleitzahl *
            </label>
            <input
              type="text"
              id="plz"
              name="plz"
              value={state.data.plz || ''}
              onChange={(e) => setField('plz', e.target.value)}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg shadow-sm transition-colors text-sm sm:text-base font-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring ${
                state.errors.plz
                  ? 'border-destructive focus-visible:ring-destructive focus-visible:border-destructive'
                  : 'border-input hover:border-muted-foreground/50'
              }`}
              placeholder="12345"
              maxLength={5}
              inputMode="numeric"
              pattern="[0-9]*"
            />
            {state.errors.plz && (
              <p className="mt-2 text-sm text-destructive leading-relaxed font-body" role="alert">{state.errors.plz}</p>
            )}
          </div>

          <div>
            <label htmlFor="land" className="block text-sm font-medium text-foreground mb-2 font-body">
              Land *
            </label>
            <select
              id="land"
              name="land"
              value={state.data.land || ''}
              onChange={(e) => setField('land', e.target.value)}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg shadow-sm transition-colors text-sm sm:text-base bg-card font-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring ${
                state.errors.land
                  ? 'border-destructive focus-visible:ring-destructive focus-visible:border-destructive'
                  : 'border-input hover:border-muted-foreground/50'
              }`}
            >
              <option value="">Land auswählen</option>
              {COUNTRIES.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
            {state.errors.land && (
              <p className="mt-2 text-sm text-destructive leading-relaxed font-body" role="alert">{state.errors.land}</p>
            )}
          </div>
        </div>
      </div>

      {/* Info box */}
      <div className="bg-info-light border border-info-border rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-info"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-info font-body">
              Diese Informationen helfen uns dabei, Sie optimal zu beraten und
              rechtliche Anforderungen für Ihr Land zu berücksichtigen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
