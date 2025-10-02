import { FieldPreviewProps } from '../../types';
import { StyledTextField } from './styles';

export const DateField = ({ field }: FieldPreviewProps) => {
  return (
    <StyledTextField
      fullWidth
      size="small"
      variant="outlined"
      type="date"
      defaultValue={field.defaultValue || ''}
      InputLabelProps={{
        shrink: true,
      }}
      placeholder={field.isRequired ? `${field.label} *` : field.label}
    />
  );
};
