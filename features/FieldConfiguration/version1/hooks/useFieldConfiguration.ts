import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { FieldData } from '../types';

/**
 * useFieldConfiguration Hook
 *
 * Manages form state for field configuration using react-hook-form.
 * Provides real-time validation and watched values for live preview updates.
 *
 * UX PRINCIPLES APPLIED:
 * - Real-time Feedback: onChange validation mode provides immediate feedback
 * - Predictability: Form resets when field changes to prevent stale data
 */
export const useFieldConfiguration = (field: FieldData | null) => {
  const formMethods = useForm<FieldData>({
    defaultValues: field || undefined,
    mode: 'onChange', // Validate on change for real-time feedback
  });

  const { reset } = formMethods;

  // Reset form when field changes
  useEffect(() => {
    if (field) {
      reset(field);
    }
  }, [field, reset]);

  return {
    formMethods,
  };
};
