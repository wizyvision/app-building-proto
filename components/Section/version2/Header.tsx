'use client';

import React, { useState } from 'react';
import {
  HeaderContainer,
  DragHandle,
  DragIcon,
  ExpandButton,
  ExpandIcon,
  CollapseIcon,
  NameContainer,
  NameEditArea,
  NameText,
  StyledTextField,
  SectionBadge,
  DeleteButton,
  DeleteIcon,
} from './styles';
import { SectionHeaderProps } from './types';
import { Stack } from '@mui/material';

/**
 * SectionHeader - Interactive header for Section component
 *
 * Handles inline editing, drag-and-drop, and section controls.
 * See Section component for full UX principles documentation.
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  name,
  isExpanded,
  fieldCount,
  isSystem = false,
  isHovered,
  isDragging,
  onToggle,
  onRename,
  onDelete,
  dragListeners,
  dragAttributes,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(name);

  const handleNameClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleNameBlur = () => {
    setIsEditing(false);
    if (editValue.trim() !== name) {
      onRename(editValue.trim());
    }
  };

  const handleNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleNameBlur();
    } else if (e.key === 'Escape') {
      setEditValue(name);
      setIsEditing(false);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <HeaderContainer onClick={onToggle}>
      {/* Drag Handle - Progressive Disclosure */}
     <Stack direction="row" alignItems="center" spacing={0}>
      <DragHandle
          {...dragAttributes}
          {...dragListeners}
          onClick={(e) => e.stopPropagation()}
          aria-label="Drag to reorder section"
          isVisible
        >
          <DragIcon />
        </DragHandle>

        {/* Expand/Collapse Button - Jakob's Law: Familiar pattern */}
        <ExpandButton aria-label={isExpanded ? 'Collapse section' : 'Expand section'}>
          {isExpanded ? <ExpandIcon /> : <CollapseIcon />}
        </ExpandButton>
     </Stack>

      {/* Section Name - Inline editing for efficiency */}
      <NameContainer>
        {isEditing ? (
          <StyledTextField
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleNameBlur}
            onKeyDown={handleNameKeyDown}
            onClick={(e) => e.stopPropagation()}
            autoFocus
            fullWidth
            size="small"
            variant="standard"
            aria-label="Edit section name"
          />
        ) : (
          <NameEditArea onClick={handleNameClick}>
            <NameText>{name}</NameText>
          </NameEditArea>
        )}
      </NameContainer>

      {/* Section Type Badge - Visual Hierarchy */}
      {isSystem && <SectionBadge label="System" size="small" />}

      {/* Delete Button - Progressive Disclosure (only for non-system sections) */}
      {!isSystem && onDelete && (
        <DeleteButton
          onClick={handleDeleteClick}
          isVisible={isHovered}
          aria-label="Delete section"
        >
          <DeleteIcon />
        </DeleteButton>
      )}
    </HeaderContainer>
  );
};
