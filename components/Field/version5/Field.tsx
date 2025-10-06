import { useState, useRef, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AdminFieldProps } from './types';
import { DragIcon } from './DragIcon';
import {
  AdminFieldContainer,
  DragHandleWrapper,
  DragIconContainer,
  ContentSection,
  ContentContainer,
  LabelText,
  LabelInput,
  ActionsContainer,
  ActionButton,
} from './styles';

/**
 * Field Component - Version 5
 *
 * VERSION INFO:
 * - Version: 5
 * - Figma: Version 3 (with different drag handle icon)
 * - Layout: Drag icon + content section + actions
 *
 * FEATURES:
 * - Different drag handle icon (16x16px custom icon)
 * - Content section with label
 * - Edit and menu action buttons
 * - Ghost state: Semi-transparent when dragging
 * - Drag over state: Shows shadow when another field hovers over
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Familiar drag handle pattern with compact icon
 * - Fitts's Law: 24x24px minimum touch targets for all interactive elements
 * - Visual Hierarchy: Drag icon → Label → Actions
 *
 * INTERACTIONS:
 * - Click label: Enter edit mode
 * - Drag handle: Reorder fields
 * - Ghost state: Original position shows semi-transparent field while dragging
 * - Drag over: Field shows shadow when another field is dragged over it
 */
export const Field = ({
  id,
  label,
  type,
  isSystemField = false,
  fieldData,
  onLabelChange,
  onEdit,
  onMenuClick,
}: AdminFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(label);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({
    id,
    data: {
      type: 'field',
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setEditValue(label);
  }, [label]);

  const handleLabelClick = () => {
    if (!isSystemField) {
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    if (editValue.trim() !== label && onLabelChange) {
      onLabelChange(editValue.trim());
    } else {
      setEditValue(label);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue(label);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  return (
    <AdminFieldContainer
      ref={setNodeRef}
      style={style}
      isGhost={isDragging}
      isDragOver={isOver}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Drag Handle Section - Only visible on hover */}
      <DragHandleWrapper isVisible={isHovered || isDragging}>
        <DragIconContainer {...attributes} {...listeners}>
          <DragIcon />
        </DragIconContainer>
      </DragHandleWrapper>

      {/* Content Section */}
      <ContentSection>
        <ContentContainer>
          {isEditing ? (
            <LabelInput
              inputRef={inputRef}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              variant="filled"
              fullWidth
            />
          ) : (
            <LabelText onClick={handleLabelClick}>{label}</LabelText>
          )}
        </ContentContainer>

        {/* Actions */}
        <ActionsContainer>
          <ActionButton
            onClick={onEdit}
            aria-label="Edit field"
            disabled={!onEdit}
            size="small"
          >
            <EditIcon />
          </ActionButton>
          <ActionButton
            onClick={onMenuClick}
            aria-label="More options"
            disabled={!onMenuClick}
            size="small"
          >
            <MoreVertIcon />
          </ActionButton>
        </ActionsContainer>
      </ContentSection>
    </AdminFieldContainer>
  );
};
