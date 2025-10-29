/**
 * FormBuilder Context
 *
 * Provides shared state and handlers to all FormBuilder components.
 * Eliminates prop drilling and centralizes state management.
 *
 * UX PRINCIPLES APPLIED:
 * - Single Responsibility: Context manages all form builder state
 * - Separation of Concerns: State management separated from UI components
 * - Performance: Memoized callbacks prevent unnecessary re-renders
 */

'use client';

import React, { createContext, useContext, useCallback } from 'react';
import { SectionData, FieldData, InsertionPosition } from '../types';

interface FormBuilderContextValue {
  // State
  items: FieldData[]; // Root-level items: sections and standalone fields
  selectedFieldId: string | null;

  // Section Handlers
  onSectionToggle: (sectionId: string) => void;
  onSectionRename: (sectionId: string, newLabel: string) => void;
  onSectionDelete: (sectionId: string) => void;
  onSectionReorder: (sectionId: string, newIndex: number) => void;

  // Field Handlers
  onFieldLabelChange: (fieldId: string, newLabel: string) => void;
  onFieldEdit: (fieldId: string) => void;
  onFieldMenuClick: (fieldId: string) => void;
  onFieldDelete: (fieldId: string) => void;
  onFieldReorder: (
    fieldId: string,
    sourceSectionId: string | null,
    targetSectionId: string | null,
    newIndex: number
  ) => void;
  onFieldSelect: (fieldId: string | null) => void;
  onFieldUpdate: (fieldId: string, updates: Partial<FieldData>) => void;

  // Insertion Handlers
  onAddField: (sectionId: string) => void;
  onInsertSection: (position: InsertionPosition, withField?: boolean) => void;
  onInsertStandaloneField: (position: InsertionPosition) => void;

  // Data Type Lock
  onLockDataType: (fieldId: string) => Promise<void>;
}

const FormBuilderContext = createContext<FormBuilderContextValue | undefined>(undefined);

interface FormBuilderProviderProps {
  children: React.ReactNode;
  value: FormBuilderContextValue;
}

export const FormBuilderProvider: React.FC<FormBuilderProviderProps> = ({ children, value }) => {
  return <FormBuilderContext.Provider value={value}>{children}</FormBuilderContext.Provider>;
};

/**
 * useFormBuilderContext Hook
 *
 * Access FormBuilder context from any child component.
 * Throws error if used outside of FormBuilderProvider.
 */
export const useFormBuilderContext = (): FormBuilderContextValue => {
  const context = useContext(FormBuilderContext);
  if (!context) {
    throw new Error('useFormBuilderContext must be used within FormBuilderProvider');
  }
  return context;
};
