/**
 * Status Field Styles
 * Mobile dropdown with dynamic background color based on selected status
 * Figma reference: node-id 320-4865
 */

import { styled } from '@mui/material/styles';
import { Select } from '@mui/material';
import { mobileTokens } from '@/theme/mobileTokens';

export const StyledSelect = styled(Select)<{ bgcolor?: string; textcolor?: string }>(
  ({ theme, bgcolor = mobileTokens.colors.field.emptyStatus, textcolor = mobileTokens.colors.text.statusEmpty }) => ({
    width: '100%',
    height: `${mobileTokens.field.height}px`,
    backgroundColor: bgcolor,
    borderRadius: `${mobileTokens.field.borderRadius}px`,

    '& .MuiSelect-select': {
      padding: `${theme.spacing(0.5)} 0 ${theme.spacing(0.5)} ${theme.spacing(2)}`,
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '20px',
      letterSpacing: '0.25px',
      color: textcolor,
      display: 'flex',
      alignItems: 'center',
      minHeight: '32px',
    },

    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },

    '&:hover .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },

    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },

    '& .MuiSelect-icon': {
      color: textcolor,
      right: theme.spacing(1),
    },
  })
);
