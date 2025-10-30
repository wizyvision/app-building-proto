/**
 * DropIndicator Component
 *
 * COMPONENT PURPOSE:
 * Visual indicator showing where a dragged item will be dropped.
 * Shows a 2-3px primary color line at the drop position.
 *
 * UX PRINCIPLES APPLIED:
 * - Visual Feedback: Clear indication of drop position during drag
 * - Fitts's Law: Full-width indicator is easy to see
 * - Aesthetic-Usability: Smooth fade in/out transition
 * - Progressive Disclosure: Only visible during drag operations
 *
 * USAGE:
 * - Place between fields, sections, or at form boundaries
 * - Control visibility with isOver prop from dnd-kit's useDroppable
 * - Automatically hidden when not dragging
 *
 * INTERACTIONS:
 * - Default: Hidden (height: 0, opacity: 0)
 * - Drag over: Visible (height: 3px, opacity: 1, primary color)
 * - Smooth transition: 200ms
 */

'use client';

import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

interface DropIndicatorProps {
  /** Whether item is being dragged over this indicator */
  isOver: boolean;
  /** Is this the first drop zone? */
  isFirst?: boolean;
  /** Is this the last drop zone? */
  isLast?: boolean;
  /** Type of drop indicator: 'field' (within section) or 'section' (between sections) */
  type?: 'field' | 'section';
}

/**
 * StyledDropIndicator
 * Box that appears at drop position - matches InlineInsertionZone spacing
 *
 * STATES:
 * - Default during drag: Matches insertion zone (6px + 1px + 6px = 13px)
 * - Hover: Full height (56px) with visual feedback
 * - Not dragging: height: 0 (completely hidden)
 *
 * STYLING:
 * - Height: 56px (hover) / 13px (default during drag) / 0 (not dragging)
 * - Border: 2px dashed primary color (only when hovered)
 * - Background: Light primary color (only when hovered)
 * - Width: 100% (full width)
 * - Border radius: 4px for consistency
 * - Transition: Smooth 200ms fade
 * - Padding: 6px top/bottom (matches InlineInsertionZone) unless first/last
 */
const StyledDropIndicator = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isOver' && prop !== 'isFirst' && prop !== 'isLast' && prop !== 'type' && prop !== 'isVisible',
})<{ isOver: boolean; isVisible: boolean; isFirst?: boolean; isLast?: boolean; type?: 'field' | 'section' }>(({ theme, isOver, isVisible, isFirst = false, isLast = false, type = 'field' }) => {
  // Match InlineInsertionZone spacing using MARGIN (not padding)
  // InlineInsertionZone uses padding on container: 6px top/bottom
  // We use margin to achieve the same visual spacing
  const marginTop = !isFirst ? 6 : 0;
  const marginBottom = !isLast ? 6 : 0;

  // Height logic to match InlineInsertionZone spacing:
  // - Not visible: 0 height, 0 margin (completely hidden)
  // - Visible but not hovered: 1px height + margin (matches insertion zone)
  // - Hovered: 56px height + margin (full drop target)
  let contentHeight = 0;
  if (isVisible) {
    contentHeight = isOver ? 56 : 1; // 1px line when not hovered, 56px when hovered
  }

  return {
    height: contentHeight,
    marginTop: isVisible ? marginTop : 0,
    marginBottom: isVisible ? marginBottom : 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: isOver ? theme.palette.primary[1] : 'transparent', // Light primary background only when hovered
    border: isOver ? `2px dashed ${theme.palette.primary[3]}` : 'none', // Dashed border only when hovered
    borderRadius: theme.spacing(0.5), // 4px
    opacity: isVisible ? 1 : 0,
    transition: theme.transitions.create(['opacity', 'height', 'margin', 'background-color', 'border'], {
      duration: theme.transitions.duration.short, // 200ms
    }),
    pointerEvents: 'none', // Don't interfere with drag events
    zIndex: 100, // Above other elements
  };
});

export const DropIndicator: React.FC<DropIndicatorProps> = ({ isOver, isFirst = false, isLast = false, type = 'field' }) => {
  // For field indicators, always visible during drag (isOver is passed from parent)
  // The isVisible prop allows the indicator to show minimal gap even when not hovered
  //
  // Section indicators (type='section') are handled differently - they're positioned absolutely
  // and only shown when isOver=true, so they don't need the minimal height
  const isVisible = type === 'section' ? isOver : true;

  return (
    <StyledDropIndicator isOver={isOver} isVisible={isVisible} isFirst={isFirst} isLast={isLast} type={type} />
  );
};
