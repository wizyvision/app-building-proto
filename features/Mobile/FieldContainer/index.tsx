/**
 * FieldContainer - Mobile field container with label, description, actions, and attachments
 *
 * Structure from Figma (node-id: 318-5690):
 * - Field Label (required)
 * - Field Description (optional - only display if provided)
 * - Field from FieldFactory (children)
 * - Action Buttons: Media, Remarks, Actions (optional)
 * - Attachments container (hidden by default)
 *
 * Design Specs:
 * - Max width: 360px (mobile)
 * - Background: white
 * - Border radius: 8px
 * - Padding: 16px
 * - Gap: 12px between elements
 */

import React from 'react';
import { Actions } from './Actions';
import { Attachments } from './Attachments';
import {
  StyledPaper,
  LabelDescriptionContainer,
  FieldLabel,
  FieldDescription
} from './styles';

interface FieldContainerProps {
  label: string;
  description?: string;
  children: React.ReactNode;
  isRequired?: boolean;
  showActions?: boolean;
  hasMedia?: boolean;
  hasRemarks?: boolean;
  hasActions?: boolean;
  showAttachments?: boolean;
}

export const FieldContainer = ({
  label,
  description,
  children,
  isRequired = false,
  showActions = false,
  hasMedia = false,
  hasRemarks = false,
  hasActions = false,
  showAttachments = false
}: FieldContainerProps) => {
  return (
    <StyledPaper elevation={0} data-name="FieldContainer">
      {/* Field Label & Description */}
      <LabelDescriptionContainer>
        <FieldLabel>
          {label}
          {isRequired && <span style={{ color: '#eb4236' }}> *</span>}
        </FieldLabel>
        {description && <FieldDescription>{description}</FieldDescription>}
      </LabelDescriptionContainer>

      {/* Field from FieldFactory */}
      {children}

      {/* Action Buttons - hidden for now */}
      {false && showActions && (
        <Actions hasMedia={hasMedia} hasRemarks={hasRemarks} hasActions={hasActions} />
      )}

      {/* Attachments Container - hidden for now */}
      {false && <Attachments show={showAttachments} />}
    </StyledPaper>
  );
};
