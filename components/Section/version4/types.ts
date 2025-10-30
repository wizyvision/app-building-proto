import { ReactNode } from 'react';
import { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';

export interface SectionProps {
  id: string;
  name: string;
  isExpanded: boolean;
  fieldCount?: number;
  isSystem?: boolean;
  isAnySectionDragging?: boolean;
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
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
}

export interface SectionContentProps {
  isExpanded: boolean;
  isSectionDragging?: boolean;
  isAnySectionDragging?: boolean;
  isFieldDragging?: boolean;
  sectionId?: string;
  children?: ReactNode;
  hasFields?: boolean;
  onAddField?: () => void;
  onAddSection?: () => void; // For adding section after this section
}
