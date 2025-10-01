'use client';

import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SectionHeader } from './SectionHeader';
import { SectionContent } from './SectionContent';
import { FieldProps } from '../Field';
import { SectionWrapper, SectionCard } from './styles';

export interface SectionProps {
  id: string;
  name: string;
  isExpanded: boolean;
  fieldCount?: number;
  isSystem?: boolean;
  onToggle: () => void;
  onRename: (newName: string) => void;
  onDelete?: () => void;
  children?: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  id,
  name,
  isExpanded,
  fieldCount = 0,
  isSystem = false,
  onToggle,
  onRename,
  onDelete,
  children,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    data: {
      type: 'section',
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <SectionWrapper
      ref={setNodeRef}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SectionCard>
        <SectionHeader
          name={name}
          isExpanded={isExpanded}
          fieldCount={fieldCount}
          isSystem={isSystem}
          isHovered={isHovered}
          isDragging={isDragging}
          onToggle={onToggle}
          onRename={onRename}
          onDelete={onDelete}
          dragListeners={listeners}
          dragAttributes={attributes}
        />
        {children}
      </SectionCard>
    </SectionWrapper>
  );
};
