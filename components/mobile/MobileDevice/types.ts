export interface MobileDeviceProps {
  children: React.ReactNode;
  /** Override status bar time - defaults to "12:30" */
  statusBarTime?: string;
  /** Show wifi icon in status bar */
  showWifi?: boolean;
  /** Show signal icon in status bar */
  showSignal?: boolean;
  /** Show battery icon in status bar */
  showBattery?: boolean;
}
