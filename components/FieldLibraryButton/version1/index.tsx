import React from 'react';
import { ButtonContainer, IconContainer, LabelText, Divider } from './styles';

interface FieldLibraryButtonProps {
  id: string;
  label: string;
  type: 'system' | 'custom' | 'section';
  icon: React.ReactNode;
  onClick?: () => void;
}

export const FieldLibraryButton: React.FC<FieldLibraryButtonProps> = ({
  id,
  label,
  type,
  icon,
  onClick,
}) => {
  return (
    <ButtonContainer onClick={onClick} data-id={id} data-type={type}>
      <IconContainer>{icon}</IconContainer>
      <LabelText>{label}</LabelText>
    </ButtonContainer>
  );
};

export { Divider };
