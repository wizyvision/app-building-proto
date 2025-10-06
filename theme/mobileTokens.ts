/**
 * Mobile-specific Design Tokens
 *
 * These tokens are extracted from Figma mobile designs and are used
 * specifically for mobile components. They complement the main designTokens
 * but contain mobile-specific values that may differ from web.
 */

export const mobileTokens = {
  colors: {
    // Field backgrounds
    field: {
      background: '#faf3f3', // BaseField background
      emptyStatus: '#ffedea', // Status field empty state
    },

    // Text colors
    text: {
      primary: '#1d1b20', // Field text color
      statusEmpty: '#271815', // Status field empty text
      statusSelected: '#ffffff', // Status field selected text
    },
  },

  // Field dimensions
  field: {
    height: 40, // Standard mobile field height
    borderRadius: 4, // Border radius for fields
  },

  // Icon button dimensions
  iconButton: {
    size: 40, // Icon button container size
    iconSize: 24, // Icon size (MUI default)
  },
} as const;
