/**
 * FormBuilder Component - Version 4
 *
 * VERSION INFO:
 * - Version: 4
 * - Created: 2025-10-30
 * - Major Change: Migrated from dnd-kit to hello-pangea/dnd
 * - Base: Version 3 (dnd-kit) → Version 4 (hello-pangea/dnd)
 *
 * KEY CHANGES FROM V3:
 * - DragDropContext from hello-pangea/dnd wraps entire app
 * - SectionList and FieldList use Droppable/Draggable components
 * - Render function pattern for drag state snapshots
 * - Simpler API, better accessibility, automatic animations
 * - onDragEnd handler with DropResult structure
 *
 * SAME AS V3:
 * - Data structure (nested FieldData with children)
 * - State management patterns
 * - Component hierarchy
 * - UX and visual design
 * - All insertion patterns and UI
 *
 * COMPONENT PURPOSE:
 * Main form builder interface integrating all sub-components with the
 * drag-drop functionality using hello-pangea/dnd. Manages form state,
 * coordinates drag-drop, and provides real-time mobile preview.
 */

'use client';

import React, { useState, useCallback } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { SectionList } from './SectionList';
import { MobilePreview } from './MobilePreview';
import { FieldConfiguration } from '@/features/FieldConfiguration';
import { FormBuilderProps, FieldData, InsertionPosition } from './types';
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
import { migrateSectionsToItems, createSectionField, createRegularField } from './utils/migration';

// Default sections with specified fields
const defaultSections = [
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
  initialItems,
  onSave,
  onCancel,
  showMobilePreview: initialShowMobilePreview = true,
}) => {
  // Convert legacy initialSections to new format, or use initialItems directly
  const getInitialItems = (): FieldData[] => {
    if (initialItems) {
      return initialItems;
    }
    return migrateSectionsToItems(initialSections);
  };

  const [items, setItems] = useState<FieldData[]>(getInitialItems());
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [showMobilePreview, setShowMobilePreview] = useState(initialShowMobilePreview);

  // Helper: Find field in nested structure
  const findFieldById = (fieldId: string): FieldData | null => {
    for (const item of items) {
      if (item.id === fieldId) return item;
      if (item.type === 'SECTION' && item.children) {
        const found = item.children.find((f) => f.id === fieldId);
        if (found) return found;
      }
    }
    return null;
  };

  // Helper: Find parent section of a field
  const findParentSectionId = (fieldId: string): string | null => {
    for (const item of items) {
      if (item.type === 'SECTION' && item.children) {
        if (item.children.some((f) => f.id === fieldId)) {
          return item.id;
        }
      }
    }
    return null;
  };

  /**
   * Drag End Handler - hello-pangea/dnd pattern
   *
   * Determines drag type from draggableId format:
   * - Sections: draggableId = "section-${id}"
   * - Fields: draggableId = "field:${sectionId}:${id}" or "field:standalone:${id}"
   */
  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return; // Dropped outside droppable
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return; // Dropped in same position
    }

    // Determine drag type from draggableId format
    const isSection = draggableId.startsWith('section-');
    const isField = draggableId.startsWith('field:');

    console.log('🔴 DRAG END:', {
      draggableId,
      dragType: isSection ? 'SECTION' : isField ? 'FIELD' : 'UNKNOWN',
      source: source.droppableId,
      sourceIndex: source.index,
      dest: destination.droppableId,
      destIndex: destination.index,
    });

    // Validate drop targets
    if (isSection) {
      // Sections can only drop in sections-droppable
      if (destination.droppableId !== 'sections-droppable') {
        console.log('❌ Invalid drop: Section dropped outside sections-droppable');
        return;
      }
      handleSectionMove(source.index, destination.index);
    } else if (isField) {
      // Fields can only drop in field droppables (fields-droppable-* or standalone-fields-droppable)
      const isValidFieldDrop =
        destination.droppableId.startsWith('fields-droppable-') ||
        destination.droppableId === 'standalone-fields-droppable';

      if (!isValidFieldDrop) {
        console.log('❌ Invalid drop: Field dropped in invalid zone');
        return;
      }
      handleFieldMove(draggableId, source, destination);
    }
  };

  /**
   * Move section to new position
   */
  const handleSectionMove = (fromIndex: number, toIndex: number) => {
    setItems((prev) => {
      const updated = [...prev];
      const [section] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, section);
      return updated;
    });
  };

  /**
   * Move field between positions
   * Source/destination can be different sections or standalone
   * draggableId format: field:sectionId:fieldId or field:standalone:fieldId
   */
  const handleFieldMove = (draggableId: string, source: any, destination: any) => {
    // Extract actual field ID from draggableId (format: field:sectionId:fieldId or field:standalone:fieldId)
    const parts = draggableId.split(':');
    if (parts.length < 3 || parts[0] !== 'field') {
      return; // Invalid format
    }

    const fieldId = parts[parts.length - 1]; // Last part is always the field ID

    const isSourceStandalone = source.droppableId === 'standalone-fields-droppable';
    const isDestStandalone = destination.droppableId === 'standalone-fields-droppable';
    const sourceSectionId = isSourceStandalone ? null : source.droppableId.replace('fields-droppable-', '');
    const destSectionId = isDestStandalone ? null : destination.droppableId.replace('fields-droppable-', '');

    // Find the field
    const field = findFieldById(fieldId);
    if (!field || field.type === 'SECTION') return;

    setItems((prev) => {
      let updated = [...prev];

      // Remove field from source
      if (sourceSectionId) {
        // Remove from section's children
        updated = updated.map((item) => {
          if (item.id === sourceSectionId && item.type === 'SECTION' && item.children) {
            return {
              ...item,
              children: item.children.filter((f) => f.id !== fieldId),
            };
          }
          return item;
        });
      } else {
        // Remove from standalone
        updated = updated.filter((f) => f.id !== fieldId);
      }

      // Add field to destination
      if (destSectionId) {
        // Add to section's children
        updated = updated.map((item) => {
          if (item.id === destSectionId && item.type === 'SECTION') {
            const children = item.children || [];
            const newChildren = [...children];
            newChildren.splice(destination.index, 0, field);
            return { ...item, children: newChildren };
          }
          return item;
        });
      } else {
        // Add to standalone
        updated.splice(destination.index, 0, field);
      }

      return updated;
    });
  };

  /**
   * Insert standalone field
   */
  const handleInsertStandaloneField = useCallback((position: InsertionPosition) => {
    const newField = createRegularField('New Field', DataTypes.STRING, false);
    setItems((prev) => {
      const updated = [...prev];
      const index = position.sectionIndex ?? 0;
      updated.splice(index, 0, newField);
      return updated;
    });
    setSelectedFieldId(newField.id);
  }, []);

  /**
   * Insert field into section
   */
  const handleInsertField = useCallback((position: InsertionPosition) => {
    const newField = createRegularField('New Field', DataTypes.STRING, false);
    setItems((prev) => {
      const updated = [...prev];
      if (position.sectionId !== undefined) {
        const sectionIndex = updated.findIndex((item) => item.id === position.sectionId && item.type === 'SECTION');
        if (sectionIndex !== -1) {
          const section = updated[sectionIndex];
          const children = section.children ?? [];
          if (position.fieldIndex === -1) {
            children.push(newField);
          } else {
            children.splice(position.fieldIndex ?? 0, 0, newField);
          }
          updated[sectionIndex] = { ...section, children };
        }
      }
      return updated;
    });
    setSelectedFieldId(newField.id);
  }, []);

  /**
   * Insert section
   */
  const handleInsertSection = useCallback((position: InsertionPosition, withField: boolean = false) => {
    const children = withField ? [createRegularField('New Field', DataTypes.STRING, false)] : [];
    const newSection = createSectionField('New Section', false, children);
    setItems((prev) => {
      const updated = [...prev];
      const index = position.sectionIndex ?? updated.length;
      if (index === -1 || index >= updated.length) {
        updated.push(newSection);
      } else {
        updated.splice(index, 0, newSection);
      }
      return updated;
    });
  }, []);

  /**
   * Toggle section expanded state
   */
  const handleSectionToggle = useCallback((sectionId: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === sectionId && item.type === 'SECTION') {
          return { ...item, isExpanded: !item.isExpanded };
        }
        return item;
      })
    );
  }, []);

  /**
   * Rename section or field
   */
  const handleSectionRename = useCallback((sectionId: string, newLabel: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === sectionId && item.type === 'SECTION') {
          return { ...item, label: newLabel };
        }
        return item;
      })
    );
  }, []);

  /**
   * Delete section
   */
  const handleSectionDelete = useCallback((sectionId: string) => {
    setItems((prev) => prev.filter((item) => !(item.id === sectionId && item.type === 'SECTION')));
  }, []);

  /**
   * Delete field (standalone or in section)
   */
  const handleFieldDelete = useCallback((fieldId: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.type === 'SECTION' && item.children) {
          return { ...item, children: item.children.filter((f) => f.id !== fieldId) };
        }
        return item;
      }).filter((item) => !(item.id === fieldId && item.type !== 'SECTION'))
    );
  }, []);

  /**
   * Update field label
   */
  const handleFieldLabelChange = useCallback((fieldId: string, newLabel: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === fieldId) {
          return { ...item, label: newLabel };
        }
        if (item.type === 'SECTION' && item.children) {
          return {
            ...item,
            children: item.children.map((f) => (f.id === fieldId ? { ...f, label: newLabel } : f)),
          };
        }
        return item;
      })
    );
  }, []);

  // Other handlers (same as v3)
  const handleFieldEdit = useCallback((fieldId: string) => {
    setSelectedFieldId(fieldId);
  }, []);

  const handleFieldMenuClick = useCallback((fieldId: string) => {
    console.log('Field menu clicked:', fieldId);
  }, []);

  const handleFieldSelect = useCallback((fieldId: string | null) => {
    setSelectedFieldId(fieldId);
  }, []);

  const handleFieldUpdate = useCallback((fieldId: string, updates: Partial<FieldData>) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === fieldId) {
          return { ...item, ...updates };
        }
        if (item.type === 'SECTION' && item.children) {
          return {
            ...item,
            children: item.children.map((f) => (f.id === fieldId ? { ...f, ...updates } : f)),
          };
        }
        return item;
      })
    );
  }, []);

  const handleLockDataType = useCallback(async (fieldId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    handleFieldUpdate(fieldId, { dataTypeLocked: true });
  }, [handleFieldUpdate]);

  const handleAddField = useCallback((sectionId: string) => {
    handleInsertField({ sectionId, fieldIndex: -1 });
  }, [handleInsertField]);

  const handleSave = useCallback(() => {
    if (onSave) {
      onSave(items);
    }
  }, [items, onSave]);

  const handleCancel = useCallback(() => {
    if (onCancel) {
      onCancel();
    }
  }, [onCancel]);

  // Context value
  const contextValue = {
    items,
    selectedFieldId,
    onSectionToggle: handleSectionToggle,
    onSectionRename: handleSectionRename,
    onSectionDelete: handleSectionDelete,
    onFieldLabelChange: handleFieldLabelChange,
    onFieldEdit: handleFieldEdit,
    onFieldMenuClick: handleFieldMenuClick,
    onFieldDelete: handleFieldDelete,
    onFieldSelect: handleFieldSelect,
    onFieldUpdate: handleFieldUpdate,
    onAddField: handleAddField,
    onInsertField: handleInsertField,
    onInsertSection: handleInsertSection,
    onInsertStandaloneField: handleInsertStandaloneField,
    onLockDataType: handleLockDataType,
  };

  return (
    <FormBuilderProvider value={contextValue}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <FormBuilderContainer>
          <MainContent>
            {/* Toolbar */}
            <ToolbarContainer>
              <Typography variant="h5" fontWeight={600}>
                Form Builder v4 (hello-pangea/dnd)
              </Typography>
              <ToolbarActions>
                <ToolbarButton
                  variant="outlined"
                  startIcon={<PhoneAndroidIcon />}
                  onClick={() => setShowMobilePreview(!showMobilePreview)}
                >
                  {showMobilePreview ? 'Hide' : 'Show'} Mobile Preview
                </ToolbarButton>
                <ToolbarButton variant="outlined" startIcon={<CancelIcon />} onClick={handleCancel}>
                  Cancel
                </ToolbarButton>
                <ToolbarButton variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSave}>
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
                <SectionList items={items} />
              )}
            </FormCanvas>
          </MainContent>

          {/* Mobile Preview */}
          {showMobilePreview && <MobilePreview items={items} />}

          {/* Field Configuration Drawer */}
          {selectedFieldId && <FieldConfiguration fieldId={selectedFieldId} onClose={() => handleFieldSelect(null)} />}
        </FormBuilderContainer>
      </DragDropContext>
    </FormBuilderProvider>
  );
};
