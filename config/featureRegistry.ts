/**
 * Feature Registry
 *
 * Central registry for all prototype features and their versions.
 * This allows both the feature overview page and version router to
 * dynamically handle any feature without hardcoding.
 *
 * HOW TO ADD A NEW FEATURE:
 * 1. Create the feature components in /features/{FeatureName}/version{N}/
 * 2. Add an entry to this registry with metadata
 * 3. Update /app/prototypes/page.tsx to list the new feature
 *
 * HOW TO ADD A NEW VERSION:
 * 1. Create /features/{FeatureName}/version{N}/index.tsx
 * 2. Add the version metadata to the feature's versions array
 */

export interface VersionMetadata {
  id: string;
  version: string;
  date: string;
  description: string;
  isLatest: boolean;
}

export interface FeatureMetadata {
  slug: string;
  name: string;
  description: string;
  versions: VersionMetadata[];
}

export const featureRegistry: Record<string, FeatureMetadata> = {
  'form-builder': {
    slug: 'form-builder',
    name: 'Form Builder',
    description: 'Device-based form layout builder with sections and fields',
    versions: [
      {
        id: 'v1',
        version: '1.0',
        date: '2024-09-15',
        description: 'Initial Prototype - Basic wireframe with simple section and field structure for concept validation',
        isLatest: false,
      },
      {
        id: 'v2',
        version: '2.0',
        date: '2024-10-01',
        description: 'Full Implementation - Production-ready with field library, drag-and-drop, and device preview',
        isLatest: true,
      },
    ],
  },
  // Add more features here:
  // 'user-management': {
  //   slug: 'user-management',
  //   name: 'User Management',
  //   description: 'User roles and permissions management interface',
  //   versions: [
  //     {
  //       id: 'v1',
  //       version: '1.0',
  //       date: '2024-10-15',
  //       description: 'Basic user listing and role assignment',
  //       isLatest: true,
  //     },
  //   ],
  // },
};

/**
 * Get all features for the prototypes landing page
 */
export function getAllFeatures(): FeatureMetadata[] {
  return Object.values(featureRegistry);
}

/**
 * Get metadata for a specific feature
 */
export function getFeatureMetadata(slug: string): FeatureMetadata | null {
  return featureRegistry[slug] || null;
}

/**
 * Check if a feature exists
 */
export function featureExists(slug: string): boolean {
  return slug in featureRegistry;
}

/**
 * Check if a version exists for a feature
 */
export function versionExists(featureSlug: string, versionId: string): boolean {
  const feature = featureRegistry[featureSlug];
  if (!feature) return false;
  return feature.versions.some((v) => v.id === versionId);
}
