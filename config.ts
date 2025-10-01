// ==============================|| THEME CONFIG ||============================== //

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum ThemeDirection {
  LTR = 'ltr',
  RTL = 'rtl',
}

export enum MenuOrientation {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

export const config = {
  defaultMode: ThemeMode.LIGHT,
  fontFamily: `'Public Sans', sans-serif`,
  i18n: 'en' as const,
  miniDrawer: false,
  container: true,
  mode: ThemeMode.LIGHT,
  presetColor: 'default' as const,
  themeDirection: ThemeDirection.LTR,
  menuOrientation: MenuOrientation.VERTICAL,
};

export default config;
