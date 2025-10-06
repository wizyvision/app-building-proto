import { styled } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';

/**
 * Mobile AppBar Styled Components
 *
 * Design Specs (from screenshot):
 * - Height: 56px
 * - Background: white
 * - Contains back button (left) and menu button (right, 3 dots)
 * - Icons: 24x24px
 * - Padding: 8px horizontal
 */

export const AppBarContainer = styled(Box)({
  height: '56px',
  backgroundColor: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 8px',
  borderBottom: '1px solid #f0f0f0',
  width: '100%',
  flexShrink: 0,
});

export const AppBarButton = styled(IconButton)({
  width: '48px',
  height: '48px',
  color: '#000000',
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
});
