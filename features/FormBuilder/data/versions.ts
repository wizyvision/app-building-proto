import { VersionMetadata } from './types';

/**
 * Form Builder Version Metadata
 *
 * Unified data source containing all version information for:
 * - Case studies
 * - Version comparison
 * - Technical analysis
 * - UX principles and learnings
 */

export const formBuilderVersions: Record<string, VersionMetadata> = {
  v1: {
    // Basic Info
    id: 'v1',
    version: '1.0',
    title: 'Form Builder v1.0: Initial Prototype',
    date: '2024-09-15',
    badgeVariant: 'prototype',
    badgeLabel: 'Initial',

    // Case Study Content
    purpose: 'Quick initial prototype to establish basic form builder structure and test the concept of sections with fields.',

    problemStatement: 'Basic validation of form builder concept - can we organize forms into collapsible sections containing fields?',

    solution: '<strong>Basic Implementation:</strong> Simple wireframe with sections and fields. Minimal interaction design - just enough to visualize the concept.',

    keyFeatures: [
      'Basic section containers with expand/collapse',
      'Simple field representation',
      'Static wireframe without real interactions',
      'Two-column layout (no sidebar)',
    ],

    strengths: [
      'Quick to implement and test',
      'Clean, simple interface',
      'Validated basic concept of sections and fields',
      'Low complexity, easy to understand',
    ],

    weaknesses: [
      'No real strategy for handling 27+ field types',
      'Lacked interactive functionality',
      "Didn't address how users would actually add fields",
      'No device preview or responsive considerations',
    ],

    designDecisions: "Kept it simple to quickly validate the core concept. Didn't overthink the implementation - just built a basic structure to see if the section-based approach would work.",

    learnings: [
      'Basic structure validated the section-based approach',
      'Confirmed need for proper field library with 27+ types',
      'Static wireframes insufficient for complex interactions',
      'Quick prototypes valuable for early stakeholder alignment',
    ],

    nextSteps: 'Build a proper v2.0 with thoughtful interaction design, field library, drag-and-drop, and device preview capabilities.',

    // Additional Metadata
    bestScenarios: [
      'Rapid prototyping and concept validation',
      'Early stakeholder demos',
      'Simple forms with few field types',
      'Quick feasibility testing',
    ],

    userExpertise: [
      'Beginner-friendly interface',
      'No learning curve required',
      'Suitable for non-technical users',
      'Basic understanding of forms sufficient',
    ],

    designPrinciples: [
      "Jakob's Law: Familiar collapsible section pattern",
      'Visual Hierarchy: Clear section and field distinction',
      "Miller's Law: Content organized into digestible sections",
      'Simplicity: Minimal UI to reduce cognitive load',
    ],

    technicalFeasibility: {
      developmentTime: '1 week',
      complexity: 'Low',
      maintainability: 'Moderate',
    },
  },

  v2: {
    // Basic Info
    id: 'v2',
    version: '2.0',
    title: 'Form Builder v2.0: Full Implementation',
    date: '2024-10-01',
    badgeVariant: 'latest',
    badgeLabel: 'Current',

    // Case Study Content
    purpose: 'Create a proper, production-ready form builder with thoughtful interaction design to handle 27+ field types efficiently.',

    problemStatement: 'How to efficiently manage and add 27+ different field types while maintaining a clear, intuitive interface for form building.',

    solution: '<strong>Three-Panel Layout:</strong> Persistent field library on left, form builder in center, with drag-and-drop interaction. All field types visible at all times for quick discovery.',

    keyFeatures: [
      'Persistent field library with categorized fields',
      'Drag-and-drop field placement',
      'Real-time device preview (Web/Mobile)',
      'Interactive form controls with actual functionality',
      'Visual feedback during drag operations',
    ],

    strengths: [
      'All 27+ field types visible at once in library',
      'Drag-and-drop makes adding fields efficient',
      'Device preview for Web/Mobile views',
      'Full interactivity with real form controls',
      'Proper field categorization and organization',
    ],

    weaknesses: [
      'Field library consumes 280px of horizontal space',
      'More complex initial learning curve',
      'Requires larger screen for optimal experience',
    ],

    designDecisions: "After v1.0's basic validation, we invested in proper UX design. The persistent library ensures field discovery, while drag-and-drop provides intuitive interaction. Every decision was made with the 27+ field types in mind.",

    learnings: [
      'Persistent field library dramatically improves discoverability',
      'Drag-and-drop reduces interaction steps by 87.5%',
      'Device preview essential for responsive form design',
      'Investment in proper UX design pays off in user efficiency',
      'Three-panel layout scales well for complex applications',
    ],

    nextSteps: 'This is the current production version. Potential future enhancements include: field search/filtering, custom field templates, conditional logic, and form templates library.',

    // Additional Metadata
    bestScenarios: [
      'Production applications with complex forms',
      'Power users building multiple forms',
      'Desktop-first workflows',
      'Applications requiring 20+ field types',
    ],

    userExpertise: [
      'Best for intermediate to advanced users',
      'Familiarity with form builders recommended',
      'Benefits from understanding of drag-and-drop',
      'Power users will maximize efficiency',
    ],

    designPrinciples: [
      "Jakob's Law: Three-panel layout familiar from design tools",
      "Fitts's Law: Fixed sidebar keeps tools in consistent location",
      'Visual Hierarchy: Clear separation between library and preview',
      'Progressive Disclosure: Field library reveals all options upfront',
      'Direct Manipulation: Drag-and-drop provides immediate feedback',
    ],

    technicalFeasibility: {
      developmentTime: '3-4 weeks',
      complexity: 'High',
      maintainability: 'High',
    },

    // Comparison with previous version
    comparison: {
      previousVersion: 'v1.0',
      changes: [
        'Added persistent field library (280px left sidebar)',
        'Implemented drag-and-drop functionality',
        'Added device preview toggle (Web/Mobile views)',
        'Made everything interactive with real form controls',
        'Properly categorized all 27+ field types',
      ],
      beforeMetric: 'v1.0: Static wireframe, no real interaction strategy',
      afterMetric: 'v2.0: Full interactivity with drag-and-drop',
      result: 'Result: From concept validation to production-ready implementation',
    },
  },
};

// Helper function to get version by ID
export const getVersionById = (id: string): VersionMetadata | undefined => {
  return formBuilderVersions[id];
};

// Helper function to get all versions as array
export const getAllVersions = (): VersionMetadata[] => {
  return Object.values(formBuilderVersions);
};
