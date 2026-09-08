/**
 * Mechanical Architecture Loader
 *
 * Loads and validates mechanical architecture knowledge from JSON
 * Provides query functions and cross-bike comparison support
 *
 * Data Source: MotorInc YouTube Channel
 * Total Insights: 16 architecture principles
 * Bikes Covered: RE Classic 350, RE 650, Himalayan 411, KTM Duke 200, KTM 390 Adventure
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import {
  MechanicalArchitectureRegistry,
  MechanicalArchitectureInsight,
  BikeModel,
  validateArchitectureInsight,
} from '../data-models/mechanical-architecture';

/**
 * Load mechanical architecture knowledge from JSON file
 */
export function loadMechanicalArchitectureRegistry(): MechanicalArchitectureRegistry {
  const dataPath = join(__dirname, '../data/youtube-expertise/mechanical-architecture.json');

  try {
    const rawData = readFileSync(dataPath, 'utf-8');
    const parsedData = JSON.parse(rawData);

    // Validate all entries
    validateRegistry(parsedData);

    return parsedData as MechanicalArchitectureRegistry;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to load mechanical architecture registry: ${error.message}`
      );
    }
    throw error;
  }
}

/**
 * Validate entire registry
 */
export function validateRegistry(data: unknown): void {
  if (!data || typeof data !== 'object') {
    throw new Error('Registry must be an object');
  }

  const registry = data as Record<string, unknown>;
  const bikeModels: BikeModel[] = [
    'REClassic350',
    'RE650',
    'Himalayan411',
    'KTMDuke200',
    'KTM390Adventure',
  ];

  let validInsights = 0;
  let totalInsights = 0;

  for (const bikeModel of bikeModels) {
    const insights = registry[bikeModel];
    if (!Array.isArray(insights)) {
      throw new Error(
        `Registry entry for ${bikeModel} must be an array of insights`
      );
    }

    for (const insight of insights) {
      totalInsights++;
      try {
        validateArchitectureInsight(insight as MechanicalArchitectureInsight);
        validInsights++;
      } catch (error) {
        console.error(
          `Validation failed for insight ${(insight as any)?.id}: ${error}`
        );
        throw error;
      }
    }
  }

  console.log(
    `✓ Mechanical Architecture Registry: ${validInsights}/${totalInsights} insights validated`
  );

  if (validInsights < 12) {
    throw new Error(
      `Registry has only ${validInsights} valid insights; minimum 12 required`
    );
  }
}

/**
 * Query: Find all insights for a specific bike model
 */
export function findInsightsForBike(
  registry: MechanicalArchitectureRegistry,
  bikeModel: BikeModel
): readonly MechanicalArchitectureInsight[] {
  return registry[bikeModel] || [];
}

/**
 * Query: Find insights by architecture principle name
 */
export function findInsightsByPrinciple(
  registry: MechanicalArchitectureRegistry,
  principle: string
): MechanicalArchitectureInsight[] {
  const allInsights = Object.values(registry).flat();
  return allInsights.filter((insight) =>
    insight.architecturePrinciple
      .toLowerCase()
      .includes(principle.toLowerCase())
  );
}

/**
 * Query: Find all "Deep" authority insights
 */
export function findDeepAuthorityInsights(
  registry: MechanicalArchitectureRegistry
): MechanicalArchitectureInsight[] {
  const allInsights = Object.values(registry).flat();
  return allInsights.filter((insight) => insight.authority === 'Deep');
}

/**
 * Query: Find high-risk modifications
 */
export function findHighRiskModifications(
  registry: MechanicalArchitectureRegistry
): Array<{
  bike: BikeModel;
  principle: string;
  modification: string;
  consequence: string;
}> {
  const allInsights = Object.values(registry).flat();
  const highRisk: Array<{
    bike: BikeModel;
    principle: string;
    modification: string;
    consequence: string;
  }> = [];

  allInsights.forEach((insight) => {
    insight.modificationImplications.forEach((mod) => {
      if (mod.riskLevel === 'High') {
        highRisk.push({
          bike: insight.bikeModel,
          principle: insight.architecturePrinciple,
          modification: mod.modificationType,
          consequence: mod.consequence,
        });
      }
    });
  });

  return highRisk;
}

/**
 * Query: Compare architecture principles between two bikes
 */
export function compareArchitectureBetweenBikes(
  registry: MechanicalArchitectureRegistry,
  bike1: BikeModel,
  bike2: BikeModel,
  principle: string
): {
  bike1Insight?: MechanicalArchitectureInsight;
  bike2Insight?: MechanicalArchitectureInsight;
  comparison?: string;
} {
  const insights1 = findInsightsForBike(registry, bike1);
  const insights2 = findInsightsForBike(registry, bike2);

  const match1 = insights1.find((i) =>
    i.architecturePrinciple.toLowerCase().includes(principle.toLowerCase())
  );
  const match2 = insights2.find((i) =>
    i.architecturePrinciple.toLowerCase().includes(principle.toLowerCase())
  );

  if (!match1 || !match2) {
    return {};
  }

  const comparison = `
${bike1}: ${match1.architecturePrinciple}
- Rake: ${match1.architecturalDetails.rakeAngleDegrees}°
- Wheelbase: ${match1.architecturalDetails.wheelbaseHmm}mm
- CoG Height: ${match1.architecturalDetails.centerOfGravityHeightMm}mm
- Frame Type: ${match1.architecturalDetails.frameType}

${bike2}: ${match2.architecturePrinciple}
- Rake: ${match2.architecturalDetails.rakeAngleDegrees}°
- Wheelbase: ${match2.architecturalDetails.wheelbaseHmm}mm
- CoG Height: ${match2.architecturalDetails.centerOfGravityHeightMm}mm
- Frame Type: ${match2.architecturalDetails.frameType}
  `;

  return { bike1Insight: match1, bike2Insight: match2, comparison };
}

/**
 * Query: Assess modification risk based on bike and modification type
 */
export function assessModificationRisk(
  registry: MechanicalArchitectureRegistry,
  bikeModel: BikeModel,
  modificationType: string
): {
  principle?: string;
  riskLevel?: string;
  consequence?: string;
  mitigationStrategy?: string;
} {
  const insights = findInsightsForBike(registry, bikeModel);

  for (const insight of insights) {
    const mod = insight.modificationImplications.find((m) =>
      m.modificationType
        .toLowerCase()
        .includes(modificationType.toLowerCase())
    );

    if (mod) {
      return {
        principle: insight.architecturePrinciple,
        riskLevel: mod.riskLevel,
        consequence: mod.consequence,
        mitigationStrategy: mod.mitigationStrategy,
      };
    }
  }

  return {};
}

/**
 * Query: Get comparative analysis for insights
 */
export function findComparativeAnalyses(
  registry: MechanicalArchitectureRegistry
): MechanicalArchitectureInsight[] {
  const allInsights = Object.values(registry).flat();
  return allInsights.filter(
    (insight) => insight.comparativeAnalysis !== undefined
  );
}

/**
 * Query: Find insights covering a specific architectural characteristic
 */
export function findInsightsByCharacteristic(
  registry: MechanicalArchitectureRegistry,
  characteristic: 'rake' | 'wheelbase' | 'coG' | 'frame' | 'stiffness'
): MechanicalArchitectureInsight[] {
  const allInsights = Object.values(registry).flat();

  return allInsights.filter((insight) => {
    const details = insight.architecturalDetails;
    switch (characteristic) {
      case 'rake':
        return details.rakeAngleDegrees !== undefined;
      case 'wheelbase':
        return details.wheelbaseHmm !== undefined;
      case 'coG':
        return details.centerOfGravityHeightMm !== undefined;
      case 'frame':
        return details.frameType !== undefined && details.frameRigidity !== undefined;
      case 'stiffness':
        return details.frameRigidity !== undefined;
      default:
        return false;
    }
  });
}

/**
 * Query: Get statistics about registry
 */
export function getRegistryStatistics(
  registry: MechanicalArchitectureRegistry
): {
  totalInsights: number;
  bikesCovered: BikeModel[];
  deepAuthorityCount: number;
  modificationImplicationsCount: number;
  comparativeAnalysesCount: number;
  highRiskModificationsCount: number;
} {
  const allInsights = Object.values(registry).flat();
  const bikesCovered = Object.keys(registry) as BikeModel[];

  const deepAuthorityCount = allInsights.filter(
    (i) => i.authority === 'Deep'
  ).length;
  const modificationImplicationsCount = allInsights.reduce(
    (sum, i) => sum + i.modificationImplications.length,
    0
  );
  const comparativeAnalysesCount = allInsights.filter(
    (i) => i.comparativeAnalysis !== undefined
  ).length;
  const highRiskModificationsCount = allInsights.reduce((sum, insight) => {
    return (
      sum +
      insight.modificationImplications.filter(
        (m) => m.riskLevel === 'High'
      ).length
    );
  }, 0);

  return {
    totalInsights: allInsights.length,
    bikesCovered,
    deepAuthorityCount,
    modificationImplicationsCount,
    comparativeAnalysesCount,
    highRiskModificationsCount,
  };
}

/**
 * Validate architectural metrics for reasonableness
 */
export function validateArchitecturalMetrics(
  insight: MechanicalArchitectureInsight
): {
  isValid: boolean;
  warnings: string[];
} {
  const warnings: string[] = [];
  const details = insight.architecturalDetails;

  // Rake angle validation (reasonable range for motorcycles: 15-35°)
  if (details.rakeAngleDegrees) {
    if (details.rakeAngleDegrees < 15 || details.rakeAngleDegrees > 35) {
      warnings.push(
        `Unusual rake angle: ${details.rakeAngleDegrees}° (typical: 15-35°)`
      );
    }
  }

  // Wheelbase validation (reasonable range: 1200-1600mm)
  if (details.wheelbaseHmm) {
    if (details.wheelbaseHmm < 1200 || details.wheelbaseHmm > 1600) {
      warnings.push(
        `Unusual wheelbase: ${details.wheelbaseHmm}mm (typical: 1200-1600mm)`
      );
    }
  }

  // Center of gravity height validation (reasonable range: 600-800mm)
  if (details.centerOfGravityHeightMm) {
    if (
      details.centerOfGravityHeightMm < 600 ||
      details.centerOfGravityHeightMm > 800
    ) {
      warnings.push(
        `Unusual CoG height: ${details.centerOfGravityHeightMm}mm (typical: 600-800mm)`
      );
    }
  }

  return {
    isValid: warnings.length === 0,
    warnings,
  };
}

/**
 * Print registry summary to console
 */
export function printRegistrySummary(
  registry: MechanicalArchitectureRegistry
): void {
  const stats = getRegistryStatistics(registry);

  console.log('\n=== Mechanical Architecture Registry Summary ===\n');
  console.log(`Total Architecture Insights: ${stats.totalInsights}`);
  console.log(
    `Bikes Covered: ${stats.bikesCovered.length} (${stats.bikesCovered.join(', ')})`
  );
  console.log(`Deep Authority Insights: ${stats.deepAuthorityCount}`);
  console.log(
    `Modification Implications Documented: ${stats.modificationImplicationsCount}`
  );
  console.log(
    `Comparative Analyses: ${stats.comparativeAnalysesCount}`
  );
  console.log(`High-Risk Modifications Identified: ${stats.highRiskModificationsCount}`);

  console.log('\n=== Insights by Bike ===\n');
  for (const bikeModel of stats.bikesCovered) {
    const insights = findInsightsForBike(registry, bikeModel);
    console.log(`${bikeModel}: ${insights.length} insights`);
    insights.forEach((insight) => {
      console.log(
        `  - ${insight.architecturePrinciple} [Authority: ${insight.authority}]`
      );
    });
  }

  console.log('\n=== High-Risk Modifications ===\n');
  const highRisk = findHighRiskModifications(registry);
  highRisk.forEach((hr) => {
    console.log(`[${hr.bike}] ${hr.modification}`);
    console.log(`  Principle: ${hr.principle}`);
    console.log(`  Consequence: ${hr.consequence}`);
  });

  console.log('\n=== Comparative Analyses ===\n');
  const comparatives = findComparativeAnalyses(registry);
  comparatives.forEach((comp) => {
    console.log(`${comp.bikeModel}: ${comp.architecturePrinciple}`);
    if (comp.comparativeAnalysis) {
      console.log(
        `  Compared with: ${comp.comparativeAnalysis.comparedBikeModels.join(', ')}`
      );
      console.log(`  Why Different: ${comp.comparativeAnalysis.whyPrincipleDiffers}`);
    }
  });

  console.log('\n=== Validation Summary ===\n');
  const allInsights = Object.values(registry).flat();
  let validCount = 0;
  const metricsWarnings: Array<{ id: string; warnings: string[] }> = [];

  allInsights.forEach((insight) => {
    try {
      validateArchitectureInsight(insight);
      validCount++;

      const metricsValidation = validateArchitecturalMetrics(insight);
      if (!metricsValidation.isValid) {
        metricsWarnings.push({
          id: insight.id,
          warnings: metricsValidation.warnings,
        });
      }
    } catch (error) {
      console.error(`Validation failed for ${insight.id}: ${error}`);
    }
  });

  console.log(`Valid Insights: ${validCount}/${allInsights.length}`);

  if (metricsWarnings.length > 0) {
    console.log(`\nMetrics Warnings: ${metricsWarnings.length}`);
    metricsWarnings.forEach((warning) => {
      console.log(`  ${warning.id}:`);
      warning.warnings.forEach((w) => console.log(`    - ${w}`));
    });
  }

  console.log('\n✓ Mechanical Architecture Registry Complete\n');
}
