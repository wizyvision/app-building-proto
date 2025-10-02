'use client';

import React from 'react';
import { Typography, Button, CardContent } from '@mui/material';
import Link from 'next/link';
import { PageContainer, HeroSection, ButtonGroup, FeatureCard } from './styles';

/**
 * Home Page Component - Navigation hub for WizyVision Form Builder prototype
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Familiar landing page pattern with hero section and CTAs.
 *   Users expect centered content with primary/secondary action buttons.
 *
 * - Fitts's Law: Large action buttons (48x48px minimum) positioned centrally
 *   for easy targeting. Primary button ("View Prototypes") is larger and
 *   more prominent than secondary button.
 *
 * - Hick's Law: Limited to 2 primary actions (Prototypes, Components) to
 *   reduce decision paralysis. Additional info in feature card is read-only.
 *
 * - Visual Hierarchy:
 *   - Primary: Main heading (largest, darkest)
 *   - Secondary: Description text, primary CTA button
 *   - Tertiary: Secondary CTA button, feature list
 *   - Clear z-index via card elevation for feature details
 *
 * - Miller's Law: Feature list chunked into 5 items (within 5-7 cognitive limit)
 *   for easy scanning and comprehension.
 *
 * INTERACTIONS:
 * - Hover on buttons: Background darkens, subtle elevation increase
 * - Click "View Prototypes": Navigate to prototypes landing page
 * - Click "View Components": Navigate to component showcase
 * - Keyboard: Tab to navigate between links, Enter to activate
 *
 * TOUCH TARGETS:
 * - Primary button: 48x48px minimum (large size="large")
 * - Secondary button: 48x48px minimum
 * - Buttons spaced 16px apart (easy to tap without mis-clicks)
 *
 * ACCESSIBILITY:
 * - Semantic HTML hierarchy (h1, h2, ul)
 * - Sufficient color contrast for all text
 * - Focus indicators on interactive elements
 * - Screen reader friendly content structure
 */
export const Home: React.FC = () => {
  return (
    <PageContainer maxWidth="md">
      <HeroSection>
        <Typography variant="h1" gutterBottom>
          WizyVision Form Builder
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Device-based form layout builder prototype for stakeholder feedback
        </Typography>
        <ButtonGroup>
          <Button
            variant="contained"
            size="large"
            color="primary"
            component={Link}
            href="/prototypes"
          >
            View Prototypes
          </Button>
          <Button
            variant="outlined"
            size="large"
            color="primary"
            component={Link}
            href="/components"
          >
            View Components
          </Button>
        </ButtonGroup>
      </HeroSection>

      <FeatureCard>
        <CardContent>
          <Typography variant="h2" gutterBottom>
            Prototype Features
          </Typography>
          <Typography variant="body1" mb={2}>
            Explore the prototype features:
          </Typography>
          <ul>
            <li><strong>Prototypes:</strong> Browse feature iterations and design versions</li>
            <li><strong>Component Showcase:</strong> Interactive demo of all UI components</li>
            <li><strong>Sections & Fields:</strong> Drag-and-drop form builder elements</li>
            <li><strong>Design System:</strong> Consistent Material UI theming</li>
            <li><strong>UX Principles:</strong> Jakob's, Fitts's, Hick's, Miller's Laws applied</li>
          </ul>
        </CardContent>
      </FeatureCard>
    </PageContainer>
  );
};
