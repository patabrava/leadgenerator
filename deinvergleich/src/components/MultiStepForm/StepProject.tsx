'use client';

import { useMultiStepForm } from '@/hooks/useMultiStepForm';
import { DSB_OPTIONS, COMPANY_SIZES } from '@/schemas/formSchema';

export function StepProject() {
  const { state, setField } = useMultiStepForm();

  const formatDateForInput = (dateString: string | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3 font-display">
          Projektdetails
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-body">
          Helfen Sie uns, Ihren spezifischen Bedarf zu verstehen.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* DSB Status */}
        <fieldset>
          <legend className="block text-sm font-medium text-foreground mb-3 font-body">
            Externer Datenschutzbeauftragter (DSB) *
          </legend>
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
                    className="h-5 w-5 text-primary border-input focus-visible:ring-ring"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor={`dsb-${option.value}`}
                    className="font-medium text-foreground cursor-pointer font-body"
                  >
                    {option.label}
                  </label>
                </div>
              </div>
            ))}
          </div>
          {state.errors.dsbVorhanden && (
            <p className="mt-2 text-sm text-destructive font-body" role="alert">{state.errors.dsbVorhanden}</p>
          )}
        </fieldset>

        {/* Start Date */}
        <div>
          <label htmlFor="start" className="block text-sm font-medium text-foreground mb-2 font-body">
            Gewünschter Starttermin *
          </label>
          <input
            type="date"
            id="start"
            name="start"
            value={formatDateForInput(state.data.start)}
            min={getMinDate()}
            onChange={(e) => setField('start', e.target.value)}
            className={`w-full md:w-auto px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg shadow-sm transition-colors text-sm sm:text-base font-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring ${
              state.errors.start
                ? 'border-destructive focus-visible:ring-destructive focus-visible:border-destructive'
                : 'border-input hover:border-muted-foreground/50'
            }`}
          />
          {state.errors.start && (
            <p className="mt-2 text-sm text-destructive font-body" role="alert">{state.errors.start}</p>
          )}
          <p className="mt-1.5 text-sm text-muted-foreground font-body">
            Wann soll die Betreuung beginnen?
          </p>
        </div>

        {/* Company Size */}
        <div>
          <label htmlFor="unternehmensgroesse" className="block text-sm font-medium text-foreground mb-2 font-body">
            Unternehmensgröße *
          </label>
          <select
            id="unternehmensgroesse"
            name="unternehmensgroesse"
            value={state.data.unternehmensgroesse || ''}
            onChange={(e) => setField('unternehmensgroesse', e.target.value)}
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg shadow-sm transition-colors text-sm sm:text-base font-body bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring ${
              state.errors.unternehmensgroesse
                ? 'border-destructive focus-visible:ring-destructive focus-visible:border-destructive'
                : 'border-input hover:border-muted-foreground/50'
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
            <p className="mt-2 text-sm text-destructive font-body" role="alert">{state.errors.unternehmensgroesse}</p>
          )}
          <p className="mt-1.5 text-sm text-muted-foreground font-body">
            Die Unternehmensgröße hilft uns bei der passenden Beratung.
          </p>
        </div>
      </div>
    </div>
  );
}
