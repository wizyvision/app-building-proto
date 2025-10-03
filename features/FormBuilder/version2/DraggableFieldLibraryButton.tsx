'use client';

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Tooltip } from '@mui/material';
import { FieldLibraryButton as FieldLibraryButtonV1 } from '@/components/FieldLibraryButton/version1';

interface DraggableFieldLibraryButtonProps {
  id: string;
  label: string;
  type: 'system' | 'custom' | 'section';
  icon: React.ReactNode;
  dataType: string;
  isSupported: boolean;
  disabledReason?: string;
}

export const DraggableFieldLibraryButton: React.FC<DraggableFieldLibraryButtonProps> = ({
  id,
  label,
  type,
  icon,
  dataType,
  isSupported,
  disabledReason,
}) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `library-${id}`,
    data: {
      type: type === 'section' ? 'library-section' : 'library-field',
      item: {
        id,
        label,
        dataType,
      },
    },
    disabled: !isSupported,
  });

  const button = (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: isSupported ? 'grab' : 'not-allowed',
      }}
    >
      <FieldLibraryButtonV1
        id={id}
        label={label}
        type={type}
        icon={icon}
        disabled={!isSupported}
      />
    </div>
  );

  if (!isSupported) {
    return (
      <Tooltip title={disabledReason || "Not yet supported"} placement="right">
        {button}
      </Tooltip>
    );
  }

  return button;
};
