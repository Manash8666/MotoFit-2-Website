/**
 * Suspension Compatibility Loader
 * 
 * Loads suspension upgrade knowledge from JSON data file and validates all entries
 * against the SuspensionUpgrade interface.
 * 
 * Provides:
 * - JSON parsing and validation
 * - Type safety through TypeScript interfaces
 * - Conflict detection against existing Mansi knowledge
 * - Query functions for suspension upgrade recommendations
 */

import fs from 'fs';
import path from 'path';
import {
  SuspensionUpgrade,
  SuspensionCompatibilityRegistry,
  BikeModel,
  validateSuspensionUpgrade,
  findUpgradesForBike,
  findDirectFitUpgrades,
  findDeepAuthorityUpgrades,
  getRallySpecForTerrain,
} from '../data-models/suspension-compatibility';

/**
 * Load suspension upgrades from JSON file
 * 
 * @returns The loaded and validated suspension compatibility registry
 * @throws Error if JSON parsing fails or validation fails
 */
export function loadSuspensionCompatibility(): SuspensionCompatibilityRegistry {
  const dataPath = path.join(
    __dirname,
    '../../data/youtube-expertise/suspension-compatibility.json'
  );

  try {
    // Read JSON file
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const upgradesArray = JSON.parse(rawData) as SuspensionUpgrade[];

    // Validate each upgrade entry
    const validatedUpgrades: SuspensionUpgrade[] = [];
    const validationErrors: Array<{ id: string; error: string }> = [];

    for (const upgrade of upgradesArray) {
      try {
        validateSuspensionUpgrade(upgrade);
        validatedUpgrades.push(upgrade);
      } catch (error) {
        validationErrors.push({
          id: upgrade.id || 'UNKNOWN',
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    // Report validation errors if any
    if (validationErrors.length > 0) {
      console.error('Suspension Compatibility Validation Errors:');
      validationErrors.forEach(err => {
        console.error(`  - ${err.id}: ${err.error}`);
      });
    }

    // Build registry indexed by bike model
    const registry: Record<BikeModel, SuspensionUpgrade[]> = {
      KTM390Adventure: [],
      Himalayan450: [],
      '300ccBuilds': [],
    };

    for (const upgrade of validatedUpgrades) {
      if (registry[upgrade.targetBike]) {
        registry[upgrade.targetBike].push(upgrade);
      }
    }

    // Convert to readonly for immutability
    const readonlyRegistry: SuspensionCompatibilityRegistry = {
      KTM390Adventure: Object.freeze(registry.KTM390Adventure),
      Himalayan450: Object.freeze(registry.Himalayan450),
      '300ccBuilds': Object.freeze(registry['300ccBuilds']),
    } as const;

    console.log('✅ Suspension Compatibility Registry loaded successfully');
    console.log(`   - KTM390Adventure: ${registry.KTM390Adventure.length} upgrades`);
    console.log(`   - Himalayan450: ${registry.Himalayan450.length} upgrades`);
    console.log(`   - 300ccBuilds: ${registry['300ccBuilds'].length} upgrades`);
    console.log(
      `   - Total: ${validatedUpgrades.length} upgrades (${validationErrors.length} validation errors)`
    );

    return readonlyRegistry;
  } catch (error) {
    throw new Error(
      `Failed to load suspension compatibility: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

/**
 * Get validation report for all upgrades in registry
 * 
 * @param registry - The suspension compatibility registry
 * @returns Validation report with statistics and any missing fields
 */
export function getValidationReport(registry: SuspensionCompatibilityRegistry): {
  totalUpgrades: number;
  upgradesByBike: Record<BikeModel, number>;
  upgradesByAuthority: Record<string, number>;
  upgradesByComplexity: Record<string, number>;
  upgradesWithRallySpec: number;
  directFitUpgrades: number;
  deepAuthorityUpgrades: number;
  report: string[];
} {
  const allUpgrades = Object.values(registry).flat();
  const report: string[] = [];

  // Count by bike model
  const upgradesByBike: Record<BikeModel, number> = {
    KTM390Adventure: findUpgradesForBike(registry, 'KTM390Adventure').length,
    Himalayan450: findUpgradesForBike(registry, 'Himalayan450').length,
    '300ccBuilds': findUpgradesForBike(registry, '300ccBuilds').length,
  };

  // Count by authority
  const upgradesByAuthority: Record<string, number> = {
    Deep: findDeepAuthorityUpgrades(registry).length,
    Verified: allUpgrades.filter(u => u.authority === 'Verified').length,
    Pending: allUpgrades.filter(u => u.authority === 'Pending').length,
  };

  // Count by installation complexity
  const upgradesByComplexity: Record<string, number> = {
    Easy: allUpgrades.filter(u =>
      u.compatibleOptions.some(opt => opt.installationComplexity === 'Easy')
    ).length,
    Medium: allUpgrades.filter(u =>
      u.compatibleOptions.some(opt => opt.installationComplexity === 'Medium')
    ).length,
    Hard: allUpgrades.filter(u =>
      u.compatibleOptions.some(opt => opt.installationComplexity === 'Hard')
    ).length,
  };

  // Count upgrades with rally spec
  const upgradesWithRallySpec = allUpgrades.filter(u => u.rallySpec && u.rallySpec.length > 0)
    .length;

  // Count direct-fit upgrades
  const directFitUpgrades = findDirectFitUpgrades(registry, 'KTM390Adventure').length +
    findDirectFitUpgrades(registry, 'Himalayan450').length +
    findDirectFitUpgrades(registry, '300ccBuilds').length;

  // Count deep authority
  const deepAuthorityUpgrades = findDeepAuthorityUpgrades(registry).length;

  // Generate report
  report.push('Suspension Compatibility Registry Validation Report');
  report.push('='.repeat(50));
  report.push(`Total Upgrades: ${allUpgrades.length}`);
  report.push(`\nBy Bike Model:`);
  report.push(`  - KTM390Adventure: ${upgradesByBike.KTM390Adventure}`);
  report.push(`  - Himalayan450: ${upgradesByBike.Himalayan450}`);
  report.push(`  - 300ccBuilds: ${upgradesByBike['300ccBuilds']}`);
  report.push(`\nBy Authority:`);
  report.push(`  - Deep: ${upgradesByAuthority.Deep}`);
  report.push(`  - Verified: ${upgradesByAuthority.Verified}`);
  report.push(`  - Pending: ${upgradesByAuthority.Pending}`);
  report.push(`\nBy Installation Complexity:`);
  report.push(`  - Easy: ${upgradesByComplexity.Easy}`);
  report.push(`  - Medium: ${upgradesByComplexity.Medium}`);
  report.push(`  - Hard: ${upgradesByComplexity.Hard}`);
  report.push(`\nUpgrades with Rally-Spec Configs: ${upgradesWithRallySpec}/${allUpgrades.length}`);
  report.push(`Direct-Fit Upgrades (no adapter): ${directFitUpgrades}`);
  report.push(`Deep Authority Upgrades (40+ builds): ${deepAuthorityUpgrades}`);

  // Check for missing critical fields
  const missingFields: string[] = [];
  allUpgrades.forEach(upgrade => {
    if (!upgrade.sourceComponent) {
      missingFields.push(`${upgrade.id}: Missing sourceComponent`);
    }
    if (!upgrade.oem) {
      missingFields.push(`${upgrade.id}: Missing OEM specifications`);
    }
    if (!upgrade.compatibleOptions || upgrade.compatibleOptions.length === 0) {
      missingFields.push(`${upgrade.id}: No compatible options`);
    }
    if (!upgrade.videoReference || !upgrade.videoReference.videoUrl) {
      missingFields.push(`${upgrade.id}: Missing video reference with URL`);
    }
    if (!upgrade.authority) {
      missingFields.push(`${upgrade.id}: Missing authority level`);
    }
    // Check compatible options for required fields
    upgrade.compatibleOptions.forEach((opt, idx) => {
      if (!opt.cost || !opt.cost.min || !opt.cost.max) {
        missingFields.push(`${upgrade.id} Option ${idx}: Missing cost range`);
      }
      if (!opt.performanceGain) {
        missingFields.push(`${upgrade.id} Option ${idx}: Missing performance gain`);
      }
    });
  });

  if (missingFields.length > 0) {
    report.push(`\n⚠️ Missing Critical Fields:`);
    missingFields.forEach(field => report.push(`  - ${field}`));
  } else {
    report.push(`\n✅ All entries have required fields`);
  }

  // Check for acceptance criteria
  report.push(`\n📋 Acceptance Criteria Check:`);
  report.push(`  ✅ 12+ upgrades: ${allUpgrades.length >= 12 ? 'PASS' : 'FAIL'} (${allUpgrades.length})`);
  report.push(`  ✅ 5+ deep authority: ${deepAuthorityUpgrades >= 5 ? 'PASS' : 'FAIL'} (${deepAuthorityUpgrades})`);
  report.push(`  ✅ 3+ rally-spec configs: ${upgradesWithRallySpec >= 3 ? 'PASS' : 'FAIL'} (${upgradesWithRallySpec})`);
  report.push(
    `  ✅ All entries with cost: ${missingFields.filter(f => f.includes('cost')).length === 0 ? 'PASS' : 'FAIL'}`
  );
  report.push(
    `  ✅ All entries with performance gains: ${missingFields.filter(f => f.includes('performance')).length === 0 ? 'PASS' : 'FAIL'}`
  );

  return {
    totalUpgrades: allUpgrades.length,
    upgradesByBike,
    upgradesByAuthority,
    upgradesByComplexity,
    upgradesWithRallySpec,
    directFitUpgrades,
    deepAuthorityUpgrades,
    report,
  };
}

/**
 * Find suspension upgrades for a specific budget
 * 
 * @param registry - The suspension compatibility registry
 * @param bikeModel - The bike model
 * @param maxCost - Maximum cost in INR
 * @returns Upgrades within budget, sorted by cost
 */
export function findUpgradesUnderBudget(
  registry: SuspensionCompatibilityRegistry,
  bikeModel: BikeModel,
  maxCost: number
): Array<{ upgrade: SuspensionUpgrade; minCost: number }> {
  const upgrades = findUpgradesForBike(registry, bikeModel);
  const results: Array<{ upgrade: SuspensionUpgrade; minCost: number }> = [];

  for (const upgrade of upgrades) {
    for (const option of upgrade.compatibleOptions) {
      if (option.cost.min <= maxCost) {
        results.push({ upgrade, minCost: option.cost.min });
        break; // Only include each upgrade once
      }
    }
  }

  return results.sort((a, b) => a.minCost - b.minCost);
}

/**
 * Find upgrades with specified authority level
 * 
 * @param registry - The suspension compatibility registry
 * @param authority - Authority level to filter by
 * @returns Upgrades matching the authority level
 */
export function findUpgradesByAuthority(
  registry: SuspensionCompatibilityRegistry,
  authority: 'Deep' | 'Verified' | 'Pending'
) {
  const allUpgrades = Object.values(registry).flat();
  return allUpgrades.filter(u => u.authority === authority);
}

/**
 * Get rally-spec configuration recommendations for a specific bike and terrain
 * 
 * @param registry - The suspension compatibility registry
 * @param bikeModel - The bike model
 * @param terrain - The terrain type
 * @returns Rally-spec configurations for specified terrain
 */
export function getRallySpecRecommendations(
  registry: SuspensionCompatibilityRegistry,
  bikeModel: BikeModel,
  terrain: 'Mountain' | 'Desert' | 'Mixed' | 'Racing'
) {
  const upgrades = findUpgradesForBike(registry, bikeModel);
  const rallySpecs: Array<{ upgradeId: string; rallySpec: any }> = [];

  for (const upgrade of upgrades) {
    const spec = getRallySpecForTerrain(upgrade, terrain);
    if (spec) {
      rallySpecs.push({ upgradeId: upgrade.id, rallySpec: spec });
    }
  }

  return rallySpecs;
}

/**
 * Export query functions for public use
 */
export const SuspensionCompatibilityQueries = {
  findUpgradesForBike,
  findDirectFitUpgrades,
  findDeepAuthorityUpgrades,
  getRallySpecForTerrain,
  findUpgradesUnderBudget,
  findUpgradesByAuthority,
  getRallySpecRecommendations,
};

/**
 * Main export: Initialize and return the registry
 */
let cachedRegistry: SuspensionCompatibilityRegistry | null = null;

export function getSuspensionCompatibilityRegistry(): SuspensionCompatibilityRegistry {
  if (!cachedRegistry) {
    cachedRegistry = loadSuspensionCompatibility();
  }
  return cachedRegistry;
}

/**
 * Reset cache for testing purposes
 */
export function resetRegistry(): void {
  cachedRegistry = null;
}
