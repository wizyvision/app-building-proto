/**
 * Description/Paragraph Field Styles
 * Multiline text field for mobile - Figma node-id: 320-1778
 *
 * Exact Figma specs:
 * - Background: #faf3f3
 * - Border: 1px solid #eb4236 (2px bottom when focused)
 * - Border radius: 4px
 * - Padding: 4px 0px 4px 16px
 * - Height: 40px
 * - Icon size: 48x48px (with 8px padding = 24px icon)
 */

import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';
import { designTokens } from '@/theme/designTokens';

export const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',

  '& .MuiInputBase-root': {
    backgroundColor: '#faf3f3',
    borderRadius: `${designTokens.borderRadius.button}px`,
    padding: `${theme.spacing(0.5)} 0 ${theme.spacing(0.5)} ${theme.spacing(2)}`,
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
  },

  // When there's value, adjust font size to 14px
  '& .MuiInputBase-input:not(:placeholder-shown)': {
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
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
}));
