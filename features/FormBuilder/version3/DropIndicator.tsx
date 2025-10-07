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
 * Box that appears at drop position - matches section header height
 *
 * STATES:
 * - Hidden: height: 0, opacity: 0 (default)
 * - Visible: height: 56px, opacity: 1 (when isOver) - matches section header
 *
 * STYLING:
 * - Height: 56px (visible) - matches section header minHeight
 * - Border: 2px dashed with lighter primary color
 * - Background: Light primary color (theme.palette.primary.lighter or primary[1])
 * - Width: 100% (full width)
 * - Border radius: 4px for consistency
 * - Transition: Smooth 200ms fade
 * - Padding:
 *   - Field type: 6px top/bottom (0 for first/last to match insertion zones)
 *   - Section type: 0px (sections already have gap spacing)
 */
const StyledDropIndicator = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isOver' && prop !== 'isFirst' && prop !== 'isLast' && prop !== 'type',
})<{ isOver: boolean; isFirst?: boolean; isLast?: boolean; type?: 'field' | 'section' }>(({ theme, isOver, isFirst = false, isLast = false, type = 'field' }) => {
  // Section drop indicators have no padding (sections already have 12px gap)
  // Field drop indicators have 6px padding (unless first/last)
  const shouldHavePadding = type === 'field' && isOver;
  const paddingTop = shouldHavePadding && !isFirst ? theme.spacing(0.75) : 0;
  const paddingBottom = shouldHavePadding && !isLast ? theme.spacing(0.75) : 0;

  return {
    height: isOver ? '56px' : '0', // Match section header height
    padding: 0,
    paddingTop,
    paddingBottom,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: isOver ? theme.palette.primary[1] : 'transparent', // Light primary background
    border: isOver ? `2px dashed ${theme.palette.primary[3]}` : 'none', // Dashed border with lighter primary
    borderRadius: theme.spacing(0.5), // 4px
    opacity: isOver ? 1 : 0,
    transition: theme.transitions.create(['opacity', 'height', 'padding', 'background-color', 'border'], {
      duration: theme.transitions.duration.short, // 200ms
    }),
    pointerEvents: 'none', // Don't interfere with drag events
    zIndex: 100, // Above other elements
  };
});

export const DropIndicator: React.FC<DropIndicatorProps> = ({ isOver, isFirst = false, isLast = false, type = 'field' }) => {
  return (
    <StyledDropIndicator isOver={isOver} isFirst={isFirst} isLast={isLast} type={type} />
  );
};
