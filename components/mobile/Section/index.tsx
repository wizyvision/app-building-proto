import React from 'react';
import { MobileSectionProps } from './types';
import {
  SectionContainer,
  SectionHeader,
  HeaderLeft,
  ToggleButton,
  SectionTitle,
  CompletionText,
  SectionContent,
} from './styles';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

/**
 * Mobile Section Component
 *
 * Figma Reference: node-id 318-11610
 *
 * UX PRINCIPLES APPLIED:
 * - Progressive Disclosure: Expand/collapse to manage cognitive load
 * - Jakob's Law: Familiar collapsible accordion pattern
 * - Fitts's Law: Full header is clickable (larger target area)
 * - Visual Hierarchy: Clear title with secondary completion percentage
 * - Miller's Law: Group related fields within sections
 *
 * DESIGN SPECS:
 * - Background: #ffedea (light pink/peach for closed state)
 * - Min height: 48px (collapsed)
 * - Border radius: 8px
 * - Header padding: 4px 8px 4px 4px
 * - Content: white background with 16px padding
 * - Icon: 24x24px chevron that rotates 90deg when expanded
 *
 * INTERACTIONS:
 * - Click entire header to toggle expand/collapse
 * - Hover header shows background change
 * - Chevron icon rotates smoothly (0.2s transition)
 * - Content slides in/out when toggled
 * - NOT draggable (mobile user view only)
 *
 * DIFFERENCE FROM WEB VERSION:
 * - Mobile sections are collapsible but NOT draggable
 * - Used in mobile form viewing (not form builder)
 * - Simpler interaction model for touch interfaces
 *
 * @param title - Section name (e.g., "Basic Details")
 * @param completionText - Optional completion status (e.g., "3/5 (60%)")
 * @param isExpanded - Whether section is currently expanded
 * @param onToggle - Callback when user toggles expand/collapse
 * @param children - Section content (fields)
 */
export const MobileSection: React.FC<MobileSectionProps> = ({
  title,
  completionText,
  isExpanded,
  onToggle,
  children,
}) => {
  return (
    <SectionContainer>
      <SectionHeader onClick={onToggle}>
        <HeaderLeft>
          <ToggleButton expanded={isExpanded} size="small">
            <ChevronRightIcon />
          </ToggleButton>
          <SectionTitle>{title}</SectionTitle>
        </HeaderLeft>
        {completionText && (
          <CompletionText>{completionText}</CompletionText>
        )}
      </SectionHeader>

      {isExpanded && children && (
        <SectionContent>
          {children}
        </SectionContent>
      )}
    </SectionContainer>
  );
};
