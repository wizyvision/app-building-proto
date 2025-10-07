/**
 * MobileFormPreview Styled Components
 *
 * Styling for mobile preview container following WizyVision guidelines
 * - All styling uses styled() (ZERO sx props)
 * - Theme-based values only
 * - Mobile-optimized layout
 * - Responsive scaling for different screen sizes
 */

import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

/**
 * Container that centers the mobile device frame
 * Responsive scaling ensures device fits on all screen sizes (tablet+)
 */
export const MobilePreviewContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '100%',
  height: '100vh',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background[3], // #f5f5f5
  overflow: 'auto',
}));

/**
 * Wrapper that applies responsive scaling to mobile device
 * Scales down on smaller screens to ensure device fits in viewport
 */
export const DeviceScaleWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transform: 'scale(0.65)',
  transformOrigin: 'top center',
  // Responsive scaling for different screen sizes
  '@media (min-width: 1024px)': {
    transform: 'scale(0.7)',
  },
  '@media (min-width: 1440px)': {
    transform: 'scale(0.8)',
  },
  '@media (min-width: 1920px)': {
    transform: 'scale(0.9)',
  },
});

/**
 * Label/title above the mobile device frame
 */
export const PreviewLabel = styled(Box)(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize, // 14px
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
  textAlign: 'center',
}));

/**
 * Section header in mobile preview (simplified version)
 * Follows mobile design patterns - less ornate than web version
 */
export const MobileSectionHeader = styled(Box)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '20px',
  letterSpacing: '0.1px',
  color: theme.palette.text.primary,
  padding: theme.spacing(1.5, 0),
  backgroundColor: theme.palette.background[1], // #ffffff
  borderBottom: `1px solid ${theme.palette.grey[300]}`,
}));

/**
 * Fields container within each section
 */
export const FieldsContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '11px', // Exact spacing from mobile design
  width: '100%',
});
