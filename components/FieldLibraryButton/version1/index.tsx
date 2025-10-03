import React from 'react';
import { ButtonContainer, IconContainer, LabelText, Divider } from './styles';

interface FieldLibraryButtonProps {
  id: string;
  label: string;
  type: 'system' | 'custom' | 'section';
  icon: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const FieldLibraryButton: React.FC<FieldLibraryButtonProps> = ({
  id,
  label,
  type,
  icon,
  onClick,
  disabled = false,
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <ButtonContainer
      onClick={handleClick}
      data-id={id}
      data-type={type}
      disabled={disabled}
    >
      <IconContainer>{icon}</IconContainer>
      <LabelText>{label}</LabelText>
    </ButtonContainer>
  );
};

export { Divider };
