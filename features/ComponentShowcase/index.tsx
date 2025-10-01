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
import { SectionShowcase } from './SectionShowcase';
import { FieldShowcase } from './FieldShowcase';

type ShowcaseView = 'section' | 'field';

const navItems: { label: string; value: ShowcaseView }[] = [
  { label: 'Section', value: 'section' },
  { label: 'Field', value: 'field' },
];

export const ComponentShowcase: React.FC = () => {
  const [selectedView, setSelectedView] = useState<ShowcaseView>('section');
  const router = useRouter();

  const renderContent = () => {
    if (selectedView === 'field') {
      return <FieldShowcase />;
    }
    return <SectionShowcase />;
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
        <StoryContainer maxWidth="md">
          <BackButton onClick={() => router.push('/')} aria-label="Back to home">
            <ArrowBackIcon />
          </BackButton>

          <Typography variant="h3" gutterBottom>
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
