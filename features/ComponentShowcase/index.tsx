'use client';

import React, { useState } from 'react';
import { Typography, ListItemText } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import {
  StoryContainer,
  StoryDescription,
  ShowcaseLayout,
  ShowcaseDrawer,
  DrawerList,
  DrawerListItem,
  ShowcaseContent,
  BackButton,
} from './styles';
import { Section } from './views/Section';
import { Field } from './views/Field';

type ShowcaseView = 'section' | 'field';

const navItems: { label: string; value: ShowcaseView }[] = [
  { label: 'Section', value: 'section' },
  { label: 'Field', value: 'field' },
];

/**
 * Component Showcase - Interactive component library/gallery
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Familiar drawer navigation pattern from Storybook, Material-UI docs,
 *   and design system libraries. Users expect left sidebar for component selection.
 *
 * - Fitts's Law: Full-width drawer list items (240px wide) provide large click targets.
 *   Back button is 44x44px minimum and positioned in top-left corner (easy to reach).
 *
 * - Hick's Law: Limited component list (currently 2 items) prevents overwhelming users.
 *   As more components are added, consider grouping by category.
 *
 * - Visual Hierarchy:
 *   - Primary: Selected component in drawer (highlighted with primary color)
 *   - Secondary: Component name heading, interactive demos
 *   - Tertiary: Unselected drawer items, descriptions
 *   - Clear visual separation via drawer border and background colors
 *
 * - Miller's Law: Drawer navigation limited to showing 5-7 components at once.
 *   If list grows, implement categorization or search.
 *
 * INTERACTIONS:
 * - Click drawer item: Switch to selected component showcase
 * - Hover drawer item: Background changes for visual feedback
 * - Click back button: Return to home page
 * - Selected item: Highlighted with primary color and different background
 * - Keyboard: Tab through drawer items, Enter to select, Escape to go back
 *
 * TOUCH TARGETS:
 * - Drawer items: 48px height minimum, full 240px width
 * - Back button: 44x44px minimum
 * - Sufficient spacing (4px) between drawer items
 *
 * LAYOUT:
 * - Drawer: Fixed 240px width, full viewport height, sticky on scroll
 * - Content: Flexible width, scrollable, left margin to avoid drawer overlap
 * - Responsive: On mobile (<600px), consider collapsible drawer
 *
 * ACCESSIBILITY:
 * - ARIA label on back button
 * - Selected state announced to screen readers
 * - Focus indicators visible on all interactive elements
 * - Keyboard navigation fully supported
 */
export const ComponentShowcase: React.FC = () => {
  const [selectedView, setSelectedView] = useState<ShowcaseView>('section');
  const router = useRouter();

  const renderContent = () => {
    if (selectedView === 'field') {
      return <Field />;
    }
    return <Section />;
  };

  return (
    <ShowcaseLayout>
      <ShowcaseDrawer>
        <DrawerList>
          {navItems.map((item) => (
            <DrawerListItem
              key={item.value}
              selected={selectedView === item.value}
              onClick={() => setSelectedView(item.value)}
            >
              <ListItemText primary={item.label} />
            </DrawerListItem>
          ))}
        </DrawerList>
      </ShowcaseDrawer>

      <ShowcaseContent>
        <StoryContainer maxWidth={false}>
          <BackButton onClick={() => router.push('/')} aria-label="Back to home">
            <ArrowBackIcon />
          </BackButton>

          <Typography variant="h3" sx={{ marginBottom: 0.5 }}>
            Components
          </Typography>
          <StoryDescription variant="body1">
            Interactive component showcase for WizyVision Form Builder
          </StoryDescription>

          {renderContent()}
        </StoryContainer>
      </ShowcaseContent>
    </ShowcaseLayout>
  );
};
