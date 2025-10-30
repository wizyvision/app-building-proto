/**
 * Form Builder v3 - Styled Components
 *
 * STYLING RULES:
 * - All styling uses styled() components
 * - Theme values only (no hardcoded values)
 * - Hover, focus, and active states defined
 * - Smooth transitions for all interactive elements
 * - Zero sx prop usage
 */

import { styled } from '@mui/material/styles';
import { Box, Button, IconButton, Paper, Typography } from '@mui/material';

/**
 * Form Builder Container
 * Main container for the entire form builder interface
 *
 * UX PRINCIPLES:
 * - Full viewport height for immersive experience
 * - Proper spacing and visual hierarchy
 */
export const FormBuilderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100vh',
  backgroundColor: theme.palette.background[2],
  overflow: 'hidden',
}));

/**
 * Main Content Area
 * Central area containing the form sections
 *
 * UX PRINCIPLES:
 * - Flexible layout for responsive design
 * - Proper padding for content breathing room
 */
export const MainContent = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  position: 'relative',
}));

/**
 * Form Canvas
 * Scrollable area where sections and fields are displayed
 *
 * UX PRINCIPLES:
 * - Independent scrolling for long forms
 * - Proper padding for visual comfort
 */
export const FormCanvas = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  padding: theme.spacing(3),
  position: 'relative',

  // Custom scrollbar styling
  '&::-webkit-scrollbar': {
    width: 8,
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.background[2],
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.text.disabled,
    borderRadius: 4,
    '&:hover': {
      backgroundColor: theme.palette.text.secondary,
    },
  },
}));

/**
 * Sections Container
 * Wrapper for all sections
 *
 * UX PRINCIPLES:
 * - Visual Consistency: 16px spacing between all items (sections, fields, insertion zones)
 * - Follows WizyVision spacing guidelines
 */
export const SectionsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1), // 8px - spacing between sections and standalone fields
  maxWidth: 800,
  margin: '0 auto',
  width: '100%',
}));

/**
 * Section Item Wrapper
 * Groups section with its drop indicators as a single flex child
 * This prevents the gap from appearing between section and indicator
 *
 * UX PRINCIPLES:
 * - Visual Consistency: Keeps section and indicator tightly grouped
 * - Zero internal spacing between section and drop indicator
 */
export const SectionItemWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 0, // No gap between section and drop indicator
  width: '100%',
});

/**
 * Drop Indicator Wrapper
 * Constrains drop indicator width to match section width
 *
 * UX PRINCIPLES:
 * - Visual Consistency: Matches section width constraints
 * - Same dimensions as SectionWrapper (500-700px)
 */
export const DropIndicatorWrapper = styled(Box)({
  minWidth: '500px',
  maxWidth: '700px',
  width: '100%',
  margin: '0 auto',
});

/**
 * Standalone Field Container
 * Wrapper for standalone fields (not in sections) - matches section width
 *
 * UX PRINCIPLES:
 * - Visual Consistency: Matches section width for aligned layout
 * - Same constraints as SectionWrapper from Section component
 */
export const StandaloneFieldContainer = styled(Box)({
  minWidth: '500px',
  maxWidth: '700px',
  width: '100%',
  margin: '0 auto',
});

/**
 * Insertion Zone Container
 * Absolutely positioned overlay for insertion zones
 *
 * UX PRINCIPLES:
 * - Fitts's Law: Minimum 44px height for easy targeting
 * - Visual feedback on hover with smooth transition
 * - No layout shifts (absolute positioning)
 */
export const InsertionZoneContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isActive' && prop !== 'isVisible',
})<{ isActive: boolean; isVisible: boolean }>(({ theme, isActive, isVisible }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  height: 44, // Fitts's Law: Minimum touch target
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: isVisible ? 1 : 0,
  pointerEvents: isVisible ? 'auto' : 'none',
  transition: theme.transitions.create(['opacity', 'background-color'], {
    duration: theme.transitions.duration.short,
  }),
  zIndex: 10,

  '&:hover': {
    backgroundColor: isActive
      ? theme.palette.primary[1]
      : 'rgba(235, 66, 54, 0.05)', // Very light red tint
  },

  ...(isActive && {
    backgroundColor: theme.palette.primary[1],
  }),
}));

/**
 * Insertion Zone Button
 * Button displayed in insertion zones
 *
 * UX PRINCIPLES:
 * - Hick's Law: Clear, single-purpose buttons
 * - Visual Hierarchy: Primary color for add actions
 * - Fitts's Law: 44x44px minimum size
 */
export const InsertionZoneButton = styled(Button)(({ theme }) => ({
  minHeight: 44,
  minWidth: 120,
  textTransform: 'none',
  fontWeight: 500,
  fontSize: theme.typography.body2.fontSize,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background[1],
  border: `2px dashed ${theme.palette.primary.main}`,
  color: theme.palette.primary.main,
  padding: theme.spacing(1, 2),

  '&:hover': {
    backgroundColor: theme.palette.primary[1],
    borderStyle: 'solid',
    transform: 'translateY(-1px)',
    boxShadow: theme.customShadows.z1,
  },

  '&:active': {
    transform: 'translateY(0)',
  },

  transition: theme.transitions.create(['background-color', 'transform', 'box-shadow'], {
    duration: theme.transitions.duration.short,
  }),
}));

/**
 * Insertion Zone Actions
 * Container for multiple insertion actions
 */
export const InsertionZoneActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  alignItems: 'center',
}));

/**
 * Mobile Preview Container
 * Right sidebar showing mobile preview
 *
 * UX PRINCIPLES:
 * - Fixed width matching mobile device dimensions
 * - Border to separate from main content
 */
export const MobilePreviewContainer = styled(Box)(({ theme }) => ({
  width: 375, // iPhone width
  backgroundColor: theme.palette.background[1],
  borderLeft: `1px solid ${theme.palette.background[4]}`,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  boxShadow: theme.customShadows.z2,

  [theme.breakpoints.down('lg')]: {
    display: 'none', // Hide on smaller screens
  },
}));

/**
 * Mobile Preview Header
 * Header for mobile preview section
 */
export const MobilePreviewHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.background[4]}`,
  backgroundColor: theme.palette.background[1],
}));

/**
 * Mobile Preview Content
 * Scrollable content area for mobile preview
 */
export const MobilePreviewContent = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background[2],
}));

/**
 * Mobile Device Frame
 * Visual frame mimicking mobile device
 */
export const MobileDeviceFrame = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background[1],
  borderRadius: 12,
  overflow: 'hidden',
  boxShadow: theme.customShadows.z2,
}));

/**
 * Toolbar Container
 * Top toolbar with actions
 */
export const ToolbarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 3),
  backgroundColor: theme.palette.background[1],
  borderBottom: `1px solid ${theme.palette.background[4]}`,
}));

/**
 * Toolbar Actions
 * Container for toolbar action buttons
 */
export const ToolbarActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  alignItems: 'center',
}));

/**
 * Toolbar Button
 * Styled button for toolbar actions
 *
 * UX PRINCIPLES:
 * - Clear visual hierarchy (primary vs secondary)
 * - Proper touch targets (44x44px minimum)
 */
export const ToolbarButton = styled(Button)(({ theme }) => ({
  minHeight: 44,
  textTransform: 'none',
  fontWeight: 500,
  fontSize: theme.typography.body2.fontSize,
  padding: theme.spacing(1, 3),
  borderRadius: theme.shape.borderRadius,

  transition: theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.short,
  }),

  '&:hover': {
    transform: 'translateY(-1px)',
  },

  '&:active': {
    transform: 'translateY(0)',
  },
}));

/**
 * Empty State Container
 * Container for empty state messages
 */
export const EmptyStateContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(6),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

/**
 * Empty State Icon Wrapper
 * Wrapper for empty state icon
 */
export const EmptyStateIconWrapper = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  borderRadius: '50%',
  backgroundColor: theme.palette.background[3],
  color: theme.palette.text.disabled,

  '& svg': {
    fontSize: 40,
  },
}));

/**
 * Add Section Button
 * Prominent button for adding new sections
 *
 * UX PRINCIPLES:
 * - Visual Hierarchy: Contained button for primary action
 * - Fitts's Law: Large, easy to reach target
 */
export const AddSectionButton = styled(Button)(({ theme }) => ({
  minHeight: 48,
  textTransform: 'none',
  fontWeight: 500,
  fontSize: theme.typography.body1.fontSize,
  padding: theme.spacing(1.5, 4),
  borderRadius: theme.shape.borderRadius,
  border: `2px dashed ${theme.palette.primary.main}`,
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.background[1],

  '&:hover': {
    backgroundColor: theme.palette.primary[1],
    borderStyle: 'solid',
    transform: 'translateY(-2px)',
    boxShadow: theme.customShadows.button,
  },

  '&:active': {
    transform: 'translateY(0)',
  },

  transition: theme.transitions.create(['background-color', 'transform', 'box-shadow'], {
    duration: theme.transitions.duration.short,
  }),
}));

/**
 * Floating Action Button Container
 * Container for floating action buttons
 */
export const FloatingActionContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  zIndex: 1000,
}));

/**
 * Floating Action Button
 * FAB for quick actions
 *
 * UX PRINCIPLES:
 * - Fitts's Law: Large target (56x56px)
 * - Visual prominence with shadow
 */
export const FloatingActionButton = styled(IconButton)(({ theme }) => ({
  width: 56,
  height: 56,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.background[1],
  boxShadow: theme.customShadows.button,

  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'scale(1.05)',
    boxShadow: theme.customShadows.z2,
  },

  '&:active': {
    transform: 'scale(0.98)',
  },

  transition: theme.transitions.create(['background-color', 'transform', 'box-shadow'], {
    duration: theme.transitions.duration.short,
  }),
}));

/**
 * Divider Line
 * Visual separator between sections
 */
export const DividerLine = styled(Box)(({ theme }) => ({
  height: 1,
  backgroundColor: theme.palette.background[4],
  margin: theme.spacing(2, 0),
}));

/**
 * ===================================
 * SUBTLE INSERTION ZONE COMPONENTS
 * ===================================
 * Minimal, space-efficient insertion points that follow WizyVision guidelines.
 *
 * DESIGN PHILOSOPHY:
 * - Nearly invisible by default (2px height, 0.3 opacity)
 * - Thin line + small button on hover
 * - Uses existing margins - NO wasted space
 * - Smooth transitions for polish
 */

/**
 * ZoneContainer
 * Outer container for insertion zone
 *
 * UX PRINCIPLES:
 * - Fitts's Law: 44px minimum touch target (expanded invisibly)
 * - Progressive Disclosure: Minimal by default, clear on hover
 * - Spacing: 8px (fields) or 16px (sections)
 */
export const ZoneContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'spacing' && prop !== 'isHovered',
})<{ spacing: 'field' | 'section'; isHovered: boolean }>(({ theme, spacing, isHovered }) => ({
  position: 'relative',
  width: '100%',
  height: spacing === 'field' ? 8 : 16, // Actual space: 8px or 16px
  minHeight: 44, // Touch target for accessibility (invisible)
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: isHovered ? 'pointer' : 'default',

  // Expand hit area without visual space
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -18, // Expand up
    bottom: -18, // Expand down
    left: 0,
    right: 0,
    zIndex: 1,
  },

  transition: theme.transitions.create(['opacity'], {
    duration: theme.transitions.duration.short,
  }),
}));

/**
 * ZoneLine
 * Thin horizontal line indicator
 *
 * UX PRINCIPLES:
 * - Visual Hierarchy: Subtle hint, clear on interaction
 * - Aesthetic-Usability: Smooth opacity transition
 *
 * STATES:
 * - Default: 2px height, 0.3 opacity (barely visible)
 * - Hover: 1px height, full opacity, primary color
 */
export const ZoneLine = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isHovered',
})<{ isHovered: boolean }>(({ theme, isHovered }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  height: isHovered ? 1 : 2,
  backgroundColor: isHovered
    ? theme.palette.primary.main
    : theme.palette.text.disabled,
  opacity: isHovered ? 1 : 0.3,
  zIndex: 2,

  transition: theme.transitions.create(['height', 'opacity', 'background-color'], {
    duration: theme.transitions.duration.short, // 200ms
  }),
}));

/**
 * ButtonGroup
 * Container for mini action buttons
 *
 * UX PRINCIPLES:
 * - Progressive Disclosure: Buttons appear only on hover
 * - Hick's Law: Maximum 2 buttons to reduce choice
 * - Proper spacing between buttons
 */
export const ButtonGroup = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isHovered',
})<{ isHovered: boolean }>(({ theme, isHovered }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1), // 8px between buttons
  opacity: isHovered ? 1 : 0,
  transform: isHovered ? 'scale(1)' : 'scale(0.9)',
  pointerEvents: isHovered ? 'auto' : 'none',
  zIndex: 3,
  backgroundColor: theme.palette.background[1], // White background for buttons
  padding: theme.spacing(0.5, 1),
  borderRadius: 20, // Pill shape
  boxShadow: isHovered ? theme.customShadows.z1 : 'none',

  transition: theme.transitions.create(['opacity', 'transform', 'box-shadow'], {
    duration: theme.transitions.duration.short, // 200ms
  }),
}));

/**
 * MiniCircleButton
 * Small circular button with icon
 *
 * UX PRINCIPLES:
 * - Fitts's Law: Minimum 20x20px visible, 44x44px touch target
 * - Visual Hierarchy: Primary color, clear affordance
 * - Smooth hover/active states
 */
export const MiniCircleButton = styled(IconButton)(({ theme }) => ({
  width: 20,
  height: 20,
  padding: 3, // Small padding for tight circle
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.background[1],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',

  // Expand touch target invisibly
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -12,
    bottom: -12,
    left: -12,
    right: -12,
  },

  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'scale(1.1)',
    boxShadow: theme.customShadows.button,
  },

  '&:active': {
    transform: 'scale(0.95)',
  },

  '& .MuiSvgIcon-root': {
    fontSize: 14, // Small icon
  },

  transition: theme.transitions.create(['background-color', 'transform', 'box-shadow'], {
    duration: theme.transitions.duration.shorter, // 150ms
  }),
}));

/**
 * ButtonLabel
 * Tiny label text below button
 *
 * UX PRINCIPLES:
 * - Clarity: Labels clarify button purpose
 * - Typography: Small but readable (11px)
 */
export const ButtonLabel = styled('span')(({ theme }) => ({
  position: 'absolute',
  top: 26, // Below button
  left: '50%',
  transform: 'translateX(-50%)',
  fontSize: 11,
  fontWeight: 500,
  color: theme.palette.text.secondary,
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
  lineHeight: 1,
}));

/**
 * ===================================
 * COMPACT POPOVER INSERTION ZONE
 * ===================================
 * Ultra-compact menu design that takes minimal space.
 * Menu appears on hover as small popover above insertion line.
 *
 * DESIGN PHILOSOPHY:
 * - Minimal space footprint: 1px line, no wasted height
 * - Compact menu: Small vertically-stacked options
 * - Progressive disclosure: Menu only on hover
 * - No layout shifts: Absolutely positioned menu
 */

/**
 * CompactZoneContainer
 * Minimal container for compact insertion zone
 *
 * UX PRINCIPLES:
 * - Minimal visual space (just 1px line)
 * - Full-width hover target for easy discoverability
 * - Relative positioning for menu anchor
 */
export const CompactZoneContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'spacing' && prop !== 'isFirst' && prop !== 'isLast',
})<{ spacing?: 'field' | 'section'; isFirst?: boolean; isLast?: boolean }>(({ theme, spacing = 'field', isFirst = false, isLast = false }) => ({
  position: 'relative',
  width: '100%',
  height: 1, // Just the line height
  padding: `${theme.spacing(0.75)} 0`, // 6px top/bottom for easier interaction
  paddingTop: isFirst ? 0 : theme.spacing(0.75), // No padding at top if first
  paddingBottom: isLast ? 0 : theme.spacing(0.75), // No padding at bottom if last
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}));

/**
 * CompactZoneLine
 * Thin horizontal line indicator
 *
 * UX PRINCIPLES:
 * - Subtle by default (dashed, low opacity)
 * - Clear on hover (solid, primary color)
 * - Smooth transition for polish
 *
 * STATES:
 * - Default: Dashed, gray, 0.3 opacity
 * - Hover: Solid, primary color, full opacity
 */
export const CompactZoneLine = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isHovered',
})<{ isHovered: boolean }>(({ theme, isHovered }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  height: 1,
  backgroundColor: isHovered ? theme.palette.primary.main : theme.palette.divider,
  borderTop: isHovered ? 'none' : `1px dashed ${theme.palette.divider}`,
  opacity: isHovered ? 1 : 0.3,
  zIndex: 2,

  transition: theme.transitions.create(['opacity', 'background-color', 'border'], {
    duration: theme.transitions.duration.short, // 200ms
  }),
}));

/**
 * CompactPopoverMenu
 * Small popover menu with vertically stacked options
 *
 * UX PRINCIPLES:
 * - Progressive Disclosure: Appears only on hover
 * - Compact Design: Small, tight spacing
 * - Fitts's Law: Each item is 44px height
 * - Visual Hierarchy: White background, shadow for elevation
 *
 * POSITIONING:
 * - Absolute: No layout shifts
 * - Centered horizontally
 * - Above the line (default) or below the line (for top insertion zone)
 *
 * NOTE: Uses transient props pattern ($isVisible, $popoverPosition) to avoid
 * TypeScript type conflicts with CSS properties
 */
interface CompactPopoverMenuProps {
  $isVisible: boolean;
  $popoverPosition?: 'above' | 'below';
}

export const CompactPopoverMenu = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$isVisible' && prop !== '$popoverPosition',
})<CompactPopoverMenuProps>(({ theme, $isVisible, $popoverPosition = 'above' }) => ({
  position: 'absolute',
  // Position above (default) or below the line
  ...($popoverPosition === 'above'
    ? { bottom: 'calc(100% + 4px)' } // 8px above the line
    : { top: 'calc(100% + 4px)' }    // 8px below the line
  ),
  left: '50%',
  transform: $isVisible ? 'translateX(-50%) scale(1)' : 'translateX(-50%) scale(0.95)',
  backgroundColor: theme.palette.background[1],
  borderRadius: 8,
  boxShadow: $isVisible ? theme.customShadows.z2 : 'none',
  opacity: $isVisible ? 1 : 0,
  pointerEvents: $isVisible ? 'auto' : 'none',
  zIndex: 10,
  overflow: 'hidden',
  minWidth: 140,

  transition: theme.transitions.create(['opacity', 'transform', 'box-shadow'], {
    duration: theme.transitions.duration.short, // 200ms
  }),
}));

/**
 * CompactMenuItem
 * Individual menu item (Field or Section)
 *
 * UX PRINCIPLES:
 * - Fitts's Law: 44px height, full width clickable
 * - Visual Feedback: Hover background change
 * - Clear Layout: Icon + label horizontally aligned
 */
export const CompactMenuItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5), // 12px between icon and label
  padding: theme.spacing(1.5, 2), // 12px vertical, 16px horizontal
  minHeight: 44, // Fitts's Law
  cursor: 'pointer',
  userSelect: 'none',

  '&:hover': {
    backgroundColor: theme.palette.primary[1], // Very light red
  },

  '&:active': {
    backgroundColor: theme.palette.primary[2], // Slightly darker on click
  },

  '& + &': {
    borderTop: `1px solid ${theme.palette.background[3]}`, // Divider between items
  },

  transition: theme.transitions.create('background-color', {
    duration: theme.transitions.duration.shorter, // 150ms
  }),
}));

/**
 * MenuItemIcon
 * Icon container for menu items
 *
 * UX PRINCIPLES:
 * - Visual Hierarchy: Icon draws attention
 * - Consistent Size: 20x20px container
 * - Primary Color: Matches brand
 */
export const MenuItemIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 20,
  height: 20,
  color: theme.palette.primary.main,

  '& .MuiSvgIcon-root': {
    fontSize: 18, // Small icon
  },
}));

/**
 * MenuItemLabel
 * Text label for menu items
 *
 * UX PRINCIPLES:
 * - Typography: Clear, readable (14px body2)
 * - Color: Primary text color
 * - No Wrap: Prevents layout issues
 */
export const MenuItemLabel = styled('span')(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize, // 14px
  fontWeight: 500,
  color: theme.palette.text.primary,
  whiteSpace: 'nowrap',
  lineHeight: 1,
}));

/**
 * Drag Overlay Section Preview
 * Preview of section being dragged (header only)
 *
 * UX PRINCIPLES:
 * - Visual Hierarchy: Elevated shadow indicates dragged state
 * - Aesthetic-Usability: Polished appearance with opacity
 * - Jakob's Law: Familiar drag-and-drop visual feedback
 * - Von Restorff Effect: Shadow and opacity make it stand out
 */
export const DragOverlaySectionPreview = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background[1], // White
  borderRadius: '12px',
  boxShadow: theme.customShadows.z2, // Elevated shadow
  minWidth: '600px',
  opacity: 0.95,
  cursor: 'grabbing',
  // Ensure it appears above everything else
  position: 'relative',
  zIndex: 9999,
}));

/**
 * Drag Overlay Field Preview
 * Preview of field being dragged
 *
 * UX PRINCIPLES:
 * - Visual Hierarchy: Elevated shadow indicates dragged state
 * - Aesthetic-Usability: Polished appearance with opacity
 * - Jakob's Law: Familiar drag-and-drop visual feedback
 */
export const DragOverlayFieldPreview = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background[1], // White
  borderRadius: theme.spacing(0.5), // 4px
  boxShadow: theme.customShadows.z2, // Elevated shadow
  padding: theme.spacing(1.5, 2), // 12px 16px
  minWidth: '300px',
  opacity: 0.95,
  cursor: 'grabbing',
  // Ensure it appears above everything else
  position: 'relative',
  zIndex: 9999,
}));

/**
 * Drag Overlay Field Content
 * Content layout for dragged field preview
 *
 * UX PRINCIPLES:
 * - Visual Hierarchy: Icon, label, type in logical order
 * - Miller's Law: Simple, scannable layout
 */
export const DragOverlayFieldContent = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  fontSize: '16px',
  fontWeight: 500,
});

/**
 * Drag Overlay Field Type Badge
 * Type indicator for dragged field
 *
 * UX PRINCIPLES:
 * - Visual Hierarchy: Secondary information (smaller, gray)
 * - Typography: Uppercase for distinction
 */
export const DragOverlayFieldType = styled('span')(({ theme }) => ({
  marginLeft: 'auto',
  fontSize: theme.typography.caption.fontSize, // 12px
  fontWeight: 400,
  color: theme.palette.text.secondary, // Gray
  textTransform: 'uppercase',
}));

/**
 * ===================================
 * MOBILE PREVIEW EMPTY STATE
 * ===================================
 * Empty state shown in mobile preview when no form items exist.
 *
 * UX PRINCIPLES:
 * - Jakob's Law: Familiar empty state pattern (centered message, clear instructions)
 * - Visual Hierarchy: Primary message (larger) followed by secondary instruction (smaller, muted)
 * - Clarity Trumps Consistency: Clear guidance on what action to take
 * - Aesthetic-Usability: Generous padding creates calm, approachable empty state
 */

/**
 * MobilePreviewEmptyState
 * Container for mobile preview empty state
 *
 * UX PRINCIPLES:
 * - Visual Hierarchy: Centered layout draws focus to message
 * - Fitts's Law: Generous padding (48px vertical) creates comfortable reading space
 * - Aesthetic-Usability: Balanced, calm appearance reduces user anxiety
 */
export const MobilePreviewEmptyState = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 2), // 48px vertical, 16px horizontal
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1), // 8px between messages
}));

/**
 * EmptyStatePrimaryText
 * Main empty state message (larger, more prominent)
 *
 * UX PRINCIPLES:
 * - Visual Hierarchy: Larger font size, primary emphasis
 * - Typography: body1 (16px) for readability
 * - Color: text.secondary for less aggressive tone
 */
export const EmptyStatePrimaryText = styled(Typography)(({ theme }) => ({
  // Typography component handles variant internally
  color: theme.palette.text.secondary,
}));

/**
 * EmptyStateSecondaryText
 * Secondary instructional message (smaller, muted)
 *
 * UX PRINCIPLES:
 * - Visual Hierarchy: Smaller, muted text for supporting information
 * - Typography: body2 (14px) for secondary content
 * - Color: text.disabled for clear hierarchy
 */
export const EmptyStateSecondaryText = styled(Typography)(({ theme }) => ({
  // Typography component handles variant internally
  color: theme.palette.text.disabled,
}));
