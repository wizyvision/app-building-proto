/**
 * Privacy Field Styles
 * Mobile dropdown with leading security icon
 * Figma reference: node-id 320-15644
 */

import { styled } from '@mui/material/styles';
import { Select } from '@mui/material';
import { mobileTokens } from '@/theme/mobileTokens';

export const StyledSelect = styled(Select)(({ theme }) => ({
  width: '100%',
  height: `${mobileTokens.field.height}px`,
  backgroundColor: mobileTokens.colors.field.emptyStatus,
  borderRadius: `${mobileTokens.field.borderRadius}px`,
  boxShadow: '0px 1.5px 4px 0px rgba(0, 0, 0, 0.25)',

  '& .MuiSelect-select': {
    padding: `${theme.spacing(0.5)} 0 ${theme.spacing(0.5)} 0`,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '0.25px',
    color: mobileTokens.colors.text.statusEmpty,
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
}));

export const LeadingIconContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: theme.spacing(0),
  paddingRight: theme.spacing(0.5),
  height: `${mobileTokens.field.height}px`,
  color: theme.palette.primary[8],
}));
