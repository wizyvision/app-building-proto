import { FieldPreviewProps } from '../../types';
import { StyledTextField } from './styles';

export const TextField = ({ field }: FieldPreviewProps) => {
  return (
    <StyledTextField
      fullWidth
      size="small"
      variant="outlined"
      placeholder={field.isRequired ? `${field.label} *` : field.label}
      defaultValue={field.defaultValue || ''}
      inputProps={{
        minLength: field.validations?.minLength,
        maxLength: field.validations?.maxLength,
      }}
    />
  );
};
