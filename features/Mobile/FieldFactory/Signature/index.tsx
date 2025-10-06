/**
 * Signature Field - Mobile optimized
 * Field Type: SIGNATURE
 * Field Key: {prefix}{n}_{label} (custom field)
 *
 * Figma reference: node-id 322-7480
 *
 * Features:
 * - Canvas/display area (144px height)
 * - Attach button (always visible)
 * - Remove button (only when signature exists)
 * - Mobile: drawable canvas
 * - Web: displays signature image
 */

import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import {
  SignatureContainer,
  SignatureCanvas,
  ActionsRow,
  RemoveButton,
  AttachButton,
} from './styles';

interface SignatureFieldProps {
  field?: any;
  value?: string; // signature image URL or data
  onChange?: (value: string | null) => void;
}

export const SignatureField = ({
  field,
  value: propValue,
  onChange,
}: SignatureFieldProps) => {
  const [signature, setSignature] = useState<string | null>(propValue || null);

  const handleAttach = () => {
    // TODO: In mobile, open drawing canvas
    // For now, just a placeholder
    console.log('Open signature canvas');
  };

  const handleRemove = () => {
    setSignature(null);
    onChange?.(null);
  };

  return (
    <SignatureContainer>
      <SignatureCanvas onClick={handleAttach}>
        {signature && (
          <img
            src={signature}
            alt="Signature"
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
          />
        )}
      </SignatureCanvas>

      <ActionsRow>
        {signature && <RemoveButton onClick={handleRemove}>Remove</RemoveButton>}
        <AttachButton startIcon={<EditIcon sx={{ width: 18, height: 18 }} />} onClick={handleAttach}>
          Attach
        </AttachButton>
      </ActionsRow>
    </SignatureContainer>
  );
};
