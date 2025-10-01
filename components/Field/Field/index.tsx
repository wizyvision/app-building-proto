'use client';

import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  FieldContainer,
  DragHandle,
  DragIcon,
  LabelContainer,
  LabelEditArea,
  LabelText,
  StyledTextField,
  ActionButtonGroup,
  ActionButton,
  ActionIcon,
  MenuIcon,
} from './styles';

export interface FieldProps {
  id: string;
  label: string;
  type: string;
  onEditLabel: (newLabel: string) => void;
  onEdit: () => void;
  onMenuOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Field: React.FC<FieldProps> = ({
  id,
  label,
  type,
  onEditLabel,
  onEdit,
  onMenuOpen,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(label);
  const [isHovered, setIsHovered] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    data: {
      type: 'field',
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleLabelClick = () => {
    setIsEditing(true);
  };

  const handleLabelBlur = () => {
    setIsEditing(false);
    if (editValue.trim() !== label) {
      onEditLabel(editValue.trim());
    }
  };

  const handleLabelKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLabelBlur();
    } else if (e.key === 'Escape') {
      setEditValue(label);
      setIsEditing(false);
    }
  };

  return (
    <FieldContainer
      ref={setNodeRef}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      isDragging={isDragging}
    >
      {/* Drag Handle - Progressive Disclosure */}
      <DragHandle
        {...attributes}
        {...listeners}
        size="small"
        isVisible={isHovered || isDragging}
      >
        <DragIcon />
      </DragHandle>

      {/* Field Label/Type - Inline editing for efficiency */}
      <LabelContainer>
        {isEditing ? (
          <StyledTextField
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleLabelBlur}
            onKeyDown={handleLabelKeyDown}
            autoFocus
            fullWidth
            size="small"
            variant="standard"
          />
        ) : (
          <LabelEditArea onClick={handleLabelClick}>
            <LabelText>{label}</LabelText>
          </LabelEditArea>
        )}
      </LabelContainer>

      {/* Action Buttons - Progressive Disclosure */}
      <ActionButtonGroup isVisible={isHovered}>
        <ActionButton size="small" onClick={onEdit}>
          <ActionIcon />
        </ActionButton>
        <ActionButton size="small" onClick={onMenuOpen}>
          <MenuIcon />
        </ActionButton>
      </ActionButtonGroup>
    </FieldContainer>
  );
};
