import React from 'react';
import { MobileAppBarProps } from './types';
import { AppBarContainer, AppBarButton } from './styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';

/**
 * Mobile AppBar Component
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Familiar mobile app bar pattern with back and menu buttons
 * - Fitts's Law: 48x48px touch targets for buttons
 * - Visual Hierarchy: Clear separation from content with subtle border
 *
 * DESIGN SPECS:
 * - Height: 56px
 * - Background: white with bottom border
 * - Back button: Left side, arrow icon
 * - Menu button: Right side, 3 vertical dots
 * - Button size: 48x48px touch targets
 *
 * INTERACTIONS:
 * - Tap back button: Trigger onBackClick callback
 * - Tap menu button: Trigger onMenuClick callback
 * - Hover states on buttons
 *
 * @param showBackButton - Show back arrow button (default: true)
 * @param showMenuButton - Show menu (3 dots) button (default: true)
 * @param onBackClick - Callback when back button is clicked
 * @param onMenuClick - Callback when menu button is clicked
 */
export const MobileAppBar: React.FC<MobileAppBarProps> = ({
  showBackButton = true,
  showMenuButton = true,
  onBackClick,
  onMenuClick,
}) => {
  return (
    <AppBarContainer>
      {showBackButton ? (
        <AppBarButton onClick={onBackClick} aria-label="Back">
          <ArrowBackIcon />
        </AppBarButton>
      ) : (
        <div style={{ width: '48px' }} /> // Spacer
      )}

      {showMenuButton ? (
        <AppBarButton onClick={onMenuClick} aria-label="Menu">
          <MoreVertIcon />
        </AppBarButton>
      ) : (
        <div style={{ width: '48px' }} /> // Spacer
      )}
    </AppBarContainer>
  );
};
