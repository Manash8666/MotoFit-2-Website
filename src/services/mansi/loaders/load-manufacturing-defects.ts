/**
 * Manufacturing Defects Loader
 * 
 * Loads manufacturing defect knowledge from JSON data file and validates all entries
 * against the ManufacturingDefect interface.
 * 
 * Provides:
 * - JSON parsing and validation
 * - Type safety through TypeScript interfaces
 * - Conflict detection against existing Mansi knowledge
 * - Query functions for diagnostic use
 */

import fs from 'fs';
import path from 'path';
import {
  ManufacturingDefect,
  ManufacturingDefectsRegistry,
  BikeModel,
  validateDefectFields,
  findDefectsByBike,
  findDefectsBySymptom,
  findWarrantyCoveredDefects,
  findDefectsByFailureMode,
  findDeepAuthorityDefects,
  diagnoseDefect,
} from '../data-models/manufacturing-defects';

/**
 * Load manufacturing defects from JSON file
 * 
 * @returns The loaded and validated manufacturing defects registry
 * @throws Error if JSON parsing fails or validation fails
 */
export function loadManufacturingDefects(): ManufacturingDefectsRegistry {
  const dataPath = path.join(
    __dirname,
    '../data/youtube-expertise/manufacturing-defects.json'
  );

  try {
    // Read JSON file
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const defectsArray = JSON.parse(rawData) as ManufacturingDefect[];

    // Validate each defect entry
    const validatedDefects: ManufacturingDefect[] = [];
    const validationErrors: Array<{ id: string; error: string }> = [];

    for (const defect of defectsArray) {
      try {
        validateDefectFields(defect);
        validatedDefects.push(defect);
      } catch (error) {
        validationErrors.push({
          id: defect.id || 'UNKNOWN',
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    // Report validation errors if any
    if (validationErrors.length > 0) {
      console.error('Manufacturing Defects Validation Errors:');
      validationErrors.forEach(err => {
        console.error(`  - ${err.id}: ${err.error}`);
      });
    }

    // Build registry indexed by bike model
    const registry: Record<BikeModel, ManufacturingDefect[]> = {
      RE650: [],
      Himalayan411: [],
      KTM390Adventure: [],
    };

    for (const defect of validatedDefects) {
      registry[defect.bikeModel].push(defect);
    }

    // Convert to readonly for immutability
    const readonlyRegistry: ManufacturingDefectsRegistry = {
      RE650: Object.freeze(registry.RE650),
      Himalayan411: Object.freeze(registry.Himalayan411),
      KTM390Adventure: Object.freeze(registry.KTM390Adventure),
    } as const;

    console.log('✅ Manufacturing Defects Registry loaded successfully');
    console.log(`   - RE650: ${registry.RE650.length} defects`);
    console.log(`   - Himalayan411: ${registry.Himalayan411.length} defects`);
    console.log(`   - KTM390Adventure: ${registry.KTM390Adventure.length} defects`);
    console.log(
      `   - Total: ${validatedDefects.length} defects (${validationErrors.length} validation errors)`
    );

    return readonlyRegistry;
  } catch (error) {
    throw new Error(
      `Failed to load manufacturing defects: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

/**
 * Get validation report for all defects in registry
 * 
 * @param registry - The manufacturing defects registry
 * @returns Validation report with statistics and any missing fields
 */
export function getValidationReport(registry: ManufacturingDefectsRegistry): {
  totalDefects: number;
  defectsByBike: Record<BikeModel, number>;
  defectsByAuthority: Record<string, number>;
  defectsByWarrantyStatus: Record<string, number>;
  defectsWithDurabilityMods: number;
  criticalSafetyDefects: number;
  report: string[];
} {
  const allDefects = Object.values(registry).flat();
  const report: string[] = [];

  // Count by bike model
  const defectsByBike: Record<BikeModel, number> = {
    RE650: findDefectsByBike(registry, 'RE650').length,
    Himalayan411: findDefectsByBike(registry, 'Himalayan411').length,
    KTM390Adventure: findDefectsByBike(registry, 'KTM390Adventure').length,
  };

  // Count by authority
  const defectsByAuthority: Record<string, number> = {
    Deep: findDeepAuthorityDefects(registry).length,
    Verified: allDefects.filter(d => d.authority === 'Verified').length,
    Pending: allDefects.filter(d => d.authority === 'Pending').length,
  };

  // Count by warranty status
  const defectsByWarrantyStatus: Record<string, number> = {
    Covered: allDefects.filter(d => d.warrantyStatus === 'Covered').length,
    PartialCoverage: allDefects.filter(d => d.warrantyStatus === 'PartialCoverage')
      .length,
    NotCovered: allDefects.filter(d => d.warrantyStatus === 'NotCovered').length,
    CaseByCase: allDefects.filter(d => d.warrantyStatus === 'CaseByCase').length,
  };

  // Count defects with durability mods
  const defectsWithDurabilityMods = allDefects.filter(
    d => d.durabilityMods && d.durabilityMods.length > 0
  ).length;

  // Identify critical safety defects (NHTSA recalls, stalling, etc.)
  const criticalSafetyDefects = allDefects.filter(
    d =>
      d.id.includes('STALLING') ||
      d.videoReference.videoUrl.includes('25V825') ||
      d.failureMode === 'Electrical'
  ).length;

  // Generate report
  report.push('Manufacturing Defects Registry Validation Report');
  report.push('='.repeat(50));
  report.push(`Total Defects: ${allDefects.length}`);
  report.push(`\nBy Bike Model:`);
  report.push(`  - RE650: ${defectsByBike.RE650}`);
  report.push(`  - Himalayan411: ${defectsByBike.Himalayan411}`);
  report.push(`  - KTM390Adventure: ${defectsByBike.KTM390Adventure}`);
  report.push(`\nBy Authority:`);
  report.push(`  - Deep: ${defectsByAuthority.Deep}`);
  report.push(`  - Verified: ${defectsByAuthority.Verified}`);
  report.push(`  - Pending: ${defectsByAuthority.Pending}`);
  report.push(`\nBy Warranty Status:`);
  report.push(`  - Covered: ${defectsByWarrantyStatus.Covered}`);
  report.push(`  - Partial Coverage: ${defectsByWarrantyStatus.PartialCoverage}`);
  report.push(`  - Not Covered: ${defectsByWarrantyStatus.NotCovered}`);
  report.push(`  - Case by Case: ${defectsByWarrantyStatus.CaseByCase}`);
  report.push(`\nDefects with Durability Mods: ${defectsWithDurabilityMods}/${allDefects.length}`);
  report.push(`Critical Safety Defects: ${criticalSafetyDefects}`);

  // Check for missing critical fields
  const missingFields: string[] = [];
  allDefects.forEach(defect => {
    if (!defect.symptom) {
      missingFields.push(`${defect.id}: Missing symptom`);
    }
    if (!defect.rootCause.designFlaw) {
      missingFields.push(`${defect.id}: Missing root cause`);
    }
    if (!defect.videoReference) {
      missingFields.push(`${defect.id}: Missing video reference`);
    }
    if (defect.durabilityMods.length === 0) {
      missingFields.push(`${defect.id}: No durability mods`);
    }
  });

  if (missingFields.length > 0) {
    report.push(`\n⚠️ Missing Critical Fields:`);
    missingFields.forEach(field => report.push(`  - ${field}`));
  } else {
    report.push(`\n✅ All entries have required fields`);
  }

  return {
    totalDefects: allDefects.length,
    defectsByBike,
    defectsByAuthority,
    defectsByWarrantyStatus,
    defectsWithDurabilityMods,
    criticalSafetyDefects,
    report,
  };
}

/**
 * Diagnostic helper: Find relevant defects given a symptom
 * 
 * @param registry - The manufacturing defects registry
 * @param bikeModel - The bike model
 * @param symptoms - User-reported symptoms
 * @returns Relevant defects ranked by relevance
 */
export function findRelevantDefects(
  registry: ManufacturingDefectsRegistry,
  bikeModel: BikeModel,
  symptoms: string
) {
  return diagnoseDefect(registry, bikeModel, symptoms);
}

/**
 * Export query functions for public use
 */
export const ManufacturingDefectsQueries = {
  findDefectsByBike,
  findDefectsBySymptom,
  findWarrantyCoveredDefects,
  findDefectsByFailureMode,
  findDeepAuthorityDefects,
  diagnoseDefect,
};

/**
 * Main export: Initialize and return the registry
 */
let cachedRegistry: ManufacturingDefectsRegistry | null = null;

export function getManufacturingDefectsRegistry(): ManufacturingDefectsRegistry {
  if (!cachedRegistry) {
    cachedRegistry = loadManufacturingDefects();
  }
  return cachedRegistry;
}

/**
 * Reset cache for testing purposes
 */
export function resetRegistry(): void {
  cachedRegistry = null;
}
