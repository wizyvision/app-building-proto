// ==============================|| OVERRIDES - INPUT BASE ||============================== //

export default function InputBase() {
  return {
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.Mui-readOnly': {
            pointerEvents: 'none',
            '&:hover': {
              borderColor: 'inherit',
            },
          },
        },
        sizeSmall: {
          fontSize: '0.75rem',
        },
      },
    },
  };
}
