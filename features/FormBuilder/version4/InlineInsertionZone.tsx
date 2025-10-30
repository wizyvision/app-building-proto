/**
 * InlineInsertionZone Component - Compact Popover Menu
 *
 * USAGE CONTEXTS:
 * 1. Between fields within section: Shows "Add Field" only
 * 2. At end of section (after last field): Shows "Add Field" + "Add Section"
 * 3. Between sections OR at form boundaries: Shows "Add Field" + "Add Section"
 *    - "Add Field" creates standalone field (no section container)
 *    - "Add Section" creates new section
 *
 * UX PRINCIPLES APPLIED:
 * - Progressive Disclosure: Menu appears on hover only, minimal by default
 * - Fitts's Law: 44px touch targets for each menu item
 * - Hick's Law: Context-aware menu items reduce choice overload
 * - Visual Hierarchy: Subtle line by default, clear menu on interaction
 * - Aesthetic-Usability: Smooth transitions create polished feel
 *
 * DESIGN PHILOSOPHY:
 * - Default state: Thin line (1px, subtle color, low opacity)
 * - Hover state: Line highlights + compact popover menu appears
 * - Menu: Small, vertically stacked options with icons
 * - Takes minimal space: No layout shifts, fields remain visible
 * - Smooth opacity/transform transitions (200ms)
 *
 * INTERACTION STATES:
 * - Default: Subtle dashed line hint (low opacity)
 * - Hover: Line solid + popover menu fades in
 * - Menu item hover: Background color change
 * - Active: Menu item pressed state
 * - Disabled: Hidden during drag operations
 *
 * SPACING STRATEGY:
 * - Line: 1px height (no significant space taken)
 * - Menu: Appears above line (absolute positioned)
 * - Touch targets: 44px height per menu item
 * - No layout shifts: Absolute positioning
 */

'use client';

import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import {
  CompactZoneContainer,
  CompactZoneLine,
  CompactPopoverMenu,
  CompactMenuItem,
  MenuItemIcon,
  MenuItemLabel,
} from './styles';

interface InlineInsertionZoneProps {
  /** Show "Add Field" button */
  showFieldButton?: boolean;
  /** Show "Add Section" button */
  showSectionButton?: boolean;
  /** Callback when "Add Field" is clicked */
  onInsertField?: () => void;
  /** Callback when "Add Section" is clicked */
  onInsertSection?: () => void;
  /** Spacing variant: 'field' (8px) or 'section' (16px) */
  spacing?: 'field' | 'section';
  /** Position of popover: 'above' (default) or 'below' */
  popoverPosition?: 'above' | 'below';
  /** Is this the first insertion zone? */
  isFirst?: boolean;
  /** Is this the last insertion zone? */
  isLast?: boolean;
}

export const InlineInsertionZone: React.FC<InlineInsertionZoneProps> = ({
  showFieldButton = false,
  showSectionButton = false,
  onInsertField,
  onInsertSection,
  spacing = 'field',
  popoverPosition = 'above',
  isFirst = false,
  isLast = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Don't render if no buttons to show
  if (!showFieldButton && !showSectionButton) {
    return null;
  }

  const handleMouseEnter = () => {
    // Clear any pending hide timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    // Add small delay before hiding to allow moving to menu
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 150); // 150ms delay
  };

  const handleFieldClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onInsertField) {
      onInsertField();
    }
    setIsHovered(false); // Close menu after click
  };

  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onInsertSection) {
      onInsertSection();
    }
    setIsHovered(false); // Close menu after click
  };

  return (
    <CompactZoneContainer
      spacing={spacing}
      isFirst={isFirst}
      isLast={isLast}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      aria-label={
        showFieldButton && showSectionButton
          ? 'Add field or section'
          : showFieldButton
          ? 'Add field'
          : 'Add section'
      }
    >
      {/* Thin horizontal line indicator */}
      <CompactZoneLine isHovered={isHovered} />

      {/* Compact popover menu (appears on hover) */}
      <CompactPopoverMenu
        $isVisible={isHovered}
        $popoverPosition={popoverPosition}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {showFieldButton && onInsertField && (
          <CompactMenuItem onClick={handleFieldClick} aria-label="Add field">
            <MenuItemIcon>
              <AddIcon fontSize="small" />
            </MenuItemIcon>
            <MenuItemLabel>Field</MenuItemLabel>
          </CompactMenuItem>
        )}

        {showSectionButton && onInsertSection && (
          <CompactMenuItem onClick={handleSectionClick} aria-label="Add section">
            <MenuItemIcon>
              <ViewStreamIcon fontSize="small" />
            </MenuItemIcon>
            <MenuItemLabel>Section</MenuItemLabel>
          </CompactMenuItem>
        )}
      </CompactPopoverMenu>
    </CompactZoneContainer>
  );
};
