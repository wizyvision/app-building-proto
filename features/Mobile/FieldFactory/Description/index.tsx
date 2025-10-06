/**
 * Description Field - Mobile optimized
 * Field Type: TEXT
 * Field Key: description (system field)
 *
 * Multiline text field with auto-expand
 * Figma reference: node-id 320-1778
 */

import React, { useState } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import CloseIcon from '@mui/icons-material/Close';
import { StyledTextField } from '../BaseField';
import { StyledInputAdornment, StyledIconButton } from '@/components/shared/MobileInputComponents';

interface DescriptionFieldProps {
  field?: any;
  value?: string;
  onChange?: (value: string) => void;
}

export const DescriptionField = ({ field, value: propValue, onChange }: DescriptionFieldProps) => {
  const [value, setValue] = useState(propValue || '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    onChange?.(newValue);
  };

  const handleClear = () => {
    setValue('');
    onChange?.('');
  };

  return (
    <StyledTextField
      multiline
      fullWidth
      variant="outlined"
      value={value}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <StyledInputAdornment position="end">
            <StyledIconButton size='small'>
              <MicIcon fontSize="small" />
            </StyledIconButton>
            {value && (
              <StyledIconButton size='small' onClick={handleClear}>
                <CloseIcon fontSize="small" />
              </StyledIconButton>
            )}
          </StyledInputAdornment>
        ),
      }}
    />
  );
};
