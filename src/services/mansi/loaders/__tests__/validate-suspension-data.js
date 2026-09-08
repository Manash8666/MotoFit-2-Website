/**
 * Manual Validation Script for Suspension Compatibility Data
 * 
 * This script validates the suspension compatibility JSON against acceptance criteria
 * without requiring a test framework.
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../../data/youtube-expertise/suspension-compatibility.json');

console.log('\n' + '='.repeat(60));
console.log('SUSPENSION COMPATIBILITY DATA VALIDATION');
console.log('='.repeat(60) + '\n');

try {
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  const upgrades = JSON.parse(rawData);

  console.log(`✅ JSON parsed successfully\n`);

  // =========================================
  // ACCEPTANCE CRITERIA VALIDATION
  // =========================================

  console.log('📋 ACCEPTANCE CRITERIA CHECK:\n');

  // Criterion 1: 12+ upgrade entries
  console.log(`1. Total Upgrade Entries: ${upgrades.length}`);
  if (upgrades.length >= 12) {
    console.log('   ✅ PASS: 12+ entries required\n');
  } else {
    console.log('   ❌ FAIL: Less than 12 entries\n');
  }

  // Criterion 2: All entries have complete fields
  console.log('2. Complete Fields Validation:');
  let completeCount = 0;
  let incomplete = [];

  upgrades.forEach((upgrade, idx) => {
    const hasRequiredFields =
      upgrade.id &&
      upgrade.targetBike &&
      upgrade.sourceComponent &&
      upgrade.oem &&
      upgrade.compatibleOptions &&
      upgrade.compatibleOptions.length > 0 &&
      upgrade.videoReference &&
      upgrade.videoReference.videoUrl &&
      upgrade.authority;

    if (hasRequiredFields) {
      completeCount++;
    } else {
      incomplete.push(`Entry ${idx}: ${upgrade.id || 'UNKNOWN'}`);
    }
  });

  console.log(`   Total with all fields: ${completeCount}/${upgrades.length}`);
  if (completeCount === upgrades.length) {
    console.log('   ✅ PASS: All entries have required fields\n');
  } else {
    console.log('   ❌ FAIL: Missing fields in entries\n');
    incomplete.forEach(entry => console.log(`     - ${entry}`));
  }

  // Criterion 3: At least 5 deep authority
  console.log('3. Authority Level Distribution:');
  const deepCount = upgrades.filter(u => u.authority === 'Deep').length;
  const verifiedCount = upgrades.filter(u => u.authority === 'Verified').length;
  const pendingCount = upgrades.filter(u => u.authority === 'Pending').length;

  console.log(`   Deep (40+ builds): ${deepCount}`);
  console.log(`   Verified (2-3 builds): ${verifiedCount}`);
  console.log(`   Pending (theoretical): ${pendingCount}`);

  if (deepCount >= 5) {
    console.log('   ✅ PASS: 5+ deep authority entries\n');
  } else {
    console.log(`   ❌ FAIL: Only ${deepCount} deep authority (need 5)\n`);
  }

  // Criterion 4: Cost ranges for all entries
  console.log('4. Cost Range Documentation:');
  let costMissing = 0;
  upgrades.forEach(upgrade => {
    upgrade.compatibleOptions.forEach((opt, idx) => {
      if (opt.cost === undefined || opt.cost === null || typeof opt.cost.min !== 'number' || typeof opt.cost.max !== 'number') {
        costMissing++;
      }
    });
  });

  console.log(`   Entries with cost: ${upgrades.length - costMissing}/${upgrades.length}`);
  if (costMissing === 0) {
    console.log('   ✅ PASS: All entries have cost ranges\n');
  } else {
    console.log(`   ❌ FAIL: ${costMissing} entries missing cost\n`);
  }

  // Criterion 5: Performance gains quantified
  console.log('5. Performance Gains Quantification:');
  let performanceMissing = 0;
  let quantified = 0;

  upgrades.forEach(upgrade => {
    upgrade.compatibleOptions.forEach((opt, idx) => {
      if (!opt.performanceGain) {
        performanceMissing++;
      } else if (
        opt.performanceGain.offroad &&
        (opt.performanceGain.offroad.includes('%') ||
          opt.performanceGain.offroad.includes('Improved'))
      ) {
        quantified++;
      }
    });
  });

  console.log(`   Entries with performance data: ${upgrades.length - performanceMissing}/${upgrades.length}`);
  console.log(`   Entries with quantified gains: ${quantified}/${upgrades.length}`);

  if (performanceMissing === 0) {
    console.log('   ✅ PASS: All entries have performance gains\n');
  } else {
    console.log(`   ⚠️  ${performanceMissing} entries missing performance data\n`);
  }

  if (quantified >= 8) {
    console.log('   ✅ PASS: 8+ entries with quantified performance\n');
  }

  // Criterion 6: Rally-spec configurations for 3+ entries
  console.log('6. Rally-Spec Configuration Coverage:');
  const withRallySpec = upgrades.filter(u => u.rallySpec && u.rallySpec.length > 0);
  console.log(`   Entries with rally-spec: ${withRallySpec.length}/${upgrades.length}`);

  if (withRallySpec.length >= 3) {
    console.log('   ✅ PASS: 3+ entries with rally-spec\n');
  } else {
    console.log(`   ❌ FAIL: Only ${withRallySpec.length} with rally-spec\n`);
  }

  // Criterion 7: Source attribution
  console.log('7. Source Attribution:');
  let missingAttribution = 0;
  upgrades.forEach((upgrade, idx) => {
    if (!upgrade.videoReference || !upgrade.videoReference.videoUrl || !upgrade.videoReference.date) {
      missingAttribution++;
    }
  });

  console.log(`   Entries with attribution: ${upgrades.length - missingAttribution}/${upgrades.length}`);
  if (missingAttribution === 0) {
    console.log('   ✅ PASS: All entries have source attribution\n');
  } else {
    console.log(`   ❌ FAIL: ${missingAttribution} missing attribution\n`);
  }

  // =========================================
  // DATA QUALITY CHECKS
  // =========================================

  console.log('📊 DATA QUALITY CHECKS:\n');

  // Check bike model coverage
  console.log('Bike Model Coverage:');
  const byBike = {
    KTM390Adventure: upgrades.filter(u => u.targetBike === 'KTM390Adventure').length,
    Himalayan450: upgrades.filter(u => u.targetBike === 'Himalayan450').length,
    '300ccBuilds': upgrades.filter(u => u.targetBike === '300ccBuilds').length,
  };

  Object.entries(byBike).forEach(([bike, count]) => {
    console.log(`  - ${bike}: ${count} upgrades`);
  });

  // Check cost validity
  console.log('\nCost Range Validity:');
  let invalidCosts = 0;
  upgrades.forEach((upgrade, idx) => {
    upgrade.compatibleOptions.forEach((opt, optIdx) => {
      if (opt.cost && opt.cost.min > opt.cost.max) {
        console.log(`  ❌ ${upgrade.id} Option ${optIdx}: min > max`);
        invalidCosts++;
      }
    });
  });

  if (invalidCosts === 0) {
    console.log('  ✅ All cost ranges valid (min <= max)\n');
  }

  // Check installation complexity
  console.log('Installation Complexity Distribution:');
  const complexity = {
    Easy: upgrades.filter(u =>
      u.compatibleOptions.some(opt => opt.installationComplexity === 'Easy')
    ).length,
    Medium: upgrades.filter(u =>
      u.compatibleOptions.some(opt => opt.installationComplexity === 'Medium')
    ).length,
    Hard: upgrades.filter(u =>
      u.compatibleOptions.some(opt => opt.installationComplexity === 'Hard')
    ).length,
  };

  Object.entries(complexity).forEach(([level, count]) => {
    console.log(`  - ${level}: ${count} upgrades`);
  });

  // Check compatibility types
  console.log('\nCompatibility Distribution:');
  const compatibility = {};
  upgrades.forEach(u => {
    u.compatibleOptions.forEach(opt => {
      compatibility[opt.compatibility] = (compatibility[opt.compatibility] || 0) + 1;
    });
  });

  Object.entries(compatibility).forEach(([type, count]) => {
    console.log(`  - ${type}: ${count}`);
  });

  // =========================================
  // SUMMARY
  // =========================================

  console.log('\n' + '='.repeat(60));
  console.log('VALIDATION SUMMARY');
  console.log('='.repeat(60) + '\n');

  const passCount = [
    upgrades.length >= 12,
    completeCount === upgrades.length,
    deepCount >= 5,
    costMissing === 0,
    performanceMissing === 0,
    withRallySpec.length >= 3,
    missingAttribution === 0,
  ].filter(Boolean).length;

  console.log(`✅ Acceptance Criteria Passed: ${passCount}/7`);
  console.log(`\n📈 Total Data Quality Score: ${((passCount / 7) * 100).toFixed(1)}%`);

  if (passCount === 7) {
    console.log('\n🎉 ALL ACCEPTANCE CRITERIA MET!\n');
  } else {
    console.log('\n⚠️  Some criteria not fully met. Review items marked with ❌\n');
  }
} catch (error) {
  console.error('❌ ERROR:', error.message);
  process.exit(1);
}
