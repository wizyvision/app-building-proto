import { FieldPreviewProps } from '../../types';
import { UnsupportedContainer, UnsupportedText } from './styles';

export const UnsupportedField = ({ field }: FieldPreviewProps) => {
  return (
    <UnsupportedContainer>
      <UnsupportedText>
        Unsupported field type: {field.dataType}
      </UnsupportedText>
    </UnsupportedContainer>
  );
};
