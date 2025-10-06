/**
 * Mobile Input Components - Shared styled components for mobile field inputs
 *
 * These components follow Figma mobile design specifications:
 * - Icon buttons: 40x40px (adapts to field height, 8px padding = 24px icon)
 * - Input adornments: 40px height (adapts to field height)
 *
 * Usage: Import these styled components in mobile field components
 */

import { styled } from '@mui/material/styles';
import { InputAdornment, IconButton } from '@mui/material';

export const StyledInputAdornment = styled(InputAdornment)({
  height: '40px',
  maxHeight: '40px',
  margin: 0,
  padding: 0,
});

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  width: '40px',
  height: '40px',
  color: theme.palette.primary.main,
  padding: '8px',
  borderRadius: '100px',
  margin: 0,
}));
