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

export interface SectionHeaderProps {
  name: string;
  isExpanded: boolean;
  fieldCount: number;
  isSystem?: boolean;
  isHovered: boolean;
  isDragging: boolean;
  onToggle: () => void;
  onRename: (newName: string) => void;
  onDelete?: () => void;
  dragListeners?: any;
  dragAttributes?: any;
}

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
      <DragHandle
        {...dragAttributes}
        {...dragListeners}
        size="small"
        onClick={(e) => e.stopPropagation()}
        isVisible={isHovered || isDragging}
      >
        <DragIcon />
      </DragHandle>

      {/* Expand/Collapse Button - Jakob's Law: Familiar pattern */}
      <ExpandButton size="small">
        {isExpanded ? <ExpandIcon /> : <CollapseIcon />}
      </ExpandButton>

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
          size="small"
          onClick={handleDeleteClick}
          isVisible={isHovered}
        >
          <DeleteIcon />
        </DeleteButton>
      )}
    </HeaderContainer>
  );
};
