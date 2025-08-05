'use client';

import { useMultiStepForm } from '@/hooks/useMultiStepForm';
import { DSB_OPTIONS, COMPANY_SIZES } from '@/schemas/formSchema';

export function StepProject() {
  const { state, setField } = useMultiStepForm();

  // Format date for input field (YYYY-MM-DD)
  const formatDateForInput = (dateString: string | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Projektdetails
        </h2>
        <p className="text-gray-600">
          Helfen Sie uns, Ihren spezifischen Bedarf zu verstehen.
        </p>
      </div>

      <div className="space-y-6">
        {/* DSB Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Externer Datenschutzbeauftragter (DSB) *
          </label>
          <div className="space-y-3">
            {DSB_OPTIONS.map((option) => (
              <div key={option.value} className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id={`dsb-${option.value}`}
                    name="dsbVorhanden"
                    type="radio"
                    value={option.value}
                    checked={state.data.dsbVorhanden === option.value}
                    onChange={(e) => setField('dsbVorhanden', e.target.value)}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label 
                    htmlFor={`dsb-${option.value}`} 
                    className="font-medium text-gray-700 cursor-pointer"
                  >
                    {option.label}
                  </label>
                </div>
              </div>
            ))}
          </div>
          {state.errors.dsbVorhanden && (
            <p className="mt-2 text-sm text-red-600">{state.errors.dsbVorhanden}</p>
          )}
        </div>

        {/* Start Date */}
        <div>
          <label htmlFor="start" className="block text-sm font-medium text-gray-700 mb-1">
            Gewünschter Starttermin *
          </label>
          <input
            type="date"
            id="start"
            name="start"
            value={formatDateForInput(state.data.start)}
            min={getMinDate()}
            onChange={(e) => setField('start', e.target.value)}
            className={`w-full md:w-auto px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
              state.errors.start
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300'
            }`}
          />
          {state.errors.start && (
            <p className="mt-1 text-sm text-red-600">{state.errors.start}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            Wann soll die Betreuung beginnen?
          </p>
        </div>

        {/* Company Size */}
        <div>
          <label htmlFor="unternehmensgroesse" className="block text-sm font-medium text-gray-700 mb-1">
            Unternehmensgröße *
          </label>
          <select
            id="unternehmensgroesse"
            name="unternehmensgroesse"
            value={state.data.unternehmensgroesse || ''}
            onChange={(e) => setField('unternehmensgroesse', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
              state.errors.unternehmensgroesse
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300'
            }`}
          >
            <option value="">Anzahl Mitarbeiter auswählen</option>
            {COMPANY_SIZES.map((size) => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
          {state.errors.unternehmensgroesse && (
            <p className="mt-1 text-sm text-red-600">{state.errors.unternehmensgroesse}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            Die Unternehmensgröße hilft uns bei der passenden Beratung.
          </p>
        </div>
      </div>
    </div>
  );
}
