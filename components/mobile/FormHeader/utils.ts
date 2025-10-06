import { FormHeaderProps } from './types';

/**
 * Case Response Interface
 *
 * Represents the API response structure for a case/form
 */
export interface CaseResponse {
  data: {
    id: string;
    description: string;
    memId: number;
    lastUpdaterId: number;
    postRef: string; // Case number (e.g., "WV-25")
    privacyId: number;
    statusId: number;
    title: string;
    typeId: number;
    createdAt: string; // ISO 8601 timestamp
    updatedAt: string; // ISO 8601 timestamp
    deletedAt: string | null;
    privacyName: string;
    status: {
      id: number;
      color: string;
      intl: {
        en: string;
        fr: string;
      };
      name: string;
    };
    type: {
      id: number;
      color: string;
      name: string; // App label (e.g., "Custom App", "Equipment Inspection")
      intl: {
        en: string;
      };
    };
    signedThumbnailUrl: string | null;
  };
}

/**
 * Format ISO timestamp to human-readable format
 *
 * @param isoString - ISO 8601 timestamp (e.g., "2025-09-19T09:26:04.885Z")
 * @returns Formatted string (e.g., "Created September 19, 2025 at 09:26am")
 *
 * @example
 * formatTimestamp("2025-09-19T09:26:04.885Z", "Created")
 * // Returns: "Created September 19, 2025 at 09:26am"
 */
export const formatTimestamp = (isoString: string, prefix: 'Created' | 'Updated'): string => {
  const date = new Date(isoString);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be 12

  const hoursStr = hours.toString().padStart(2, '0');

  return `${prefix} ${month} ${day}, ${year} at ${hoursStr}:${minutes}${ampm}`;
};

/**
 * Transform API response to FormHeader props
 *
 * Maps the case response data to the props expected by FormHeader component
 *
 * @param response - Case response from API
 * @returns FormHeaderProps object ready for component
 *
 * @example
 * const response = { data: { type: { name: "Equipment Inspection" }, postRef: "WV-25", ... } };
 * const props = transformCaseToFormHeader(response);
 * // props.appLabel = "Equipment Inspection"
 * // props.caseNumber = "WV-25"
 * // props.createdAt = "Created September 19, 2025 at 09:26am"
 * // props.updatedAt = "Updated September 19, 2025 at 09:26am"
 */
export const transformCaseToFormHeader = (response: CaseResponse): FormHeaderProps => {
  const { data } = response;

  return {
    appLabel: data.type.name,
    caseNumber: data.postRef,
    createdAt: formatTimestamp(data.createdAt, 'Created'),
    updatedAt: formatTimestamp(data.updatedAt, 'Updated'),
  };
};
