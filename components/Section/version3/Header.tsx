'use client';

import React, { useState } from 'react';
import {
  HeaderContainer,
  DragHandleWrapper,
  DragIconContainer,
  ExpandButton,
  ExpandIcon,
  CollapseIcon,
  NameContainer,
  StyledTextField,
  SystemBadge,
  DeleteButton,
  StyledDeleteIcon,
} from './styles';
import { SectionHeaderProps } from './types';
import { DragIcon } from '@/components/shared/DragIcon';

/**
 * SectionHeader - Version 3
 *
 * Interactive header for Section component with direct TextField interaction.
 * Updated from v2 with:
 * - 72px header height (increased from 64px)
 * - Direct TextField click-to-focus (same as Field v5)
 * - System badge with light cyan/teal background
 * - Absolutely positioned drag handle (appears on hover)
 * - Shared DragIcon component
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Familiar collapsible pattern with expand/collapse icons
 * - Fitts's Law: 72px header height provides large click target, 44x44px icon buttons
 * - Hick's Law: Limited actions - expand, edit, delete (progressive disclosure)
 * - Visual Hierarchy: Title is prominent, badge is secondary, delete is tertiary
 *
 * INTERACTIONS:
 * - Click header background: Toggle expand/collapse
 * - Click TextField: Focus and type directly (no need to click "edit" first)
 * - Hover section: Reveals absolutely positioned drag handle
 * - Drag handle: Reorder sections
 * - Delete button: Remove non-system sections (hover only)
 * - Press Enter: Save changes and blur
 * - Press Escape: Cancel changes and blur
 *
 * ACCESSIBILITY:
 * - ARIA labels for icon-only buttons
 * - Keyboard navigation (Tab, Enter, Escape)
 * - Focus indicators visible on all interactive elements
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  name,
  isExpanded,
  fieldCount: _fieldCount, // Unused but required by interface
  isSystem = false,
  isHovered,
  isDragging,
  onToggle,
  onRename,
  onDelete,
  dragListeners,
  dragAttributes,
}) => {
  const [editValue, setEditValue] = useState(name);

  const handleTextFieldClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TextField will focus automatically on click
  };

  const handleTextFieldBlur = () => {
    if (editValue.trim() !== name && editValue.trim() !== '') {
      onRename(editValue.trim());
    } else if (editValue.trim() === '') {
      // Reset to original name if empty
      setEditValue(name);
    }
  };

  const handleTextFieldKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      (e.target as HTMLInputElement).blur(); // Blur will trigger handleTextFieldBlur
    } else if (e.key === 'Escape') {
      setEditValue(name);
      (e.target as HTMLInputElement).blur();
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  };

  const handleDragHandleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* Drag Handle - Centered at top, appears on hover */}
      <DragHandleWrapper isVisible={isHovered || isDragging}>
        <DragIconContainer
          {...dragAttributes}
          {...dragListeners}
          onClick={handleDragHandleClick}
          aria-label="Drag to reorder section"
        >
          <DragIcon />
        </DragIconContainer>
      </DragHandleWrapper>

      {/* Header Container with controls */}
      <HeaderContainer onClick={onToggle}>
        {/* Expand/Collapse Button - Jakob's Law: Familiar pattern */}
        <ExpandButton
          size="small"
          aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
        >
          {isExpanded ? <ExpandIcon /> : <CollapseIcon />}
        </ExpandButton>

        {/* Section Name - Direct TextField interaction (click to focus) */}
        <NameContainer>
          <StyledTextField
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleTextFieldBlur}
            onKeyDown={handleTextFieldKeyDown}
            onClick={handleTextFieldClick}
            fullWidth
            variant="standard"
            aria-label="Section name"
            placeholder="Section name"
          />
        </NameContainer>

        {/* System Badge - Visual Hierarchy: Light cyan/teal background */}
        {isSystem && <SystemBadge label="system" size="small" />}

        {/* Delete Button - Progressive Disclosure (only for non-system sections) */}
        {!isSystem && onDelete && (
          <DeleteButton
            size="small"
            onClick={handleDeleteClick}
            isVisible={isHovered}
            aria-label="Delete section"
          >
            <StyledDeleteIcon />
          </DeleteButton>
        )}
      </HeaderContainer>
    </>
  );
};
