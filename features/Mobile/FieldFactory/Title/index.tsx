/**
 * Title Field - Mobile optimized
 * Field Type: STRING
 * Field Key: title (system field)
 *
 * Single line text field with mic and clear icons
 * Figma reference: node-id 320-1778 (same as Description but without multiline)
 */

import React, { useState } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import CloseIcon from '@mui/icons-material/Close';
import { StyledTextField } from '../BaseField';
import { StyledInputAdornment, StyledIconButton } from '@/components/shared/MobileInputComponents';

interface TitleFieldProps {
  field?: any;
  value?: string;
  onChange?: (value: string) => void;
}

export const TitleField = ({ field, value: propValue, onChange }: TitleFieldProps) => {
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
      fullWidth
      variant="outlined"
      value={value}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <StyledInputAdornment position="end">
            <StyledIconButton size="small">
              <MicIcon fontSize="small" />
            </StyledIconButton>
            {value && (
              <StyledIconButton size="small" onClick={handleClear}>
                <CloseIcon fontSize="small" />
              </StyledIconButton>
            )}
          </StyledInputAdornment>
        ),
      }}
    />
  );
};
