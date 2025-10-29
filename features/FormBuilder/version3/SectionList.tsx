/**
 * SectionList Component - Version 3 (Refactored for nested FieldData)
 *
 * COMPONENT PURPOSE:
 * Renders the list of root-level items (sections and standalone fields) using nested FieldData structure.
 * Sections are FieldData items with type='SECTION' and children array.
 * Manages drag-and-drop context for section and field reordering.
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Familiar drag-and-drop pattern for reordering.
 * - Miller's Law: Groups related fields within sections (typically 5-7 fields).
 * - Visual Hierarchy: Sections provide clear visual grouping with elevation and spacing.
 * - Progressive Disclosure: Collapsed sections hide complexity.
 *
 * TECHNICAL ARCHITECTURE:
 * - Uses dnd-kit for drag-and-drop functionality
 * - Section v3 components render sections as fields with children
 * - Field v5 components render standalone fields
 * - State management handled by parent FormBuilder
 * - Nested FieldData structure: sections have children[], standalone fields don't
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
import { SectionListProps, FieldData } from './types';
import {
  SectionsContainer,
  StandaloneFieldContainer,
  DragOverlaySectionPreview,
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
      overData: over?.data.current,
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
        const oldIndex = items.findIndex((item) => item.id === active.id && item.type === 'SECTION');
        const newIndex = items.findIndex((item) => item.id === over.id && item.type === 'SECTION');
        if (oldIndex !== newIndex && oldIndex !== -1 && newIndex !== -1) {
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
          const targetIndex = items.findIndex((item) => item.id === over.id);
          onFieldMoveToStandalone(fieldId, activeData.sectionId || null, targetIndex);
        } else {
          // Target is in section
          const targetSection = items.find((item) => item.id === targetSectionId && item.type === 'SECTION') as FieldData | undefined;
          if (targetSection?.type === 'SECTION' && targetSection.children) {
            const targetIndex = targetSection.children.findIndex((f) => f.id === over.id);
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

  const itemIds = items.map((item) => item.id);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={resetDragState}
    >
      <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
        <SectionsContainer>
          {/* Insertion zone / Drop zone at the beginning */}
          {isDraggingField ? (
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ minWidth: '500px', maxWidth: '700px', width: '100%' }}>
                <FieldDropZone id="standalone-drop-0" sectionId="standalone" index={0} isFieldDragging={true} />
              </Box>
            </Box>
          ) : !isDraggingSection ? (
            <InlineInsertionZone
              showFieldButton
              showSectionButton
              onInsertField={() => onInsertStandaloneField({ sectionIndex: 0 })}
              onInsertSection={() => onInsertSection({ sectionIndex: 0 })}
              spacing="section"
              popoverPosition="below"
            />
          ) : null}

          {items.flatMap((item, itemIndex) => {
            const elements: JSX.Element[] = [];

            if (item.type === 'SECTION') {
              const section = item;
              const isSectionDragging = activeId === section.id && isDraggingSection;
              const isSectionOver = overId === section.id;

              // Determine if we should show drop indicator above or below this section
              const activeItemIndex = items.findIndex((i) => i.id === activeId && i.type === 'SECTION');
              const overItemIndex = items.findIndex((i) => i.id === overId && i.type === 'SECTION');

              let showIndicatorAbove = false;
              let showIndicatorBelow = false;

              if (isDraggingSection && !isSectionDragging && isSectionOver) {
                if (activeItemIndex !== -1 && overItemIndex !== -1 && activeItemIndex !== overItemIndex) {
                  if (activeItemIndex < overItemIndex) {
                    showIndicatorBelow = true;
                  } else {
                    showIndicatorAbove = true;
                  }
                }
              }

              elements.push(
                <Box key={section.id} sx={{ position: 'relative', width: '100%' }}>
                  {showIndicatorAbove && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '100%',
                        maxWidth: '700px',
                        minWidth: '500px',
                        zIndex: 100,
                      }}
                    >
                      <DropIndicator isOver={true} type="section" />
                    </Box>
                  )}
                  <Section
                    id={section.id}
                    name={section.label}
                    isExpanded={section.isExpanded ?? true}
                    fieldCount={section.children?.length ?? 0}
                    isSystem={section.isSystem}
                    isAnySectionDragging={isDraggingSection}
                    onToggle={() => onSectionToggle(section.id)}
                    onRename={(newName) => onSectionRename(section.id, newName)}
                    onDelete={section.isSystem ? undefined : () => onSectionDelete(section.id)}
                  >
                    <FieldList
                      sectionId={section.id}
                      fields={section.children ?? []}
                      isExpanded={section.isExpanded ?? true}
                      isFieldDragging={isDraggingField}
                      onFieldLabelChange={onFieldLabelChange}
                      onFieldEdit={onFieldEdit}
                      onFieldMenuClick={onFieldMenuClick}
                      onFieldReorder={(fieldId, newIndex) => onFieldReorder(fieldId, section.id, section.id, newIndex)}
                      onAddField={() => onAddField(section.id)}
                      onInsertField={(index) => {
                        onInsertField({
                          sectionId: section.id,
                          fieldIndex: index,
                        });
                      }}
                      onAddSection={() => onInsertSection({ sectionIndex: itemIndex + 1 })}
                    />
                  </Section>
                  {showIndicatorBelow && (
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '100%',
                        maxWidth: '700px',
                        minWidth: '500px',
                        zIndex: 100,
                      }}
                    >
                      <DropIndicator isOver={true} type="section" />
                    </Box>
                  )}
                </Box>
              );

              // Add insertion zone OR drop zone after section
              if (itemIndex < items.length - 1) {
                if (isDraggingField) {
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
            } else {
              // Render standalone field
              const field = item;
              const isThisFieldBeingDragged = activeId === field.id && isDraggingField;

              // Drop zone before this standalone field (when dragging)
              if (isDraggingField && itemIndex > 0 && !isThisFieldBeingDragged) {
                elements.push(
                  <Box key={`drop-before-${field.id}`} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ minWidth: '500px', maxWidth: '700px', width: '100%' }}>
                      <FieldDropZone id={`standalone-drop-before-${field.id}`} sectionId="standalone" index={itemIndex} isFieldDragging={true} />
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
          })}

          {/* Insertion zone / Drop zone after the last item */}
          {items.length > 0 &&
            (isDraggingField ? (
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ minWidth: '500px', maxWidth: '700px', width: '100%' }}>
                  <FieldDropZone id={`standalone-drop-${items.length}`} sectionId="standalone" index={items.length} isFieldDragging={true} />
                </Box>
              </Box>
            ) : !isDraggingSection ? (
              <InlineInsertionZone
                showFieldButton
                showSectionButton
                onInsertField={() => onInsertStandaloneField({ sectionIndex: items.length })}
                onInsertSection={() => onInsertSection({ sectionIndex: items.length })}
                spacing="section"
              />
            ) : null)}
        </SectionsContainer>
      </SortableContext>

      {/* Drag Overlay for better visual feedback during drag */}
      <DragOverlay dropAnimation={null}>
        {activeId ? (
          isDraggingSection ? (
            (() => {
              const section = items.find((item) => item.id === activeId && item.type === 'SECTION');
              return section ? (
                <DragOverlaySectionPreview>
                  <Section
                    id={section.id}
                    name={section.label}
                    isExpanded={false}
                    fieldCount={section.children?.length ?? 0}
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
            (() => {
              let draggedField: FieldData | null = null;

              // Check root-level fields
              draggedField = items.find((f) => f.id === activeId && f.type !== 'SECTION') || null;

              // Check section fields
              if (!draggedField) {
                for (const item of items) {
                  if (item.type === 'SECTION' && item.children) {
                    const found = item.children.find((f) => f.id === activeId);
                    if (found) {
                      draggedField = found;
                      break;
                    }
                  }
                }
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
