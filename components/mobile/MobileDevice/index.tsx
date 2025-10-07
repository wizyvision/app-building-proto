import React from 'react';
import { MobileDeviceProps } from './types';
import {
  DeviceFrame,
  DeviceScreen,
  StatusBar,
  StatusBarLeft,
  StatusBarRight,
  ContentArea,
  ContentWrapper,
  BottomNavBar,
  NavButton,
  BackTriangle,
  HomeCircle,
  RecentAppsSquare,
  StatusIcon,
} from './styles';
import WifiIcon from '@mui/icons-material/Wifi';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import { MobileAppBar } from '../AppBar';

/**
 * MobileDevice Component
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Familiar Android device frame that users recognize
 * - Visual Hierarchy: Clear separation of status bar, content, and navigation
 * - Contextual Design: Provides realistic mobile context for form previews
 *
 * DESIGN SPECS:
 * - Frame: 360x720px (small Android phone size)
 * - Status bar: 24px height with time, wifi, signal, battery
 * - App bar: 56px height with back and menu buttons
 * - Content padding: 12px
 * - Bottom nav: 48px height with Android back/home/recents
 * - Frame padding: 12px to simulate device bezel
 * - Border radius: 32px outer, 20px inner screen
 *
 * INTERACTIONS:
 * - Static frame (non-interactive)
 * - Status bar displays placeholder values
 * - Bottom nav buttons show hover state (visual only)
 * - Content area is scrollable
 *
 * @param children - Content to display inside the mobile device screen
 * @param statusBarTime - Override default time display (default: "12:30")
 * @param showWifi - Show wifi icon (default: true)
 * @param showSignal - Show signal strength icon (default: true)
 * @param showBattery - Show battery icon (default: true)
 */
export const MobileDevice: React.FC<MobileDeviceProps> = ({
  children,
  statusBarTime = '12:30',
  showWifi = true,
  showSignal = true,
  showBattery = true,
}) => {
  return (
    <DeviceFrame>
      <DeviceScreen>
        {/* Status Bar - Android style */}
        <StatusBar>
          <StatusBarLeft>
            {statusBarTime}
          </StatusBarLeft>
          <StatusBarRight>
            {showWifi && <WifiIcon component={StatusIcon} />}
            {showSignal && <SignalCellularAltIcon component={StatusIcon} />}
            {showBattery && <BatteryFullIcon component={StatusIcon} />}
          </StatusBarRight>
        </StatusBar>

        {/* App Bar */}
        <MobileAppBar />

        {/* Content Area with 12px padding and 11px gap - scrollable */}
        <ContentArea>
          <ContentWrapper>
            {children}
          </ContentWrapper>
        </ContentArea>

        {/* Bottom Navigation Bar - Android style */}
        <BottomNavBar>
          <NavButton>
            <BackTriangle />
          </NavButton>
          <NavButton>
            <HomeCircle />
          </NavButton>
          <NavButton>
            <RecentAppsSquare />
          </NavButton>
        </BottomNavBar>
      </DeviceScreen>
    </DeviceFrame>
  );
};
