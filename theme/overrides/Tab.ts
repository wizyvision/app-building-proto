// material-ui
import { alpha, Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - TAB ||============================== //

export default function Tab(theme: Theme) {
  return {
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 46,
          color: theme.palette.text.primary,
          borderRadius: 4,
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
            color: theme.palette.primary.main,
          },
          '&:focus-visible': {
            borderRadius: 4,
            outline: `2px solid ${theme.palette.secondary.dark}`,
            outlineOffset: -3,
          },
        },
      },
    },
  };
}
