/**
 * InsertionOverlay Component - Version 3
 *
 * COMPONENT PURPOSE:
 * Manages the entire insertion zone overlay system. Detects positions between
 * fields, sections, and at boundaries. Renders InsertionZone components at
 * appropriate positions without modifying existing components.
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Users expect to insert items "between" existing items or at
 *   the end of lists. This pattern matches familiar UI behaviors from email
 *   clients, task managers, and document editors.
 *
 * - Miller's Law: Limits visual complexity by only showing zones on hover/interaction.
 *   Prevents cognitive overload from seeing too many insertion points at once.
 *
 * - Hick's Law: Context-aware buttons reduce decision time. Shows only relevant
 *   actions based on position (field vs section insertion).
 *
 * - Aesthetic-Usability Effect: Polished transitions and subtle visual cues
 *   create a professional, high-quality feel that enhances perceived usability.
 *
 * TECHNICAL ARCHITECTURE:
 * - Non-invasive: Does not modify Section or Field components
 * - Absolute positioning: Prevents layout shifts
 * - React Portals: Renders zones in optimal DOM positions
 * - State management: Tracks active zone without polluting parent state
 *
 * ZONE DETECTION LOGIC:
 * 1. Between fields: Calculate positions between each field in expanded sections
 * 2. Section end: Position at the end of each expanded section's field list
 * 3. Between sections: Calculate positions between each section
 * 4. Form boundaries: Positions at form start and end
 *
 * INTERACTIONS:
 * - Hover over canvas: Zones become visible near cursor
 * - Hover specific zone: Zone highlights with visual feedback
 * - Click button: Triggers insert action, zones remain visible
 * - Mouse leaves: Zones fade out (progressive disclosure)
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { InsertionZone } from './InsertionZone';
import { InsertionOverlayProps, InsertionZoneId, InsertionPosition } from './types';

export const InsertionOverlay: React.FC<InsertionOverlayProps> = ({
  items,
  isEnabled,
  onInsertField,
  onInsertSection,
}) => {
  const [activeZoneId, setActiveZoneId] = useState<InsertionZoneId | null>(null);
  const [visibleZones, setVisibleZones] = useState<Set<string>>(new Set());

  // Extract sections for zone generation
  const sections = items
    .filter((item) => item.type === 'section')
    .map((item) => item.data);

  /**
   * Generate Insertion Zones
   *
   * Creates zone identifiers for all possible insertion points
   * based on current form structure.
   */
  const generateInsertionZones = useCallback((): InsertionZoneId[] => {
    const zones: InsertionZoneId[] = [];

    // Form start zone (always present)
    zones.push({
      type: 'form-start',
      position: 'before',
    });

    // Process each section
    sections.forEach((section, sectionIndex) => {
      // Between sections zone (before each section except first)
      if (sectionIndex > 0) {
        zones.push({
          type: 'between-sections',
          sectionId: section.id,
          position: 'before',
        });
      }

      // If section is expanded, add zones for fields
      if (section.isExpanded) {
        const { fields } = section;

        // Between fields zones
        fields.forEach((field, fieldIndex) => {
          if (fieldIndex > 0) {
            zones.push({
              type: 'between-fields',
              sectionId: section.id,
              fieldId: field.id,
              position: 'before',
            });
          }
        });

        // NOTE: Removed section-end zone - using InlineInsertionZones instead
        // No insertion zones at end of sections per design requirements
      }
    });

    // NOTE: Removed form-end zone - no insertion zones after last item per design requirements

    return zones;
  }, [sections]);

  /**
   * Handle Zone Activation
   */
  const handleZoneActivate = useCallback((id: InsertionZoneId) => {
    setActiveZoneId(id);
  }, []);

  /**
   * Handle Zone Deactivation
   */
  const handleZoneDeactivate = useCallback(() => {
    setActiveZoneId(null);
  }, []);

  /**
   * Handle Insert Field
   */
  const handleInsertField = useCallback(
    (position: InsertionPosition) => {
      onInsertField(position);
      // Keep zones visible after insertion for additional adds
    },
    [onInsertField]
  );

  /**
   * Handle Insert Section
   */
  const handleInsertSection = useCallback(
    (position: InsertionPosition) => {
      onInsertSection(position);
      // Keep zones visible after insertion for additional adds
    },
    [onInsertSection]
  );

  /**
   * Update Visible Zones on Hover
   *
   * In a production implementation, this would track mouse position
   * and only show zones near the cursor. For now, all zones are visible
   * when enabled.
   */
  useEffect(() => {
    if (isEnabled) {
      const allZones = generateInsertionZones();
      setVisibleZones(new Set(allZones.map((z) => zoneIdToString(z))));
    } else {
      setVisibleZones(new Set());
    }
  }, [isEnabled, generateInsertionZones]);

  // Generate all insertion zones
  const insertionZones = generateInsertionZones();

  return (
    <>
      {insertionZones.map((zone, index) => {
        const zoneKey = `${zoneIdToString(zone)}-${index}`;
        const isVisible = visibleZones.has(zoneIdToString(zone));
        const isActive = activeZoneId !== null && zoneIdToString(activeZoneId) === zoneIdToString(zone);

        return (
          <InsertionZone
            key={zoneKey}
            id={zone}
            isActive={isActive}
            isVisible={isVisible}
            onActivate={handleZoneActivate}
            onDeactivate={handleZoneDeactivate}
            onInsertField={handleInsertField}
            onInsertSection={handleInsertSection}
          />
        );
      })}
    </>
  );
};

/**
 * Helper: Convert Zone ID to String
 *
 * Creates a unique string identifier for each zone
 * for comparison and tracking purposes.
 */
function zoneIdToString(id: InsertionZoneId): string {
  const parts = [id.type, id.sectionId, id.fieldId, id.position].filter(Boolean);
  return parts.join('-');
}
