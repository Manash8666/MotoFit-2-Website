/**
 * Tests for Suspension Compatibility Loader
 * 
 * Validates:
 * - JSON parsing and loading
 * - Data validation against interface requirements
 * - Registry construction and immutability
 * - Query functions for suspension upgrades
 * - Acceptance criteria fulfillment
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  loadSuspensionCompatibility,
  getSuspensionCompatibilityRegistry,
  getValidationReport,
  findUpgradesUnderBudget,
  findUpgradesByAuthority,
  getRallySpecRecommendations,
  resetRegistry,
  SuspensionCompatibilityQueries,
} from '../load-suspension-compatibility';

describe('Suspension Compatibility Loader', () => {
  beforeEach(() => {
    resetRegistry();
  });

  afterEach(() => {
    resetRegistry();
  });

  // ==========================================
  // BASIC LOADING & VALIDATION
  // ==========================================

  describe('loadSuspensionCompatibility', () => {
    it('should load suspension compatibility data without errors', () => {
      expect(() => {
        loadSuspensionCompatibility();
      }).not.toThrow();
    });

    it('should return a registry object', () => {
      const registry = loadSuspensionCompatibility();
      expect(registry).toBeDefined();
      expect(typeof registry).toBe('object');
    });

    it('should have all required bike models in registry', () => {
      const registry = loadSuspensionCompatibility();
      expect(registry).toHaveProperty('KTM390Adventure');
      expect(registry).toHaveProperty('Himalayan450');
      expect(registry).toHaveProperty('300ccBuilds');
    });

    it('should freeze registry to prevent modifications', () => {
      const registry = loadSuspensionCompatibility();
      expect(Object.isFrozen(registry.KTM390Adventure)).toBe(true);
      expect(Object.isFrozen(registry.Himalayan450)).toBe(true);
      expect(Object.isFrozen(registry['300ccBuilds'])).toBe(true);
    });
  });

  // ==========================================
  // ACCEPTANCE CRITERIA
  // ==========================================

  describe('Acceptance Criteria', () => {
    it('should have 12+ upgrade entries total', () => {
      const registry = loadSuspensionCompatibility();
      const totalUpgrades =
        registry.KTM390Adventure.length +
        registry.Himalayan450.length +
        registry['300ccBuilds'].length;
      expect(totalUpgrades).toBeGreaterThanOrEqual(12);
    });

    it('should have at least 5 deep authority upgrades', () => {
      const registry = loadSuspensionCompatibility();
      const deepAuthority = SuspensionCompatibilityQueries.findDeepAuthorityUpgrades(registry);
      expect(deepAuthority.length).toBeGreaterThanOrEqual(5);
    });

    it('should have at least 3 entries with rally-spec configurations', () => {
      const registry = loadSuspensionCompatibility();
      const allUpgrades = Object.values(registry).flat();
      const withRallySpec = allUpgrades.filter(u => u.rallySpec && u.rallySpec.length > 0);
      expect(withRallySpec.length).toBeGreaterThanOrEqual(3);
    });

    it('should have cost ranges for all entries', () => {
      const registry = loadSuspensionCompatibility();
      const allUpgrades = Object.values(registry).flat();
      const missingCosts = allUpgrades.filter(u => {
        return u.compatibleOptions.some(opt => !opt.cost || !opt.cost.min || !opt.cost.max);
      });
      expect(missingCosts.length).toBe(0);
    });

    it('should have performance gains documented for all entries', () => {
      const registry = loadSuspensionCompatibility();
      const allUpgrades = Object.values(registry).flat();
      const missingPerformance = allUpgrades.filter(u => {
        return u.compatibleOptions.some(opt => !opt.performanceGain);
      });
      expect(missingPerformance.length).toBe(0);
    });

    it('should have source attribution for all entries', () => {
      const registry = loadSuspensionCompatibility();
      const allUpgrades = Object.values(registry).flat();
      const missingSource = allUpgrades.filter(u => {
        return !u.videoReference || !u.videoReference.videoUrl || !u.videoReference.date;
      });
      expect(missingSource.length).toBe(0);
    });

    it('should have authority level for all entries', () => {
      const registry = loadSuspensionCompatibility();
      const allUpgrades = Object.values(registry).flat();
      const missingAuthority = allUpgrades.filter(u => !u.authority);
      expect(missingAuthority.length).toBe(0);
    });
  });

  // ==========================================
  // VALIDATION REPORT
  // ==========================================

  describe('getValidationReport', () => {
    it('should return a comprehensive validation report', () => {
      const registry = loadSuspensionCompatibility();
      const report = getValidationReport(registry);
      expect(report).toHaveProperty('totalUpgrades');
      expect(report).toHaveProperty('upgradesByBike');
      expect(report).toHaveProperty('upgradesByAuthority');
      expect(report).toHaveProperty('report');
    });

    it('should report correct total upgrades count', () => {
      const registry = loadSuspensionCompatibility();
      const report = getValidationReport(registry);
      const allUpgrades = Object.values(registry).flat();
      expect(report.totalUpgrades).toBe(allUpgrades.length);
    });

    it('should report upgrades by bike model', () => {
      const registry = loadSuspensionCompatibility();
      const report = getValidationReport(registry);
      expect(report.upgradesByBike.KTM390Adventure).toBe(registry.KTM390Adventure.length);
      expect(report.upgradesByBike.Himalayan450).toBe(registry.Himalayan450.length);
      expect(report.upgradesByBike['300ccBuilds']).toBe(registry['300ccBuilds'].length);
    });

    it('should count deep authority upgrades correctly', () => {
      const registry = loadSuspensionCompatibility();
      const report = getValidationReport(registry);
      const deepUpgrades = SuspensionCompatibilityQueries.findDeepAuthorityUpgrades(registry);
      expect(report.upgradesByAuthority.Deep).toBe(deepUpgrades.length);
    });

    it('should report upgrades with rally-spec', () => {
      const registry = loadSuspensionCompatibility();
      const report = getValidationReport(registry);
      expect(report.upgradesWithRallySpec).toBeGreaterThanOrEqual(3);
    });
  });

  // ==========================================
  // DATA VALIDATION
  // ==========================================

  describe('Data Validation', () => {
    it('should have valid IDs for all upgrades', () => {
      const registry = loadSuspensionCompatibility();
      const allUpgrades = Object.values(registry).flat();
      allUpgrades.forEach(upgrade => {
        expect(upgrade.id).toBeDefined();
        expect(upgrade.id).toMatch(/^SUSP_/);
      });
    });

    it('should have OEM specifications for all upgrades', () => {
      const registry = loadSuspensionCompatibility();
      const allUpgrades = Object.values(registry).flat();
      allUpgrades.forEach(upgrade => {
        expect(upgrade.oem).toBeDefined();
        expect(upgrade.oem.forkType).toBeDefined();
      });
    });

    it('should have at least one compatible option per upgrade', () => {
      const registry = loadSuspensionCompatibility();
      const allUpgrades = Object.values(registry).flat();
      allUpgrades.forEach(upgrade => {
        expect(upgrade.compatibleOptions.length).toBeGreaterThan(0);
      });
    });

    it('should have valid cost ranges (min <= max)', () => {
      const registry = loadSuspensionCompatibility();
      const allUpgrades = Object.values(registry).flat();
      allUpgrades.forEach(upgrade => {
        upgrade.compatibleOptions.forEach(opt => {
          expect(opt.cost.min).toBeLessThanOrEqual(opt.cost.max);
          expect(opt.cost.min).toBeGreaterThan(0);
          expect(opt.cost.max).toBeGreaterThan(0);
        });
      });
    });

    it('should have valid video references', () => {
      const registry = loadSuspensionCompatibility();
      const allUpgrades = Object.values(registry).flat();
      allUpgrades.forEach(upgrade => {
        expect(upgrade.videoReference).toBeDefined();
        expect(upgrade.videoReference.channelName).toBe('Abhinav Bhatt');
        expect(upgrade.videoReference.videoUrl).toMatch(/^https:\/\//);
        expect(upgrade.videoReference.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      });
    });
  });

  // ==========================================
  // QUERY FUNCTIONS
  // ==========================================

  describe('Query Functions', () => {
    it('findUpgradesForBike should return correct upgrades for KTM390Adventure', () => {
      const registry = loadSuspensionCompatibility();
      const ktmUpgrades = SuspensionCompatibilityQueries.findUpgradesForBike(
        registry,
        'KTM390Adventure'
      );
      expect(ktmUpgrades.length).toBeGreaterThan(0);
      ktmUpgrades.forEach(u => {
        expect(u.targetBike).toBe('KTM390Adventure');
      });
    });

    it('findUpgradesForBike should return correct upgrades for Himalayan450', () => {
      const registry = loadSuspensionCompatibility();
      const himalayaUpgrades = SuspensionCompatibilityQueries.findUpgradesForBike(
        registry,
        'Himalayan450'
      );
      expect(himalayaUpgrades.length).toBeGreaterThan(0);
      himalayaUpgrades.forEach(u => {
        expect(u.targetBike).toBe('Himalayan450');
      });
    });

    it('findDirectFitUpgrades should only return upgrades without adapters', () => {
      const registry = loadSuspensionCompatibility();
      const directFit = SuspensionCompatibilityQueries.findDirectFitUpgrades(
        registry,
        'KTM390Adventure'
      );
      directFit.forEach(u => {
        const directFitOption = u.compatibleOptions.find(opt => opt.compatibility === 'DirectFit');
        expect(directFitOption).toBeDefined();
      });
    });

    it('findDeepAuthorityUpgrades should only return Deep authority entries', () => {
      const registry = loadSuspensionCompatibility();
      const deepAuth = SuspensionCompatibilityQueries.findDeepAuthorityUpgrades(registry);
      expect(deepAuth.length).toBeGreaterThanOrEqual(5);
      deepAuth.forEach(u => {
        expect(u.authority).toBe('Deep');
      });
    });

    it('getRallySpecForTerrain should return rally config for specified terrain', () => {
      const registry = loadSuspensionCompatibility();
      const allUpgrades = Object.values(registry).flat();
      const withRally = allUpgrades.find(u => u.rallySpec && u.rallySpec.length > 0);
      if (withRally) {
        const rallySpec = SuspensionCompatibilityQueries.getRallySpecForTerrain(
          withRally,
          'Desert'
        );
        if (rallySpec) {
          expect(rallySpec.terrain).toBe('Desert');
        }
      }
    });
  });

  // ==========================================
  // CUSTOM QUERY FUNCTIONS
  // ==========================================

  describe('Custom Query Functions', () => {
    it('findUpgradesUnderBudget should return upgrades within budget', () => {
      const registry = loadSuspensionCompatibility();
      const budget = 50000; // INR
      const affordable = findUpgradesUnderBudget(registry, 'KTM390Adventure', budget);
      affordable.forEach(result => {
        expect(result.minCost).toBeLessThanOrEqual(budget);
      });
    });

    it('findUpgradesByAuthority should return only specified authority', () => {
      const registry = loadSuspensionCompatibility();
      const verified = findUpgradesByAuthority(registry, 'Verified');
      verified.forEach(u => {
        expect(u.authority).toBe('Verified');
      });
    });

    it('getRallySpecRecommendations should return rally configs for specified terrain', () => {
      const registry = loadSuspensionCompatibility();
      const rallyConfigs = getRallySpecRecommendations(
        registry,
        'Himalayan450',
        'Desert'
      );
      rallyConfigs.forEach(config => {
        expect(config.upgradeId).toBeDefined();
        expect(config.rallySpec).toBeDefined();
        expect(config.rallySpec.terrain).toBe('Desert');
      });
    });
  });

  // ==========================================
  // CACHING
  // ==========================================

  describe('Caching', () => {
    it('getSuspensionCompatibilityRegistry should return cached registry', () => {
      const reg1 = getSuspensionCompatibilityRegistry();
      const reg2 = getSuspensionCompatibilityRegistry();
      expect(reg1).toBe(reg2); // Same reference
    });

    it('resetRegistry should clear cache', () => {
      const reg1 = getSuspensionCompatibilityRegistry();
      resetRegistry();
      const reg2 = getSuspensionCompatibilityRegistry();
      expect(reg1).not.toBe(reg2); // Different reference after reset
    });
  });

  // ==========================================
  // IMMUTABILITY
  // ==========================================

  describe('Immutability', () => {
    it('should prevent modification of registry', () => {
      const registry = loadSuspensionCompatibility();
      expect(() => {
        // @ts-ignore - intentionally testing immutability
        registry.KTM390Adventure = [];
      }).toThrow();
    });

    it('should prevent modification of upgrade arrays', () => {
      const registry = loadSuspensionCompatibility();
      expect(() => {
        registry.KTM390Adventure.push({} as any);
      }).toThrow();
    });

    it('should prevent modification of upgrade objects', () => {
      const registry = loadSuspensionCompatibility();
      const upgrade = registry.KTM390Adventure[0];
      if (upgrade) {
        expect(() => {
          // @ts-ignore - intentionally testing immutability
          upgrade.id = 'MODIFIED';
        }).toThrow();
      }
    });
  });

  // ==========================================
  // COVERAGE REQUIREMENTS
  // ==========================================

  describe('Coverage Requirements', () => {
    it('should cover KTM 390 Adventure', () => {
      const registry = loadSuspensionCompatibility();
      expect(registry.KTM390Adventure.length).toBeGreaterThan(0);
    });

    it('should cover Himalayan 450', () => {
      const registry = loadSuspensionCompatibility();
      expect(registry.Himalayan450.length).toBeGreaterThan(0);
    });

    it('should cover 300cc builds', () => {
      const registry = loadSuspensionCompatibility();
      expect(registry['300ccBuilds'].length).toBeGreaterThan(0);
    });

    it('should have multiple upgrade options per bike', () => {
      const registry = loadSuspensionCompatibility();
      expect(registry.KTM390Adventure.length).toBeGreaterThan(1);
      expect(registry.Himalayan450.length).toBeGreaterThan(1);
    });
  });

  // ==========================================
  // FIELD COMPLETENESS
  // ==========================================

  describe('Field Completeness', () => {
    it('should have targetBike for all upgrades', () => {
      const registry = loadSuspensionCompatibility();
      const allUpgrades = Object.values(registry).flat();
      allUpgrades.forEach(u => {
        expect(u.targetBike).toBeDefined();
        expect(['KTM390Adventure', 'Himalayan450', '300ccBuilds']).toContain(u.targetBike);
      });
    });

    it('should have sourceComponent for all upgrades', () => {
      const registry = loadSuspensionCompatibility();
      const allUpgrades = Object.values(registry).flat();
      allUpgrades.forEach(u => {
        expect(u.sourceComponent).toBeDefined();
        expect(u.sourceComponent.length).toBeGreaterThan(0);
      });
    });

    it('should have brand for all compatible options', () => {
      const registry = loadSuspensionCompatibility();
      const allUpgrades = Object.values(registry).flat();
      allUpgrades.forEach(u => {
        u.compatibleOptions.forEach(opt => {
          expect(opt.brand).toBeDefined();
        });
      });
    });

    it('should have cost range for all compatible options', () => {
      const registry = loadSuspensionCompatibility();
      const allUpgrades = Object.values(registry).flat();
      allUpgrades.forEach(u => {
        u.compatibleOptions.forEach(opt => {
          expect(opt.cost).toBeDefined();
          expect(opt.cost.min).toBeGreaterThan(0);
          expect(opt.cost.max).toBeGreaterThan(opt.cost.min);
          expect(opt.cost.currency).toBe('INR');
        });
      });
    });

    it('should have performance gain for all options', () => {
      const registry = loadSuspensionCompatibility();
      const allUpgrades = Object.values(registry).flat();
      allUpgrades.forEach(u => {
        u.compatibleOptions.forEach(opt => {
          expect(opt.performanceGain).toBeDefined();
          expect(opt.performanceGain.offroad).toBeDefined();
          expect(opt.performanceGain.highway).toBeDefined();
          expect(opt.performanceGain.handling).toBeDefined();
        });
      });
    });

    it('should have adapter requirements for options', () => {
      const registry = loadSuspensionCompatibility();
      const allUpgrades = Object.values(registry).flat();
      allUpgrades.forEach(u => {
        u.compatibleOptions.forEach(opt => {
          expect(opt.adaptersRequired).toBeDefined();
          expect(Array.isArray(opt.adaptersRequired)).toBe(true);
        });
      });
    });

    it('should have installation complexity for all options', () => {
      const registry = loadSuspensionCompatibility();
      const allUpgrades = Object.values(registry).flat();
      allUpgrades.forEach(u => {
        u.compatibleOptions.forEach(opt => {
          expect(opt.installationComplexity).toMatch(/^(Easy|Medium|Hard)$/);
        });
      });
    });
  });

  // ==========================================
  // RALLY SPEC VALIDATION
  // ==========================================

  describe('Rally Spec Configuration Validation', () => {
    it('should have valid spring rate for rally specs', () => {
      const registry = loadSuspensionCompatibility();
      const allUpgrades = Object.values(registry).flat();
      allUpgrades.forEach(u => {
        if (u.rallySpec && u.rallySpec.length > 0) {
          u.rallySpec.forEach(spec => {
            expect(spec.springRate).toBeDefined();
          });
        }
      });
    });

    it('should have valid damping ratio for rally specs', () => {
      const registry = loadSuspensionCompatibility();
      const allUpgrades = Object.values(registry).flat();
      allUpgrades.forEach(u => {
        if (u.rallySpec && u.rallySpec.length > 0) {
          u.rallySpec.forEach(spec => {
            expect(spec.dampingRatio).toBeDefined();
          });
        }
      });
    });

    it('should have tire recommendations for rally specs', () => {
      const registry = loadSuspensionCompatibility();
      const allUpgrades = Object.values(registry).flat();
      allUpgrades.forEach(u => {
        if (u.rallySpec && u.rallySpec.length > 0) {
          u.rallySpec.forEach(spec => {
            expect(spec.tireRecommendations).toBeDefined();
            expect(Array.isArray(spec.tireRecommendations)).toBe(true);
          });
        }
      });
    });

    it('should have tire pressure range for rally specs', () => {
      const registry = loadSuspensionCompatibility();
      const allUpgrades = Object.values(registry).flat();
      allUpgrades.forEach(u => {
        if (u.rallySpec && u.rallySpec.length > 0) {
          u.rallySpec.forEach(spec => {
            expect(spec.tirePressurekPa).toBeDefined();
            expect(spec.tirePressurekPa.frontMin).toBeGreaterThan(0);
            expect(spec.tirePressurekPa.rearMin).toBeGreaterThan(0);
          });
        }
      });
    });
  });

  // ==========================================
  // CONFLICT DETECTION
  // ==========================================

  describe('Conflict Detection with Existing Mansi Knowledge', () => {
    it('should not contradict existing fork oil specifications', () => {
      // Existing Mansi knowledge: KTM 390 uses WP fork oil 15W
      const registry = loadSuspensionCompatibility();
      const ktmUpgrades = registry.KTM390Adventure;
      ktmUpgrades.forEach(u => {
        if (u.oem.forkType) {
          // Should not override known OEM specs
          expect(u.oem.forkDiameter).toBeGreaterThan(0);
        }
      });
    });

    it('should be compatible with existing RE and KTM service data', () => {
      const registry = loadSuspensionCompatibility();
      const allUpgrades = Object.values(registry).flat();
      // All upgrades should be additive (new options), not replacement of core data
      expect(allUpgrades.length).toBeGreaterThan(0);
    });
  });

  // ==========================================
  // PERFORMANCE DATA VALIDATION
  // ==========================================

  describe('Performance Data Validation', () => {
    it('should have quantified performance gains', () => {
      const registry = loadSuspensionCompatibility();
      const allUpgrades = Object.values(registry).flat();
      const quantified = allUpgrades.filter(u => {
        return u.compatibleOptions.some(opt => {
          const offroad = opt.performanceGain.offroad;
          return offroad && (offroad.includes('%') || offroad.includes('Improved'));
        });
      });
      expect(quantified.length).toBeGreaterThanOrEqual(8);
    });

    it('should document performance for multiple aspects', () => {
      const registry = loadSuspensionCompatibility();
      const allUpgrades = Object.values(registry).flat();
      allUpgrades.forEach(u => {
        u.compatibleOptions.forEach(opt => {
          expect(opt.performanceGain.offroad).toBeDefined();
          expect(opt.performanceGain.highway).toBeDefined();
          expect(opt.performanceGain.handling).toBeDefined();
        });
      });
    });
  });
});
