/**
 * Field Component - Version 6
 *
 * VERSION INFO:
 * - Version: 6
 * - Based on: Version 5 (dnd-kit) → Version 6 (hello-pangea/dnd)
 * - Layout: Drag icon + field type icon + content section + actions
 *
 * KEY CHANGES FROM V5:
 * - Uses hello-pangea/dnd Draggable component instead of useSortable
 * - Render function pattern for children
 * - Automatic animations and accessibility built-in
 * - Drag handle passed via provided.dragHandleProps
 *
 * FEATURES:
 * - Different drag handle icon (16x16px custom icon)
 * - Leading icon based on field data type (from iconMapping)
 * - Content section with label
 * - Required field indicator (red asterisk with 4px gap)
 * - Selection state with border and background highlight
 * - Edit and menu action buttons
 * - Ghost state: Semi-transparent when dragging
 * - Drag over state: Shows shadow when another field hovers over
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Familiar drag handle pattern with compact icon, recognizable field type icons, standard required indicator (red asterisk)
 * - Fitts's Law: 24x24px minimum touch targets for all interactive elements
 * - Visual Hierarchy: Drag icon → Field type icon → Label → Actions
 * - Von Restorff Effect: Selected field stands out with primary color border and subtle background
 *
 * INTERACTIONS:
 * - Click label: Enter edit mode
 * - Drag handle: Reorder fields
 * - Ghost state: Original position shows semi-transparent field while dragging
 * - Drag over: Field shows shadow when another field is dragged over it
 * - Selection: 2px primary border, 5% opacity background, pulse animation on first selection
 */

import { useState, useRef, useEffect } from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AdminFieldProps } from './types';
import { DragIcon } from './DragIcon';
import { iconMapping } from '@/constants/iconMapping';
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
  FieldIconContainer,
  RequiredIndicator,
} from './styles';

/**
 * Field Component - Wrapped in Draggable for hello-pangea/dnd
 *
 * Must be used inside a Droppable component from hello-pangea/dnd
 *
 * Props:
 * - draggableId: Unique ID for this field (should be `field-${sectionId?}-${fieldId}`)
 * - index: Position in the list
 * - isDragDisabled: Disable dragging for system fields
 */
interface FieldV6Props extends AdminFieldProps {
  draggableId: string;
  index: number;
}

const FieldContent = ({
  id,
  label,
  type,
  isSystemField = false,
  isRequired = false,
  isSelected = false,
  fieldData,
  onLabelChange,
  onEdit,
  onMenuClick,
  provided,
  snapshot,
}: Omit<FieldV6Props, 'draggableId' | 'index' | 'isDragDisabled'> & {
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(label);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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

  // Get the icon component based on field type
  const IconComponent = iconMapping[type as keyof typeof iconMapping];

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      style={{
        ...provided.draggableProps.style,
        opacity: snapshot.isDragging ? 0.8 : 1,
      }}
    >
      <AdminFieldContainer
        isGhost={snapshot.isDragging}
        isDragOver={snapshot.draggingOver ? true : false}
        isSelected={isSelected}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
      {/* Drag Handle Section - Only visible on hover */}
      <DragHandleWrapper isVisible={isHovered || snapshot.isDragging}>
        <DragIconContainer {...provided.dragHandleProps}>
          <DragIcon />
        </DragIconContainer>
      </DragHandleWrapper>

      {/* Content Section */}
      <ContentSection>
        <ContentContainer>
          {/* Field Type Icon */}
          {IconComponent && (
            <FieldIconContainer>
              <IconComponent />
            </FieldIconContainer>
          )}

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
            <LabelText onClick={handleLabelClick}>
              {label}
              {isRequired && <RequiredIndicator>*</RequiredIndicator>}
            </LabelText>
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
    </div>
  );
};

/**
 * Field Component - Version 6
 *
 * Wrapped in Draggable from hello-pangea/dnd
 * Must be used inside a Droppable component
 */
export const Field: React.FC<FieldV6Props> = ({
  id,
  label,
  type,
  isSystemField = false,
  isRequired = false,
  isSelected = false,
  sectionId,
  fieldData,
  onLabelChange,
  onEdit,
  onMenuClick,
  draggableId,
  index,
}) => {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => (
        <FieldContent
          id={id}
          label={label}
          type={type}
          isSystemField={isSystemField}
          isRequired={isRequired}
          isSelected={isSelected}
          sectionId={sectionId}
          fieldData={fieldData}
          onLabelChange={onLabelChange}
          onEdit={onEdit}
          onMenuClick={onMenuClick}
          provided={provided}
          snapshot={snapshot}
        />
      )}
    </Draggable>
  );
};
