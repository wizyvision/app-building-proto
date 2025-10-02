'use client';

import React from 'react';
import { Tabs, Tab, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  minHeight: theme.spacing(6), // 48px
  marginLeft: theme.spacing(-2), // Align with 16px container padding
  marginRight: theme.spacing(-2),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  marginTop: theme.spacing(1.5), // 12px
  marginBottom: theme.spacing(1.5), // 12px
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
    height: 3,
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  minWidth: theme.spacing(10), // 80px
  minHeight: theme.spacing(6), // 48px
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.body1.fontSize,
  color: theme.palette.text.secondary,
  transition: theme.transitions.create(['color', 'background-color'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightBold,
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: -2,
  },
}));

const LatestBadge = styled(Chip)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  height: theme.spacing(2.5), // 20px
  fontSize: theme.typography.caption.fontSize,
  fontWeight: theme.typography.fontWeightBold,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '& .MuiChip-label': {
    padding: theme.spacing(0, 1),
  },
}));

export interface VersionTabsProps {
  versions: number[];
  currentVersion: number;
  latestVersion: number;
  onChange: (version: number) => void;
}

/**
 * VersionTabs Component
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Familiar tabbed interface pattern from browsers, IDEs
 * - Fitts's Law: 48px minimum touch targets for tabs
 * - Visual Hierarchy: Active tab highlighted with color and bold weight
 * - Hick's Law: Linear list of versions, easy to scan
 *
 * INTERACTIONS:
 * - Click tab: Switch to that version
 * - Hover tab: Preview with color change
 * - Keyboard: Arrow keys to navigate between tabs
 * - Latest version: Badge indicator
 */
export const VersionTabs: React.FC<VersionTabsProps> = ({
  versions,
  currentVersion,
  latestVersion,
  onChange,
}) => {
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    onChange(newValue);
  };

  return (
    <StyledTabs
      value={currentVersion}
      onChange={handleChange}
      aria-label="Component version tabs"
    >
      {versions.map((version) => (
        <StyledTab
          key={version}
          value={version}
          label={
            <span>
              v{version}
              {version === latestVersion && (
                <LatestBadge label="Latest" size="small" />
              )}
            </span>
          }
          aria-label={`Version ${version}${version === latestVersion ? ' (latest)' : ''}`}
        />
      ))}
    </StyledTabs>
  );
};
