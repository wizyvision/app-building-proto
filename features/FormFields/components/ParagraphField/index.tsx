import { FieldPreviewProps } from '../../types';
import { StyledTextArea } from './styles';

export const ParagraphField = ({ field }: FieldPreviewProps) => {
  return (
    <StyledTextArea
      fullWidth
      size="small"
      variant="outlined"
      multiline
      rows={4}
      placeholder={field.isRequired ? `${field.label} *` : field.label}
      defaultValue={field.defaultValue || ''}
      inputProps={{
        minLength: field.validations?.minLength,
        maxLength: field.validations?.maxLength,
      }}
    />
  );
};
