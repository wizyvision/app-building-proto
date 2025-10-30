/**
 * Minimal Field Component for Testing hello-pangea/dnd
 * This is a stripped-down version to verify drag-and-drop works
 */

'use client';

import React from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';
import { Box } from '@mui/material';

interface FieldMinimalProps {
  id: string;
  label: string;
  draggableId: string;
  index: number;
}

export const FieldMinimal: React.FC<FieldMinimalProps> = ({ id, label, draggableId, index }) => {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            padding: '16px',
            margin: '8px 0',
            backgroundColor: snapshot.isDragging ? '#e3f2fd' : 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'grab',
            userSelect: 'none',
          }}
        >
          {label}
        </div>
      )}
    </Draggable>
  );
};
