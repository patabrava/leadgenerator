'use client';

import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';

import type { FormData } from '@/schemas/formSchema';
import {
  companyStepSchema,
  contactStepSchema,
  projectStepSchema,
  reviewStepSchema,
} from '@/schemas/formSchema';

// Form step configuration
export const FORM_STEPS = [
  { id: 'company', title: 'Unternehmensdaten', schema: companyStepSchema },
  { id: 'contact', title: 'Kontaktdaten', schema: contactStepSchema },
  { id: 'project', title: 'Projektdetails', schema: projectStepSchema },
  { id: 'review', title: 'Zusammenfassung', schema: reviewStepSchema },
] as const;

export type StepId = (typeof FORM_STEPS)[number]['id'];
export type StepIndex = 0 | 1 | 2 | 3;

// Form state interface
export interface FormState {
  currentStep: StepIndex;
  data: Partial<FormData>;
  errors: Partial<Record<keyof FormData, string>>;
  isSubmitting: boolean;
  isCompleted: boolean;
}

// Form actions
export type FormAction =
  | { type: 'SET_FIELD'; field: keyof FormData; value: string | boolean }
  | { type: 'SET_ERRORS'; errors: Partial<Record<keyof FormData, string>> }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'GO_TO_STEP'; step: StepIndex }
  | { type: 'SET_SUBMITTING'; isSubmitting: boolean }
  | { type: 'SET_COMPLETED'; isCompleted: boolean }
  | { type: 'RESET_FORM' };

// Initial state
const initialState: FormState = {
  currentStep: 0,
  data: {},
  errors: {},
  isSubmitting: false,
  isCompleted: false,
};

// Form reducer
function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        data: {
          ...state.data,
          [action.field]: action.value,
        },
        // Clear error for this field when user starts typing
        errors: {
          ...state.errors,
          [action.field]: undefined,
        },
      };

    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors,
      };

    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: {},
      };

    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, FORM_STEPS.length - 1) as StepIndex,
      };

    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0) as StepIndex,
      };

    case 'GO_TO_STEP':
      return {
        ...state,
        currentStep: action.step,
      };

    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.isSubmitting,
      };

    case 'SET_COMPLETED':
      return {
        ...state,
        isCompleted: action.isCompleted,
      };

    case 'RESET_FORM':
      return initialState;

    default:
      return state;
  }
}

// Context types
interface FormContextType {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
  // Helper functions
  setField: (field: keyof FormData, value: string | boolean) => void;
  nextStep: () => Promise<boolean>;
  prevStep: () => void;
  goToStep: (step: StepIndex) => void;
  validateCurrentStep: () => Promise<boolean>;
  canProceed: () => boolean;
  submitForm: () => Promise<boolean>;
  resetForm: () => void;
}

// Create context
const FormContext = createContext<FormContextType | null>(null);

// Context provider component
export function MultiStepFormProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  // Helper function to set field value
  const setField = (field: keyof FormData, value: string | boolean) => {
    dispatch({ type: 'SET_FIELD', field, value });
  };

  // Validate current step
  const validateCurrentStep = async (): Promise<boolean> => {
    const currentStepConfig = FORM_STEPS[state.currentStep];
    const result = await currentStepConfig.schema.safeParseAsync(state.data);

    if (!result.success) {
      const errors: Partial<Record<keyof FormData, string>> = {};
      
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormData;
        if (field) {
          errors[field] = issue.message;
        }
      });
      
      dispatch({ type: 'SET_ERRORS', errors });
      return false;
    }

    dispatch({ type: 'CLEAR_ERRORS' });
    return true;
  };

  // Check if current step can proceed
  const canProceed = (): boolean => {
    const currentStepConfig = FORM_STEPS[state.currentStep];
    const result = currentStepConfig.schema.safeParse(state.data);
    return result.success;
  };

  // Move to next step with validation
  const nextStep = async (): Promise<boolean> => {
    const isValid = await validateCurrentStep();
    
    if (isValid && state.currentStep < FORM_STEPS.length - 1) {
      dispatch({ type: 'NEXT_STEP' });
      return true;
    }
    
    return false;
  };

  // Move to previous step
  const prevStep = () => {
    if (state.currentStep > 0) {
      dispatch({ type: 'PREV_STEP' });
    }
  };

  // Go to specific step
  const goToStep = (step: StepIndex) => {
    dispatch({ type: 'GO_TO_STEP', step });
  };

  // Submit form
  const submitForm = async (): Promise<boolean> => {
    // Validate all data
    const isValid = await validateCurrentStep();
    
    if (!isValid) {
      return false;
    }

    dispatch({ type: 'SET_SUBMITTING', isSubmitting: true });

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state.data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Submission failed');
      }

      dispatch({ type: 'SET_COMPLETED', isCompleted: true });
      return true;
    } catch (error) {
      console.error('Form submission error:', error);
      // You could set a general error here if needed
      return false;
    } finally {
      dispatch({ type: 'SET_SUBMITTING', isSubmitting: false });
    }
  };

  // Reset form to initial state
  const resetForm = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  const contextValue: FormContextType = {
    state,
    dispatch,
    setField,
    nextStep,
    prevStep,
    goToStep,
    validateCurrentStep,
    canProceed,
    submitForm,
    resetForm,
  };

  return React.createElement(
    FormContext.Provider,
    { value: contextValue },
    children
  );
}

// Custom hook to use form context
export function useMultiStepForm(): FormContextType {
  const context = useContext(FormContext);
  
  if (!context) {
    throw new Error('useMultiStepForm must be used within a MultiStepFormProvider');
  }
  
  return context;
}
