/**
 * Unified Version Metadata Types
 *
 * Single source of truth for all version information including:
 * - Case study content
 * - Technical details
 * - UX analysis
 * - Learnings and principles
 */

export interface VersionDetail {
  strengths: string[];
  limitations: string[];
  bestScenarios: string[];
  userExpertise: string[];
  designPrinciples: string[];
  learnings: string[];
  technicalFeasibility: {
    developmentTime: string;
    complexity: string;
    maintainability: string;
  };
}

export interface VersionMetadata {
  // Basic Info
  id: string;
  version: string;
  title: string;
  date: string;
  badgeVariant: 'prototype' | 'iteration' | 'latest';
  badgeLabel: string;

  // Case Study Sections
  purpose: string;
  problemStatement: string;
  solution: string;
  keyFeatures: string[];
  strengths: string[];
  weaknesses: string[];
  designDecisions: string;
  learnings: string[];
  nextSteps: string;

  // Additional metadata (for version comparison/selection)
  bestScenarios: string[];
  userExpertise: string[];
  designPrinciples: string[];
  technicalFeasibility: {
    developmentTime: string;
    complexity: string;
    maintainability: string;
  };

  // Optional comparison (for newer versions)
  comparison?: {
    previousVersion: string;
    changes: string[];
    beforeMetric: string;
    afterMetric: string;
    result: string;
  };
}
