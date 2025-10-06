/**
 * FieldContainer Styles
 * Mobile-optimized field container styling following Figma design (node-id: 318-5690)
 */

import { styled } from '@mui/material/styles';
import { Paper, Box, Typography } from '@mui/material';

export const StyledPaper = styled(Paper)({
  maxWidth: '360px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  alignItems: 'flex-start',
  width: '100%',
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.12)'
});

export const LabelDescriptionContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  alignItems: 'flex-start',
  width: '100%'
});

export const FieldLabel = styled(Typography)({
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '20px',
  letterSpacing: '0.1px',
  color: '#000000',
  fontVariationSettings: "'wdth' 100"
});

export const FieldDescription = styled(Typography)({
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '16px',
  letterSpacing: '0.4px',
  color: 'rgba(0, 0, 0, 0.65)',
  fontVariationSettings: "'wdth' 100"
});
