/* eslint-disable */
// material-ui
import { SimplePaletteColorOptions } from '@mui/material/styles';
import { ColorPartial } from '@mui/material/styles/createPalette';

// ==============================|| DEFAULT THEME - TYPES ||============================== //

export type PaletteThemeProps = {
  primary: SimplePaletteColorOptions;
  secondary: SimplePaletteColorOptions;
  error: SimplePaletteColorOptions;
  warning: SimplePaletteColorOptions;
  info: SimplePaletteColorOptions;
  success: SimplePaletteColorOptions;
  grey: ColorPartial;
  formBgColor: string;
  scrollBarColor: string;
};

export type CustomShadowProps = {
  button: string;
  text: string;
  z1: string;
  z2: string;
  primary: string;
  primaryButton: string;
  secondary: string;
  secondaryButton: string;
  error: string;
  errorButton: string;
  warning: string;
  warningButton: string;
  info: string;
  infoButton: string;
  success: string;
  successButton: string;
  grey: string;
  greyButton: string;
};
