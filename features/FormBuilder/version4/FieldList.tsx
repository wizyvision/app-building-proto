/**
 * FieldList Component - Version 4
 *
 * Renders the list of fields within a section using hello-pangea/dnd.
 * Uses Droppable and Draggable components within a section.
 *
 * Manages:
 * - Field reordering within section
 * - Drag/drop state for field movement
 * - Inline insertion zones
 * - Empty state handling
 */

'use client';

import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Box } from '@mui/material';
import { Field } from '@/components/Field/version6';
import { SectionContent } from '@/components/Section/version4/Content';
import { InlineInsertionZone } from './InlineInsertionZone';
import { FieldDropZone } from './FieldDropZone';
import { FieldData, FieldListProps } from './types';
import { convertToFormFieldsFieldData } from './utils/typeConversion';
import { useFormBuilderContext } from './context/FormBuilderContext';

export const FieldList: React.FC<FieldListProps> = ({
  sectionId,
  fields,
  isExpanded,
  isFieldDragging = false,
  onFieldLabelChange,
  onFieldEdit,
  onFieldMenuClick,
  onAddField,
  onInsertField,
  onAddSection,
}) => {
  const context = useFormBuilderContext();
  const { selectedFieldId } = context;

  return (
    <Droppable droppableId={`fields-droppable-${sectionId}`}>
      {(droppableProvided, droppableSnapshot) => (
        <div ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
          <SectionContent
            isExpanded={isExpanded}
            sectionId={sectionId}
            hasFields={fields.length > 0}
            onAddField={onAddField}
          >
          {fields.map((field, index) => (
            <Box key={field.id} sx={{ width: '100%' }}>
              {/* Field component - wraps itself in Draggable */}
              <Field
                id={field.id}
                label={field.label}
                type={field.type}
                isSystemField={field.isSystemField}
                isRequired={field.isRequired}
                isSelected={selectedFieldId === field.id}
                sectionId={sectionId}
                fieldData={convertToFormFieldsFieldData(field)}
                onLabelChange={(newLabel) => context.onFieldLabelChange(field.id, newLabel)}
                onEdit={() => context.onFieldEdit(field.id)}
                onMenuClick={() => context.onFieldMenuClick(field.id)}
                draggableId={`field:${sectionId}:${field.id}`}
                index={index}
              />

              {/* Insertion zone after field */}
              {index < fields.length - 1 && (
                <InlineInsertionZone
                  showFieldButton
                  showSectionButton={false}
                  onInsertField={() => context.onInsertField({ sectionId, fieldIndex: index + 1 })}
                  spacing="field"
                />
              )}
            </Box>
          ))}

          {/* Insertion zone at end of section */}
          {fields.length > 0 && !droppableSnapshot.isDraggingOver && (
            <InlineInsertionZone
              showFieldButton
              showSectionButton
              onInsertField={() => context.onInsertField({ sectionId, fieldIndex: fields.length })}
              onInsertSection={() => context.onInsertSection({ sectionIndex: -1 })}
              spacing="field"
              isLast={true}
            />
          )}

          {droppableProvided.placeholder}
          </SectionContent>
        </div>
      )}
    </Droppable>
  );
};
