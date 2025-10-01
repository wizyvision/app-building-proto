// material-ui
import { Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - TOGGLE BUTTON ||============================== //

export default function ToggleButton(theme: Theme) {
  return {
    MuiToggleButton: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            pointerEvents: 'none',
            borderColor: theme.palette.divider,
            color: theme.palette.text.disabled,
          },
          '&:focus-visible': {
            outline: `2px solid ${theme.palette.secondary.dark}`,
            outlineOffset: 2,
          },
          '&.Mui-selected': {
            backgroundColor: `${theme.palette.primary.main}20`,
            '&:hover': {
              backgroundColor: `${theme.palette.primary.dark}20`,
            },
          },
        },
      },
    },
  };
}
