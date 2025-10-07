import { styled } from '@mui/material/styles';
import { Box, Typography, IconButton } from '@mui/material';

/**
 * Mobile Section Styled Components
 *
 * Figma Reference: node-id 318-11610 (State=Closed and State=Open)
 *
 * Design Specs (from Figma):
 * - Background: #ffedea (light pink/peach)
 * - Height (collapsed): 48px min-height
 * - Border radius: 8px
 * - Padding: 4px 8px 4px 4px
 *
 * Header:
 * - Leading icon: 24x24px navigate_next icon
 * - Title: Roboto Regular, 16px, line-height 24px, tracking 0.5px, color #1d1b20
 * - Completion text: Roboto Regular, 14px, line-height 20px, tracking 0.25px, color #49454f (right aligned)
 *
 * Content:
 * - Background: Same as header (#ffedea) at 80% opacity
 * - Padding: 10px (not 16px)
 * - Gap between fields: 16px
 */

export const SectionContainer = styled(Box)({
  backgroundColor: '#ffedea',
  borderRadius: '8px',
  overflow: 'hidden',
  width: '100%',
});

export const SectionHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: '48px',
  padding: '4px 8px 4px 4px',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
});

export const HeaderLeft = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  gap: '4px',
  minWidth: 0, // Allow text to truncate
});

export const ToggleButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'expanded',
})<{ expanded: boolean }>(({ expanded }) => ({
  padding: 0,
  width: '24px',
  height: '24px',
  transition: 'transform 0.2s',
  transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
}));

export const SectionTitle = styled(Typography)({
  fontFamily: 'Roboto, sans-serif',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '24px',
  letterSpacing: '0.5px',
  color: '#1d1b20',
  flex: 1,
  minWidth: 0,
});

export const CompletionText = styled(Typography)({
  fontFamily: 'Roboto, sans-serif',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '20px',
  letterSpacing: '0.25px',
  color: '#49454f',
  textAlign: 'right',
  marginLeft: '8px',
  flexShrink: 0,
});

export const SectionContent = styled(Box)({
  backgroundColor: 'rgba(255, 237, 234, 0.8)', // #ffedea at 80% opacity
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});
