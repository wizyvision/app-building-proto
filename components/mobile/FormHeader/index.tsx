import React from 'react';
import { FormHeaderProps } from './types';
import {
  HeaderContainer,
  AppLabel,
  CaseNumber,
  TimestampContainer,
  Timestamp,
} from './styles';

/**
 * FormHeader Component
 *
 * Figma Reference: node-id 323-9661
 *
 * UX PRINCIPLES APPLIED:
 * - Visual Hierarchy: Clear distinction between app label (14px), case number (24px), timestamps (12px)
 * - Jakob's Law: Familiar header pattern with title and metadata
 * - Information Architecture: Most important info (case number) is largest
 *
 * DESIGN SPECS:
 * - Background: white with 8px border radius
 * - Padding: 16px all sides
 * - Gap: 6px between sections
 * - App Label: 14px medium weight
 * - Case Number: 24px regular weight (emphasis)
 * - Timestamps: 12px light weight (de-emphasized)
 *
 * INTERACTIONS:
 * - Static display component (no interactions)
 * - Props are fully controlled by parent
 *
 * @param appLabel - The application name (e.g., "Equipment Inspection")
 * @param caseNumber - The case/form identifier (e.g., "WV-1023")
 * @param createdAt - Creation timestamp string
 * @param updatedAt - Last updated timestamp string
 */
export const FormHeader: React.FC<FormHeaderProps> = ({
  appLabel,
  caseNumber,
  createdAt,
  updatedAt,
}) => {
  return (
    <HeaderContainer>
      <AppLabel>{appLabel}</AppLabel>
      <CaseNumber>{caseNumber}</CaseNumber>
      <TimestampContainer>
        <Timestamp>{createdAt}</Timestamp>
        <Timestamp>{updatedAt}</Timestamp>
      </TimestampContainer>
    </HeaderContainer>
  );
};
