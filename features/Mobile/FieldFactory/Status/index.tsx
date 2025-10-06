/**
 * Status Field - Mobile optimized dropdown
 * Field Type: STATUS_ID
 * Field Key: statusId (system field)
 *
 * Figma reference: node-id 320-4865
 *
 * Special behavior:
 * - Background color changes based on selected status
 * - Empty state: #ffedea with "Select a status" placeholder
 * - Selected state: Uses status.color as background with white text
 * - Dropdown icon color matches text color
 */

import React, { useState } from 'react';
import { MenuItem, SelectChangeEvent } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Status, mockStatuses } from '../mockData';
import { StyledSelect } from './styles';
import { mobileTokens } from '@/theme/mobileTokens';

interface StatusFieldProps {
  field?: any;
  value?: number; // statusId
  onChange?: (value: number) => void;
  statuses?: Status[];
}

export const StatusField = ({
  field,
  value: propValue,
  onChange,
  statuses = mockStatuses,
}: StatusFieldProps) => {
  const [value, setValue] = useState<number | ''>(propValue || '');

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const newValue = event.target.value as number;
    setValue(newValue);
    onChange?.(newValue);
  };

  // Find selected status to get its color
  const selectedStatus = statuses.find((s) => s.id === value);
  const bgColor = selectedStatus ? selectedStatus.color : mobileTokens.colors.field.emptyStatus;
  const textColor = selectedStatus ? mobileTokens.colors.text.statusSelected : mobileTokens.colors.text.statusEmpty;

  return (
    <StyledSelect
      value={value}
      onChange={handleChange}
      displayEmpty
      bgcolor={bgColor}
      textcolor={textColor}
      IconComponent={ArrowDropDownIcon}
      renderValue={(selected) => {
        if (!selected) {
          return <span>Select a status</span>;
        }
        const status = statuses.find((s) => s.id === selected);
        return status?.name || 'Select a status';
      }}
    >
      {statuses.map((status) => (
        <MenuItem key={status.id} value={status.id}>
          {status.name}
        </MenuItem>
      ))}
    </StyledSelect>
  );
};
