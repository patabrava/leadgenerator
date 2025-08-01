'use client';

import { useMultiStepForm } from '@/hooks/useMultiStepForm';
import { COUNTRIES } from '@/schemas/formSchema';

export function StepCompany() {
  const { state, setField } = useMultiStepForm();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Unternehmensdaten
        </h2>
        <p className="text-gray-600">
          Bitte geben Sie die grundlegenden Informationen zu Ihrem Unternehmen ein.
        </p>
      </div>

      <div className="space-y-4">
        {/* Company Name */}
        <div>
          <label htmlFor="unternehmen" className="block text-sm font-medium text-gray-700 mb-1">
            Firmenname *
          </label>
          <input
            type="text"
            id="unternehmen"
            name="unternehmen"
            value={state.data.unternehmen || ''}
            onChange={(e) => setField('unternehmen', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
              state.errors.unternehmen
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300'
            }`}
            placeholder="Ihre Firma GmbH"
          />
          {state.errors.unternehmen && (
            <p className="mt-1 text-sm text-red-600">{state.errors.unternehmen}</p>
          )}
        </div>

        {/* Postal Code and Country Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Postal Code */}
          <div>
            <label htmlFor="plz" className="block text-sm font-medium text-gray-700 mb-1">
              Postleitzahl *
            </label>
            <input
              type="text"
              id="plz"
              name="plz"
              value={state.data.plz || ''}
              onChange={(e) => setField('plz', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                state.errors.plz
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300'
              }`}
              placeholder="12345"
              maxLength={5}
            />
            {state.errors.plz && (
              <p className="mt-1 text-sm text-red-600">{state.errors.plz}</p>
            )}
          </div>

          {/* Country */}
          <div>
            <label htmlFor="land" className="block text-sm font-medium text-gray-700 mb-1">
              Land *
            </label>
            <select
              id="land"
              name="land"
              value={state.data.land || ''}
              onChange={(e) => setField('land', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                state.errors.land
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300'
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
              <p className="mt-1 text-sm text-red-600">{state.errors.land}</p>
            )}
          </div>
        </div>
      </div>

      {/* Info box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-blue-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Diese Informationen helfen uns dabei, Sie optimal zu beraten und 
              rechtliche Anforderungen für Ihr Land zu berücksichtigen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
