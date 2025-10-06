/**
 * Number Field Styles
 * Number input field for mobile - Figma node-id: 327-11034
 *
 * Exact Figma specs:
 * - Background: #faf3f3
 * - Border: 1px solid #eb4236 (2px bottom when focused)
 * - Border radius: 4px
 * - Padding: 4px 16px 4px 0px (icon on left, padding on right)
 * - Height: 40px
 * - Input type: number (only numeric input allowed)
 */

import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';
import { designTokens } from '@/theme/designTokens';

export const StyledNumberField = styled(TextField)(({ theme }) => ({
  width: '100%',

  '& .MuiInputBase-root': {
    backgroundColor: '#faf3f3',
    borderRadius: `${designTokens.borderRadius.button}px`,
    padding: ` ${theme.spacing(1)}`,
    alignItems: 'center',
    height: '40px',
    minHeight: '40px',
  },

  '& .MuiInputBase-input': {
    padding: 0,
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '0.5px',
    color: '#1d1b20',

    // Remove number input spinners
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
    },
    '&[type=number]': {
      MozAppearance: 'textfield',
    },
  },

  // Outlined variant
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: `${designTokens.borderRadius.button}px`,
    },
    '&:hover fieldset': {
      border: `1px solid ${theme.palette.primary.main}`,
    },
    '&.Mui-focused': {
      boxShadow: 'none',
      '& fieldset': {
        border: 0,
        borderBottom: `2px solid ${theme.palette.primary.main}`,
        borderRadius: `${designTokens.borderRadius.button}px ${designTokens.borderRadius.button}px 0 0`,
        boxShadow: 'none',
      },
    },
  },

  // Remove label
  '& .MuiInputLabel-root': {
    display: 'none',
  },

  // Icon positioning (left side)
  '& .MuiInputAdornment-root': {
    marginLeft: 0,
    marginRight: '8px',
  },
}));
