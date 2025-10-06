/**
 * Select Field Styles
 * Mobile optimized dropdown - Figma node-id: 327-9887 (more than 3 options), 327-11029 (3 or fewer options)
 *
 * Design specs:
 * - More than 3 options: Native dropdown with Material UI Select
 * - 3 or fewer options: Button group with rounded buttons
 * - Background: #fadcd8 (empty), #eb4236 (selected for button group)
 * - Border: 1px solid #eb4236
 * - Border radius: 4px (dropdown), 8px (buttons)
 * - Padding: 16px (horizontal)
 * - Height: 40px (dropdown)
 */

import { styled } from '@mui/material/styles';
import { Select, Button } from '@mui/material';
import { mobileTokens } from '@/theme/mobileTokens';

// Native dropdown for > 3 options
export const StyledSelect = styled(Select)<{ bgcolor?: string; textcolor?: string; hasvalue?: string }>(
  ({ theme, bgcolor, textcolor, hasvalue }) => ({
    width: '100%',
    backgroundColor: bgcolor || mobileTokens.colors.field.emptyStatus,
    borderRadius: `${mobileTokens.field.borderRadius}px`,
    height: `${mobileTokens.field.height}px`,
    boxShadow: '0px 1.5px 4px 0px rgba(0, 0, 0, 0.25)',

    '& .MuiSelect-select': {
      padding: `${theme.spacing(0.5)} 0 ${theme.spacing(0.5)} ${theme.spacing(2)}`,
      display: 'flex',
      alignItems: 'center',
      fontSize: hasvalue === 'true' ? '16px' : '14px',
      fontWeight: 400,
      lineHeight: hasvalue === 'true' ? '24px' : '20px',
      letterSpacing: hasvalue === 'true' ? '0.5px' : '0.25px',
      color: textcolor || '#49454f',
      minHeight: '32px',
    },

    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },

    '&:hover .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },

    '&.Mui-focused': {
      boxShadow: '0px 1.5px 4px 0px rgba(0, 0, 0, 0.25)',
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
    },

    '& .MuiSelect-icon': {
      color: theme.palette.primary[8],
      right: theme.spacing(1),
      width: `${mobileTokens.iconButton.iconSize}px`,
      height: `${mobileTokens.iconButton.iconSize}px`,
    },
  })
);

// Button for <= 3 options
export const OptionButton = styled(Button)<{ isSelected?: boolean }>(({ theme, isSelected }) => ({
  flex: 1,
  height: '40px',
  borderRadius: '8px',
  padding: '10px 16px',
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '20px',
  letterSpacing: '0.1px',
  border: isSelected ? 'none' : '1px solid #e4beb8',
  backgroundColor: isSelected ? theme.palette.primary.main : 'transparent',
  color: isSelected ? '#FFFFFF' : '#5b403c',
  minWidth: '44px',
  minHeight: '44px',

  '&:hover': {
    backgroundColor: isSelected ? theme.palette.primary.main : 'rgba(235, 66, 54, 0.04)',
    border: isSelected ? 'none' : '1px solid #e4beb8',
  },

  '&:active': {
    backgroundColor: isSelected ? theme.palette.primary.main : 'rgba(235, 66, 54, 0.08)',
  },
}));

export const ButtonGroup = styled('div')({
  display: 'flex',
  gap: '8px',
  width: '100%',
});
