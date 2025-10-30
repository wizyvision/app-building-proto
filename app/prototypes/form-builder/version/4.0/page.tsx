/**
 * Form Builder V4.0 - Prototype Page
 *
 * Demonstrates Form Builder v4 with hello-pangea/dnd library
 * Migrated from dnd-kit with improved API and better accessibility
 * Uses default sections defined in FormBuilder component
 *
 * Route: /prototypes/form-builder/version/4.0
 *
 * KEY IMPROVEMENTS OVER V3:
 * - Simpler drag-drop API (component-based instead of hooks)
 * - Better accessibility built-in
 * - Automatic animations
 * - Single DragDropContext at app level (not nested)
 * - onDragEnd handler with clean DropResult structure
 */

'use client';

import React from 'react';
import { Box } from '@mui/material';
import { FormBuilder } from '@/features/FormBuilder/version4';
import { FieldData } from '@/features/FormBuilder/version4/types';
import { PrototypeNav } from '@/components/PrototypeNav/version1';

export default function FormBuilderV4Page() {
  const handleSave = (items: FieldData[]) => {
    console.log('Form saved:', items);
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
        version="4.0"
        displayName="Form Builder (hello-pangea/dnd)"
        nextVersion={undefined}
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
