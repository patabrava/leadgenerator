'use client';

import { useMultiStepForm } from '@/hooks/useMultiStepForm';

export function StepContact() {
  const { state, setField } = useMultiStepForm();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Kontaktdaten
        </h2>
        <p className="text-gray-600">
          Wie können wir Sie am besten erreichen? Ihre Daten werden vertraulich behandelt.
        </p>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Ihr Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={state.data.name || ''}
            onChange={(e) => setField('name', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
              state.errors.name
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300'
            }`}
            placeholder="Max Mustermann"
          />
          {state.errors.name && (
            <p className="mt-1 text-sm text-red-600">{state.errors.name}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="telefonnummer" className="block text-sm font-medium text-gray-700 mb-1">
            Telefonnummer *
          </label>
          <input
            type="tel"
            id="telefonnummer"
            name="telefonnummer"
            value={state.data.telefonnummer || ''}
            onChange={(e) => setField('telefonnummer', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
              state.errors.telefonnummer
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300'
            }`}
            placeholder="+49 123 456789"
          />
          {state.errors.telefonnummer && (
            <p className="mt-1 text-sm text-red-600">{state.errors.telefonnummer}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            Beispiel: +49 123 456789 oder 0123 456789
          </p>
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="emailadresse" className="block text-sm font-medium text-gray-700 mb-1">
            E-Mail-Adresse *
          </label>
          <input
            type="email"
            id="emailadresse"
            name="emailadresse"
            value={state.data.emailadresse || ''}
            onChange={(e) => setField('emailadresse', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
              state.errors.emailadresse
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300'
            }`}
            placeholder="max.mustermann@firma.de"
          />
          {state.errors.emailadresse && (
            <p className="mt-1 text-sm text-red-600">{state.errors.emailadresse}</p>
          )}
        </div>
      </div>

      {/* Privacy Info */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-green-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-green-700">
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
