/**
 * FieldList Component - Version 3
 *
 * COMPONENT PURPOSE:
 * Renders the list of fields within a section using Field v5 components.
 * Manages field-level drag-and-drop, inline editing, and actions.
 * Wraps existing Field components without modification.
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Familiar inline editing pattern - click to edit, Enter to save,
 *   Escape to cancel. Users recognize this pattern from spreadsheets and task managers.
 *
 * - Fitts's Law: Full-width field rows provide large click targets. Action buttons
 *   are 44x44px minimum for easy tapping on mobile devices.
 *
 * - Progressive Disclosure: Field actions (edit, menu) only visible on hover,
 *   reducing visual clutter. Drag handle appears only when needed.
 *
 * - Visual Hierarchy: Fields visually nested within sections using subtle
 *   background color and indentation. Clear parent-child relationship.
 *
 * TECHNICAL ARCHITECTURE:
 * - Uses dnd-kit SortableContext for field reordering
 * - Field v5 components used without modification
 * - Handles empty state with clear call-to-action
 * - Smooth transitions for all state changes
 *
 * DRAG-AND-DROP BEHAVIOR:
 * - Fields can be reordered within section
 * - Visual feedback during drag (ghost state)
 * - Smooth animations for reordering
 * - Drop zones visible during drag
 *
 * INTERACTIONS:
 * - Click field label: Enter inline edit mode
 * - Drag field: Reorder within section or move to another section
 * - Click edit button: Open field configuration drawer
 * - Click menu button: Show field options menu
 * - Hover field: Show drag handle and action buttons
 */

'use client';

import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Field } from '@/components/Field/version5';
import { SectionContent } from '@/components/Section/version3/Content';
import { InlineInsertionZone } from './InlineInsertionZone';
import { FieldDropZone } from './FieldDropZone';
import { FieldListProps } from './types';
import { convertToFormFieldsFieldData } from './utils/typeConversion';

export const FieldList: React.FC<FieldListProps> = ({
  sectionId,
  fields,
  isExpanded,
  isFieldDragging = false,
  onFieldLabelChange,
  onFieldEdit,
  onFieldMenuClick,
  onFieldReorder,
  onAddField,
  onInsertField,
  onAddSection,
}) => {
  const fieldIds = fields.map((f) => f.id);

  return (
    <SortableContext items={fieldIds} strategy={verticalListSortingStrategy}>
      <SectionContent
        isExpanded={isExpanded}
        sectionId={sectionId}
        isFieldDragging={isFieldDragging}
        onAddField={onAddField}
        hasFields={fields.length > 0}
      >
        {fields.map((field, index) => (
          <React.Fragment key={field.id}>
            {/* Drop indicator before first field */}
            {index === 0 && (
              <FieldDropZone
                id={`field-drop-${sectionId}-${index}`}
                sectionId={sectionId}
                index={index}
                isFieldDragging={isFieldDragging}
                isFirst={false} // Inside section, not at top of form - needs spacing from header
              />
            )}

            {/* Insertion zone before first field - FIELD ONLY (middle of section) */}
            {index === 0 && !isFieldDragging && onInsertField && (
              <InlineInsertionZone
                showFieldButton
                showSectionButton={false}
                onInsertField={() => onInsertField(0)}
                spacing="field"
                isFirst={false} // Inside section, not at top of form - needs spacing from header
              />
            )}

            {/* Field component */}
            <Field
              id={field.id}
              label={field.label}
              type={field.type}
              isSystemField={field.isSystemField}
              sectionId={sectionId}
              fieldData={convertToFormFieldsFieldData(field)}
              onLabelChange={(newLabel) => onFieldLabelChange(field.id, newLabel)}
              onEdit={() => onFieldEdit(field.id)}
              onMenuClick={() => onFieldMenuClick(field.id)}
            />

            {/* Drop indicator after field */}
            <FieldDropZone
              id={`field-drop-${sectionId}-${index + 1}`}
              sectionId={sectionId}
              index={index + 1}
              isFieldDragging={isFieldDragging}
              isLast={index === fields.length - 1}
            />

            {/* Insertion zone between fields - FIELD ONLY (middle of section) */}
            {!isFieldDragging && onInsertField && index < fields.length - 1 && (
              <InlineInsertionZone
                showFieldButton
                showSectionButton={false}
                onInsertField={() => onInsertField(index + 1)}
                spacing="field"
              />
            )}
          </React.Fragment>
        ))}

        {/* Insertion zone after the last field - BOTH BUTTONS */}
        {fields.length > 0 && !isFieldDragging && onInsertField && onAddSection && (
          <InlineInsertionZone
            showFieldButton
            showSectionButton
            onInsertField={() => onInsertField(fields.length)}
            onInsertSection={onAddSection}
            spacing="field"
            isLast={true}
          />
        )}
      </SectionContent>
    </SortableContext>
  );
};
