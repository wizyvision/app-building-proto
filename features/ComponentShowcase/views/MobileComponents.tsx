import React, { useState } from 'react';
import { Typography, Box, Paper } from '@mui/material';
import { StorySection } from '../styles';
import {
  MobileDevice,
  FormHeader,
  MobileSection,
  transformCaseToFormHeader,
  type CaseResponse,
} from '@/components/mobile';
import { MobileFieldFactory } from '@/features/Mobile/FieldFactory';

// Sample API response
const sampleCaseResponse: CaseResponse = {
  data: {
    id: '59729bcf-5dca-48f8-b074-e1a33700fbc2',
    description: '',
    memId: 3,
    lastUpdaterId: 3,
    postRef: 'WV-1023',
    privacyId: 3,
    statusId: 41,
    title: 'test',
    typeId: 15,
    createdAt: '2025-04-23T12:20:00.000Z',
    updatedAt: '2025-04-29T16:20:00.000Z',
    deletedAt: null,
    privacyName: 'standard',
    status: {
      id: 41,
      color: '#818181',
      intl: {
        en: 'Open',
        fr: 'Ouvert',
      },
      name: 'Open',
    },
    type: {
      id: 15,
      color: '#818181',
      name: 'Equipment Inspection',
      intl: {
        en: 'Equipment Inspection',
      },
    },
    signedThumbnailUrl: null,
  },
};

/**
 * Mobile Components Showcase
 *
 * Displays the three mobile container components:
 * - MobileDevice: Android device frame
 * - FormHeader: App label, case number, timestamps
 * - MobileSection: Collapsible section container
 */
// Sample fields data (like from API) - enough fields to demonstrate scrolling
const sampleBasicDetailsFields = [
  {
    dataType: 'STRING',
    fieldKey: 'title',
    label: 'Title',
  },
  {
    dataType: 'TEXT',
    fieldKey: 'description',
    label: 'Description',
  },
  {
    dataType: 'STATUS_ID',
    fieldKey: 'statusId',
    label: 'Status',
  },
  {
    dataType: 'SELECT',
    fieldKey: 'c15_dropdown',
    label: 'Dropdown',
  },
  {
    dataType: 'DOUBLE',
    fieldKey: 'c15_number',
    label: 'Number',
  },
  {
    dataType: 'STRING',
    fieldKey: 'f1_location',
    label: 'Location',
  },
  {
    dataType: 'TEXT',
    fieldKey: 'f2_notes',
    label: 'Additional Notes',
  },
];

const samplePrivacyFields = [
  {
    dataType: 'PRIVACY_ID',
    fieldKey: 'privacyId',
    label: 'Privacy',
  },
];

const sampleInspectorFields = [
  {
    dataType: 'STRING',
    fieldKey: 'f3_inspector_name',
    label: 'Inspector Name',
  },
  {
    dataType: 'TEXT',
    fieldKey: 'f4_inspector_notes',
    label: 'Inspector Notes',
  },
  {
    dataType: 'SIGNATURE',
    fieldKey: 'f5_signature',
    label: 'Signature',
  },
];

export const MobileComponents: React.FC = () => {
  const [section1Expanded, setSection1Expanded] = useState(true);
  const [section2Expanded, setSection2Expanded] = useState(false);
  const [section3Expanded, setSection3Expanded] = useState(true);

  const headerProps = transformCaseToFormHeader(sampleCaseResponse);

  return (
    <Box>
      <StorySection>
        <Typography variant="h4" gutterBottom>
          Mobile Components
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Container components for mobile form views: MobileDevice (Android frame), FormHeader
          (app label + case info), and MobileSection (collapsible sections).
        </Typography>
      </StorySection>

      {/* Complete Mobile View */}
      <StorySection>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>Complete Mobile View</Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Full mobile device with FormHeader and collapsible sections containing fields.
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
            <MobileDevice statusBarTime="12:30">
              <FormHeader {...headerProps} />

                <MobileSection
                  title="Basic Details"
                  completionText="4/5 (80%)"
                  isExpanded={section1Expanded}
                  onToggle={() => setSection1Expanded(!section1Expanded)}
                >
                  {sampleBasicDetailsFields.map((field, index) => (
                    <MobileFieldFactory key={`${field.fieldKey}-${index}`} field={field} />
                  ))}
                </MobileSection>

                <MobileSection
                  title="Privacy & Settings"
                  completionText="1/1 (100%)"
                  isExpanded={section2Expanded}
                  onToggle={() => setSection2Expanded(!section2Expanded)}
                >
                  {samplePrivacyFields.map((field, index) => (
                    <MobileFieldFactory key={`${field.fieldKey}-${index}`} field={field} />
                  ))}
                </MobileSection>

                <MobileSection
                  title="Inspector"
                  completionText="2/3 (67%)"
                  isExpanded={section3Expanded}
                  onToggle={() => setSection3Expanded(!section3Expanded)}
                >
                  {sampleInspectorFields.map((field, index) => (
                    <MobileFieldFactory key={`${field.fieldKey}-${index}`} field={field} />
                  ))}
                </MobileSection>
            </MobileDevice>
          </Box>
        </Paper>
      </StorySection>

      {/* MobileDevice Only */}
      <StorySection>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>MobileDevice (Frame Only)</Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Android device frame (360x720px) with status bar and bottom navigation.
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
            <MobileDevice>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  padding: 2,
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  Content goes here
                </Typography>
              </Box>
            </MobileDevice>
          </Box>
        </Paper>
      </StorySection>

      {/* FormHeader */}
      <StorySection>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>FormHeader</Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Displays app label (type.name), case number (postRef), and formatted timestamps.
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ maxWidth: 400, margin: '0 auto' }}>
            <FormHeader {...headerProps} />
          </Box>
        </Paper>
      </StorySection>

      {/* MobileSection - Expanded */}
      <StorySection>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>MobileSection (Expanded)</Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Collapsible section with title, completion percentage, and content area.
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ maxWidth: 400, margin: '0 auto' }}>
            <MobileSection
              title="Basic Details"
              completionText="3/5 (60%)"
              isExpanded={true}
              onToggle={() => {}}
            >
              <Typography variant="body2">Section content goes here</Typography>
              <Typography variant="body2">More content...</Typography>
            </MobileSection>
          </Box>
        </Paper>
      </StorySection>

      {/* MobileSection - Collapsed */}
      <StorySection>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>MobileSection (Collapsed)</Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Collapsed state showing only header with chevron icon.
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ maxWidth: 400, margin: '0 auto' }}>
            <MobileSection
              title="Inspector"
              completionText="0/2 (0%)"
              isExpanded={false}
              onToggle={() => {}}
            >
              <Typography variant="body2">Hidden content</Typography>
            </MobileSection>
          </Box>
        </Paper>
      </StorySection>

      {/* API Response Transformation Example */}
      <StorySection>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>API Response Transformation</Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Example of transforming API response to FormHeader props:
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ padding: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              API Response:
            </Typography>
            <pre
              style={{
                backgroundColor: '#f5f5f5',
                padding: '12px',
                borderRadius: '4px',
                overflow: 'auto',
                fontSize: '12px',
              }}
            >
              {JSON.stringify(
                {
                  'data.type.name': sampleCaseResponse.data.type.name,
                  'data.postRef': sampleCaseResponse.data.postRef,
                  'data.createdAt': sampleCaseResponse.data.createdAt,
                  'data.updatedAt': sampleCaseResponse.data.updatedAt,
                },
                null,
                2
              )}
            </pre>

            <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
              FormHeader Props:
            </Typography>
            <pre
              style={{
                backgroundColor: '#f5f5f5',
                padding: '12px',
                borderRadius: '4px',
                overflow: 'auto',
                fontSize: '12px',
              }}
            >
              {JSON.stringify(headerProps, null, 2)}
            </pre>
          </Box>
        </Paper>
      </StorySection>
    </Box>
  );
};
