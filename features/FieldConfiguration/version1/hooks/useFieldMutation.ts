import { useState } from 'react';
import * as mockFieldApi from '../api/mockFieldApi';
import { FieldData } from '../types';

/**
 * useFieldMutation Hook
 *
 * Mock implementation of react-query mutation pattern for field updates.
 * Provides loading, error, and success states for optimistic UI updates.
 *
 * UX PRINCIPLES APPLIED:
 * - Feedback: Provides clear loading/error/success states
 * - User Control: Allows users to track operation status
 */
export const useFieldMutation = () => {
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const mutate = async (fieldId: string, updates: Partial<FieldData>) => {
    setIsPending(true);
    setIsError(false);
    setIsSuccess(false);

    try {
      await mockFieldApi.updateField(fieldId, updates);
      setIsSuccess(true);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsPending(false);
    }
  };

  const lockDataType = async (fieldId: string) => {
    setIsPending(true);
    setIsError(false);
    setIsSuccess(false);

    try {
      await mockFieldApi.lockDataType(fieldId);
      setIsSuccess(true);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsPending(false);
    }
  };

  return {
    mutate,
    lockDataType,
    isPending,
    isError,
    isSuccess,
  };
};
