import { MenuItem } from '@mui/material';
import { FieldPreviewProps } from '../../types';
import { StyledSelect } from './styles';

export const SelectField = ({ field }: FieldPreviewProps) => {
  const options = field.selectOptions || [];
  const defaultVal = field.defaultValue || '';

  return (
    <StyledSelect
      fullWidth
      size="small"
      variant="outlined"
      defaultValue={defaultVal}
      displayEmpty
    >
      <MenuItem value="" disabled>
        {field.isRequired ? `Select ${field.label} *` : `Select ${field.label}`}
      </MenuItem>
      {options.map((option) => (
        <MenuItem key={option.id} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </StyledSelect>
  );
};
