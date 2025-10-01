'use client';

import React from 'react';
import { Field } from '@/components/Field/Field';
import {
  StorySection,
  ShowcaseGrid,
  StoryTitle,
  StoryDescription,
} from './styles';

const mockFields = [
  { id: 'showcase-1', label: 'Text Field', type: 'text' },
  { id: 'showcase-2', label: 'Email Field', type: 'email' },
  { id: 'showcase-3', label: 'Date Field', type: 'date' },
  { id: 'showcase-4', label: 'Dropdown Field', type: 'dropdown' },
  { id: 'showcase-5', label: 'Phone Field', type: 'tel' },
  { id: 'showcase-6', label: 'Notes Field', type: 'textarea' },
];

export const FieldShowcase: React.FC = () => {
  return (
    <StorySection elevation={0}>
      <StoryTitle variant="h5">
        Field Component
      </StoryTitle>
      <StoryDescription variant="body2">
        • Click field labels to edit inline
        <br />
        • Hover to reveal drag handles and action buttons
        <br />• Interact with field-specific controls
      </StoryDescription>

      <ShowcaseGrid>
        {mockFields.map((field) => (
          <Field
            key={field.id}
            id={field.id}
            label={field.label}
            type={field.type}
            onEditLabel={(newLabel: string) =>
              console.log('Edit label:', field.id, newLabel)
            }
            onEdit={() => console.log('Edit field:', field.id)}
            onMenuOpen={(event: React.MouseEvent<HTMLButtonElement>) =>
              console.log('Open menu:', field.id)
            }
          />
        ))}
      </ShowcaseGrid>
    </StorySection>
  );
};