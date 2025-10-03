'use client';

import React from 'react';
import { Monitor, Smartphone } from '@mui/icons-material';
import {
  Container,
  Label,
  ButtonGroup,
  ToggleButton,
  IconWrapper,
  ButtonText,
} from './styles';
import { PreviewToggleProps } from './types';

/**
 * PreviewToggle Component - Version 1
 *
 * VERSION INFO:
 * - Version: 1
 * - Created: 2025-10-03
 * - Initial implementation based on Figma design node 26:2
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Familiar toggle button group pattern (like Bootstrap button groups, browser dev tools)
 *   Users immediately recognize this as a single-choice selector
 *
 * - Fitts's Law: Large touch targets (42px height including padding)
 *   Adjacent buttons share border for easy selection without gaps
 *
 * - Hick's Law: Limited to 2 choices (Web vs Mobile) reduces decision time
 *   Clear visual indication of selected state minimizes confusion
 *
 * - Visual Hierarchy: Selected button uses primary color (#1890ff)
 *   Unselected buttons use muted gray (#bfbfbf) to recede visually
 *
 * INTERACTION DESIGN:
 * - Click: Toggle between Web and Mobile preview modes
 * - Hover: Subtle background change on unselected buttons
 * - Selected: Primary blue border and text color
 * - Icons: Monitor for Web, Smartphone for Mobile (universal symbols)
 *
 * ACCESSIBILITY:
 * - Semantic button structure with clear labels
 * - Color contrast meets WCAG AA (blue #1890ff on white)
 * - Keyboard navigation supported via onClick handlers
 * - Focus indicators visible
 */
export const PreviewToggle: React.FC<PreviewToggleProps> = ({ value, onChange }) => {
  return (
    <Container>
      <Label>Preview</Label>
      <ButtonGroup>
        <ToggleButton
          selected={value === 'web'}
          onClick={() => onChange('web')}
          role="button"
          aria-pressed={value === 'web'}
        >
          <IconWrapper>
            <Monitor/>
          </IconWrapper>
          <ButtonText selected={value === 'web'}>Web</ButtonText>
        </ToggleButton>
        <ToggleButton
          selected={value === 'mobile'}
          onClick={() => onChange('mobile')}
          role="button"
          aria-pressed={value === 'mobile'}
        >
          <IconWrapper>
            <Smartphone />
          </IconWrapper>
          <ButtonText selected={value === 'mobile'}>Mobile</ButtonText>
        </ToggleButton>
      </ButtonGroup>
    </Container>
  );
};
