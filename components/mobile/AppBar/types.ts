export interface MobileAppBarProps {
  /** Show back button (default: true) */
  showBackButton?: boolean;
  /** Show menu button (3 dots) (default: true) */
  showMenuButton?: boolean;
  /** Callback when back button clicked */
  onBackClick?: () => void;
  /** Callback when menu button clicked */
  onMenuClick?: () => void;
}
