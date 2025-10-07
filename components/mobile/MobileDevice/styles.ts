import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

/**
 * MobileDevice Styled Components
 *
 * Design Reference: Android device frame with status bar and navigation
 * Based on screenshot provided showing small Android phone
 *
 * Dimensions: 360x720px (typical Android small phone)
 * Frame: Rounded corners with border to simulate device bezel
 */

export const DeviceFrame = styled(Box)({
  width: '360px',
  height: '720px',
  backgroundColor: '#000000',
  borderRadius: '32px',
  padding: '12px',
  boxShadow: '0px 10px 40px rgba(0, 0, 0, 0.3)',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
});

export const DeviceScreen = styled(Box)({
  flex: 1,
  backgroundColor: '#ffffff',
  borderRadius: '20px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
});

// Status Bar (Android style)
export const StatusBar = styled(Box)({
  height: '24px',
  backgroundColor: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 12px',
  fontSize: '12px',
  fontWeight: 500,
  color: '#000000',
});

export const StatusBarLeft = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

export const StatusBarRight = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

// Content Area (where children render)
export const ContentArea = styled(Box)({
  flex: 1,
  backgroundColor: '#ffffff',
  overflow: 'auto',
  position: 'relative',
});

// Content Wrapper (inner container with padding and gap)
export const ContentWrapper = styled(Box)({
  padding: '12px',
  backgroundColor: '#f5f5f5',
  display: 'flex',
  flexDirection: 'column',
  gap: '11px',
  minHeight: '100%', // Allow content to grow beyond viewport
});

// Bottom Navigation Bar (Android style)
export const BottomNavBar = styled(Box)({
  height: '48px',
  backgroundColor: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  padding: '0 24px',
  borderTop: '1px solid #f0f0f0',
});

export const NavButton = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'opacity 0.2s',
  '&:hover': {
    opacity: 0.7,
  },
});

// Android navigation icons (geometric shapes)
export const BackTriangle = styled(Box)({
  width: 0,
  height: 0,
  borderTop: '10px solid transparent',
  borderBottom: '10px solid transparent',
  borderRight: '16px solid #5f6368',
});

export const HomeCircle = styled(Box)({
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  border: '2px solid #5f6368',
});

export const RecentAppsSquare = styled(Box)({
  width: '18px',
  height: '18px',
  border: '2px solid #5f6368',
  borderRadius: '2px',
});

// Styled icons for status bar - proper WizyVision compliance
export const StatusIcon = styled('svg')({
  fontSize: '16px',
  width: '16px',
  height: '16px',
});
