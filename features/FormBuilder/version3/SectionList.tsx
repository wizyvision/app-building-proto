/**
 * SectionList Component - Version 3
 *
 * COMPONENT PURPOSE:
 * Renders the list of sections using Section v3 components.
 * Manages drag-and-drop context for section reordering and field management.
 * Wraps existing Section components without modification.
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Familiar drag-and-drop pattern for reordering. Users expect
 *   to grab items and move them around, matching patterns from file managers,
 *   email clients, and other standard interfaces.
 *
 * - Miller's Law: Groups related fields within sections (typically 5-7 fields).
 *   Section organization helps chunk information into manageable units.
 *
 * - Visual Hierarchy: Sections provide clear visual grouping with elevation
 *   and spacing, making form structure immediately apparent.
 *
 * - Progressive Disclosure: Collapsed sections hide complexity. Users can
 *   expand only what they need, reducing cognitive load.
 *
 * TECHNICAL ARCHITECTURE:
 * - Uses dnd-kit for drag-and-drop functionality
 * - Section v3 components used without modification
 * - Field v5 components passed as children
 * - State management handled by parent FormBuilder
 *
 * DRAG-AND-DROP BEHAVIOR:
 * - Sections can be reordered by dragging
 * - Fields can be moved within sections
 * - Fields can be moved between sections
 * - Visual feedback during drag operations
 * - Smooth animations for state transitions
 *
 * INTERACTIONS:
 * - Drag section: Reorder sections in the form
 * - Toggle section: Expand/collapse section content
 * - Edit section name: Inline editing with TextField
 * - Delete section: Remove non-system sections
 * - Add field: Opens field configuration drawer
 */

'use client';

import React from 'react';
import { Box } from '@mui/material';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Section } from '@/components/Section/version3';
import { Field } from '@/components/Field/version5/Field';
import { FieldList } from './FieldList';
import { InlineInsertionZone } from './InlineInsertionZone';
import { DropIndicator } from './DropIndicator';
import { FieldDropZone } from './FieldDropZone';
import { SectionListProps, FormItem } from './types';
import {
  SectionsContainer,
  StandaloneFieldContainer,
  SectionItemWrapper,
  DropIndicatorWrapper,
  DragOverlaySectionPreview,
  DragOverlayFieldPreview,
  DragOverlayFieldContent,
  DragOverlayFieldType,
} from './styles';
import { useDragDropState } from './hooks/useDragDropState';
import { convertToFormFieldsFieldData } from './utils/typeConversion';

export const SectionList: React.FC<SectionListProps> = ({
  items,
  onSectionToggle,
  onSectionRename,
  onSectionDelete,
  onSectionReorder,
  onFieldLabelChange,
  onFieldEdit,
  onFieldMenuClick,
  onFieldDelete,
  onFieldReorder,
  onFieldMoveToStandalone,
  onStandaloneFieldToSection,
  onAddField,
  onInsertField,
  onInsertSection,
  onInsertStandaloneField,
}) => {
  // Use custom hook for drag-drop state management
  const { dragState, handleDragStart, handleDragOver, resetDragState } = useDragDropState();
  const { activeId, overId, isDraggingSection, isDraggingField } = dragState;

  // Extract sections for drag-drop context
  const sections = items
    .filter((item) => item.type === 'section')
    .map((item) => item.data);

  // Extract standalone fields
  const standaloneFields = items
    .filter((item) => item.type === 'field')
    .map((item) => item.data);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement required to start drag (prevents accidental drags)
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    console.log('🔴 DRAG END', {
      activeId: active.id,
      overId: over?.id,
      activeData: active.data.current,
      overData: over?.data.current
    });

    if (!over) {
      resetDragState();
      return;
    }

    const activeData = active.data.current;
    const overData = over.data.current;

    // SECTION DRAGGING
    if (activeData?.type === 'section') {
      if (overData?.type === 'section') {
        const oldIndex = sections.findIndex((s) => s.id === active.id);
        const newIndex = sections.findIndex((s) => s.id === over.id);
        if (oldIndex !== newIndex) {
          onSectionReorder(active.id as string, newIndex);
        }
      } else if (overData?.type === 'section-drop-indicator') {
        onSectionReorder(active.id as string, overData.index);
      }
      resetDragState();
      return;
    }

    // FIELD DRAGGING
    if (activeData?.type === 'field') {
      const fieldId = active.id as string;
      const isSourceStandalone = !activeData.sectionId;

      // PRIORITY 1: Field-drop zones (highest specificity)
      if (overData?.type === 'field-drop') {
        const { sectionId: targetSectionId, index: targetIndex } = overData;

        if (targetSectionId === 'standalone') {
          // Drop in standalone area
          onFieldMoveToStandalone(fieldId, activeData.sectionId || null, targetIndex);
        } else if (isSourceStandalone) {
          // Standalone → Section
          onStandaloneFieldToSection(fieldId, targetSectionId, targetIndex);
        } else {
          // Section → Section
          onFieldReorder(fieldId, activeData.sectionId, targetSectionId, targetIndex);
        }
        resetDragState();
        return;
      }

      // PRIORITY 2: Dropped directly on another field
      if (overData?.type === 'field') {
        const targetSectionId = overData.sectionId;
        const isTargetStandalone = !targetSectionId;

        if (isTargetStandalone) {
          // Target is standalone
          const targetIndex = items.findIndex((item) => item.type === 'field' && item.data.id === over.id);
          onFieldMoveToStandalone(fieldId, activeData.sectionId || null, targetIndex);
        } else {
          // Target is in section
          const targetSection = sections.find((s) => s.id === targetSectionId);
          if (targetSection) {
            const targetIndex = targetSection.fields.findIndex((f) => f.id === over.id);
            if (isSourceStandalone) {
              onStandaloneFieldToSection(fieldId, targetSectionId, targetIndex);
            } else {
              onFieldReorder(fieldId, activeData.sectionId, targetSectionId, targetIndex);
            }
          }
        }
        resetDragState();
        return;
      }

      // PRIORITY 3: Dropped on collapsed section
      if (overData?.type === 'section-drop') {
        const targetSectionId = overData.sectionId;

        if (isSourceStandalone) {
          onStandaloneFieldToSection(fieldId, targetSectionId, -1);
        } else {
          onFieldReorder(fieldId, activeData.sectionId, targetSectionId, -1);
        }
        resetDragState();
        return;
      }
    }

    resetDragState();
  };

  const sectionIds = sections.map((s) => s.id);
  const standaloneFieldIds = standaloneFields.map((f) => f.id);
  // Combine section IDs and standalone field IDs for sortable context
  const allSortableIds = [...sectionIds, ...standaloneFieldIds];

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={resetDragState}
    >
      <SortableContext items={allSortableIds} strategy={verticalListSortingStrategy}>
        <SectionsContainer>
          {/* Insertion zone / Drop zone at the beginning */}
          {isDraggingField ? (
            // Show drop zone when dragging field
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ minWidth: '500px', maxWidth: '700px', width: '100%' }}>
                <FieldDropZone
                  id="standalone-drop-0"
                  sectionId="standalone"
                  index={0}
                  isFieldDragging={true}
                />
              </Box>
            </Box>
          ) : !isDraggingSection && (
            <InlineInsertionZone
              showFieldButton
              showSectionButton
              onInsertField={() => onInsertStandaloneField({ sectionIndex: 0 })}
              onInsertSection={() => onInsertSection({ sectionIndex: 0 })}
              spacing="section"
              popoverPosition="below"
            />
          )}

          {items.flatMap((item, itemIndex) => {
            const elements: JSX.Element[] = [];

            if (item.type === 'section') {
              const section = item.data;
              const isSectionDragging = activeId === section.id && isDraggingSection;
              const isSectionOver = overId === section.id;

              // Determine if we should show drop indicator above or below this section
              // Use itemIndex (visual position) instead of sections array index
              const activeItemIndex = items.findIndex(i => i.type === 'section' && i.data.id === activeId);
              const overItemIndex = items.findIndex(i => i.type === 'section' && i.data.id === overId);

              let showIndicatorAbove = false;
              let showIndicatorBelow = false;

              if (isDraggingSection && !isSectionDragging && isSectionOver) {
                // This is the section being hovered over
                if (activeItemIndex !== -1 && overItemIndex !== -1 && activeItemIndex !== overItemIndex) {
                  if (activeItemIndex < overItemIndex) {
                    // Dragging down: show indicator below
                    showIndicatorBelow = true;
                  } else {
                    // Dragging up: show indicator above
                    showIndicatorAbove = true;
                  }
                }
              }

              elements.push(
                <Box key={section.id} sx={{ position: 'relative', width: '100%' }}>
                  {showIndicatorAbove && (
                    <Box sx={{
                      position: 'absolute',
                      top: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '100%',
                      maxWidth: '700px',
                      minWidth: '500px',
                      zIndex: 100,
                    }}>
                      <DropIndicator isOver={true} type="section" />
                    </Box>
                  )}
                  <Section
                    id={section.id}
                    name={section.name}
                    isExpanded={section.isExpanded}
                    fieldCount={section.fields.length}
                    isSystem={section.isSystem}
                    isAnySectionDragging={isDraggingSection}
                    onToggle={() => onSectionToggle(section.id)}
                    onRename={(newName) => onSectionRename(section.id, newName)}
                    onDelete={section.isSystem ? undefined : () => onSectionDelete(section.id)}
                  >
                    <FieldList
                      sectionId={section.id}
                      fields={section.fields}
                      isExpanded={section.isExpanded}
                      isFieldDragging={isDraggingField}
                      onFieldLabelChange={onFieldLabelChange}
                      onFieldEdit={onFieldEdit}
                      onFieldMenuClick={onFieldMenuClick}
                      onFieldReorder={(fieldId, newIndex) =>
                        onFieldReorder(fieldId, section.id, section.id, newIndex)
                      }
                      onAddField={() => onAddField(section.id)}
                      onInsertField={(index) => {
                        // Insert field at specific index in section
                        onInsertField({
                          sectionId: section.id,
                          fieldIndex: index,
                        });
                      }}
                      onAddSection={() => onInsertSection({ sectionIndex: itemIndex + 1 })}
                    />
                  </Section>
                  {showIndicatorBelow && (
                    <Box sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '100%',
                      maxWidth: '700px',
                      minWidth: '500px',
                      zIndex: 100,
                    }}>
                      <DropIndicator isOver={true} type="section" />
                    </Box>
                  )}
                </Box>
              );

              // Add insertion zone OR drop zone after section
              if (itemIndex < items.length - 1) {
                if (isDraggingField) {
                  // Show drop zone when dragging field (allows dropping to standalone area between sections)
                  elements.push(
                    <Box key={`drop-after-${section.id}`} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                      <Box sx={{ minWidth: '500px', maxWidth: '700px', width: '100%' }}>
                        <FieldDropZone
                          id={`standalone-drop-after-section-${section.id}`}
                          sectionId="standalone"
                          index={itemIndex + 1}
                          isFieldDragging={true}
                        />
                      </Box>
                    </Box>
                  );
                } else if (!isDraggingSection) {
                  // Show insertion zone when not dragging
                  elements.push(
                    <InlineInsertionZone
                      key={`insertion-after-${section.id}`}
                      showFieldButton
                      showSectionButton
                      onInsertField={() => onInsertStandaloneField({ sectionIndex: itemIndex + 1 })}
                      onInsertSection={() => onInsertSection({ sectionIndex: itemIndex + 1 })}
                      spacing="section"
                    />
                  );
                }
              }

              return elements;
            } else if (item.type === 'field') {
              // Render standalone field with drop zones
              const field = item.data;
              const isThisFieldBeingDragged = activeId === field.id && isDraggingField;

              // Drop zone before this standalone field (when dragging)
              // Skip if this is the field being dragged (avoid double drop zones)
              if (isDraggingField && itemIndex > 0 && !isThisFieldBeingDragged) {
                elements.push(
                  <Box key={`drop-before-${field.id}`} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ minWidth: '500px', maxWidth: '700px', width: '100%' }}>
                      <FieldDropZone
                        id={`standalone-drop-before-${field.id}`}
                        sectionId="standalone"
                        index={itemIndex}
                        isFieldDragging={true}
                      />
                    </Box>
                  </Box>
                );
              }

              elements.push(
                <StandaloneFieldContainer key={field.id}>
                  <Field
                    id={field.id}
                    label={field.label}
                    type={field.type}
                    isSystemField={field.isSystemField}
                    isRequired={field.isRequired}
                    sectionId={undefined} // Standalone field - no section
                    fieldData={convertToFormFieldsFieldData(field)}
                    onLabelChange={(newLabel) => onFieldLabelChange(field.id, newLabel)}
                    onEdit={() => onFieldEdit(field.id)}
                    onMenuClick={() => onFieldMenuClick(field.id)}
                  />
                </StandaloneFieldContainer>
              );

              // Add insertion zone or drop zone after standalone field
              // Skip if this is the field being dragged (avoid double drop zones)
              if (itemIndex < items.length - 1) {
                if (isDraggingField && !isThisFieldBeingDragged) {
                  elements.push(
                    <Box key={`drop-after-${field.id}`} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                      <Box sx={{ minWidth: '500px', maxWidth: '700px', width: '100%' }}>
                        <FieldDropZone
                          id={`standalone-drop-after-${field.id}`}
                          sectionId="standalone"
                          index={itemIndex + 1}
                          isFieldDragging={true}
                        />
                      </Box>
                    </Box>
                  );
                } else if (!isDraggingSection) {
                  elements.push(
                    <InlineInsertionZone
                      key={`insertion-after-${field.id}`}
                      showFieldButton
                      showSectionButton
                      onInsertField={() => onInsertStandaloneField({ sectionIndex: itemIndex + 1 })}
                      onInsertSection={() => onInsertSection({ sectionIndex: itemIndex + 1 })}
                      spacing="section"
                    />
                  );
                }
              }

              return elements;
            }

            return [];
          })}

          {/* Insertion zone / Drop zone after the last item */}
          {items.length > 0 && (
            isDraggingField ? (
              // Show drop zone when dragging field
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ minWidth: '500px', maxWidth: '700px', width: '100%' }}>
                  <FieldDropZone
                    id={`standalone-drop-${items.length}`}
                    sectionId="standalone"
                    index={items.length}
                    isFieldDragging={true}
                  />
                </Box>
              </Box>
            ) : !isDraggingSection && (
              <InlineInsertionZone
                showFieldButton
                showSectionButton
                onInsertField={() => onInsertStandaloneField({ sectionIndex: items.length })}
                onInsertSection={() => onInsertSection({ sectionIndex: items.length })}
                spacing="section"
              />
            )
          )}
        </SectionsContainer>
      </SortableContext>

      {/* Drag Overlay for better visual feedback during drag */}
      <DragOverlay dropAnimation={null}>
        {activeId ? (
          isDraggingSection ? (
            // Preview for dragging sections - show just the header (collapsed)
            (() => {
              const section = sections.find(s => s.id === activeId);
              return section ? (
                <DragOverlaySectionPreview>
                  <Section
                    id={section.id}
                    name={section.name}
                    isExpanded={false}
                    fieldCount={section.fields.length}
                    isSystem={section.isSystem}
                    isAnySectionDragging={false}
                    onToggle={() => {}}
                    onRename={() => {}}
                    onDelete={undefined}
                  />
                </DragOverlaySectionPreview>
              ) : null;
            })()
          ) : isDraggingField ? (
            // Preview for dragging fields - show actual Field v5 component
            (() => {
              // Find the field being dragged (check both sections and standalone fields)
              let draggedField = null;

              // Check section fields first
              for (const section of sections) {
                const field = section.fields.find(f => f.id === activeId);
                if (field) {
                  draggedField = field;
                  break;
                }
              }

              // If not found in sections, check standalone fields
              if (!draggedField) {
                draggedField = standaloneFields.find(f => f.id === activeId);
              }

              return draggedField ? (
                <Box sx={{ width: 700, maxWidth: '100%' }}>
                  <Field
                    id={draggedField.id}
                    label={draggedField.label}
                    type={draggedField.type}
                    isSystemField={draggedField.isSystemField}
                    isRequired={draggedField.isRequired}
                    fieldData={convertToFormFieldsFieldData(draggedField)}
                    onLabelChange={() => {}}
                    onEdit={() => {}}
                    onMenuClick={() => {}}
                  />
                </Box>
              ) : null;
            })()
          ) : null
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
