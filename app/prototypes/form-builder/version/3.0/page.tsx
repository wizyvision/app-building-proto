/**
 * Form Builder V3.0 - Prototype Page
 *
 * Demonstrates Form Builder v3 baseline with insertion pattern overlay system
 * Uses default sections defined in FormBuilder component
 *
 * Route: /prototypes/form-builder/version/3.0
 */

'use client';

import React from 'react';
import { Box } from '@mui/material';
import { FormBuilder } from '@/features/FormBuilder/version3';
import { SectionData } from '@/features/FormBuilder/version3/types';
import { PrototypeNav } from '@/components/PrototypeNav/version1';

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
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PrototypeNav
        feature="form-builder"
        version="3.0"
        displayName="Form Builder"
        nextVersion="3.1"
      />
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <FormBuilder
          onSave={handleSave}
          onCancel={handleCancel}
          showMobilePreview={true}
        />
      </Box>
    </Box>
  );
}
