'use client';

import React from 'react';
import { Collapse } from '@mui/material';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Field } from '@/components/Field';
import { SectionContentProps } from './types';
import {
  ContentContainer,
  ContentInner,
  FieldsList,
  AddFieldButton,
  AddFieldIcon,
  EmptyState,
} from './styles';

/**
 * SectionContent - Expandable content area for Section component
 *
 * Contains fields list and "Add Field" button.
 * See Section component for full UX principles documentation.
 */
export const SectionContent: React.FC<SectionContentProps> = ({
  isExpanded,
  fields,
  onFieldEditLabel,
  onFieldEdit,
  onFieldMenuOpen,
  onAddField,
}) => {
  return (
    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
      <ContentContainer>
        <ContentInner>
          {/* Empty State - Show when no fields */}
          {fields.length === 0 ? (
            <EmptyState>
              Add or Drag Fields here
            </EmptyState>
          ) : (
            /* Fields List - Miller's Law: Manageable grouping */
            <SortableContext
              items={fields.map(f => f.id)}
              strategy={verticalListSortingStrategy}
            >
              <FieldsList>
                {fields.map((field) => (
                  <Field
                    key={field.id}
                    {...field}
                    onEditLabel={(newLabel) => onFieldEditLabel(field.id, newLabel)}
                    onEdit={() => onFieldEdit(field.id)}
                    onMenuOpen={(e) => onFieldMenuOpen(field.id, e)}
                  />
                ))}
              </FieldsList>
            </SortableContext>
          )}

          {/* Add Field Button - Fitts's Law: Centered for easy targeting */}
          <AddFieldButton
            variant="outlined"
            startIcon={<AddFieldIcon />}
            onClick={onAddField}
            aria-label="Add new field to section"
          >
            Add Field
          </AddFieldButton>
        </ContentInner>
      </ContentContainer>
    </Collapse>
  );
};
