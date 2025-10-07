/**
 * Form Builder V3 - Prototype Page
 *
 * Demonstrates Form Builder v3 with insertion pattern overlay system
 */

'use client';

import React from 'react';
import { FormBuilder } from '@/features/FormBuilder/version3';
import { SectionData } from '@/features/FormBuilder/version3/types';

// Mock initial data for demonstration
const mockInitialSections: SectionData[] = [
  {
    id: 'section-1',
    name: 'System Information',
    isExpanded: true,
    isSystem: true,
    order: 0,
    fields: [
      {
        id: 'field-1',
        label: 'Inspection Title',
        type: 'text',
        isRequired: true,
        isSystemField: true,
      },
      {
        id: 'field-2',
        label: 'Description',
        type: 'textarea',
        isRequired: false,
        isSystemField: true,
      },
      {
        id: 'field-3',
        label: 'Status',
        type: 'select',
        isRequired: true,
        isSystemField: true,
        options: ['Draft', 'In Progress', 'Completed'],
      },
    ],
  },
  {
    id: 'section-2',
    name: 'Basic Details',
    isExpanded: true,
    isSystem: false,
    order: 1,
    fields: [
      {
        id: 'field-4',
        label: 'Property Address',
        type: 'text',
        isRequired: true,
        isSystemField: false,
      },
      {
        id: 'field-5',
        label: 'Inspector Name',
        type: 'text',
        isRequired: true,
        isSystemField: false,
      },
      {
        id: 'field-6',
        label: 'Inspection Date',
        type: 'date',
        isRequired: true,
        isSystemField: false,
      },
    ],
  },
  {
    id: 'section-3',
    name: 'Additional Information',
    isExpanded: false,
    isSystem: false,
    order: 2,
    fields: [
      {
        id: 'field-7',
        label: 'Notes',
        type: 'textarea',
        isRequired: false,
        isSystemField: false,
      },
    ],
  },
];

export default function FormBuilderV3Page() {
  const handleSave = (sections: SectionData[]) => {
    console.log('Form saved:', sections);
    alert('Form saved! Check console for details.');
  };

  const handleCancel = () => {
    console.log('Form cancelled');
    alert('Form cancelled!');
  };

  return (
    <FormBuilder
      initialSections={mockInitialSections}
      onSave={handleSave}
      onCancel={handleCancel}
      showMobilePreview={true}
    />
  );
}
