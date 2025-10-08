/**
 * BulkActionBar Component
 *
 * UX PRINCIPLES APPLIED:
 * - Visual Hierarchy: Prominent floating bar, clear actions
 * - Fitts's Law: Large touch targets (44px minimum)
 * - Hick's Law: Limited actions (5 primary options)
 * - Feedback: Selection count visible, confirm destructive actions
 *
 * INTERACTION DESIGN:
 * - Delete: Confirm before bulk delete
 * - Duplicate: Create copies of selected fields
 * - Change Type: Show type selector dropdown
 * - Set Required/Optional: Toggle required state
 * - Cancel: Exit bulk selection mode
 */

'use client';

import React from 'react';
import { Typography, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {
  BulkActionBarContainer,
  BulkActionBarLeft,
  BulkActionBarRight,
  BulkActionButton,
  BulkSelectionChip,
} from './styles';
import type { BulkActionBarProps } from './types';

export function BulkActionBar({
  selectedCount,
  onDelete,
  onDuplicate,
  onSetRequired,
  onCancel,
}: BulkActionBarProps) {
  return (
    <BulkActionBarContainer elevation={8}>
      <BulkActionBarLeft>
        <BulkSelectionChip
          label={`${selectedCount} selected`}
          size="small"
        />
      </BulkActionBarLeft>

      <BulkActionBarRight>
        <Tooltip title="Duplicate selected fields">
          <BulkActionButton onClick={onDuplicate} size="small">
            <ContentCopyIcon fontSize="small" />
          </BulkActionButton>
        </Tooltip>

        <Tooltip title="Set as required">
          <BulkActionButton onClick={() => onSetRequired(true)} size="small">
            <CheckBoxIcon fontSize="small" />
          </BulkActionButton>
        </Tooltip>

        <Tooltip title="Set as optional">
          <BulkActionButton onClick={() => onSetRequired(false)} size="small">
            <CheckBoxOutlineBlankIcon fontSize="small" />
          </BulkActionButton>
        </Tooltip>

        <Tooltip title="Delete selected fields">
          <BulkActionButton onClick={onDelete} size="small">
            <DeleteIcon fontSize="small" />
          </BulkActionButton>
        </Tooltip>

        <Tooltip title="Cancel bulk selection">
          <BulkActionButton onClick={onCancel} size="small">
            <CloseIcon fontSize="small" />
          </BulkActionButton>
        </Tooltip>
      </BulkActionBarRight>
    </BulkActionBarContainer>
  );
}
