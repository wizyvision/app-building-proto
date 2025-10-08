/**
 * Form Builder V3 - Prototype Page
 *
 * Demonstrates Form Builder v3 with insertion pattern overlay system
 * Uses default sections defined in FormBuilder component
 */

'use client';

import React from 'react';
import { FormBuilder } from '@/features/FormBuilder/version3';
import { SectionData } from '@/features/FormBuilder/version3/types';

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
      onSave={handleSave}
      onCancel={handleCancel}
      showMobilePreview={true}
    />
  );
}
