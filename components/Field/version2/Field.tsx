import { useState, useRef, useEffect } from 'react';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FieldFactory } from '@/features/FormFields';
import type { FieldData } from '@/features/FormFields';
import { FieldProps } from './types';
import {
  FieldContainer,
  FieldLabel,
  LeftSide,
  DragHandle,
  LabelContainer,
  LabelTextWrapper,
  LabelText,
  LabelInput,
  RightSide,
  ActionButton,
  FieldPreview,
} from './styles';


/**
 * Field Component - Version 2
 *
 * VERSION INFO:
 * - Version: 2
 * - Created: 2025-10-02
 * - Changes from v1:
 *   - Simplified props interface (onLabelChange instead of onEditLabel)
 *   - Two-section layout: Field Label + Field Preview (matching Figma)
 *   - Icons always visible (no progressive disclosure)
 *   - Drag handle rotated 270 degrees (horizontal drag icon)
 *   - Exact spacing from Figma: 16px padding, 8px gaps
 *
 * MIGRATION FROM V1:
 * - Rename prop: onEditLabel → onLabelChange
 * - Rename prop: onMenuOpen → onMenuClick
 * - Remove: type-specific icons
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Familiar inline editing pattern (click to edit, common in spreadsheets/forms)
 * - Fitts's Law: 24x24px minimum touch targets for all icons
 * - Visual Hierarchy: Drag handle < Label < Action icons
 *
 * INTERACTIONS:
 * - Click label: Enter edit mode with text input
 * - Press Enter or blur: Save changes, call onLabelChange
 * - Press Escape: Cancel edit, revert to original
 * - Click edit icon: Call onEdit callback
 * - Click menu icon: Call onMenuClick callback
 *
 * BREAKING CHANGES:
 * - Props interface changed (see MIGRATION FROM V1)
 * - Layout structure changed (two-section design)
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
}: FieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(label);
  const inputRef = useRef<HTMLInputElement>(null);

  // Create fieldData for preview if not provided
  const previewFieldData: FieldData = fieldData || {
    id: parseInt(id) || 0,
    creatorId: 0,
    dataType: type,
    description: null,
    descriptionIntl: null,
    helper: null,
    helperTextIntl: null,
    iconName: null,
    instructionText: null,
    isRequired: false,
    isSystem: isSystemField,
    isVisible: true,
    key: `field_${id}`,
    label,
    logics: null,
    lookupSettings: null,
    position: 0,
    readOnly: false,
    selectOptions: null,
    defaultValue: null,
    attachmentSettings: null,
    remarkSettings: null,
    settings: null,
    shownInList: false,
    typeId: 0,
    validations: null,
    layoutWebFormPosition: null,
    layoutMobileFormPosition: null,
    layoutCaseListPosition: null,
    layoutPrintPosition: null,
    layoutCaseCardVisibility: false,
    linkableAppIds: null,
    linkableAppMapping: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
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
    <FieldContainer>
      {/* Field Label Section */}
      <FieldLabel>
        <LeftSide>
          <DragHandle>
            <DragIndicatorIcon sx={{ fontSize: 24 }} />
          </DragHandle>
          <LabelContainer>
            <LabelTextWrapper>
              {isEditing ? (
                <LabelInput
                  inputRef={inputRef}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={handleSave}
                  onKeyDown={handleKeyDown}
                  variant="outlined"
                  size="small"
                />
              ) : (
                <LabelText onClick={handleLabelClick}>{label}</LabelText>
              )}
            </LabelTextWrapper>
          </LabelContainer>
        </LeftSide>

        <RightSide>
          <ActionButton
            onClick={onEdit}
            aria-label="Edit field"
            disabled={!onEdit}
          >
            <EditIcon sx={{ fontSize: 20 }} />
          </ActionButton>
          <ActionButton
            onClick={onMenuClick}
            aria-label="More options"
            disabled={!onMenuClick}
          >
            <MoreVertIcon sx={{ fontSize: 20 }} />
          </ActionButton>
        </RightSide>
      </FieldLabel>

      {/* Field Preview Section */}
      <FieldPreview>
        <FieldFactory field={previewFieldData} />
      </FieldPreview>
    </FieldContainer>
  );
};
