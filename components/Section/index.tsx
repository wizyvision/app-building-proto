/**
 * Section Component - Latest Version Export
 *
 * This file exports the LATEST stable version.
 * Import older versions explicitly if needed.
 *
 * Current Latest: version3
 *
 * VERSION HISTORY:
 * - v1: Initial implementation (64px header, inline edit mode)
 * - v2: Updated styling, #fafafa content background
 * - v3: 72px header, TextField click-to-focus, System badge (cyan/teal), absolute drag handle
 */

// Export latest version (v3)
export { Section } from './version3';
export type { SectionProps, SectionHeaderProps, SectionContentProps } from './version3/types';

// For legacy support or version comparison, users can import specific versions:
// import { Section as SectionV1 } from '@/components/Section/version1';
// import { Section as SectionV2 } from '@/components/Section/version2';
// import { Section as SectionV3 } from '@/components/Section/version3';
