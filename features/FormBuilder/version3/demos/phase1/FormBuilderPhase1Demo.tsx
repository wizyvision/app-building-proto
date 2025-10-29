/**
 * Form Builder V3 Phase 1 Demo Component
 *
 * Demonstrates Form Builder v3 with Phase 1 features:
 * - Undo/Redo functionality (simulated - full integration pending)
 * - Template library sidebar
 * - Base FormBuilder v3 functionality
 *
 * Usage:
 * Import this component in route pages to show Phase 1 demo
 */

'use client';

import React, { useState, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { FormBuilder } from '@/features/FormBuilder/version3';
import { SectionData, FieldData } from '@/features/FormBuilder/version3/types';
import { UndoRedoProvider, useUndoRedo } from '@/features/FormBuilder/version3/context/UndoRedoContext';
import { UndoRedoButtons } from '@/features/FormBuilder/version3/components/UndoRedo/version1';
import { TemplateLibrarySidebar } from '@/features/FormBuilder/version3/components/Templates/version1';
import type { FieldTemplate } from '@/features/FormBuilder/version3/components/Templates/version1/types';
import { DataTypes } from '@/constants/dataTypes';

// Default sections with specified fields (same as base FormBuilder v3)
const defaultSections: SectionData[] = [
  {
    id: 'section-workflow-status',
    name: 'Workflow Status',
    isExpanded: true,
    isSystem: true,
    fields: [
      {
        id: 'field-status',
        key: 'status',
        label: 'Status',
        type: DataTypes.STATUS_ID,
        isRequired: true,
        isSystemField: true,
        dataTypeLocked: true,
      },
      {
        id: 'field-date',
        key: 'createdAt',
        label: 'Date',
        type: DataTypes.DATE,
        isRequired: true,
        isSystemField: true,
        dataTypeLocked: true,
      },
    ],
    order: 0,
  },
  {
    id: 'section-readings-evidence',
    name: 'Readings & Evidence',
    isExpanded: true,
    isSystem: false,
    fields: [
      {
        id: 'field-pressure-reading',
        key: 'c1_pressurereading',
        label: 'Pressure/Meter Reading (PSI)',
        type: DataTypes.DOUBLE,
        isRequired: false,
        isSystemField: false,
      },
      {
        id: 'field-photo-current-state',
        key: 'c2_photocurrentstate',
        label: 'Photo - Current State',
        type: DataTypes.FILES,
        isRequired: false,
        isSystemField: false,
      },
    ],
    order: 1,
  },
];

/**
 * FormBuilderWithPhase1 - Wrapper component that adds Phase 1 features
 *
 * NOTE: This is a demo showing Phase 1 components. Full integration with
 * FormBuilder's internal state management is pending.
 */
function FormBuilderWithPhase1() {
  const [initialSections, setInitialSections] = useState<SectionData[]>(defaultSections);
  const { canUndo, canRedo, undo, redo, recordAction, getLastAction } = useUndoRedo();

  /**
   * Handle Template Selection
   * Adds template as initial section to FormBuilder
   */
  const handleTemplateSelect = useCallback((template: FieldTemplate) => {
    // Convert template to section
    const newSection: SectionData = {
      id: `section-${Date.now()}`,
      name: template.name,
      isExpanded: true,
      isSystem: false,
      fields: template.fields.map((templateField, index) => ({
        id: `field-${Date.now()}-${index}`,
        key: templateField.key,
        label: templateField.label,
        type: templateField.dataType,
        isRequired: templateField.isRequired,
        isSystemField: templateField.isSystem,
        description: templateField.description ?? undefined,
        placeholder: templateField.placeholder ?? undefined,
      })),
      order: initialSections.length,
    };

    const beforeState = [...initialSections];
    const afterState = [...initialSections, newSection];

    setInitialSections(afterState);

    // Record action for undo/redo
    recordAction({
      type: 'ADD_SECTION',
      description: `Added template: ${template.name}`,
      data: {
        before: beforeState.map(s => ({ type: 'section' as const, data: s })),
        after: afterState.map(s => ({ type: 'section' as const, data: s })),
      },
    });
  }, [initialSections, recordAction]);

  /**
   * Handle Undo
   * NOTE: Undo/Redo currently works for template additions only
   */
  const handleUndo = useCallback(() => {
    const beforeState = undo();
    if (beforeState) {
      const sections = beforeState
        .filter(item => item.type === 'section')
        .map(item => item.data as SectionData);
      setInitialSections(sections);
    }
  }, [undo]);

  /**
   * Handle Redo
   */
  const handleRedo = useCallback(() => {
    const afterState = redo();
    if (afterState) {
      const sections = afterState
        .filter(item => item.type === 'section')
        .map(item => item.data as SectionData);
      setInitialSections(sections);
    }
  }, [redo]);

  const handleSave = (items: FieldData[]) => {
    console.log('Form saved:', items);
    alert('Form saved! Check console for details.');
  };

  const handleCancel = () => {
    console.log('Form cancelled');
    alert('Form cancelled!');
  };

  const lastAction = getLastAction();

  return (
    <Box sx={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      {/* Template Library Sidebar */}
      <TemplateLibrarySidebar onSelectTemplate={handleTemplateSelect} />

      {/* Main FormBuilder */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Toolbar with Undo/Redo */}
        <Box
          sx={{
            p: 2,
            borderBottom: 1,
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            backgroundColor: 'background.paper',
          }}
        >
          <UndoRedoButtons
            onUndo={handleUndo}
            onRedo={handleRedo}
            canUndo={canUndo}
            canRedo={canRedo}
            lastActionDescription={lastAction?.description}
          />

          <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
            Phase 1 Demo: Template Library + Undo/Redo
          </Typography>
        </Box>

        {/* FormBuilder */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <FormBuilder
            key={initialSections.length} // Force re-render when sections change
            initialSections={initialSections}
            onSave={handleSave}
            onCancel={handleCancel}
            showMobilePreview={true}
          />
        </Box>
      </Box>
    </Box>
  );
}

/**
 * Main Export Component
 * Wraps FormBuilder with UndoRedoProvider
 */
export function FormBuilderPhase1Demo() {
  return (
    <UndoRedoProvider maxHistorySize={50}>
      <FormBuilderWithPhase1 />
    </UndoRedoProvider>
  );
}
