/**
 * Validation Patterns Constants
 *
 * Used by Smart Type Detection for auto-configuration
 * User can edit/remove in Field Configuration drawer
 */

export const ValidationPatterns = {
  EMAIL: {
    type: 'email',
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    errorMessage: 'Please enter a valid email address',
    placeholder: 'user@example.com',
  },

  PHONE_US: {
    type: 'phone',
    pattern: '^\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$',
    errorMessage: 'Please enter a valid phone number',
    placeholder: '(555) 123-4567',
  },

  URL: {
    type: 'url',
    pattern: '^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b',
    errorMessage: 'Please enter a valid URL',
    placeholder: 'https://example.com',
  },

  ZIPCODE_US: {
    type: 'zipcode',
    pattern: '^[0-9]{5}(-[0-9]{4})?$',
    errorMessage: 'Please enter a valid ZIP code',
    placeholder: '12345',
  },
} as const;
