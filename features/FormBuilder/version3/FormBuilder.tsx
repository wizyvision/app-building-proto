/**
 * FormBuilder Component - Version 3
 *
 * VERSION INFO:
 * - Version: 3
 * - Created: 2025-10-07
 * - Major Feature: Insertion Pattern Overlay System (Pattern C)
 * - Changes from v2:
 *   - Context-aware insertion zones between components
 *   - Non-invasive overlay system (no component modification)
 *   - Absolute positioning prevents layout shifts
 *   - Mobile preview integration with real-time sync
 *   - Enhanced drag-and-drop with visual feedback
 *
 * MIGRATION FROM V2:
 * - Props interface similar - should be mostly drop-in
 * - New insertion pattern replaces previous add buttons
 * - Mobile preview is now integrated (optional via showMobilePreview prop)
 * - State management extended with insertion tracking
 *
 * COMPONENT PURPOSE:
 * Main form builder interface integrating all sub-components with the
 * insertion pattern overlay system. Manages form state, coordinates drag-drop,
 * and provides real-time mobile preview.
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Familiar form builder interface with sections and fields.
 *   Users recognize the structure from Google Forms, Typeform, and similar tools.
 *
 * - Hick's Law: Insertion zones show only relevant actions based on context.
 *   Between fields shows "Add Field", between sections shows "Add Section".
 *   Reduces decision paralysis by limiting choices.
 *
 * - Fitts's Law: Large click targets for all interactive elements.
 *   Insertion zones are 44px minimum height. Sections and fields provide
 *   full-width click areas for maximum accessibility.
 *
 * - Miller's Law: Form organized in sections to chunk information.
 *   Typically 5-7 fields per section follows working memory limitations.
 *
 * - Visual Hierarchy:
 *   - Primary: Form sections and fields (highest contrast)
 *   - Secondary: Toolbar actions (medium prominence)
 *   - Tertiary: Insertion zones (subtle until hover)
 *   - Context: Mobile preview (separate but visible)
 *
 * - Progressive Disclosure: Insertion zones appear on hover/interaction.
 *   Field actions (edit, menu) visible only on hover. Reduces visual clutter
 *   while keeping actions accessible when needed.
 *
 * - Aesthetic-Usability Effect: Smooth transitions, polished animations,
 *   and consistent spacing create professional feel that enhances perceived
 *   usability and builds user confidence.
 *
 * INSERTION PATTERN (PATTERN C):
 * - Non-invasive: Overlays sit between components without modifying them
 * - Context-aware: Shows appropriate buttons based on position
 * - No layout shifts: Absolute positioning prevents reflow
 * - Progressive disclosure: Appears on hover, fades when not needed
 * - Keyboard accessible: Tab navigation, Enter to activate
 *
 * TECHNICAL ARCHITECTURE:
 * - React state for form sections and fields
 * - dnd-kit for drag-and-drop functionality
 * - InsertionOverlay manages insertion zones
 * - SectionList renders Section v3 components
 * - FieldList renders Field v5 components
 * - MobilePreview syncs with form state
 *
 * INTERACTIONS:
 * - Hover canvas: Insertion zones appear near cursor
 * - Click insertion zone: Add field or section at position
 * - Drag section/field: Reorder with visual feedback
 * - Edit section name: Inline TextField editing
 * - Edit field label: Inline TextField editing
 * - Toggle section: Expand/collapse with animation
 * - Delete: Remove non-system sections/fields
 * - Save: Callback with current form state
 * - Cancel: Callback to exit builder
 *
 * STATE MANAGEMENT:
 * - sections: Array of SectionData with nested fields
 * - selectedFieldId: Currently selected field for configuration
 * - insertion: Tracks active insertion zone state
 * - Mobile preview state: Synced with main form state
 */

'use client';

import React, { useState, useCallback } from 'react';
import { Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { SectionList } from './SectionList';
import { MobilePreview } from './MobilePreview';
import { FieldConfiguration } from '@/features/FieldConfiguration';
import { FormBuilderProps, SectionData, FieldData, InsertionPosition, FormItem } from './types';
import { FormBuilderProvider } from './context/FormBuilderContext';
import {
  FormBuilderContainer,
  MainContent,
  ToolbarContainer,
  ToolbarActions,
  ToolbarButton,
  FormCanvas,
  EmptyStateContainer,
  EmptyStateIconWrapper,
  AddSectionButton,
} from './styles';
import { DataTypes } from '@/constants/dataTypes';

// Default sections with specified fields
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

export const FormBuilder: React.FC<FormBuilderProps> = ({
  initialSections = defaultSections,
  onSave,
  onCancel,
  showMobilePreview: initialShowMobilePreview = true,
}) => {
  // Convert initialSections to items format
  const initialItems: FormItem[] = initialSections.map((section) => ({
    type: 'section' as const,
    data: section,
  }));

  const [items, setItems] = useState<FormItem[]>(initialItems);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [isInsertionEnabled, setIsInsertionEnabled] = useState(true);
  const [showMobilePreview, setShowMobilePreview] = useState(initialShowMobilePreview);

  /**
   * Handle Insert Standalone Field
   * Creates a standalone field (not in a section) at the specified position
   */
  const handleInsertStandaloneField = useCallback((position: InsertionPosition) => {
    const newField: FieldData = {
      id: `field-${Date.now()}`,
      label: 'New Field',
      type: DataTypes.STRING,
      isRequired: false,
      isSystemField: false,
    };

    const newItem: FormItem = {
      type: 'field',
      data: newField,
    };

    setItems((prev) => {
      const updated = [...prev];
      const index = position.sectionIndex ?? 0;
      updated.splice(index, 0, newItem);
      return updated;
    });

    // Auto-select the new field to open FieldConfiguration sidebar
    setSelectedFieldId(newField.id);
  }, []);

  /**
   * Handle Insert Field (into a section)
   * Creates a new field at the specified position within a section
   */
  const handleInsertField = useCallback((position: InsertionPosition) => {
    const newField: FieldData = {
      id: `field-${Date.now()}`,
      label: 'New Field',
      type: DataTypes.STRING,
      isRequired: false,
      isSystemField: false,
    };

    setItems((prev) => {
      const updated = [...prev];

      if (position.sectionId !== undefined) {
        const itemIndex = updated.findIndex(
          (item) => item.type === 'section' && item.data.id === position.sectionId
        );

        if (itemIndex !== -1 && updated[itemIndex].type === 'section') {
          const sectionItem = updated[itemIndex] as { type: 'section'; data: SectionData };
          const section = sectionItem.data;
          const newFields = [...section.fields];

          if (position.fieldIndex === -1) {
            // Append to end
            newFields.push(newField);
          } else {
            // Insert at specific index
            newFields.splice(position.fieldIndex ?? 0, 0, newField);
          }

          updated[itemIndex] = {
            ...sectionItem,
            data: {
              ...section,
              fields: newFields,
            },
          };
        }
      }

      return updated;
    });

    // Auto-select the new field to open FieldConfiguration sidebar
    setSelectedFieldId(newField.id);
  }, []);

  /**
   * Handle Insert Section
   * Creates a new section at the specified position
   */
  const handleInsertSection = useCallback((position: InsertionPosition, withField: boolean = false) => {
    const newSection: SectionData = {
      id: `section-${Date.now()}`,
      name: 'New Section',
      isExpanded: true,
      isSystem: false,
      fields: withField ? [{
        id: `field-${Date.now()}`,
        label: 'New Field',
        type: DataTypes.STRING,
        isRequired: false,
        isSystemField: false,
      }] : [],
      order: position.sectionIndex ?? items.length,
    };

    const newItem: FormItem = {
      type: 'section',
      data: newSection,
    };

    setItems((prev) => {
      const updated = [...prev];
      const index = position.sectionIndex ?? updated.length;

      if (index === -1 || index >= updated.length) {
        // Append to end
        updated.push(newItem);
      } else {
        // Insert at specific index
        updated.splice(index, 0, newItem);
      }

      // Update order property for all sections
      return updated.map((item, idx) => {
        if (item.type === 'section') {
          return {
            ...item,
            data: { ...item.data, order: idx },
          };
        }
        return item;
      });
    });
  }, [items.length]);

  /**
   * Handle Section Toggle
   */
  const handleSectionToggle = useCallback((sectionId: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.type === 'section' && item.data.id === sectionId) {
          return {
            ...item,
            data: { ...item.data, isExpanded: !item.data.isExpanded },
          };
        }
        return item;
      })
    );
  }, []);

  /**
   * Handle Section Rename
   */
  const handleSectionRename = useCallback((sectionId: string, newName: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.type === 'section' && item.data.id === sectionId) {
          return {
            ...item,
            data: { ...item.data, name: newName },
          };
        }
        return item;
      })
    );
  }, []);

  /**
   * Handle Section Delete
   */
  const handleSectionDelete = useCallback((sectionId: string) => {
    setItems((prev) =>
      prev.filter((item) => !(item.type === 'section' && item.data.id === sectionId))
    );
  }, []);

  /**
   * Handle Standalone Field Delete
   */
  const handleFieldDelete = useCallback((fieldId: string) => {
    setItems((prev) =>
      prev.filter((item) => !(item.type === 'field' && item.data.id === fieldId))
    );
  }, []);

  /**
   * Handle Section Reorder
   */
  const handleSectionReorder = useCallback((sectionId: string, newIndex: number) => {
    setItems((prev) => {
      const updated = [...prev];
      const oldIndex = updated.findIndex(
        (item) => item.type === 'section' && item.data.id === sectionId
      );

      if (oldIndex !== -1) {
        const [item] = updated.splice(oldIndex, 1);
        updated.splice(newIndex, 0, item);

        // Update order property for sections
        return updated.map((item, idx) => {
          if (item.type === 'section') {
            return {
              ...item,
              data: { ...item.data, order: idx },
            };
          }
          return item;
        });
      }

      return updated;
    });
  }, []);

  /**
   * Handle Field Label Change
   */
  const handleFieldLabelChange = useCallback((fieldId: string, newLabel: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.type === 'section') {
          return {
            ...item,
            data: {
              ...item.data,
              fields: item.data.fields.map((field) =>
                field.id === fieldId ? { ...field, label: newLabel } : field
              ),
            },
          };
        } else if (item.type === 'field' && item.data.id === fieldId) {
          // Handle standalone field label change
          return {
            ...item,
            data: { ...item.data, label: newLabel },
          };
        }
        return item;
      })
    );
  }, []);

  /**
   * Handle Field Edit
   */
  const handleFieldEdit = useCallback((fieldId: string) => {
    setSelectedFieldId(fieldId);
    // In a complete implementation, this would open a configuration drawer
  }, []);

  /**
   * Handle Field Menu Click
   */
  const handleFieldMenuClick = useCallback((fieldId: string) => {
    // In a complete implementation, this would show a context menu
    console.log('Field menu clicked:', fieldId);
  }, []);

  /**
   * Handle Field Select
   * Sets the currently selected field for configuration
   */
  const handleFieldSelect = useCallback((fieldId: string | null) => {
    setSelectedFieldId(fieldId);
  }, []);

  /**
   * Handle Field Update
   * Updates specific properties of a field
   */
  const handleFieldUpdate = useCallback((fieldId: string, updates: Partial<FieldData>) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.type === 'section') {
          return {
            ...item,
            data: {
              ...item.data,
              fields: item.data.fields.map((field) =>
                field.id === fieldId ? { ...field, ...updates } : field
              ),
            },
          };
        } else if (item.type === 'field' && item.data.id === fieldId) {
          // Handle standalone field update
          return {
            ...item,
            data: { ...item.data, ...updates },
          };
        }
        return item;
      })
    );
  }, []);

  /**
   * Handle Lock Data Type
   * Mock async function to lock the data type after confirmation
   */
  const handleLockDataType = useCallback(async (fieldId: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Update field with dataTypeLocked flag
    handleFieldUpdate(fieldId, { dataTypeLocked: true });

    console.log('Mock API: Data type locked for field:', fieldId);
  }, [handleFieldUpdate]);

  /**
   * Handle Field Reorder
   */
  const handleFieldReorder = useCallback(
    (fieldId: string, sourceSectionId: string, targetSectionId: string, newIndex: number) => {
      setItems((prev) => {
        const updated = [...prev];

        const sourceSectionIndex = updated.findIndex(
          (item) => item.type === 'section' && item.data.id === sourceSectionId
        );
        const targetSectionIndex = updated.findIndex(
          (item) => item.type === 'section' && item.data.id === targetSectionId
        );

        if (sourceSectionIndex === -1 || targetSectionIndex === -1) return prev;

        const sourceItem = updated[sourceSectionIndex];
        const targetItem = updated[targetSectionIndex];

        if (sourceItem.type !== 'section' || targetItem.type !== 'section') return prev;

        const sourceSection = sourceItem.data;
        const targetSection = targetItem.data;

        const fieldIndex = sourceSection.fields.findIndex((f) => f.id === fieldId);
        if (fieldIndex === -1) return prev;

        const [field] = sourceSection.fields.splice(fieldIndex, 1);

        if (newIndex === -1) {
          targetSection.fields.push(field);
        } else {
          targetSection.fields.splice(newIndex, 0, field);
        }

        return updated;
      });
    },
    []
  );

  /**
   * Handle moving field from section to standalone at specific index
   * Or reordering standalone fields
   */
  const handleFieldMoveToStandalone = useCallback(
    (fieldId: string, sourceSectionId: string | null, targetIndex: number) => {
      setItems((prev) => {
        let updated = [...prev];

        if (sourceSectionId) {
          // Moving from section to standalone
          const sourceSectionIndex = updated.findIndex(
            (item) => item.type === 'section' && item.data.id === sourceSectionId
          );

          if (sourceSectionIndex === -1) return prev;

          const sourceItem = updated[sourceSectionIndex];
          if (sourceItem.type !== 'section') return prev;

          const sourceSection = sourceItem.data;

          // Find field in source section
          const fieldIndex = sourceSection.fields.findIndex((f) => f.id === fieldId);
          if (fieldIndex === -1) return prev;

          const field = sourceSection.fields[fieldIndex];

          // Create new section with field removed (immutable)
          const newFields = [...sourceSection.fields];
          newFields.splice(fieldIndex, 1);

          updated[sourceSectionIndex] = {
            ...sourceItem,
            data: {
              ...sourceSection,
              fields: newFields,
            },
          };

          // Insert as standalone field at target index
          updated.splice(targetIndex, 0, { type: 'field', data: field });
        } else {
          // Moving from standalone to standalone (reordering)
          const sourceIndex = updated.findIndex(
            (item) => item.type === 'field' && item.data.id === fieldId
          );

          if (sourceIndex === -1) return prev;

          // Remove from current position
          const [field] = updated.splice(sourceIndex, 1);

          // Adjust target index if moving down
          const adjustedIndex = sourceIndex < targetIndex ? targetIndex - 1 : targetIndex;

          // Insert at new position
          updated.splice(adjustedIndex, 0, field);
        }

        return updated;
      });
    },
    []
  );

  /**
   * Handle moving standalone field into a section
   */
  const handleStandaloneFieldToSection = useCallback(
    (fieldId: string, targetSectionId: string, targetIndex: number) => {
      setItems((prev) => {
        const updated = [...prev];

        // Find standalone field FIRST
        const sourceIndex = updated.findIndex(
          (item) => item.type === 'field' && item.data.id === fieldId
        );

        if (sourceIndex === -1) return prev;

        const sourceItem = updated[sourceIndex];
        if (sourceItem.type !== 'field') return prev;

        const field = sourceItem.data;

        // Find target section index (BEFORE removing field, to keep indices correct)
        const targetSectionIndex = updated.findIndex(
          (item) => item.type === 'section' && item.data.id === targetSectionId
        );

        if (targetSectionIndex === -1) return prev;

        const targetItem = updated[targetSectionIndex];
        if (targetItem.type !== 'section') return prev;

        // Remove standalone field from items array
        updated.splice(sourceIndex, 1);

        // Adjust target section index if it shifted due to removal
        const adjustedTargetIndex = sourceIndex < targetSectionIndex
          ? targetSectionIndex - 1
          : targetSectionIndex;

        // Get target section (with potentially adjusted index)
        const finalTargetItem = updated[adjustedTargetIndex];
        if (finalTargetItem.type !== 'section') return prev;

        // Create new section with updated fields
        const newFields = [...finalTargetItem.data.fields];
        if (targetIndex === -1) {
          newFields.push(field);
        } else {
          newFields.splice(targetIndex, 0, field);
        }

        // Update the section immutably
        updated[adjustedTargetIndex] = {
          ...finalTargetItem,
          data: {
            ...finalTargetItem.data,
            fields: newFields,
          },
        };

        return updated;
      });
    },
    []
  );

  /**
   * Handle Add Field (from section add button)
   */
  const handleAddField = useCallback((sectionId: string) => {
    handleInsertField({
      sectionId,
      fieldIndex: -1, // Append to end
    });
  }, [handleInsertField]);

  /**
   * Handle Save
   */
  const handleSave = useCallback(() => {
    if (onSave) {
      // Convert items back to sections format for backward compatibility
      const sections = items
        .filter((item) => item.type === 'section')
        .map((item) => item.data as SectionData);
      onSave(sections);
    }
  }, [items, onSave]);

  /**
   * Handle Cancel
   */
  const handleCancel = useCallback(() => {
    if (onCancel) {
      onCancel();
    }
  }, [onCancel]);

  // Create context value
  const contextValue = {
    items,
    selectedFieldId,
    onSectionToggle: handleSectionToggle,
    onSectionRename: handleSectionRename,
    onSectionDelete: handleSectionDelete,
    onSectionReorder: handleSectionReorder,
    onFieldLabelChange: handleFieldLabelChange,
    onFieldEdit: handleFieldEdit,
    onFieldMenuClick: handleFieldMenuClick,
    onFieldDelete: handleFieldDelete,
    onFieldReorder: handleFieldReorder,
    onFieldSelect: handleFieldSelect,
    onFieldUpdate: handleFieldUpdate,
    onAddField: handleAddField,
    onInsertSection: handleInsertSection,
    onInsertStandaloneField: handleInsertStandaloneField,
    onLockDataType: handleLockDataType,
  };

  return (
    <FormBuilderProvider value={contextValue}>
      <FormBuilderContainer>
      <MainContent>
        {/* Toolbar */}
        <ToolbarContainer>
          <Typography variant="h5" fontWeight={600}>
            Form Builder
          </Typography>
          <ToolbarActions>
            <ToolbarButton
              variant="outlined"
              startIcon={<PhoneAndroidIcon />}
              onClick={() => setShowMobilePreview(!showMobilePreview)}
            >
              {showMobilePreview ? 'Hide' : 'Show'} Mobile Preview
            </ToolbarButton>
            <ToolbarButton
              variant="outlined"
              startIcon={<CancelIcon />}
              onClick={handleCancel}
            >
              Cancel
            </ToolbarButton>
            <ToolbarButton
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSave}
            >
              Save Form
            </ToolbarButton>
          </ToolbarActions>
        </ToolbarContainer>

        {/* Form Canvas */}
        <FormCanvas>
          {items.length === 0 ? (
            <EmptyStateContainer>
              <EmptyStateIconWrapper>
                <ViewStreamIcon />
              </EmptyStateIconWrapper>
              <Typography variant="h6" gutterBottom>
                No sections yet
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Create your first section to start building your form
              </Typography>
              <AddSectionButton
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => handleInsertSection({ sectionIndex: 0 })}
              >
                Add Section
              </AddSectionButton>
            </EmptyStateContainer>
          ) : (
            <>
              {/* Section List */}
              <SectionList
                items={items}
                onSectionToggle={handleSectionToggle}
                onSectionRename={handleSectionRename}
                onSectionDelete={handleSectionDelete}
                onSectionReorder={handleSectionReorder}
                onFieldLabelChange={handleFieldLabelChange}
                onFieldEdit={handleFieldEdit}
                onFieldMenuClick={handleFieldMenuClick}
                onFieldDelete={handleFieldDelete}
                onFieldReorder={handleFieldReorder}
                onFieldMoveToStandalone={handleFieldMoveToStandalone}
                onStandaloneFieldToSection={handleStandaloneFieldToSection}
                onAddField={handleAddField}
                onInsertField={handleInsertField}
                onInsertSection={handleInsertSection}
                onInsertStandaloneField={handleInsertStandaloneField}
              />

              {/* Insertion Overlay - DISABLED: Using InlineInsertionZones instead */}
              {/* <InsertionOverlay
                items={items}
                isEnabled={isInsertionEnabled}
                onInsertField={handleInsertField}
                onInsertSection={handleInsertSection}
              /> */}
            </>
          )}
        </FormCanvas>
      </MainContent>

      {/* Mobile Preview */}
      {showMobilePreview && <MobilePreview items={items} />}

      {/* Field Configuration Drawer */}
      {selectedFieldId && (
        <FieldConfiguration
          fieldId={selectedFieldId}
          onClose={() => handleFieldSelect(null)}
        />
      )}
    </FormBuilderContainer>
    </FormBuilderProvider>
  );
};
