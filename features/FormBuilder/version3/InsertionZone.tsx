/**
 * InsertionZone Component - Version 3
 *
 * COMPONENT PURPOSE:
 * Individual insertion zone that appears between components to allow
 * context-aware field/section insertion without modifying existing components.
 *
 * UX PRINCIPLES APPLIED:
 * - Fitts's Law: Minimum 44px height for easy targeting on touch and mouse.
 *   The entire zone is interactive, providing a large, easy-to-reach target.
 *
 * - Visual Hierarchy: Subtle appearance by default, prominent feedback on hover/active.
 *   Uses primary color tint to indicate interactivity without overwhelming the interface.
 *
 * - Aesthetic-Usability Effect: Smooth transitions and visual feedback create
 *   a polished, professional feel that enhances perceived usability.
 *
 * - Progressive Disclosure: Zones appear on hover/interaction, reducing visual
 *   clutter when not needed. Actions are revealed contextually.
 *
 * INTERACTIONS:
 * - Hover: Background tint appears, buttons become visible
 * - Click button: Triggers insert action (field or section based on context)
 * - Smooth transitions: All state changes are animated for polish
 *
 * TECHNICAL APPROACH:
 * - Absolute positioning to avoid layout shifts
 * - Pointer events controlled by visibility prop
 * - Context-aware button display based on zone type
 */

'use client';

import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { InsertionZoneProps } from './types';
import {
  InsertionZoneContainer,
  InsertionZoneButton,
  InsertionZoneActions,
} from './styles';

export const InsertionZone: React.FC<InsertionZoneProps> = ({
  id,
  isActive,
  isVisible,
  onActivate,
  onDeactivate,
  onInsertField,
  onInsertSection,
}) => {
  const handleMouseEnter = () => {
    if (isVisible) {
      onActivate(id);
    }
  };

  const handleMouseLeave = () => {
    if (isVisible) {
      onDeactivate();
    }
  };

  const handleInsertField = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Calculate insertion position based on zone ID
    const position = calculateInsertionPosition(id);
    onInsertField(position);
  };

  const handleInsertSection = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Calculate insertion position based on zone ID
    const position = calculateInsertionPosition(id);
    onInsertSection(position);
  };

  // Determine which buttons to show based on zone type
  const showFieldButton = id.type === 'between-fields' || id.type === 'section-end';
  const showSectionButton = id.type === 'between-sections' || id.type === 'form-start' || id.type === 'form-end';

  return (
    <InsertionZoneContainer
      isActive={isActive}
      isVisible={isVisible}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <InsertionZoneActions>
        {showFieldButton && (
          <InsertionZoneButton
            onClick={handleInsertField}
            startIcon={<AddIcon />}
            size="small"
          >
            Add Field
          </InsertionZoneButton>
        )}
        {showSectionButton && (
          <InsertionZoneButton
            onClick={handleInsertSection}
            startIcon={<AddIcon />}
            size="small"
          >
            Add Section
          </InsertionZoneButton>
        )}
      </InsertionZoneActions>
    </InsertionZoneContainer>
  );
};

/**
 * Calculate Insertion Position
 *
 * Determines the exact position where new items should be inserted
 * based on the zone identifier.
 */
function calculateInsertionPosition(id: InsertionZoneProps['id']) {
  const { type, sectionId, fieldId, position } = id;

  switch (type) {
    case 'between-fields':
      // Inserting between two fields in a section
      return {
        sectionId,
        fieldIndex: position === 'after' ? getFieldIndex(fieldId) + 1 : getFieldIndex(fieldId),
      };

    case 'section-end':
      // Inserting at the end of a section
      return {
        sectionId,
        fieldIndex: -1, // Indicates append to end
      };

    case 'between-sections':
      // Inserting between two sections
      return {
        sectionIndex: position === 'after' ? getSectionIndex(sectionId) + 1 : getSectionIndex(sectionId),
      };

    case 'form-start':
      // Inserting at the beginning of the form
      return {
        sectionIndex: 0,
      };

    case 'form-end':
      // Inserting at the end of the form
      return {
        sectionIndex: -1, // Indicates append to end
      };

    default:
      return {};
  }
}

/**
 * Helper: Get Field Index
 * In a real implementation, this would access the form state
 */
function getFieldIndex(fieldId?: string): number {
  // Placeholder - in real implementation, this would look up the field index
  return 0;
}

/**
 * Helper: Get Section Index
 * In a real implementation, this would access the form state
 */
function getSectionIndex(sectionId?: string): number {
  // Placeholder - in real implementation, this would look up the section index
  return 0;
}
