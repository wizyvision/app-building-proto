/**
 * Paragraph Field - Mobile optimized
 * Field Type: TEXT
 * Field Key: {prefix}{n}_{label} (custom field)
 *
 * Shares the same multiline text field component as Description
 * Figma reference: node-id 320-1778
 */

import React from 'react';
import { DescriptionField } from '../Description';

interface ParagraphFieldProps {
  field?: any;
  value?: string;
  onChange?: (value: string) => void;
}

export const ParagraphField = ({ field, value, onChange }: ParagraphFieldProps) => {
  return <DescriptionField field={field} value={value} onChange={onChange} />;
};
