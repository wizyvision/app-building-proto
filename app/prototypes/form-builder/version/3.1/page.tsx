/**
 * Form Builder V3.1 - Phase 1 Features
 *
 * Demonstrates FormBuilder v3 with Phase 1 enhancements:
 * - Undo/Redo functionality
 * - Template library sidebar
 * - Base FormBuilder v3 functionality
 *
 * Route: /prototypes/form-builder/version/3.1
 */

'use client';

import React from 'react';
import { Box } from '@mui/material';
import { FormBuilderPhase1Demo } from '@/features/FormBuilder/version3/demos/phase1';
import { PrototypeNav } from '@/components/PrototypeNav/version1';

export default function FormBuilderV3Point1Page() {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PrototypeNav
        feature="form-builder"
        version="3.1"
        displayName="Form Builder"
        previousVersion="3.0"
      />
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <FormBuilderPhase1Demo />
      </Box>
    </Box>
  );
}
