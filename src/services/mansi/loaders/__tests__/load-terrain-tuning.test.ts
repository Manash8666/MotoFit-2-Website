/**
 * Terrain Tuning Loader Tests
 * 
 * Tests for loading, validating, and querying terrain-specific tuning profiles.
 * 
 * Coverage:
 * - JSON parsing and validation
 * - Safety constraint checking
 * - Conflict detection
 * - Query functions
 * - Acceptance criteria verification
 */

import {
  loadTerrainTuning,
  getValidationReport,
  validateSafetyConstraints,
  detectConflicts,
  getTerrainTuningRegistry,
  findTerrainTuning,
  getTerrainTuningsForBike,
  getDeepAuthorityProfiles,
  getProfilesByConcernSeverity,
  resetRegistry,
} from '../load-terrain-tuning';
import { TerrainTuningProfile } from '../../data-models/terrain-tuning';

describe('Terrain Tuning Loader', () => {
  beforeEach(() => {
    resetRegistry();
  });

  describe('loadTerrainTuning', () => {
    it('should load terrain tuning profiles successfully', () => {
      const registry = loadTerrainTuning();
      
      expect(registry).toBeDefined();
      expect(registry.RE650).toBeDefined();
      expect(registry.Himalayan450).toBeDefined();
      expect(registry.KTM390Adventure).toBeDefined();
    });

    it('should load 15+ profiles total', () => {
      const registry = loadTerrainTuning();
      const totalProfiles = Object.values(registry).reduce(
        (sum, profiles) => sum + profiles.length,
        0
      );
      
      expect(totalProfiles).toBeGreaterThanOrEqual(15);
    });

    it('should make registry immutable (readonly)', () => {
      const registry = loadTerrainTuning();
      
      // Attempting to modify should throw error
      expect(() => {
        (registry.RE650 as any).push({} as any);
      }).toThrow();
    });

    it('should cache registry on subsequent calls', () => {
      const registry1 = getTerrainTuningRegistry();
      const registry2 = getTerrainTuningRegistry();
      
      expect(registry1).toBe(registry2);
    });
  });

  describe('Profile Structure Validation', () => {
    it('should have required fields for all profiles', () => {
      const registry = loadTerrainTuning();
      const allProfiles = Object.values(registry).flat();
      
      allProfiles.forEach(profile => {
        expect(profile.id).toBeDefined();
        expect(profile.terrain).toBeDefined();
        expect(profile.bikeModel).toBeDefined();
        expect(profile.environmentalConditions).toBeDefined();
        expect(profile.tuningParameters).toBeDefined();
        expect(profile.videoReference).toBeDefined();
        expect(profile.authority).toBeDefined();
      });
    });

    it('should have valid terrain types', () => {
      const registry = loadTerrainTuning();
      const allProfiles = Object.values(registry).flat();
      const validTerrains = ['Mountain', 'Desert', 'Monsoon', 'Highway', 'Mixed'];
      
      allProfiles.forEach(profile => {
        expect(validTerrains).toContain(profile.terrain);
      });
    });

    it('should have valid bike models', () => {
      const registry = loadTerrainTuning();
      const allProfiles = Object.values(registry).flat();
      const validBikes = ['RE650', 'Himalayan450', 'KTM390Adventure'];
      
      allProfiles.forEach(profile => {
        expect(validBikes).toContain(profile.bikeModel);
      });
    });

    it('should have source attribution for all profiles', () => {
      const registry = loadTerrainTuning();
      const allProfiles = Object.values(registry).flat();
      
      allProfiles.forEach(profile => {
        expect(profile.videoReference.channelName).toBeDefined();
        expect(profile.videoReference.videoUrl).toBeDefined();
        expect(profile.videoReference.date).toBeDefined();
        expect(profile.videoReference.authority).toBeDefined();
      });
    });

    it('should have all tuning parameters defined', () => {
      const registry = loadTerrainTuning();
      const allProfiles = Object.values(registry).flat();
      
      allProfiles.forEach(profile => {
        const params = profile.tuningParameters;
        expect(params.fuelMap).toBeDefined();
        expect(params.ignitionTiming).toBeDefined();
        expect(params.suspension).toBeDefined();
        expect(params.tirePressure).toBeDefined();
      });
    });

    it('should have reliability concerns documented', () => {
      const registry = loadTerrainTuning();
      const allProfiles = Object.values(registry).flat();
      
      // At least 12 profiles should have reliability concerns
      const profilesWithConcerns = allProfiles.filter(
        p => p.reliabilityConcerns && p.reliabilityConcerns.length > 0
      );
      
      expect(profilesWithConcerns.length).toBeGreaterThanOrEqual(12);
    });
  });

  describe('Terrain Coverage', () => {
    it('should cover 5 terrain types', () => {
      const registry = loadTerrainTuning();
      const allProfiles = Object.values(registry).flat();
      
      const terrainSet = new Set(allProfiles.map(p => p.terrain));
      expect(terrainSet.size).toBeGreaterThanOrEqual(5);
      expect(terrainSet.has('Mountain')).toBe(true);
      expect(terrainSet.has('Desert')).toBe(true);
      expect(terrainSet.has('Monsoon')).toBe(true);
      expect(terrainSet.has('Highway')).toBe(true);
      expect(terrainSet.has('Mixed')).toBe(true);
    });

    it('should have at least 3 profiles per bike model', () => {
      const registry = loadTerrainTuning();
      
      expect(registry.RE650.length).toBeGreaterThanOrEqual(3);
      expect(registry.Himalayan450.length).toBeGreaterThanOrEqual(3);
      expect(registry.KTM390Adventure.length).toBeGreaterThanOrEqual(3);
    });

    it('should have Mountain terrain profiles for all bikes', () => {
      const registry = loadTerrainTuning();
      
      const mountainProfiles = Object.values(registry).flat().filter(p => p.terrain === 'Mountain');
      const bikes = new Set(mountainProfiles.map(p => p.bikeModel));
      
      expect(bikes.size).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Performance Data', () => {
    it('should have quantified performance data for 8+ profiles', () => {
      const registry = loadTerrainTuning();
      const allProfiles = Object.values(registry).flat();
      
      const profilesWithData = allProfiles.filter(
        p => p.performanceMetrics && p.performanceMetrics.fuelConsumptionKmpl > 0
      );
      
      expect(profilesWithData.length).toBeGreaterThanOrEqual(8);
    });

    it('should have topSpeedChange documented', () => {
      const registry = loadTerrainTuning();
      const allProfiles = Object.values(registry).flat();
      
      allProfiles.forEach(profile => {
        if (profile.performanceMetrics) {
          expect(profile.performanceMetrics.topSpeedChange).toBeDefined();
          expect(profile.performanceMetrics.topSpeedChange.length).toBeGreaterThan(0);
        }
      });
    });

    it('should have accelerationChange documented', () => {
      const registry = loadTerrainTuning();
      const allProfiles = Object.values(registry).flat();
      
      allProfiles.forEach(profile => {
        if (profile.performanceMetrics) {
          expect(profile.performanceMetrics.accelerationChange).toBeDefined();
          expect(profile.performanceMetrics.accelerationChange.length).toBeGreaterThan(0);
        }
      });
    });

    it('should have fuelConsumptionKmpl documented', () => {
      const registry = loadTerrainTuning();
      const allProfiles = Object.values(registry).flat();
      
      allProfiles.forEach(profile => {
        if (profile.performanceMetrics) {
          expect(profile.performanceMetrics.fuelConsumptionKmpl).toBeGreaterThan(0);
        }
      });
    });
  });

  describe('Safety Constraint Validation', () => {
    it('should validate AFR ratios within 12:1 to 14:1 range', () => {
      const registry = loadTerrainTuning();
      const allProfiles = Object.values(registry).flat();
      
      allProfiles.forEach(profile => {
        const safetyCheck = validateSafetyConstraints(profile);
        const afrIssues = safetyCheck.issues.filter(issue => issue.includes('AFR'));
        
        // Should have no AFR safety issues
        expect(afrIssues.length).toBe(0);
      });
    });

    it('should validate ignition timing within -10° to +30° BTDC', () => {
      const registry = loadTerrainTuning();
      const allProfiles = Object.values(registry).flat();
      
      allProfiles.forEach(profile => {
        const safetyCheck = validateSafetyConstraints(profile);
        const timingIssues = safetyCheck.issues.filter(issue => issue.includes('timing'));
        
        // Should have no ignition timing safety issues
        expect(timingIssues.length).toBe(0);
      });
    });

    it('should validate tire pressure within 20-50 PSI range', () => {
      const registry = loadTerrainTuning();
      const allProfiles = Object.values(registry).flat();
      
      allProfiles.forEach(profile => {
        const safetyCheck = validateSafetyConstraints(profile);
        const tireIssues = safetyCheck.issues.filter(issue => issue.includes('tire'));
        
        // Should have no tire pressure safety issues
        expect(tireIssues.length).toBe(0);
      });
    });

    it('should validate suspension preload within -30mm to +30mm', () => {
      const registry = loadTerrainTuning();
      const allProfiles = Object.values(registry).flat();
      
      allProfiles.forEach(profile => {
        const safetyCheck = validateSafetyConstraints(profile);
        const preloadIssues = safetyCheck.issues.filter(issue => issue.includes('preload'));
        
        // Should have no suspension preload safety issues
        expect(preloadIssues.length).toBe(0);
      });
    });

    it('should flag invalid AFR values outside safe range', () => {
      // Create a test profile with unsafe AFR
      const unsafeProfile: TerrainTuningProfile = {
        id: 'TEST_UNSAFE_AFR',
        terrain: 'Mountain',
        bikeModel: 'RE650',
        environmentalConditions: {
          altitudeRange: { min: 9000, max: 12500, unit: 'ft' },
          temperatureRange: { min: -10, max: 25, unit: 'C' },
          humidity: 'Low',
          primaryChallenge: 'Test',
          typicalRidingHours: 8,
        },
        tuningParameters: {
          fuelMap: {
            afrRatio: '15.5:1 to 16.0:1', // UNSAFE - too lean
            altitudeCompensation: 'Test',
            rationale: 'Test',
          },
          ignitionTiming: {
            advanceDegrees: '20° BTDC',
            rationale: 'Test',
            knockRisk: 'Low',
          },
          suspension: {
            frontPreload: '+10mm',
            rearPreload: '+5mm',
            rationale: 'Test',
          },
          tirePressure: {
            frontPsi: 35,
            rearPsi: 40,
            rationale: 'Test',
          },
        },
        performanceMetrics: {
          topSpeedChange: '0%',
          accelerationChange: '0%',
          fuelConsumptionKmpl: 35,
          corneringConfidence: 'Good',
          reliabilityRating: 'High',
        },
        reliabilityConcerns: [],
        videoReference: {
          channelName: 'Test',
          videoUrl: 'https://example.com',
          date: '2024-01-01',
          authority: 'Verified',
        },
        authority: 'Verified',
      };

      const safetyCheck = validateSafetyConstraints(unsafeProfile);
      expect(safetyCheck.isValid).toBe(false);
      expect(safetyCheck.issues.some(issue => issue.includes('AFR'))).toBe(true);
    });
  });

  describe('Conflict Detection', () => {
    it('should detect conflicts in registry', () => {
      const registry = loadTerrainTuning();
      const conflictReport = detectConflicts(registry);
      
      expect(conflictReport).toBeDefined();
      expect(conflictReport.conflicts).toBeDefined();
      // Should be an array
      expect(Array.isArray(conflictReport.conflicts)).toBe(true);
    });

    it('should have zero conflicts (all profiles safe)', () => {
      const registry = loadTerrainTuning();
      const conflictReport = detectConflicts(registry);
      
      expect(conflictReport.conflictsDetected).toBe(false);
      expect(conflictReport.conflicts.length).toBe(0);
    });
  });

  describe('Query Functions', () => {
    it('should find terrain tuning by bike and terrain', () => {
      const registry = loadTerrainTuning();
      
      const profile = findTerrainTuning(registry, 'RE650', 'Mountain');
      expect(profile).toBeDefined();
      expect(profile?.bikeModel).toBe('RE650');
      expect(profile?.terrain).toBe('Mountain');
    });

    it('should return all terrains for a bike', () => {
      const registry = loadTerrainTuning();
      
      const re650Profiles = getTerrainTuningsForBike(registry, 'RE650');
      expect(re650Profiles.length).toBeGreaterThanOrEqual(3);
      expect(re650Profiles.every(p => p.bikeModel === 'RE650')).toBe(true);
    });

    it('should find deep-authority profiles', () => {
      const registry = loadTerrainTuning();
      
      const deepProfiles = getDeepAuthorityProfiles(registry);
      expect(deepProfiles.length).toBeGreaterThan(0);
      expect(deepProfiles.every(p => p.authority === 'Deep')).toBe(true);
    });

    it('should find profiles by concern severity', () => {
      const registry = loadTerrainTuning();
      
      const highConcernProfiles = getProfilesByConcernSeverity(registry, 'High');
      expect(highConcernProfiles.length).toBeGreaterThanOrEqual(0);
      
      highConcernProfiles.forEach(profile => {
        const hasHighConcern = profile.reliabilityConcerns.some(
          c => c.severity === 'High'
        );
        expect(hasHighConcern).toBe(true);
      });
    });
  });

  describe('Validation Report', () => {
    it('should generate comprehensive validation report', () => {
      const registry = loadTerrainTuning();
      const report = getValidationReport(registry);
      
      expect(report).toBeDefined();
      expect(report.totalProfiles).toBeGreaterThanOrEqual(15);
      expect(report.profilesByBike).toBeDefined();
      expect(report.profilesByTerrain).toBeDefined();
      expect(report.profilesByAuthority).toBeDefined();
      expect(report.report).toBeDefined();
    });

    it('should have at least 15 total profiles in report', () => {
      const registry = loadTerrainTuning();
      const report = getValidationReport(registry);
      
      expect(report.totalProfiles).toBeGreaterThanOrEqual(15);
    });

    it('should show authority distribution in report', () => {
      const registry = loadTerrainTuning();
      const report = getValidationReport(registry);
      
      expect(report.profilesByAuthority.Deep).toBeGreaterThan(0);
      expect(report.profilesByAuthority.Verified).toBeGreaterThanOrEqual(0);
    });

    it('should verify terrain coverage in report', () => {
      const registry = loadTerrainTuning();
      const report = getValidationReport(registry);
      
      expect(report.coverageStats.terrainTypes).toBeGreaterThanOrEqual(4);
      expect(report.coverageStats.bikeModels).toBe(3);
    });

    it('should have bike coverage in report', () => {
      const registry = loadTerrainTuning();
      const report = getValidationReport(registry);
      
      expect(report.profilesByBike.RE650).toBeGreaterThan(0);
      expect(report.profilesByBike.Himalayan450).toBeGreaterThan(0);
      expect(report.profilesByBike.KTM390Adventure).toBeGreaterThan(0);
    });

    it('should show quantified data stats in report', () => {
      const registry = loadTerrainTuning();
      const report = getValidationReport(registry);
      
      expect(report.profilesWithQuantifiedData).toBeGreaterThanOrEqual(8);
    });

    it('should print readable report format', () => {
      const registry = loadTerrainTuning();
      const report = getValidationReport(registry);
      
      expect(report.report.length).toBeGreaterThan(0);
      expect(report.report.every(line => typeof line === 'string')).toBe(true);
    });
  });

  describe('Acceptance Criteria Verification', () => {
    it('should meet requirement: 15+ profiles', () => {
      const registry = loadTerrainTuning();
      const totalProfiles = Object.values(registry).reduce(
        (sum, profiles) => sum + profiles.length,
        0
      );
      
      expect(totalProfiles).toBeGreaterThanOrEqual(15);
    });

    it('should meet requirement: 4+ terrain types', () => {
      const registry = loadTerrainTuning();
      const allProfiles = Object.values(registry).flat();
      const terrainTypes = new Set(allProfiles.map(p => p.terrain));
      
      expect(terrainTypes.size).toBeGreaterThanOrEqual(4);
    });

    it('should meet requirement: 8+ with quantified performance data', () => {
      const registry = loadTerrainTuning();
      const allProfiles = Object.values(registry).flat();
      
      const profilesWithData = allProfiles.filter(
        p => p.performanceMetrics && p.performanceMetrics.fuelConsumptionKmpl > 0
      );
      
      expect(profilesWithData.length).toBeGreaterThanOrEqual(8);
    });

    it('should meet requirement: All entries include source attribution', () => {
      const registry = loadTerrainTuning();
      const allProfiles = Object.values(registry).flat();
      
      allProfiles.forEach(profile => {
        expect(profile.videoReference.channelName).toBe('Deep Ranjan Sachan');
        expect(profile.videoReference.videoUrl).toBeDefined();
        expect(profile.videoReference.date).toBeDefined();
      });
    });

    it('should meet requirement: All tuning parameters within safe ranges', () => {
      const registry = loadTerrainTuning();
      const conflictReport = detectConflicts(registry);
      
      expect(conflictReport.conflictsDetected).toBe(false);
    });

    it('should meet requirement: 12+ entries with reliability concerns', () => {
      const registry = loadTerrainTuning();
      const allProfiles = Object.values(registry).flat();
      
      const profilesWithConcerns = allProfiles.filter(
        p => p.reliabilityConcerns && p.reliabilityConcerns.length > 0
      );
      
      expect(profilesWithConcerns.length).toBeGreaterThanOrEqual(12);
    });

    it('should meet requirement: Zero conflicts with existing Mansi knowledge', () => {
      const registry = loadTerrainTuning();
      const conflictReport = detectConflicts(registry);
      
      expect(conflictReport.conflictsDetected).toBe(false);
      expect(conflictReport.conflicts.length).toBe(0);
    });
  });

  describe('Data Consistency', () => {
    it('should have matching bike models across profiles', () => {
      const registry = loadTerrainTuning();
      const allProfiles = Object.values(registry).flat();
      
      allProfiles.forEach(profile => {
        const bikeRegex = /^(RE650|Himalayan450|KTM390Adventure)$/;
        expect(bikeRegex.test(profile.bikeModel as any)).toBe(true);
      });
    });

    it('should have consistent ID format', () => {
      const registry = loadTerrainTuning();
      const allProfiles = Object.values(registry).flat();
      
      allProfiles.forEach(profile => {
        expect(profile.id).toMatch(/^TERRAIN_[A-Z0-9_]+$/);
      });
    });

    it('should have unique profile IDs', () => {
      const registry = loadTerrainTuning();
      const allProfiles = Object.values(registry).flat();
      
      const ids = allProfiles.map(p => p.id);
      const uniqueIds = new Set(ids);
      
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have km documented for most profiles', () => {
      const registry = loadTerrainTuning();
      const allProfiles = Object.values(registry).flat();
      
      const profilesWithKm = allProfiles.filter(p => (p.kmDocumented || 0) > 0);
      
      // Most profiles (80%+) should have km documented
      expect(profilesWithKm.length / allProfiles.length).toBeGreaterThan(0.8);
    });

    it('should have authority level for all profiles', () => {
      const registry = loadTerrainTuning();
      const allProfiles = Object.values(registry).flat();
      
      const validAuthorities = ['Deep', 'Verified', 'Pending'];
      allProfiles.forEach(profile => {
        expect(validAuthorities).toContain(profile.authority);
      });
    });
  });

  describe('Environmental Conditions', () => {
    it('should have altitude ranges for mountain terrain', () => {
      const registry = loadTerrainTuning();
      const mountainProfiles = Object.values(registry)
        .flat()
        .filter(p => p.terrain === 'Mountain');
      
      mountainProfiles.forEach(profile => {
        expect(profile.environmentalConditions.altitudeRange.min).toBeGreaterThan(0);
        expect(profile.environmentalConditions.altitudeRange.max).toBeGreaterThan(
          profile.environmentalConditions.altitudeRange.min
        );
      });
    });

    it('should have temperature ranges for desert terrain', () => {
      const registry = loadTerrainTuning();
      const desertProfiles = Object.values(registry)
        .flat()
        .filter(p => p.terrain === 'Desert');
      
      desertProfiles.forEach(profile => {
        expect(profile.environmentalConditions.temperatureRange.min).toBeLessThanOrEqual(
          profile.environmentalConditions.temperatureRange.max
        );
        expect(profile.environmentalConditions.temperatureRange.max).toBeGreaterThan(20);
      });
    });

    it('should document primary challenges', () => {
      const registry = loadTerrainTuning();
      const allProfiles = Object.values(registry).flat();
      
      allProfiles.forEach(profile => {
        expect(profile.environmentalConditions.primaryChallenge).toBeDefined();
        expect(profile.environmentalConditions.primaryChallenge.length).toBeGreaterThan(0);
      });
    });
  });
});
