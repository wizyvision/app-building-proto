/**
 * Select Field - Mobile optimized dropdown
 * Field Type: SELECT
 * Field Key: {prefix}{n}_{label} (custom field)
 *
 * Figma references:
 * - More than 3 options: node-id 327-9887 (native dropdown)
 * - 3 or fewer options: node-id 327-11029 (button group)
 *
 * Special behavior:
 * - If selectOptions.length > 3: Shows native dropdown
 * - If selectOptions.length <= 3: Shows button group
 * - Empty state: #fadcd8 with placeholder text
 * - Selected state (dropdown): Shows selected value
 * - Selected state (buttons): Highlighted button with primary color
 */

import React, { useState } from 'react';
import { MenuItem, SelectChangeEvent } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { SelectOption, mockSelectOptions } from '../mockData';
import { StyledSelect, OptionButton, ButtonGroup } from './styles';
import { mobileTokens } from '@/theme/mobileTokens';

interface SelectFieldProps {
  field?: any;
  value?: string; // Selected option id
  onChange?: (value: string) => void;
  selectOptions?: SelectOption[];
}

export const SelectField = ({
  field,
  value: propValue,
  onChange,
  selectOptions = mockSelectOptions,
}: SelectFieldProps) => {
  const [value, setValue] = useState<string>(propValue || '');

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const newValue = event.target.value as string;
    setValue(newValue);
    onChange?.(newValue);
  };

  const handleButtonClick = (optionId: string) => {
    setValue(optionId);
    onChange?.(optionId);
  };

  // Determine if we should show native dropdown or button group
  const useDropdown = selectOptions.length > 3;

  // For dropdown: determine colors
  const selectedOption = selectOptions.find((opt) => opt.id === value);
  const bgColor = value ? mobileTokens.colors.field.emptyStatus : mobileTokens.colors.field.emptyStatus;
  const textColor = value ? '#49454f' : '#49454f';

  if (useDropdown) {
    // Native dropdown for > 3 options
    return (
      <StyledSelect
        value={value}
        onChange={handleChange}
        displayEmpty
        bgcolor={bgColor}
        textcolor={textColor}
        hasvalue={value ? 'true' : 'false'}
        IconComponent={ArrowDropDownIcon}
        renderValue={(selected) => {
          if (!selected) {
            return <span>{field?.label || 'Dropdown'}</span>;
          }
          const option = selectOptions.find((opt) => opt.id === selected);
          return option?.value || field?.label || 'Dropdown';
        }}
      >
        {selectOptions.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.value}
          </MenuItem>
        ))}
      </StyledSelect>
    );
  }

  // Button group for <= 3 options
  return (
    <ButtonGroup>
      {selectOptions.map((option) => (
        <OptionButton
          key={option.id}
          isSelected={value === option.id}
          onClick={() => handleButtonClick(option.id)}
        >
          {option.value}
        </OptionButton>
      ))}
    </ButtonGroup>
  );
};
