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
  isSectionDragging?: boolean;
  isAnySectionDragging?: boolean;
  isFieldDragging?: boolean;
  sectionId?: string;
  children?: ReactNode;
  onAddField: () => void;
  hasFields?: boolean;
}
