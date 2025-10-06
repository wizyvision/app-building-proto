import { VersionMetadata, VersionDetail } from './types';

/**
 * Adapters to convert unified VersionMetadata to component-specific formats
 */

/**
 * Get version details for comparison/selection UI
 */
export const getVersionDetails = (version: VersionMetadata): VersionDetail => {
  return {
    strengths: version.strengths,
    limitations: version.weaknesses,
    bestScenarios: version.bestScenarios,
    userExpertise: version.userExpertise,
    designPrinciples: version.designPrinciples,
    learnings: version.learnings,
    technicalFeasibility: version.technicalFeasibility,
  };
};
