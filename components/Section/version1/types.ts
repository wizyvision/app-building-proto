import { ReactNode } from 'react';

export interface SectionProps {
  id: string;
  name: string;
  isExpanded: boolean;
  fieldCount?: number;
  isSystem?: boolean;
  onToggle: () => void;
  onRename: (newName: string) => void;
  onDelete?: () => void;
  children?: ReactNode;
}

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

export interface SectionContentProps {
  isExpanded: boolean;
  fields: Array<{
    id: string;
    label: string;
    type: string;
  }>;
  onFieldEditLabel: (fieldId: string, newLabel: string) => void;
  onFieldEdit: (fieldId: string) => void;
  onFieldMenuOpen: (fieldId: string, event: React.MouseEvent<HTMLButtonElement>) => void;
  onAddField: () => void;
}
