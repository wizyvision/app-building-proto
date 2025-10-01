import { Theme } from '@mui/material/styles';
import { ColorProps } from '@/types/extended';
import getColors from '@/utils/getColors';

interface Props {
  variant: ColorProps;
  theme: Theme;
}

// ==============================|| OVERRIDES - FILLED INPUT ||============================== //

function getFilledStyles({ variant, theme }: Props) {
  const colors = getColors(theme, variant);
  const { light } = colors;

  return {
    padding: 0,
    margin: 0,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 1,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: 'none',
      '&:after': {
        borderBottom: `2px solid ${light}`,
      },
    },
    '&.Mui-disabled': {
      backgroundColor: theme.palette.background.paper,
      padding: '0',
    },
    '&.Mui-error': {
      backgroundColor: theme.palette.error.lighter,
      '&:after': {
        borderBottom: `2px solid ${theme.palette.error.main}`,
      },
    },
    '&:before': {
      display: 'none',
    },
    '.MuiInputBase-input': {
      padding: '8px 0',
    },
    '.MuiInputBase-inputSizeSmall': {
      padding: '6px 0',
    },
    '&.MuiInputBase-multiline': {
      padding: '0',
    },
  };
}

export default function FilledInput(theme: Theme) {
  return {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          ...getFilledStyles({ variant: 'primary', theme }),
          '&.Mui-error': {
            ...getFilledStyles({ variant: 'error', theme }),
          },
          '&.MuiInputBase-adornedEnd .MuiInputAdornment-root': {
            '& .MuiIconButton-root': {
              marginRight: 0,
            },
          },
          '&.MuiInputBase-readOnly': {
            pointerEvents: 'none',
            '&:hover': {
              backgroundColor: theme.palette.grey[100],
            },
          },
        },
      },
    },
  };
}
