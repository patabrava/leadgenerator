'use client';

import { useMultiStepForm } from '@/hooks/useMultiStepForm';

export function StepContact() {
  const { state, setField } = useMultiStepForm();

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3 font-display">
          Kontaktdaten
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-body">
          Wie können wir Sie am besten erreichen? Ihre Daten werden vertraulich behandelt.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Full Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2 font-body">
            Ihr Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={state.data.name || ''}
            onChange={(e) => setField('name', e.target.value)}
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg shadow-sm transition-colors text-sm sm:text-base font-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring ${
              state.errors.name
                ? 'border-destructive focus-visible:ring-destructive focus-visible:border-destructive'
                : 'border-input hover:border-muted-foreground/50'
            }`}
            placeholder="Max Mustermann"
          />
          {state.errors.name && (
            <p className="mt-2 text-sm text-destructive font-body" role="alert">{state.errors.name}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="telefonnummer" className="block text-sm font-medium text-foreground mb-2 font-body">
            Telefonnummer *
          </label>
          <input
            type="tel"
            id="telefonnummer"
            name="telefonnummer"
            value={state.data.telefonnummer || ''}
            onChange={(e) => setField('telefonnummer', e.target.value)}
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg shadow-sm transition-colors text-sm sm:text-base font-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring ${
              state.errors.telefonnummer
                ? 'border-destructive focus-visible:ring-destructive focus-visible:border-destructive'
                : 'border-input hover:border-muted-foreground/50'
            }`}
            placeholder="+49 123 456789"
          />
          {state.errors.telefonnummer && (
            <p className="mt-2 text-sm text-destructive font-body" role="alert">{state.errors.telefonnummer}</p>
          )}
          <p className="mt-1.5 text-sm text-muted-foreground font-body">
            Beispiel: +49 123 456789 oder 0123 456789
          </p>
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="emailadresse" className="block text-sm font-medium text-foreground mb-2 font-body">
            E-Mail-Adresse *
          </label>
          <input
            type="email"
            id="emailadresse"
            name="emailadresse"
            value={state.data.emailadresse || ''}
            onChange={(e) => setField('emailadresse', e.target.value)}
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg shadow-sm transition-colors text-sm sm:text-base font-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring ${
              state.errors.emailadresse
                ? 'border-destructive focus-visible:ring-destructive focus-visible:border-destructive'
                : 'border-input hover:border-muted-foreground/50'
            }`}
            placeholder="max.mustermann@firma.de"
          />
          {state.errors.emailadresse && (
            <p className="mt-2 text-sm text-destructive font-body" role="alert">{state.errors.emailadresse}</p>
          )}
        </div>
      </div>

      {/* Privacy Info */}
      <div className="bg-success-light border border-success-border rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-success"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-success font-body">
              <strong>Datenschutz garantiert:</strong> Ihre Kontaktdaten werden ausschließlich
              für die Beratung verwendet und nicht an Dritte weitergegeben.
              Wir sind selbst DSGVO-Experten und nehmen Datenschutz sehr ernst.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
