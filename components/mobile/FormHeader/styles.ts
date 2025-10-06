import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

/**
 * FormHeader Styled Components
 *
 * Figma Reference: node-id 323-9661
 *
 * Design Specs (from Figma):
 * - Background: white (#ffffff)
 * - Padding: 16px
 * - Border radius: 8px
 * - Gap between sections: 6px
 *
 * Typography:
 * - App Label: Roboto Medium, 14px, line-height 20px, tracking 0.1px
 * - Case Number: Roboto Regular, 24px, line-height 32px
 * - Timestamps: Roboto Light, 12px, line-height 20px, tracking 0.25px, color #1d1b20
 */

export const HeaderContainer = styled(Box)({
  backgroundColor: '#ffffff',
  padding: '16px',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  width: '100%',
});

export const AppLabel = styled(Typography)({
  fontFamily: 'Roboto, sans-serif',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '20px',
  letterSpacing: '0.1px',
  color: '#000000',
});

export const CaseNumber = styled(Typography)({
  fontFamily: 'Roboto, sans-serif',
  fontWeight: 400,
  fontSize: '24px',
  lineHeight: '32px',
  color: '#000000',
});

export const TimestampContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '0px',
});

export const Timestamp = styled(Typography)({
  fontFamily: 'Roboto, sans-serif',
  fontWeight: 300,
  fontSize: '12px',
  lineHeight: '20px',
  letterSpacing: '0.25px',
  color: '#1d1b20',
});
