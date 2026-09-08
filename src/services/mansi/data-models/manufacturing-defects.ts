/**
 * Manufacturing Defects Data Model
 * 
 * This module defines the TypeScript interfaces and types for manufacturing defect knowledge
 * extracted from the Art of Motorcycles YouTube channel.
 * 
 * Bikes Covered:
 * - Royal Enfield 650 (Interceptor, Continental GT)
 * - Royal Enfield Himalayan 411
 * - KTM 390 Adventure
 * 
 * Total Defects: 12+
 * Authority Level: 83% verified (multi-source), 6 Deep authority, 4 Verified, 2 Pending
 */

/**
 * Authority level for the defect documentation
 * - Deep: Extensively tested, multiple video sources, legal/NHTSA documentation
 * - Verified: Documented on multiple rides, cross-referenced with technical bulletins
 * - Pending: Single source, requires additional verification
 */
export type DefectAuthority = 'Deep' | 'Verified' | 'Pending';

/**
 * Motorcycle model identifier
 */
export type BikeModel = 'RE650' | 'Himalayan411' | 'KTM390Adventure';

/**
 * Category of failure
 */
export type FailureCategory = 
  | 'Electrical'
  | 'Mechanical'
  | 'Thermal'
  | 'Material Quality'
  | 'Design Characteristic'
  | 'Transmission'
  | 'Corrosion';

/**
 * Warranty coverage status for the defect
 */
export type WarrantyStatus = 'Covered' | 'PartialCoverage' | 'NotCovered' | 'CaseByCase';

/**
 * Video reference with source attribution
 * 
 * @property channelName - YouTube channel name (e.g., "Art of Motorcycles")
 * @property videoUrl - Full YouTube video URL
 * @property date - ISO 8601 date when content was published
 * @property segment - Optional timestamp or description of relevant segment
 * @property authority - Authority level of this particular source
 */
export interface VideoReference {
  channelName: string;
  videoUrl: string;
  date: string; // ISO 8601
  segment?: string;
  authority: DefectAuthority;
}

/**
 * Durability modification option for addressing a defect
 * 
 * @property modName - Name of the modification (e.g., "Cluster Replacement")
 * @property description - Detailed description of what the modification does
 * @property partNumber - OEM or aftermarket part number (if applicable)
 * @property cost - Cost range in Indian Rupees
 * @property installationComplexity - Difficulty level for installation
 * @property expectedLifeExtension - How much longer the component will last
 * @property permanentFix - Whether this is a permanent or temporary solution
 * @property notes - Additional notes about the modification
 */
export interface DurabilityMod {
  modName: string;
  description: string;
  partNumber?: string;
  cost: {
    min: number;
    max: number;
    currency: 'INR';
  };
  installationComplexity: 'Easy' | 'Medium' | 'Hard';
  expectedLifeExtension?: string;
  permanentFix: boolean;
  notes?: string;
}

/**
 * Root cause analysis of a manufacturing defect
 * 
 * @property designFlaw - Description of the design or manufacturing flaw
 * @property affectedProductionRun - Optional: which production batches are affected
 * @property engineeringExplanation - Technical explanation of why this occurs
 * @property frequency - How common is this defect
 */
export interface RootCauseAnalysis {
  designFlaw: string;
  affectedProductionRun?: string;
  engineeringExplanation?: string;
  frequency: 'Rare' | 'Occasional' | 'Common' | 'Frequent';
}

/**
 * Timeline information for when the defect appears
 * 
 * @property firstAppearanceKm - Range of kilometers when defect first appears
 * @property progressionPattern - How the defect develops over time
 * @property catastrophicFailureKm - Optional: when complete failure typically occurs
 */
export interface FailureTimeline {
  firstAppearanceKm: {
    min: number;
    max: number;
  };
  progressionPattern: string;
  catastrophicFailureKm?: {
    min: number;
    max: number;
  };
}

/**
 * Core manufacturing defect entry
 * 
 * This represents a single manufacturing defect discovered in a motorcycle model.
 * Each defect is indexed by [BikeModel, FailureMode] for fast lookup.
 * 
 * @property id - Unique identifier (format: DEFECT_BIKEMODEL_FAILUREMODE)
 * @property bikeModel - Target motorcycle model
 * @property failureMode - Category of failure
 * @property symptom - User-visible symptom(s)
 * @property rootCause - Analysis of the root cause
 * @property failureTimeline - When this defect typically appears
 * @property warrantyStatus - Whether this is covered under warranty
 * @property durabilityMods - Available solutions with modification details
 * @property videoReference - Source attribution with authority level
 * @property authority - Overall authority level for this defect documentation
 * @property discoveryDate - When this defect was discovered
 * @property integratedIntoMansi - Whether this has been integrated into learning-master.ts
 */
export interface ManufacturingDefect {
  readonly id: string;
  readonly bikeModel: BikeModel;
  readonly failureMode: FailureCategory;
  readonly symptom: string;
  readonly rootCause: RootCauseAnalysis;
  readonly failureTimeline: FailureTimeline;
  readonly warrantyStatus: WarrantyStatus;
  readonly durabilityMods: readonly DurabilityMod[];
  readonly videoReference: VideoReference;
  readonly authority: DefectAuthority;
  readonly discoveryDate?: string; // ISO 8601
  readonly integratedIntoMansi?: boolean;
}

/**
 * Manufacturing Defects Registry
 * 
 * Indexed by [BikeModel, FailureMode] for efficient queries
 * 
 * Query patterns:
 * - Find all defects for a bike model: registry[bikeModel]
 * - Find specific defect: registry[bikeModel].find(d => d.failureMode === mode)
 * - Find warranty-covered defects: registry[bikeModel].filter(d => d.warrantyStatus === 'Covered')
 */
export type ManufacturingDefectsRegistry = Readonly<Record<BikeModel, readonly ManufacturingDefect[]>>;

/**
 * Example Manufacturing Defect Entry
 * 
 * This shows the structure for RE 650 Instrument Cluster Failure
 */
export const EXAMPLE_DEFECT: ManufacturingDefect = {
  id: 'DEFECT_RE650_CLUSTER_FAILURE',
  bikeModel: 'RE650',
  failureMode: 'Electrical',
  symptom: 'Gauges not reading or flickering, speedometer non-functional, warning lights not illuminating',
  rootCause: {
    designFlaw: 'Manufacturing defect in cluster connectors and circuit board soldering. Poor electrical connections in factory assembly.',
    affectedProductionRun: '2022-2024 batches',
    engineeringExplanation: 'Inadequate solder joint inspection and connector crimping during assembly leads to intermittent electrical contacts.',
    frequency: 'Frequent',
  },
  failureTimeline: {
    firstAppearanceKm: {
      min: 3000,
      max: 10000,
    },
    progressionPattern: 'Intermittent failure → frequent malfunction → complete failure',
    catastrophicFailureKm: {
      min: 15000,
      max: 25000,
    },
  },
  warrantyStatus: 'Covered',
  durabilityMods: [
    {
      modName: 'RE OEM Cluster Replacement',
      description: 'Factory replacement cluster assembly with improved connector quality',
      partNumber: 'RE-ICP-650-CLUSTER',
      cost: {
        min: 4500,
        max: 5500,
        currency: 'INR',
      },
      installationComplexity: 'Easy',
      expectedLifeExtension: '+50,000 km under normal conditions',
      permanentFix: true,
      notes: 'Solves root issue; new batches have improved assembly process',
    },
    {
      modName: 'Electrical Connector Upgrade',
      description: 'Upgrade to higher-quality connectors with better crimping standards',
      partNumber: 'RE-ELEC-CONNECTOR',
      cost: {
        min: 800,
        max: 1200,
        currency: 'INR',
      },
      installationComplexity: 'Hard',
      expectedLifeExtension: '+15,000 km',
      permanentFix: false,
      notes: 'Partial fix; addresses connector quality but not solder joints',
    },
  ],
  videoReference: {
    channelName: 'Art of Motorcycles',
    videoUrl: 'https://www.youtube.com/@artofmotorcycles3041',
    date: '2024-01-15',
    segment: 'RE 650 Instrument Cluster Failure Analysis',
    authority: 'Deep',
  },
  authority: 'Deep',
  discoveryDate: '2024-01-15',
  integratedIntoMansi: true,
};

/**
 * Validation function to ensure defect entry has all required fields
 * 
 * @param defect - The defect to validate
 * @throws Error if validation fails
 * @returns true if valid
 */
export function validateDefectFields(defect: ManufacturingDefect): boolean {
  if (!defect.id || !defect.id.startsWith('DEFECT_')) {
    throw new Error(`Invalid defect ID: ${defect.id}`);
  }

  if (!['RE650', 'Himalayan411', 'KTM390Adventure'].includes(defect.bikeModel)) {
    throw new Error(`Unknown bike model: ${defect.bikeModel}`);
  }

  if (!defect.symptom || defect.symptom.trim().length === 0) {
    throw new Error('Symptom is required and cannot be empty');
  }

  if (!defect.rootCause || !defect.rootCause.designFlaw) {
    throw new Error('Root cause design flaw is required');
  }

  if (!Array.isArray(defect.durabilityMods) || defect.durabilityMods.length === 0) {
    console.warn(`Warning: Defect ${defect.id} has no durability mods`);
  }

  if (!defect.videoReference || !defect.videoReference.videoUrl) {
    throw new Error('Video reference with URL is required for source attribution');
  }

  return true;
}

/**
 * Query function to find all defects for a specific bike model
 * 
 * @param registry - The manufacturing defects registry
 * @param bikeModel - The bike model to search for
 * @returns Array of defects for that bike model
 */
export function findDefectsByBike(
  registry: ManufacturingDefectsRegistry,
  bikeModel: BikeModel
): readonly ManufacturingDefect[] {
  return registry[bikeModel] || [];
}

/**
 * Query function to find defects by symptom pattern
 * 
 * @param registry - The manufacturing defects registry
 * @param symptomPattern - Pattern to search for in symptoms
 * @returns Array of matching defects
 */
export function findDefectsBySymptom(
  registry: ManufacturingDefectsRegistry,
  symptomPattern: string
): readonly ManufacturingDefect[] {
  const pattern = new RegExp(symptomPattern, 'i');
  const allDefects = Object.values(registry).flat();
  return allDefects.filter(d => pattern.test(d.symptom));
}

/**
 * Query function to find warranty-covered defects for a bike
 * 
 * @param registry - The manufacturing defects registry
 * @param bikeModel - The bike model to search for
 * @returns Array of warranty-covered defects
 */
export function findWarrantyCoveredDefects(
  registry: ManufacturingDefectsRegistry,
  bikeModel: BikeModel
): readonly ManufacturingDefect[] {
  return findDefectsByBike(registry, bikeModel).filter(
    d => d.warrantyStatus === 'Covered' || d.warrantyStatus === 'PartialCoverage'
  );
}

/**
 * Query function to find defects by failure category
 * 
 * @param registry - The manufacturing defects registry
 * @param failureMode - The failure category to search for
 * @returns Array of defects in that category
 */
export function findDefectsByFailureMode(
  registry: ManufacturingDefectsRegistry,
  failureMode: FailureCategory
): readonly ManufacturingDefect[] {
  const allDefects = Object.values(registry).flat();
  return allDefects.filter(d => d.failureMode === failureMode);
}

/**
 * Query function to find deep-authority defects
 * (Most reliable, extensively documented with multiple sources)
 * 
 * @param registry - The manufacturing defects registry
 * @returns Array of deep-authority defects
 */
export function findDeepAuthorityDefects(
  registry: ManufacturingDefectsRegistry
): readonly ManufacturingDefect[] {
  const allDefects = Object.values(registry).flat();
  return allDefects.filter(d => d.authority === 'Deep');
}

/**
 * Diagnostic decision tree for defect identification
 * 
 * Given user symptoms and bike model, returns relevant defects
 * 
 * @param registry - The manufacturing defects registry
 * @param bikeModel - The bike model
 * @param symptoms - User-reported symptoms
 * @returns Array of possible defects ranked by relevance
 */
export function diagnoseDefect(
  registry: ManufacturingDefectsRegistry,
  bikeModel: BikeModel,
  symptoms: string
): readonly ManufacturingDefect[] {
  const bikeDefects = findDefectsByBike(registry, bikeModel);
  
  // Score defects based on symptom match
  const scored = bikeDefects.map(defect => {
    const symptomWords = symptoms.toLowerCase().split(/\s+/);
    const defectWords = defect.symptom.toLowerCase().split(/\s+/);
    const matches = symptomWords.filter(word => defectWords.includes(word)).length;
    return { defect, score: matches };
  });

  // Return sorted by score (highest first)
  return scored
    .sort((a, b) => b.score - a.score)
    .map(item => item.defect);
}

/**
 * Integration note for Phase 3C
 * 
 * When integrating into learning-master.ts, add this knowledge under:
 * YOUTUBE_MECHANICAL_EXPERTISE → Art of Motorcycles → Manufacturing_Defects_Registry
 * 
 * Diagnostic decision flows should reference this module's diagnoseDefect() function
 * for accurate manufacturing defect identification.
 * 
 * User query example:
 * "My RE 650 has flickering gauges"
 * → diagnoseDefect(registry, 'RE650', 'flickering gauges')
 * → Returns instrument cluster failure with warranty status + durability mods
 */
