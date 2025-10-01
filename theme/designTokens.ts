// WizyVision Design Tokens (from Figma)
export const designTokens = {
  colors: {
    primary: {
      1: '#fde9e8',
      2: '#f9c2be',
      3: '#f49b94',
      4: '#f0736a',
      5: '#eb4236',
      6: '#e82517',
      7: '#be1e13',
      8: '#be1e13',
      9: '#95180f',
      10: '#6b110b',
      main: '#eb4236',
      light: '#f0736a',
      dark: '#be1e13',
      lighter: '#f9c2be',
      darker: '#95180f',
    },
    secondary: {
      1: '#e8fbfd',
      2: '#bef5f9',
      3: '#94eef4',
      4: '#6ae7f0',
      5: '#36dfeb',
      6: '#17dae8',
      7: '#13b3be',
      8: '#0f8c95',
      9: '#0b646b',
      10: '#063d41',
      11: '#021617',
      main: '#36dfeb',
      light: '#6ae7f0',
      dark: '#13b3be',
      lighter: '#bef5f9',
      darker: '#0b646b',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
      1: '#ffffff',  // White
      2: '#fafafa',  // Lightest gray
      3: '#f5f5f5',  // Very light gray
      4: '#f0f0f0',  // Light gray
      5: '#ededed',  // Subtle gray
    },
    text: {
      primary: '#262626', // Day primary
      secondary: '#595959', // Day 8
      title: '#262626', // Day title
      disabled: '#bfbfbf', // Day 6
      divider: '#f0f0f0', // Day divider
      day: {
        1: '#ffffff',
        2: '#fafafa',
        3: '#f5f5f5',
        4: '#f0f0f0',
        5: '#d9d9d9',
        6: '#bfbfbf',
        7: '#8c8c8c',
        8: '#595959',
        9: '#434343',
        10: '#262626',
        11: '#1f1f1f',
        12: '#141414',
        13: '#1b1b1b',
      },
    },
    divider: '#f0f0f0',
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      white: '#f8f8f8',
    },
    white: '#ffffff',
    component: {
      adminSidebar: {
        divider: '#8c8f93',
        highlight: '#484d64',
        background: '#4e546c',
        iconColor: '#a7b6c4',
      },
      appBar: {
        userView: '#ffffff',
        adminView: '#eb4236',
      },
      searchBar: {
        fill: '#f8f8f8',
      },
      table: {
        header: '#fafafa',
        background: '#fafafa',
        highlight: '#f5f5f5',
        cellText: '#bbbbbb',
      },
    },
    form: {
      label: '#797979',
      thumbnailButton: '#ededed',
    },
  },
  typography: {
    fontFamily: '"Public Sans", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
  },
  textStyles: {
    display: {
      large: {
        fontSize: '3.5rem',
        fontWeight: 700,
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
      },
      medium: {
        fontSize: '2.75rem',
        fontWeight: 700,
        lineHeight: 1.15,
        letterSpacing: '-0.015em',
      },
      small: {
        fontSize: '2.25rem',
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: '-0.01em',
      },
    },
    heading: {
      h1: {
        fontSize: '2rem',
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: '-0.01em',
      },
      h2: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.3,
        letterSpacing: '-0.005em',
      },
      h3: {
        fontSize: '1.25rem',
        fontWeight: 500,
        lineHeight: 1.4,
        letterSpacing: '0em',
      },
      h4: {
        fontSize: '1.125rem',
        fontWeight: 500,
        lineHeight: 1.4,
        letterSpacing: '0em',
      },
      h5: {
        fontSize: '1rem',
        fontWeight: 500,
        lineHeight: 1.5,
        letterSpacing: '0em',
      },
      h6: {
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: 1.5,
        letterSpacing: '0.01em',
      },
    },
    body: {
      large: {
        fontSize: '1.125rem',
        fontWeight: 400,
        lineHeight: 1.6,
        letterSpacing: '0em',
      },
      medium: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: '0em',
      },
      small: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 1.43,
        letterSpacing: '0.01em',
      },
    },
    label: {
      large: {
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: 1.43,
        letterSpacing: '0.01em',
      },
      medium: {
        fontSize: '0.75rem',
        fontWeight: 500,
        lineHeight: 1.5,
        letterSpacing: '0.02em',
      },
      small: {
        fontSize: '0.6875rem',
        fontWeight: 500,
        lineHeight: 1.5,
        letterSpacing: '0.03em',
      },
    },
    button: {
      large: {
        fontSize: '1rem',
        fontWeight: 500,
        lineHeight: 1.5,
        letterSpacing: '0.02em',
        textTransform: 'uppercase' as const,
      },
      medium: {
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: 1.43,
        letterSpacing: '0.025em',
        textTransform: 'uppercase' as const,
      },
      small: {
        fontSize: '0.75rem',
        fontWeight: 500,
        lineHeight: 1.5,
        letterSpacing: '0.03em',
        textTransform: 'uppercase' as const,
      },
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.02em',
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.1em',
      textTransform: 'uppercase' as const,
    },
    code: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.43,
      letterSpacing: '0em',
      fontFamily: '"Fira Code", "Courier New", monospace',
    },
  },
  spacing: {
    unit: 8, // Base unit: 8px
  },
  borderRadius: {
    standard: 8,
    button: 4,
    card: 12,
  },
  elevation: {
    card: 1,
    modal: 8,
    appBar: 0,
  },
  breakpoints: {
    xs: 0,      // Mobile
    sm: 600,    // Mobile landscape
    md: 900,    // Tablet
    lg: 1200,   // Desktop
    xl: 1536,   // Large desktop
  },
  touchTargets: {
    minimum: 44,  // 44x44px minimum
    button: 48,   // 48px height
    iconButton: 48, // 48x48px
  },
  button: {
    padding: {
      small: '1px 8px',
      medium: '9px 16px',
      large: '10px 16px',
    },
  },
  grid: {
    columns: {
      mobile: 4,     // 4 columns on mobile
      tablet: 8,     // 8 columns on tablet
      desktop: 12,   // 12 columns on desktop
    },
    gutter: {
      mobile: 16,    // 16px gutter on mobile
      tablet: 24,    // 24px gutter on tablet
      desktop: 24,   // 24px gutter on desktop
    },
    margin: {
      mobile: 16,    // 16px margin on mobile
      tablet: 24,    // 24px margin on tablet
      desktop: 24,   // 24px margin on desktop
    },
  },
  effects: {
    shadows: {
      none: 'none',
      sm: '0px 1px 2px rgba(0, 0, 0, 0.05)',
      md: '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)',
      lg: '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.06)',
      xl: '0px 10px 15px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.05)',
      '2xl': '0px 20px 25px rgba(0, 0, 0, 0.15), 0px 10px 10px rgba(0, 0, 0, 0.04)',
      button: '0px 2px 0px 0px rgba(0, 0, 0, 0.04)',
    },
    blur: {
      none: '0px',
      sm: '4px',
      md: '8px',
      lg: '16px',
      xl: '24px',
    },
    opacity: {
      disabled: 0.38,
      hover: 0.04,
      selected: 0.08,
      focus: 0.12,
      active: 0.12,
    },
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 375,
        enteringScreen: 225,
        leavingScreen: 195,
      },
      easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
    },
  },
} as const;