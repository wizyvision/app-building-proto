import { FormControlLabel } from '@mui/material';
import { FieldPreviewProps } from '../../types';
import { StyledCheckbox, CheckboxContainer } from './styles';

export const BooleanField = ({ field }: FieldPreviewProps) => {
  const defaultChecked = field.defaultValue === true || field.defaultValue === 'true';

  return (
    <CheckboxContainer>
      <FormControlLabel
        control={<StyledCheckbox defaultChecked={defaultChecked} />}
        label={field.isRequired ? `${field.label} *` : field.label}
      />
    </CheckboxContainer>
  );
};
