/**
 * Validators - Field validation logic
 *
 * Reusable validation functions for form fields
 */

import { DataTypes } from '@/constants/dataTypes';

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (US format)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phoneRegex.test(phone);
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b/;
  return urlRegex.test(url);
}

/**
 * Validate field label (required, non-empty)
 */
export function isValidLabel(label: string): boolean {
  return Boolean(label && label.trim().length > 0);
}

/**
 * Validate select options (at least one option)
 */
export function hasValidSelectOptions(options: any[] | null | undefined): boolean {
  return Boolean(options && options.length > 0);
}

/**
 * Validate numeric value
 */
export function isValidNumber(value: string): boolean {
  return !isNaN(Number(value)) && value.trim() !== '';
}

/**
 * Validate value against min/max threshold
 */
export function isWithinThreshold(
  value: number,
  threshold?: { min?: number; max?: number }
): boolean {
  if (!threshold) return true;

  if (threshold.min !== undefined && value < threshold.min) {
    return false;
  }

  if (threshold.max !== undefined && value > threshold.max) {
    return false;
  }

  return true;
}

/**
 * Validate required field has value
 */
export function hasRequiredValue(value: any, isRequired: boolean): boolean {
  if (!isRequired) return true;

  if (value === null || value === undefined) return false;
  if (typeof value === 'string' && value.trim() === '') return false;
  if (Array.isArray(value) && value.length === 0) return false;

  return true;
}
