import '@mui/material/styles';
import { CustomShadowProps } from './theme';

declare module '@mui/material/styles' {
  interface Theme {
    customShadows: CustomShadowProps;
  }
  interface ThemeOptions {
    customShadows?: CustomShadowProps;
  }
  interface Palette {
    customShadows: CustomShadowProps;
  }
  interface PaletteOptions {
    customShadows?: CustomShadowProps;
  }
  interface PaletteColor {
    lighter?: string;
    darker?: string;
    1?: string;
    2?: string;
    3?: string;
    4?: string;
    5?: string;
    6?: string;
    7?: string;
    8?: string;
    9?: string;
    10?: string;
    11?: string;
  }
  interface SimplePaletteColorOptions {
    lighter?: string;
    darker?: string;
    1?: string;
    2?: string;
    3?: string;
    4?: string;
    5?: string;
    6?: string;
    7?: string;
    8?: string;
    9?: string;
    10?: string;
    11?: string;
  }
  interface TypeBackground {
    1?: string;
    2?: string;
    3?: string;
    4?: string;
    5?: string;
  }
}
