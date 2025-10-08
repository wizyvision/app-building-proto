/**
 * TemplateLibrarySidebar Component
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Sidebar pattern from FormBuilder v2, VS Code, Gmail
 * - Visual Hierarchy: Sections grouped, Recently Used at top
 * - Fitts's Law: Full-width click targets, larger icons
 * - Miller's Law: Max 5-7 templates visible per section
 *
 * INTERACTION DESIGN:
 * - Click template: Insert fields at current position
 * - Hover template: Show visual feedback
 * - Template organization: System → User → Recently Used
 */

'use client';

import React from 'react';
import { Typography, List, Box } from '@mui/material';
import {
  TemplateDrawer,
  TemplateSectionHeader,
  TemplateListItem,
  TemplateIcon,
  TemplateLabel,
  EmptyState,
  EmptyStateText,
} from './styles';
import type { TemplateLibrarySidebarProps, FieldTemplate } from './types';
import { systemTemplates } from './systemTemplates';

export function TemplateLibrarySidebar({ onSelectTemplate }: TemplateLibrarySidebarProps) {
  // For now, use system templates only
  // In Phase 2, we'll add React Query for user templates
  const templates = systemTemplates;
  const userTemplates: FieldTemplate[] = [];
  const recentTemplates: FieldTemplate[] = [];

  return (
    <TemplateDrawer variant="permanent" anchor="left">
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Field Templates
      </Typography>

      {/* Recently Used */}
      {recentTemplates.length > 0 && (
        <Box>
          <TemplateSectionHeader>Recently Used</TemplateSectionHeader>
          <List disablePadding>
            {recentTemplates.map((template) => (
              <TemplateListItem
                key={template.id}
                onClick={() => onSelectTemplate(template)}
                disableGutters
              >
                <TemplateIcon>{template.icon}</TemplateIcon>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <TemplateLabel>{template.name}</TemplateLabel>
                </Box>
              </TemplateListItem>
            ))}
          </List>
        </Box>
      )}

      {/* System Templates */}
      <Box>
        <TemplateSectionHeader>System Templates</TemplateSectionHeader>
        <List disablePadding>
          {templates.map((template) => (
            <TemplateListItem
              key={template.id}
              onClick={() => onSelectTemplate(template)}
              disableGutters
            >
              <TemplateIcon>{template.icon}</TemplateIcon>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <TemplateLabel>{template.name}</TemplateLabel>
              </Box>
            </TemplateListItem>
          ))}
        </List>
      </Box>

      {/* User Templates */}
      <Box>
        <TemplateSectionHeader>My Templates</TemplateSectionHeader>
        {userTemplates.length === 0 ? (
          <EmptyState>
            <EmptyStateText>No templates yet</EmptyStateText>
          </EmptyState>
        ) : (
          <List disablePadding>
            {userTemplates.map((template) => (
              <TemplateListItem
                key={template.id}
                onClick={() => onSelectTemplate(template)}
                disableGutters
              >
                <TemplateIcon>{template.icon}</TemplateIcon>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <TemplateLabel>{template.name}</TemplateLabel>
                </Box>
              </TemplateListItem>
            ))}
          </List>
        )}
      </Box>
    </TemplateDrawer>
  );
}
