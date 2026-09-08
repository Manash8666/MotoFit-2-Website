/**
 * Terrain Tuning Loader
 * 
 * Loads terrain-specific tuning profiles from JSON data file and validates all entries
 * against the TerrainTuningProfile interface.
 * 
 * Provides:
 * - JSON parsing and validation
 * - Type safety through TypeScript interfaces
 * - Safety constraint checking (AFR ranges, ignition timing bounds)
 * - Conflict detection against existing Mansi knowledge
 * - Query functions for terrain-specific recommendations
 * 
 * Safety Constraints:
 * - AFR ratio: 12:1 to 14:1 (prevents lean seizure or over-richness)
 * - Ignition timing: -10° to +30° BTDC (prevents pre-ignition or late ignition)
 * - Tire pressure: 20-50 PSI (prevents blowouts or poor handling)
 */

import fs from 'fs';
import path from 'path';
import {
  TerrainTuningProfile,
  TerrainTuningRegistry,
  BikeModel,
  TerrainType,
  validateTerrainTuning,
  getTuningForBike,
  getTuningForTerrain,
  findDeepAuthorityTunings,
  getProfilesBySeverity,
} from '../data-models/terrain-tuning';

/**
 * Load terrain tuning profiles from JSON file
 * 
 * @returns The loaded and validated terrain tuning registry
 * @throws Error if JSON parsing fails or validation fails
 */
export function loadTerrainTuning(): TerrainTuningRegistry {
  const dataPath = path.join(
    __dirname,
    '../data/youtube-expertise/terrain-tuning.json'
  );

  try {
    // Read JSON file
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const profilesArray = JSON.parse(rawData) as TerrainTuningProfile[];

    // Validate each profile entry
    const validatedProfiles: TerrainTuningProfile[] = [];
    const validationErrors: Array<{ id: string; error: string }> = [];
    const safetyIssues: Array<{ id: string; issue: string; severity: string }> = [];

    for (const profile of profilesArray) {
      try {
        // Validate basic structure
        validateTerrainTuning(profile);

        // Check safety constraints
        const safetyCheck = validateSafetyConstraints(profile);
        if (safetyCheck.issues.length > 0) {
          safetyIssues.push(
            ...safetyCheck.issues.map(issue => ({
              id: profile.id,
              issue,
              severity: 'WARNING',
            }))
          );
        }

        validatedProfiles.push(profile);
      } catch (error) {
        validationErrors.push({
          id: profile.id || 'UNKNOWN',
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    // Report validation errors if any
    if (validationErrors.length > 0) {
      console.error('Terrain Tuning Validation Errors:');
      validationErrors.forEach(err => {
        console.error(`  - ${err.id}: ${err.error}`);
      });
    }

    // Report safety issues
    if (safetyIssues.length > 0) {
      console.warn('Terrain Tuning Safety Issues:');
      safetyIssues.forEach(issue => {
        console.warn(`  - ${issue.id}: ${issue.issue}`);
      });
    }

    // Build registry indexed by bike model
    const registry: Record<BikeModel, TerrainTuningProfile[]> = {
      RE650: [],
      Himalayan450: [],
      KTM390Adventure: [],
    };

    for (const profile of validatedProfiles) {
      if (profile.bikeModel in registry) {
        registry[profile.bikeModel as BikeModel].push(profile);
      }
    }

    // Convert to readonly for immutability
    const readonlyRegistry: TerrainTuningRegistry = {
      RE650: Object.freeze(registry.RE650),
      Himalayan450: Object.freeze(registry.Himalayan450),
      KTM390Adventure: Object.freeze(registry.KTM390Adventure),
    } as const;

    console.log('✅ Terrain Tuning Registry loaded successfully');
    console.log(`   - RE650: ${registry.RE650.length} profiles`);
    console.log(`   - Himalayan450: ${registry.Himalayan450.length} profiles`);
    console.log(`   - KTM390Adventure: ${registry.KTM390Adventure.length} profiles`);
    console.log(
      `   - Total: ${validatedProfiles.length} profiles (${validationErrors.length} validation errors)`
    );

    return readonlyRegistry;
  } catch (error) {
    throw new Error(
      `Failed to load terrain tuning profiles: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

/**
 * Validate safety constraints for tuning parameters
 * 
 * Safety Constraints:
 * - AFR: 12:1 to 14:1 range
 * - Ignition timing: -10° to +30° BTDC
 * - Tire pressure: 20-50 PSI
 * - Suspension preload: -30mm to +30mm
 * 
 * @param profile - The terrain tuning profile to validate
 * @returns Object with validation results and any issues found
 */
export function validateSafetyConstraints(profile: TerrainTuningProfile): {
  isValid: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  // Validate AFR ratio (extract numeric value from string like "12.8:1 to 13.2:1")
  const afrString = profile.tuningParameters.fuelMap.afrRatio;
  const afrMatches = afrString.match(/(\d+\.?\d*)/g);
  if (afrMatches) {
    for (const afrValue of afrMatches) {
      const afr = parseFloat(afrValue);
      if (afr < 12 || afr > 14) {
        issues.push(
          `AFR ratio ${afr}:1 outside safe range (12:1-14:1) in ${profile.id}`
        );
      }
    }
  }

  // Validate ignition timing (extract numeric value from strings like "Retard 2-4°" or "18-20° BTDC")
  const ignitionString = profile.tuningParameters.ignitionTiming.advanceDegrees;
  const timingMatches = ignitionString.match(/(\d+)/g);
  if (timingMatches) {
    for (const timingValue of timingMatches) {
      const timing = parseInt(timingValue, 10);
      if (timing < -10 || timing > 30) {
        issues.push(
          `Ignition timing ${timing}° outside safe range (-10° to +30°) in ${profile.id}`
        );
      }
    }
  }

  // Validate tire pressure
  const frontTire = profile.tuningParameters.tirePressure.frontPsi;
  const rearTire = profile.tuningParameters.tirePressure.rearPsi;
  if (frontTire < 20 || frontTire > 50) {
    issues.push(`Front tire pressure ${frontTire} PSI outside safe range in ${profile.id}`);
  }
  if (rearTire < 20 || rearTire > 50) {
    issues.push(`Rear tire pressure ${rearTire} PSI outside safe range in ${profile.id}`);
  }

  // Validate suspension preload (estimate from string like "+10-15mm" or "-5-10mm")
  const validatePreload = (preloadStr: string, position: string) => {
    const preloadMatches = preloadStr.match(/[+-]?(\d+)/g);
    if (preloadMatches) {
      for (const val of preloadMatches) {
        const preload = parseInt(val, 10);
        if (preload < -30 || preload > 30) {
          issues.push(
            `${position} suspension preload ${preload}mm outside safe range in ${profile.id}`
          );
        }
      }
    }
  };

  validatePreload(profile.tuningParameters.suspension.frontPreload, 'Front');
  validatePreload(profile.tuningParameters.suspension.rearPreload, 'Rear');

  return {
    isValid: issues.length === 0,
    issues,
  };
}

/**
 * Get comprehensive validation report for all profiles in registry
 * 
 * @param registry - The terrain tuning registry
 * @returns Validation report with statistics and analysis
 */
export function getValidationReport(registry: TerrainTuningRegistry): {
  totalProfiles: number;
  profilesByBike: Record<BikeModel, number>;
  profilesByTerrain: Record<TerrainType, number>;
  profilesByAuthority: Record<string, number>;
  profilesWithQuantifiedData: number;
  profilesWithHighReliabilityConcerns: number;
  coverageStats: {
    terrainTypes: number;
    bikeModels: number;
    totalKmDocumented: number;
  };
  report: string[];
} {
  const allProfiles = Object.values(registry).flat() as TerrainTuningProfile[];
  const report: string[] = [];

  // Count by bike model
  const profilesByBike: Record<BikeModel, number> = {
    RE650: getTuningForBike(registry, 'RE650').length,
    Himalayan450: getTuningForBike(registry, 'Himalayan450').length,
    KTM390Adventure: getTuningForBike(registry, 'KTM390Adventure').length,
  };

  // Count by terrain
  const terrainCounts: Record<TerrainType, number> = {
    Mountain: 0,
    Desert: 0,
    Monsoon: 0,
    Highway: 0,
    Mixed: 0,
  };

  for (const profile of allProfiles) {
    terrainCounts[profile.terrain]++;
  }

  // Count by authority
  const profilesByAuthority: Record<string, number> = {
    Deep: findDeepAuthorityTunings(registry).length,
    Verified: allProfiles.filter(p => p.authority === 'Verified').length,
    Pending: allProfiles.filter(p => p.authority === 'Pending').length,
  };

  // Count profiles with quantified performance data
  const profilesWithQuantifiedData = allProfiles.filter(
    p => p.performanceMetrics && p.performanceMetrics.fuelConsumptionKmpl > 0
  ).length;

  // Count profiles with high-severity reliability concerns
  const profilesWithHighReliabilityConcerns = allProfiles.filter(p =>
    p.reliabilityConcerns.some(c => c.severity === 'High')
  ).length;

  // Calculate terrain coverage
  const terrainTypesCovered = Object.values(terrainCounts).filter(count => count > 0).length;

  // Total km documented
  const totalKmDocumented = allProfiles.reduce((sum, p) => sum + (p.kmDocumented || 0), 0);

  // Generate report
  report.push('Terrain Tuning Registry Validation Report');
  report.push('='.repeat(50));
  report.push(`Total Profiles: ${allProfiles.length}`);
  report.push(`\nBy Bike Model:`);
  report.push(`  - RE650: ${profilesByBike.RE650}`);
  report.push(`  - Himalayan450: ${profilesByBike.Himalayan450}`);
  report.push(`  - KTM390Adventure: ${profilesByBike.KTM390Adventure}`);
  report.push(`\nBy Terrain Type:`);
  report.push(`  - Mountain: ${terrainCounts.Mountain}`);
  report.push(`  - Desert: ${terrainCounts.Desert}`);
  report.push(`  - Monsoon: ${terrainCounts.Monsoon}`);
  report.push(`  - Highway: ${terrainCounts.Highway}`);
  report.push(`  - Mixed: ${terrainCounts.Mixed}`);
  report.push(`\nBy Authority:`);
  report.push(`  - Deep: ${profilesByAuthority.Deep}`);
  report.push(`  - Verified: ${profilesByAuthority.Verified}`);
  report.push(`  - Pending: ${profilesByAuthority.Pending}`);
  report.push(`\nData Quality:`);
  report.push(`  - Profiles with quantified performance data: ${profilesWithQuantifiedData}/${allProfiles.length}`);
  report.push(`  - Profiles with high-severity concerns: ${profilesWithHighReliabilityConcerns}`);
  report.push(`\nCoverage Statistics:`);
  report.push(`  - Terrain types covered: ${terrainTypesCovered}/5`);
  report.push(`  - Bike models covered: 3/3`);
  report.push(`  - Total km documented: ${totalKmDocumented}`);

  // Check for missing critical fields
  const missingFields: string[] = [];
  allProfiles.forEach(profile => {
    if (!profile.terrain) {
      missingFields.push(`${profile.id}: Missing terrain type`);
    }
    if (!profile.tuningParameters.fuelMap.rationale) {
      missingFields.push(`${profile.id}: Missing fuel map rationale`);
    }
    if (!profile.videoReference?.videoUrl) {
      missingFields.push(`${profile.id}: Missing video reference`);
    }
    if (profile.reliabilityConcerns.length === 0) {
      missingFields.push(`${profile.id}: No reliability concerns documented`);
    }
  });

  if (missingFields.length > 0) {
    report.push(`\n⚠️ Missing Critical Fields:`);
    missingFields.forEach(field => report.push(`  - ${field}`));
  } else {
    report.push(`\n✅ All entries have required fields`);
  }

  // Acceptance criteria verification
  report.push(`\n📋 Acceptance Criteria Verification:`);
  report.push(`  ✓ 15+ profiles: ${allProfiles.length >= 15 ? 'PASS' : 'FAIL'} (${allProfiles.length} documented)`);
  report.push(`  ✓ 4+ terrain types: ${terrainTypesCovered >= 4 ? 'PASS' : 'FAIL'} (${terrainTypesCovered} covered)`);
  report.push(
    `  ✓ 8+ with quantified data: ${profilesWithQuantifiedData >= 8 ? 'PASS' : 'FAIL'} (${profilesWithQuantifiedData} profiles)`
  );
  report.push(`  ✓ Source attribution: ${allProfiles.every(p => p.videoReference?.channelName) ? 'PASS' : 'FAIL'}`);
  report.push(
    `  ✓ 12+ with reliability concerns: ${allProfiles.filter(p => p.reliabilityConcerns.length > 0).length >= 12 ? 'PASS' : 'FAIL'}`
  );

  return {
    totalProfiles: allProfiles.length,
    profilesByBike,
    profilesByTerrain: terrainCounts,
    profilesByAuthority,
    profilesWithQuantifiedData,
    profilesWithHighReliabilityConcerns,
    coverageStats: {
      terrainTypes: terrainTypesCovered,
      bikeModels: 3,
      totalKmDocumented,
    },
    report,
  };
}

/**
 * Find terrain tuning profile for specific conditions
 * 
 * @param registry - The terrain tuning registry
 * @param bikeModel - The motorcycle model
 * @param terrain - The terrain type
 * @returns The matching terrain tuning profile, or undefined if not found
 */
export function findTerrainTuning(
  registry: TerrainTuningRegistry,
  bikeModel: BikeModel,
  terrain: TerrainType
): TerrainTuningProfile | undefined {
  return getTuningForTerrain(registry, bikeModel, terrain);
}

/**
 * Get all terrain tuning profiles for a specific bike
 * 
 * @param registry - The terrain tuning registry
 * @param bikeModel - The motorcycle model
 * @returns Array of all terrain tuning profiles for the bike
 */
export function getTerrainTuningsForBike(
  registry: TerrainTuningRegistry,
  bikeModel: BikeModel
): readonly TerrainTuningProfile[] {
  return getTuningForBike(registry, bikeModel);
}

/**
 * Find deep-authority tuning profiles
 * 
 * @param registry - The terrain tuning registry
 * @returns Array of deep-authority profiles
 */
export function getDeepAuthorityProfiles(
  registry: TerrainTuningRegistry
): readonly TerrainTuningProfile[] {
  return findDeepAuthorityTunings(registry);
}

/**
 * Find profiles with specific reliability concern severity
 * 
 * @param registry - The terrain tuning registry
 * @param severity - The severity level to search for
 * @returns Array of profiles with that severity concern
 */
export function getProfilesByConcernSeverity(
  registry: TerrainTuningRegistry,
  severity: 'Low' | 'Medium' | 'High'
): readonly TerrainTuningProfile[] {
  return getProfilesBySeverity(registry, severity);
}

/**
 * Check for conflicts with existing Mansi knowledge
 * 
 * This function checks if any terrain tuning profiles contradict known safe parameters.
 * Currently checks:
 * - AFR ratios within safe range (12:1-14:1)
 * - Ignition timing within safety range (-10° to +30° BTDC)
 * - Tire pressure within reasonable bounds (20-50 PSI)
 * 
 * @param registry - The terrain tuning registry
 * @returns Conflict report with any detected issues
 */
export function detectConflicts(registry: TerrainTuningRegistry): {
  conflictsDetected: boolean;
  conflicts: Array<{
    profileId: string;
    conflictType: string;
    description: string;
  }>;
} {
  const allProfiles = Object.values(registry).flat() as TerrainTuningProfile[];
  const conflicts: Array<{
    profileId: string;
    conflictType: string;
    description: string;
  }> = [];

  for (const profile of allProfiles) {
    const safetyCheck = validateSafetyConstraints(profile);
    if (safetyCheck.issues.length > 0) {
      safetyCheck.issues.forEach(issue => {
        conflicts.push({
          profileId: profile.id,
          conflictType: 'SAFETY_CONSTRAINT_VIOLATION',
          description: issue,
        });
      });
    }
  }

  return {
    conflictsDetected: conflicts.length > 0,
    conflicts,
  };
}

/**
 * Export query functions for public use
 */
export const TerrainTuningQueries = {
  getTuningForBike,
  getTuningForTerrain,
  findDeepAuthorityTunings,
  getProfilesBySeverity,
};

/**
 * Main export: Initialize and return the registry
 */
let cachedRegistry: TerrainTuningRegistry | null = null;

export function getTerrainTuningRegistry(): TerrainTuningRegistry {
  if (!cachedRegistry) {
    cachedRegistry = loadTerrainTuning();
  }
  return cachedRegistry;
}

/**
 * Reset cache for testing purposes
 */
export function resetRegistry(): void {
  cachedRegistry = null;
}
