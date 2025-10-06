/**
 * MobileFieldFactory - Mobile-optimized field rendering factory
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Uses familiar form field patterns with mobile-optimized variations.
 *   Field types map to expected mobile input controls (text fields, signature pads, dropdowns).
 *
 * - Fitts's Law: All mobile fields implement minimum 44x44px touch targets (prefer 48x48px).
 *   Larger input areas and buttons positioned for thumb-friendly access on mobile devices.
 *
 * - Hick's Law: Factory pattern simplifies field selection logic, mapping data types to
 *   appropriate mobile field components without overwhelming the consumer with choices.
 *
 * ARCHITECTURE:
 * - Centralized field rendering logic based on FieldData.dataType
 * - Mobile-specific optimizations: larger touch targets, optimized keyboards, gestures
 * - Each field component handles its own mobile-specific interactions
 * - Falls back to TextField for unknown types
 *
 * MOBILE OPTIMIZATIONS:
 * - Touch-friendly input controls (48x48px minimum)
 * - Native mobile keyboard types (email, tel, number)
 * - Gesture support where applicable (signature field)
 * - Reduced cognitive load with clear visual hierarchy
 * - Optimized for one-handed operation where possible
 */

import React from 'react';
import { TitleField } from './Title';
import { TextField } from './Text';
import { DescriptionField } from './Description';
import { ParagraphField } from './Paragraph';
import { SignatureField } from './Signature';
import { PrivacyField } from './Privacy';
import { StatusField } from './Status';
import { FieldContainer } from '@/features/Mobile/FieldContainer';

interface MobileFieldProps {
  field?: any;
}

/**
 * Field Registry - Maps field types to their corresponding mobile components
 *
 * Field Type Mappings:
 * - STRING: Text, Title (differentiated by fieldKey: title vs {prefix}{n}_{label})
 * - TEXT: Description, Paragraph (differentiated by fieldKey: description vs {prefix}{n}_{label})
 * - PRIVACY_ID: Privacy (fieldKey: privacyId)
 * - SIGNATURE: Signature (fieldKey: {prefix}{n}_{label})
 * - STATUS_ID: Status (fieldKey: statusId)
 */
export const fieldRegistry: Record<string, React.FC<MobileFieldProps>> = {
  STRING: TextField,
  TEXT: DescriptionField,
  PRIVACY_ID: PrivacyField,
  SIGNATURE: SignatureField,
  STATUS_ID: StatusField,
};

interface MobileFieldFactoryProps {
  field: any;
  showActions?: boolean;
  hasMedia?: boolean;
  hasRemarks?: boolean;
  hasActions?: boolean;
  showAttachments?: boolean;
}

export const MobileFieldFactory = ({
  field,
  showActions = false,
  hasMedia = false,
  hasRemarks = false,
  hasActions = false,
  showAttachments = false
}: MobileFieldFactoryProps) => {
  const fieldType = field?.dataType?.toUpperCase() || 'STRING';
  const fieldKey = field?.fieldKey || '';
  const label = field?.label || 'Field Label';
  const description = field?.description;

  // Handle field type disambiguation based on fieldKey
  let FieldComponent = fieldRegistry[fieldType] || TextField;

  // STRING type: Title (system) vs Text (custom)
  if (fieldType === 'STRING' && fieldKey === 'title') {
    FieldComponent = TitleField;
  }

  // TEXT type: Description (system) vs Paragraph (custom)
  if (fieldType === 'TEXT') {
    if (fieldKey === 'description') {
      FieldComponent = DescriptionField;
    } else {
      FieldComponent = ParagraphField;
    }
  }

  return (
    <FieldContainer
      label={label}
      description={description}
      showActions={showActions}
      hasMedia={hasMedia}
      hasRemarks={hasRemarks}
      hasActions={hasActions}
      showAttachments={showAttachments}
    >
      <FieldComponent field={field} />
    </FieldContainer>
  );
};
