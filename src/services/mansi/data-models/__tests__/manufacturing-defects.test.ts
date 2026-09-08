/**
 * Unit Tests for Manufacturing Defects Data Model
 * 
 * Tests validate:
 * 1. TypeScript interface correctness
 * 2. Validation function behavior
 * 3. Query function accuracy
 * 4. Diagnostic decision tree logic
 */

import {
  ManufacturingDefect,
  ManufacturingDefectsRegistry,
  EXAMPLE_DEFECT,
  validateDefectFields,
  findDefectsByBike,
  findDefectsBySymptom,
  findWarrantyCoveredDefects,
  findDefectsByFailureMode,
  findDeepAuthorityDefects,
  diagnoseDefect,
} from '../manufacturing-defects';

import {
  MANUFACTURING_DEFECTS_REGISTRY,
  REGISTRY_METADATA,
} from './manufacturing-defects-example';

describe('Manufacturing Defects Data Model', () => {
  
  /**
   * TEST SUITE 1: Data Structure Validation
   */
  describe('Data Structure Validation', () => {
    
    it('should have valid example defect with all required fields', () => {
      expect(EXAMPLE_DEFECT.id).toBeTruthy();
      expect(EXAMPLE_DEFECT.bikeModel).toBe('RE650');
      expect(EXAMPLE_DEFECT.symptom).toBeTruthy();
      expect(EXAMPLE_DEFECT.rootCause).toBeTruthy();
      expect(Array.isArray(EXAMPLE_DEFECT.durabilityMods)).toBe(true);
      expect(EXAMPLE_DEFECT.videoReference).toBeTruthy();
    });

    it('example defect should pass validation', () => {
      expect(() => validateDefectFields(EXAMPLE_DEFECT)).not.toThrow();
    });

    it('registry should have 3 bike models', () => {
      expect(Object.keys(MANUFACTURING_DEFECTS_REGISTRY)).toHaveLength(3);
      expect(MANUFACTURING_DEFECTS_REGISTRY).toHaveProperty('RE650');
      expect(MANUFACTURING_DEFECTS_REGISTRY).toHaveProperty('KTM390Adventure');
      expect(MANUFACTURING_DEFECTS_REGISTRY).toHaveProperty('Himalayan411');
    });

    it('registry should have 12 total defects', () => {
      const totalDefects = Object.values(MANUFACTURING_DEFECTS_REGISTRY)
        .reduce((sum, defects) => sum + defects.length, 0);
      expect(totalDefects).toBe(12);
    });

    it('RE 650 should have 6 defects', () => {
      expect(MANUFACTURING_DEFECTS_REGISTRY.RE650).toHaveLength(6);
    });

    it('KTM 390 Adventure should have 3 defects', () => {
      expect(MANUFACTURING_DEFECTS_REGISTRY.KTM390Adventure).toHaveLength(3);
    });

    it('Himalayan 411 should have 3 defects', () => {
      expect(MANUFACTURING_DEFECTS_REGISTRY.Himalayan411).toHaveLength(3);
    });
  });

  /**
   * TEST SUITE 2: Validation Functions
   */
  describe('Validation Functions', () => {
    
    it('should reject defect with invalid ID', () => {
      const invalidDefect: ManufacturingDefect = {
        ...EXAMPLE_DEFECT,
        id: 'INVALID_ID',
      };
      expect(() => validateDefectFields(invalidDefect)).toThrow('Invalid defect ID');
    });

    it('should reject defect with unknown bike model', () => {
      const invalidDefect: ManufacturingDefect = {
        ...EXAMPLE_DEFECT,
        bikeModel: 'UnknownBike' as any,
      };
      expect(() => validateDefectFields(invalidDefect)).toThrow('Unknown bike model');
    });

    it('should reject defect with empty symptom', () => {
      const invalidDefect: ManufacturingDefect = {
        ...EXAMPLE_DEFECT,
        symptom: '',
      };
      expect(() => validateDefectFields(invalidDefect)).toThrow('Symptom is required');
    });

    it('should reject defect without root cause', () => {
      const invalidDefect: ManufacturingDefect = {
        ...EXAMPLE_DEFECT,
        rootCause: { designFlaw: '', frequency: 'Rare' },
      };
      expect(() => validateDefectFields(invalidDefect)).toThrow('Root cause');
    });

    it('should reject defect without video reference', () => {
      const invalidDefect: ManufacturingDefect = {
        ...EXAMPLE_DEFECT,
        videoReference: { channelName: '', videoUrl: '', date: '', authority: 'Verified' },
      };
      expect(() => validateDefectFields(invalidDefect)).toThrow('Video reference');
    });

    it('all defects in registry should pass validation', () => {
      Object.values(MANUFACTURING_DEFECTS_REGISTRY).forEach(defects => {
        defects.forEach(defect => {
          expect(() => validateDefectFields(defect)).not.toThrow();
        });
      });
    });
  });

  /**
   * TEST SUITE 3: Query Functions
   */
  describe('Query Functions', () => {
    
    it('findDefectsByBike should return 6 defects for RE650', () => {
      const re650Defects = findDefectsByBike(MANUFACTURING_DEFECTS_REGISTRY, 'RE650');
      expect(re650Defects).toHaveLength(6);
    });

    it('findDefectsByBike should return 3 defects for KTM390Adventure', () => {
      const ktmDefects = findDefectsByBike(MANUFACTURING_DEFECTS_REGISTRY, 'KTM390Adventure');
      expect(ktmDefects).toHaveLength(3);
    });

    it('findDefectsByBike should return 3 defects for Himalayan411', () => {
      const himalayaDefects = findDefectsByBike(MANUFACTURING_DEFECTS_REGISTRY, 'Himalayan411');
      expect(himalayaDefects).toHaveLength(3);
    });

    it('findDefectsBySymptom should find cluster failure by "flickering"', () => {
      const results = findDefectsBySymptom(MANUFACTURING_DEFECTS_REGISTRY, 'flickering');
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].id).toBe('DEFECT_RE650_CLUSTER_FAILURE');
    });

    it('findDefectsBySymptom should find throttle issue by "spongy"', () => {
      const results = findDefectsBySymptom(MANUFACTURING_DEFECTS_REGISTRY, 'spongy');
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].failureMode).toBe('Mechanical');
    });

    it('findWarrantyCoveredDefects should return only covered defects', () => {
      const covered = findWarrantyCoveredDefects(MANUFACTURING_DEFECTS_REGISTRY, 'RE650');
      expect(covered.length).toBeGreaterThan(0);
      covered.forEach(defect => {
        expect(['Covered', 'PartialCoverage']).toContain(defect.warrantyStatus);
      });
    });

    it('findDefectsByFailureMode should find all electrical defects', () => {
      const electrical = findDefectsByFailureMode(MANUFACTURING_DEFECTS_REGISTRY, 'Electrical');
      expect(electrical.length).toBeGreaterThan(0);
      electrical.forEach(defect => {
        expect(defect.failureMode).toBe('Electrical');
      });
    });

    it('findDeepAuthorityDefects should return only deep authority defects', () => {
      const deep = findDeepAuthorityDefects(MANUFACTURING_DEFECTS_REGISTRY);
      expect(deep.length).toBeGreaterThan(0);
      deep.forEach(defect => {
        expect(defect.authority).toBe('Deep');
      });
    });

    it('should have at least 6 deep authority defects (requirement)', () => {
      const deep = findDeepAuthorityDefects(MANUFACTURING_DEFECTS_REGISTRY);
      expect(deep.length).toBeGreaterThanOrEqual(6);
    });
  });

  /**
   * TEST SUITE 4: Diagnostic Decision Tree
   */
  describe('Diagnostic Decision Tree (diagnoseDefect)', () => {
    
    it('should diagnose cluster failure from "flickering gauges"', () => {
      const results = diagnoseDefect(MANUFACTURING_DEFECTS_REGISTRY, 'RE650', 'flickering gauges');
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].id).toBe('DEFECT_RE650_CLUSTER_FAILURE');
    });

    it('should diagnose cluster failure from "speedometer not working"', () => {
      const results = diagnoseDefect(MANUFACTURING_DEFECTS_REGISTRY, 'RE650', 'speedometer not working');
      expect(results.length).toBeGreaterThan(0);
      // Should rank cluster failure high
      const clusterFailure = results.find(d => d.id === 'DEFECT_RE650_CLUSTER_FAILURE');
      expect(clusterFailure).toBeTruthy();
    });

    it('should diagnose KTM ECU stalling recall', () => {
      const results = diagnoseDefect(MANUFACTURING_DEFECTS_REGISTRY, 'KTM390Adventure', 'stalls at traffic lights');
      expect(results.length).toBeGreaterThan(0);
      const ecuDefect = results.find(d => d.id.includes('ECU_STALLING'));
      expect(ecuDefect).toBeTruthy();
    });

    it('should return empty array for unknown bike model', () => {
      const results = diagnoseDefect(MANUFACTURING_DEFECTS_REGISTRY, 'UnknownBike' as any, 'symptoms');
      expect(results).toEqual([]);
    });

    it('should rank defects by symptom match strength', () => {
      const results = diagnoseDefect(MANUFACTURING_DEFECTS_REGISTRY, 'RE650', 'throttle feels spongy and sticks');
      expect(results.length).toBeGreaterThan(0);
      // First result should have highest match score
      expect(results[0].failureMode).toBe('Mechanical');
    });
  });

  /**
   * TEST SUITE 5: Data Completeness
   */
  describe('Data Completeness', () => {
    
    it('all defects should have unique IDs', () => {
      const allDefects = Object.values(MANUFACTURING_DEFECTS_REGISTRY).flat();
      const ids = allDefects.map(d => d.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('all defects should have at least one durability mod', () => {
      const allDefects = Object.values(MANUFACTURING_DEFECTS_REGISTRY).flat();
      allDefects.forEach(defect => {
        expect(defect.durabilityMods.length).toBeGreaterThan(0);
      });
    });

    it('all durability mods should have cost information', () => {
      const allDefects = Object.values(MANUFACTURING_DEFECTS_REGISTRY).flat();
      allDefects.forEach(defect => {
        defect.durabilityMods.forEach(mod => {
          expect(mod.cost).toBeTruthy();
          expect(mod.cost.min).toBeGreaterThanOrEqual(0);
          expect(mod.cost.max).toBeGreaterThanOrEqual(mod.cost.min);
          expect(mod.cost.currency).toBe('INR');
        });
      });
    });

    it('all defects should have warranty status', () => {
      const allDefects = Object.values(MANUFACTURING_DEFECTS_REGISTRY).flat();
      const validStatus = ['Covered', 'PartialCoverage', 'NotCovered', 'CaseByCase'];
      allDefects.forEach(defect => {
        expect(validStatus).toContain(defect.warrantyStatus);
      });
    });

    it('all defects should have video reference with authority level', () => {
      const allDefects = Object.values(MANUFACTURING_DEFECTS_REGISTRY).flat();
      allDefects.forEach(defect => {
        expect(defect.videoReference.videoUrl).toBeTruthy();
        expect(['Deep', 'Verified', 'Pending']).toContain(defect.videoReference.authority);
      });
    });

    it('all defects should have authority level', () => {
      const allDefects = Object.values(MANUFACTURING_DEFECTS_REGISTRY).flat();
      allDefects.forEach(defect => {
        expect(['Deep', 'Verified', 'Pending']).toContain(defect.authority);
      });
    });
  });

  /**
   * TEST SUITE 6: Registry Metadata
   */
  describe('Registry Metadata', () => {
    
    it('registry should have correct total defect count', () => {
      expect(REGISTRY_METADATA.totalDefects).toBe(12);
    });

    it('registry should cover 3 bikes', () => {
      expect(REGISTRY_METADATA.bikesCount).toBe(3);
      expect(REGISTRY_METADATA.bikes).toHaveLength(3);
    });

    it('authority breakdown should total to 12', () => {
      const total = REGISTRY_METADATA.authorityBreakdown.deep +
                    REGISTRY_METADATA.authorityBreakdown.verified +
                    REGISTRY_METADATA.authorityBreakdown.pending;
      expect(total).toBe(12);
    });

    it('deep authority defects should be at least 50%', () => {
      const deepPercentage = (REGISTRY_METADATA.authorityBreakdown.deep / REGISTRY_METADATA.totalDefects) * 100;
      expect(deepPercentage).toBeGreaterThanOrEqual(50);
    });
  });

  /**
   * TEST SUITE 7: Critical Safety Issues
   */
  describe('Critical Safety Issues', () => {
    
    it('should have NHTSA Recall 25V825 (ECU stalling) for KTM 390', () => {
      const ktmDefects = findDefectsByBike(MANUFACTURING_DEFECTS_REGISTRY, 'KTM390Adventure');
      const recallDefect = ktmDefects.find(d => d.id.includes('RECALL25V825'));
      expect(recallDefect).toBeTruthy();
      expect(recallDefect?.warrantyStatus).toBe('Covered');
      expect(recallDefect?.authority).toBe('Deep');
    });

    it('recall defect should have free fix', () => {
      const ktmDefects = findDefectsByBike(MANUFACTURING_DEFECTS_REGISTRY, 'KTM390Adventure');
      const recallDefect = ktmDefects.find(d => d.id.includes('RECALL25V825'));
      const freeFix = recallDefect?.durabilityMods.find(m => m.cost.min === 0 && m.cost.max === 0);
      expect(freeFix).toBeTruthy();
      expect(freeFix?.permanentFix).toBe(true);
    });
  });

  /**
   * TEST SUITE 8: Integration Readiness
   */
  describe('Integration Readiness for Phase 3C', () => {
    
    it('all defects should be marked as integrated into Mansi', () => {
      const allDefects = Object.values(MANUFACTURING_DEFECTS_REGISTRY).flat();
      allDefects.forEach(defect => {
        expect(defect.integratedIntoMansi).toBe(true);
      });
    });

    it('all defects should have discovery date', () => {
      const allDefects = Object.values(MANUFACTURING_DEFECTS_REGISTRY).flat();
      allDefects.forEach(defect => {
        expect(defect.discoveryDate).toBeTruthy();
      });
    });

    it('registry should be readonly (immutable)', () => {
      expect(Object.isFrozen(MANUFACTURING_DEFECTS_REGISTRY)).toBe(true);
    });
  });
});

/**
 * INTEGRATION TEST: Simulate User Query
 */
describe('User Query Simulation', () => {
  
  it('user reports flickering gauges on RE 650', () => {
    const diagnosis = diagnoseDefect(MANUFACTURING_DEFECTS_REGISTRY, 'RE650', 'flickering gauges');
    expect(diagnosis.length).toBeGreaterThan(0);
    
    const topMatch = diagnosis[0];
    expect(topMatch.id).toBe('DEFECT_RE650_CLUSTER_FAILURE');
    expect(topMatch.warrantyStatus).toBe('Covered');
    expect(topMatch.durabilityMods.length).toBeGreaterThan(0);
  });

  it('user reports bike stalling on KTM 390 Adventure', () => {
    const diagnosis = diagnoseDefect(MANUFACTURING_DEFECTS_REGISTRY, 'KTM390Adventure', 'bike stalls at lights');
    expect(diagnosis.length).toBeGreaterThan(0);
    
    const topMatch = diagnosis[0];
    expect(topMatch.authority).toBe('Deep');
    expect(topMatch.warrantyStatus).toBe('Covered');
  });

  it('user reports engine overheating on Himalayan 411', () => {
    const diagnosis = diagnoseDefect(MANUFACTURING_DEFECTS_REGISTRY, 'Himalayan411', 'engine too hot');
    expect(diagnosis.length).toBeGreaterThan(0);
    
    // Should find heat/design characteristic issue
    const heatDefect = diagnosis.find(d => d.failureMode === 'Design Characteristic');
    expect(heatDefect).toBeTruthy();
  });
});
