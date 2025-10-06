'use client';

import React from 'react';
import { Typography, Box } from '@mui/material';
import { MobileFieldFactory } from '@/features/Mobile/FieldFactory';

/**
 * Mobile Field Components Showcase
 *
 * Displays all 9 mobile-optimized field components with FieldContainer wrapping
 */
export const MobileField: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 3 }}>
      <Typography variant="h4">Mobile Fields</Typography>
      <Typography variant="body2" color="text.secondary">
        Mobile-optimized field components with FieldContainer and 48x48px minimum touch targets
      </Typography>

      {/* Title Field */}
      <Box>
        <Typography variant="caption" display="block" gutterBottom>
          Field Type: STRING | Field Key: title (system field)
        </Typography>
        <MobileFieldFactory
          field={{
            dataType: 'STRING',
            fieldKey: 'title',
            label: 'Title Field',
            description: 'This is the title field description'
          }}
          showActions={true}
          hasMedia={true}
          hasRemarks={true}
          hasActions={true}
        />
      </Box>

      {/* Text Field */}
      <Box>
        <Typography variant="caption" display="block" gutterBottom>
          Field Type: STRING | Field Key: {'{prefix}{n}_{label}'} (custom field)
        </Typography>
        <MobileFieldFactory
          field={{
            dataType: 'STRING',
            fieldKey: 'f1_example',
            label: 'Text Field',
            description: 'This is a custom text field'
          }}
          showActions={true}
          hasMedia={true}
          hasRemarks={true}
          hasActions={true}
        />
      </Box>

      {/* Description Field */}
      <Box>
        <Typography variant="caption" display="block" gutterBottom>
          Field Type: TEXT | Field Key: description (system field)
        </Typography>
        <MobileFieldFactory
          field={{
            dataType: 'TEXT',
            fieldKey: 'description',
            label: 'Description Field',
            description: 'This is the description field'
          }}
          showActions={true}
          hasMedia={true}
          hasRemarks={true}
          hasActions={true}
        />
      </Box>

      {/* Paragraph Field */}
      <Box>
        <Typography variant="caption" display="block" gutterBottom>
          Field Type: TEXT | Field Key: {'{prefix}{n}_{label}'} (custom field)
        </Typography>
        <MobileFieldFactory
          field={{
            dataType: 'TEXT',
            fieldKey: 'f2_notes',
            label: 'Paragraph Field',
            description: 'This is a multi-line paragraph field'
          }}
          showActions={true}
          hasMedia={true}
          hasRemarks={true}
          hasActions={true}
        />
      </Box>

      {/* Privacy Field */}
      <Box>
        <Typography variant="caption" display="block" gutterBottom>
          Field Type: PRIVACY_ID | Field Key: privacyId (system field)
        </Typography>
        <MobileFieldFactory
          field={{
            dataType: 'PRIVACY_ID',
            fieldKey: 'privacyId',
            label: 'Privacy Field'
          }}
          showActions={true}
          hasMedia={true}
          hasRemarks={true}
          hasActions={true}
        />
      </Box>

      {/* Status Field */}
      <Box>
        <Typography variant="caption" display="block" gutterBottom>
          Field Type: STATUS_ID | Field Key: statusId (system field)
        </Typography>
        <MobileFieldFactory
          field={{
            dataType: 'STATUS_ID',
            fieldKey: 'statusId',
            label: 'Status Field',
            description: 'Select a status for this item'
          }}
          showActions={true}
          hasMedia={true}
          hasRemarks={true}
          hasActions={true}
        />
      </Box>

      {/* Signature Field */}
      <Box>
        <Typography variant="caption" display="block" gutterBottom>
          Field Type: SIGNATURE | Field Key: {'{prefix}{n}_{label}'} (custom field)
        </Typography>
        <MobileFieldFactory
          field={{
            dataType: 'SIGNATURE',
            fieldKey: 'f3_signature',
            label: 'Signature Field',
            description: 'Sign here using your finger or stylus'
          }}
          showActions={true}
          hasMedia={true}
          hasRemarks={true}
          hasActions={true}
        />
      </Box>

      {/* Select Field (Dropdown) */}
      <Box>
        <Typography variant="caption" display="block" gutterBottom>
          Field Type: SELECT | Field Key: {'{prefix}{n}_{label}'} (custom field)
        </Typography>
        <MobileFieldFactory
          field={{
            dataType: 'SELECT',
            fieldKey: 'c15_dropdown',
            label: 'Dropdown Field',
            description: 'Select an option from the dropdown'
          }}
          showActions={true}
          hasMedia={true}
          hasRemarks={true}
          hasActions={true}
        />
      </Box>

      {/* Number Field */}
      <Box>
        <Typography variant="caption" display="block" gutterBottom>
          Field Type: DOUBLE | Field Key: {'{prefix}{n}_{label}'} (custom field)
        </Typography>
        <MobileFieldFactory
          field={{
            dataType: 'DOUBLE',
            fieldKey: 'c15_number',
            label: 'Number Field',
            description: 'Enter a numeric value'
          }}
          showActions={true}
          hasMedia={true}
          hasRemarks={true}
          hasActions={true}
        />
      </Box>
    </Box>
  );
};
