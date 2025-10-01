// ==============================|| OVERRIDES - AUTOCOMPLETE ||============================== //

import { Theme } from '@mui/material/styles';

export default function Autocomplete(theme: Theme) {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          margin: 0,
          paddingTop: 1,
          paddingBottom: 1,
          '& .MuiOutlinedInput-root': {
            padding: '3px 9px',
          },
          '& .MuiFilledInput-root': {
            padding: '3px 0',
          },
        },
        popupIndicator: {
          width: 'auto',
          height: 'auto',
        },
        clearIndicator: {
          width: 'auto',
          height: 'auto',
        },
        paper: {
          boxShadow: theme.customShadows.z2,
        },
      },
    },
  };
}
