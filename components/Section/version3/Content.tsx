'use client';

import React from 'react';
import { Collapse } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDroppable } from '@dnd-kit/core';
import { SectionContentProps } from './types';
import {
  ContentContainer,
  ContentInner,
  EmptyState,
  EmptyStateLink,
  EmptyStateText,
  AddFieldButton,
} from './styles';

/**
 * SectionContent - Version 3
 *
 * Expandable content area for Section component.
 * Reused from v2 with same behavior.
 *
 * Pure container component - does not manage fields directly.
 * Fields should be passed as children from the parent/showcase.
 *
 * UX PRINCIPLES APPLIED:
 * - Progressive Disclosure: Content only visible when expanded
 * - Miller's Law: Groups fields in manageable chunks
 * - Visual Hierarchy: Empty state vs filled state feedback
 *
 * See Section component for full UX principles documentation.
 */
export const SectionContent: React.FC<SectionContentProps> = ({
  isExpanded,
  isSectionDragging = false,
  isAnySectionDragging = false,
  isFieldDragging = false,
  sectionId,
  children,
  hasFields = false,
  onAddField,
  onAddSection,
}) => {
  const shouldCollapse = isSectionDragging || isAnySectionDragging;

  // Empty section drop zone
  const { setNodeRef: setEmptyDropRef, isOver: isEmptyOver } = useDroppable({
    id: `empty-section-${sectionId}`,
    data: {
      type: 'field-drop-end',
      sectionId,
    },
  });

  // When any section is dragging, hide content completely (show only header)
  if (shouldCollapse) {
    return null;
  }

  return (
    <Collapse
      in={isExpanded}
      timeout={shouldCollapse ? 0 : "auto"}
      unmountOnExit
      sx={{
        padding: 0,
        '& .MuiCollapse-wrapper': { padding: 0 },
        '& .MuiCollapse-wrapperInner': { padding: 0 },
      }}
    >
      <ContentContainer>
        <ContentInner>
          {/* Empty State or Fields */}
          {!hasFields ? (
            <EmptyState
              ref={setEmptyDropRef}
              isFieldDragging={isFieldDragging}
              isEmptyOver={isEmptyOver}
            >
              {isFieldDragging ? (
                'Drop field here'
              ) : (
                onAddField ? (
                  <>
                    <EmptyStateLink onClick={onAddField} aria-label="Add field to section">
                      Add
                    </EmptyStateLink>
                    {' '}
                    <EmptyStateText>or drag fields</EmptyStateText>
                  </>
                ) : (
                  'Add or drag fields'
                )
              )}
            </EmptyState>
          ) : (
            children
          )}
        </ContentInner>
      </ContentContainer>
    </Collapse>
  );
};
