import { Box } from "@mui/material";

/**
 * Custom Drag Icon - Shared Component
 *
 * A 12x4px drag handle icon matching Figma's design specification.
 * Used across Field and Section components for consistent drag interaction.
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Familiar horizontal lines pattern universally recognized as drag handle
 * - Visual Hierarchy: Subtle gray color (#8C8C8C) indicates secondary/utility function
 * - Affordance: Visual indicator of draggability without being intrusive
 *
 * USAGE:
 * - Appears on hover to indicate draggable elements
 * - Consistent 12x4px size across all components
 * - Color: #8C8C8C (medium gray) for subtle visibility
 */
export const DragIcon = () => {
  return (
    <Box paddingY={0.25}>
      <svg width="12" height="4" viewBox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 1.33333H0V0H12V1.33333ZM12 2.66667H0V4H12V2.66667Z" fill="#8C8C8C"/>
      </svg>
    </Box>
  );
};
