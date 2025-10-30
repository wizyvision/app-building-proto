/**
 * SectionList Component - Version 4
 *
 * Renders the list of root-level items (sections and standalone fields) using hello-pangea/dnd.
 * Uses Droppable and Draggable components with render function pattern.
 *
 * STRUCTURE:
 * - Droppable for sections container
 * - Draggable for each section (wraps Section v4 component)
 * - Droppable for standalone fields
 * - Draggable for each standalone field
 *
 * Handles:
 * - Section reordering
 * - Field movement between sections
 * - Field to/from standalone conversion
 */

'use client';

import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Box } from '@mui/material';
import { Section } from '@/components/Section/version4';
import { Field } from '@/components/Field/version6';
import { FieldList } from './FieldList';
import { InlineInsertionZone } from './InlineInsertionZone';
import { DropIndicator } from './DropIndicator';
import { FieldDropZone } from './FieldDropZone';
import { FieldData } from './types';
import {
  SectionsContainer,
  StandaloneFieldContainer,
  DragOverlaySectionPreview,
} from './styles';
import { convertToFormFieldsFieldData } from './utils/typeConversion';
import { useFormBuilderContext } from './context/FormBuilderContext';

interface SectionListProps {
  items: FieldData[];
}

export const SectionList: React.FC<SectionListProps> = ({ items }) => {
  const context = useFormBuilderContext();
  const { selectedFieldId } = context;

  return (
    <Droppable droppableId="sections-droppable">
      {(droppableProvided, droppableSnapshot) => (
        <div
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
        >
          <SectionsContainer>
          {/* Insertion zone at beginning */}
          {!droppableSnapshot.isDraggingOver && (
            <InlineInsertionZone
              showFieldButton
              showSectionButton
              onInsertField={() => context.onInsertStandaloneField({ sectionIndex: 0 })}
              onInsertSection={() => context.onInsertSection({ sectionIndex: 0 })}
              spacing="section"
              popoverPosition="below"
            />
          )}

          {/* Render items (sections and standalone fields) */}
          {items.map((item, itemIndex) => {
            if (item.type === 'SECTION') {
              const section = item;

              return (
                <Box key={section.id} sx={{ position: 'relative', width: '100%' }}>
                  <Section
                    id={section.id}
                    name={section.label}
                    isExpanded={section.isExpanded ?? true}
                    fieldCount={section.children?.length ?? 0}
                    isSystem={section.isSystem}
                    isAnySectionDragging={droppableSnapshot.isDraggingOver}
                    onToggle={() => context.onSectionToggle(section.id)}
                    onRename={(newName) => context.onSectionRename(section.id, newName)}
                    onDelete={section.isSystem ? undefined : () => context.onSectionDelete(section.id)}
                    draggableId={`section-${section.id}`}
                    index={itemIndex}
                  >
                    <FieldList
                      sectionId={section.id}
                      fields={section.children ?? []}
                      isExpanded={section.isExpanded ?? true}
                    />
                  </Section>

                  {/* Insertion zone after section */}
                  {itemIndex < items.length - 1 && (
                    <InlineInsertionZone
                      showFieldButton
                      showSectionButton
                      onInsertField={() =>
                        context.onInsertStandaloneField({ sectionIndex: itemIndex + 1 })
                      }
                      onInsertSection={() => context.onInsertSection({ sectionIndex: itemIndex + 1 })}
                      spacing="section"
                    />
                  )}
                </Box>
              );
            } else {
              // Render standalone field
              const field = item;

              return (
                <Box key={field.id} sx={{ position: 'relative', width: '100%' }}>
                  <StandaloneFieldContainer>
                    <Field
                      id={field.id}
                      label={field.label}
                      type={field.type}
                      isSystemField={field.isSystemField}
                      isRequired={field.isRequired}
                      isSelected={selectedFieldId === field.id}
                      sectionId={undefined}
                      fieldData={convertToFormFieldsFieldData(field)}
                      onLabelChange={(newLabel) => context.onFieldLabelChange(field.id, newLabel)}
                      onEdit={() => context.onFieldEdit(field.id)}
                      onMenuClick={() => context.onFieldMenuClick(field.id)}
                      draggableId={`field:standalone:${field.id}`}
                      index={itemIndex}
                    />
                  </StandaloneFieldContainer>

                  {/* Insertion zone after standalone field */}
                  {itemIndex < items.length - 1 && (
                    <InlineInsertionZone
                      showFieldButton
                      showSectionButton
                      onInsertField={() =>
                        context.onInsertStandaloneField({ sectionIndex: itemIndex + 1 })
                      }
                      onInsertSection={() => context.onInsertSection({ sectionIndex: itemIndex + 1 })}
                      spacing="section"
                    />
                  )}
                </Box>
              );
            }
          })}

          {/* Insertion zone at end */}
          {items.length > 0 && !droppableSnapshot.isDraggingOver && (
            <InlineInsertionZone
              showFieldButton
              showSectionButton
              onInsertField={() => context.onInsertStandaloneField({ sectionIndex: items.length })}
              onInsertSection={() => context.onInsertSection({ sectionIndex: items.length })}
              spacing="section"
            />
          )}

          {droppableProvided.placeholder}
          </SectionsContainer>
        </div>
      )}
    </Droppable>
  );
};
