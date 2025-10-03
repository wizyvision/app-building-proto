'use client';

import React from 'react';
import { Collapse } from '@mui/material';
import { useDroppable } from '@dnd-kit/core';
import { SectionContentProps } from './types';
import {
  ContentContainer,
  ContentInner,
  AddFieldButton,
  AddFieldIcon,
  EmptyState,
} from './styles';

/**
 * SectionContent - Expandable content area for Section component
 *
 * Pure container component - does not manage fields directly.
 * Fields should be passed as children from the parent/showcase.
 * See Section component for full UX principles documentation.
 */
export const SectionContent: React.FC<SectionContentProps> = ({
  isExpanded,
  isSectionDragging = false,
  isAnySectionDragging = false,
  isFieldDragging = false,
  sectionId,
  children,
  onAddField,
  hasFields = false,
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

  return (
    <Collapse in={isExpanded && !shouldCollapse} timeout={shouldCollapse ? 0 : "auto"} unmountOnExit>
      <ContentContainer>
        <ContentInner padding={3}>
          {/* Empty State or Fields */}
          {!hasFields ? (
            <EmptyState
              ref={setEmptyDropRef}
              isFieldDragging={isFieldDragging}
              isEmptyOver={isEmptyOver}
            >
              {isFieldDragging ? 'Drop field here' : 'Add or Drag Fields here'}
            </EmptyState>
          ) : (
            children
          )}
        </ContentInner>
      </ContentContainer>
    </Collapse>
  );
};
