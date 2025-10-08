/**
 * BulkOperations Component Types
 */

export interface BulkSelectionModeProps {
  isActive: boolean;
  selectedCount: number;
  totalCount: number;
  onCancel: () => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

export interface BulkActionBarProps {
  selectedCount: number;
  onDelete: () => void;
  onDuplicate: () => void;
  onChangeType: () => void;
  onSetRequired: (isRequired: boolean) => void;
  onCancel: () => void;
}

export interface BulkActionMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onSelectAction: (action: BulkAction) => void;
}

export type BulkAction =
  | 'delete'
  | 'duplicate'
  | 'change-type'
  | 'set-required'
  | 'set-optional'
  | 'show-in-list'
  | 'hide-from-list';
