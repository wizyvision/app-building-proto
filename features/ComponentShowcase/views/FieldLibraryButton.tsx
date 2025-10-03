'use client';

import React from 'react';
import { Box } from '@mui/material';
import { FieldLibraryButton as FieldLibraryButtonV1, Divider } from '@/components/FieldLibraryButton/version1';
import { iconMapping } from '@/constants/iconMapping';
import {
  StorySection,
  StoryTitle,
  StoryDescription,
} from '../styles';

const fieldLibraryItems = [
  { id: 'text', label: 'Description', type: 'TEXT', category: 'custom' },
  { id: 'date', label: 'Date', type: 'DATE', category: 'custom' },
  { id: 'ocr', label: 'Extracted Texts', type: 'OCR', category: 'custom' },
  { id: 'tags', label: 'Tags', type: 'TAGS', category: 'custom' },
  { id: 'string', label: 'Text Field', type: 'STRING', category: 'custom' },
  { id: 'double', label: 'Number', type: 'DOUBLE', category: 'custom' },
  { id: 'boolean', label: 'Toggle', type: 'BOOLEAN', category: 'custom' },
  { id: 'checkbox', label: 'Checkbox', type: 'CHECKBOX', category: 'custom' },
  { id: 'select', label: 'Dropdown', type: 'SELECT', category: 'custom' },
  { id: 'location', label: 'Location', type: 'LOCATION', category: 'custom' },
  { id: 'people', label: 'People', type: 'PEOPLE', category: 'custom' },
  { id: 'privacy_id', label: 'Privacy', type: 'PRIVACY_ID', category: 'custom' },
  { id: 'people_list', label: 'People List', type: 'PEOPLE_LIST', category: 'custom' },
  { id: 'signature', label: 'Signature', type: 'SIGNATURE', category: 'custom' },
  { id: 'time', label: 'Time', type: 'TIME', category: 'custom' },
  { id: 'file_list', label: 'Custom Files', type: 'FILE_LIST', category: 'custom' },
  { id: 'aris_cart', label: 'Reference List', type: 'ARIS_CART', category: 'custom' },
  { id: 'reference', label: 'Reference', type: 'REFERENCE', category: 'custom' },
  { id: 'schedule', label: 'Schedule', type: 'SCHEDULE', category: 'custom' },
  { id: 'tags_dropdown', label: 'Tags Dropdown', type: 'TAGS_DROPDOWN', category: 'custom' },
  { id: 'multiple_choice', label: 'Multiple Choice', type: 'MULTIPLE_CHOICE', category: 'custom' },
];

export const FieldLibraryButton: React.FC = () => {
  return (
    <StorySection elevation={0}>
      <StoryTitle variant="h5">Field Library Button</StoryTitle>
      <StoryDescription variant="body2">
        Draggable button components for Field Library with icons
      </StoryDescription>

      <Box maxWidth="400px" mt={3} >
        {fieldLibraryItems.map((item, index) => {
          const IconComponent = iconMapping[item.type as keyof typeof iconMapping];

          return (
            <React.Fragment key={item.id}>
              <FieldLibraryButtonV1
                id={item.id}
                label={item.label}
                type={item.category as 'system' | 'custom' | 'section'}
                icon={IconComponent ? <IconComponent /> : null}
                onClick={() => console.log('Clicked:', item.label)}
              />
              {/* Add divider every 5 items for visual grouping */}
              {(index + 1) % 5 === 0 && index !== fieldLibraryItems.length - 1 && (
                <Divider />
              )}
            </React.Fragment>
          );
        })}
      </Box>
    </StorySection>
  );
};
