/**
 * Privacy Field - Mobile optimized dropdown
 * Field Type: PRIVACY_ID
 * Field Key: privacyId (system field)
 *
 * Figma reference: node-id 320-15644
 *
 * Features:
 * - Leading security icon
 * - Dropdown with privacy options
 * - Background: #ffedea
 * - Text placeholder: "Select a status"
 */

import React, { useState } from 'react';
import { MenuItem, SelectChangeEvent } from '@mui/material';
import PolicyIcon from '@mui/icons-material/Policy';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Privacy, mockPrivacies } from '../mockData';
import { StyledSelect, LeadingIconContainer } from './styles';

interface PrivacyFieldProps {
  field?: any;
  value?: number; // privacyId
  onChange?: (value: number) => void;
  privacies?: Privacy[];
}

export const PrivacyField = ({
  field,
  value: propValue,
  onChange,
  privacies = mockPrivacies,
}: PrivacyFieldProps) => {
  const [value, setValue] = useState<number | ''>(propValue || '');

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const newValue = event.target.value as number;
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <StyledSelect
      value={value}
      onChange={handleChange}
      displayEmpty
      IconComponent={ArrowDropDownIcon}
      startAdornment={
        <LeadingIconContainer>
          <PolicyIcon />
        </LeadingIconContainer>
      }
      renderValue={(selected) => {
        if (!selected) {
          return <span>Select a privacy</span>;
        }
        const privacy = privacies.find((p) => p.id === selected);
        return privacy?.displayName || 'Select a status';
      }}
    >
      {privacies.map((privacy) => (
        <MenuItem key={privacy.id} value={privacy.id}>
          {privacy.displayName}
        </MenuItem>
      ))}
    </StyledSelect>
  );
};
