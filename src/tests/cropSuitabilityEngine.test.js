// Automated unit tests for Crop Suitability Engine

import { CropSuitabilityEngine } from '../services/cropSuitabilityEngine.js';
import { CROPS_DATABASE } from '../data/cropDatabase.js';

export function runSuitabilityEngineTests() {
  console.log('--- Running Crop Suitability Engine Unit Tests ---');
  let passed = 0;
  let total = 0;

  function assert(condition, message) {
    total++;
    if (condition) {
      console.log(`✓ PASS: ${message}`);
      passed++;
    } else {
      console.error(`✕ FAIL: ${message}`);
    }
  }

  // Test 1: Evaluate returns all 10 crops sorted descending
  const sampleInputs1 = {
    nitrogen: 100,
    phosphorus: 40,
    potassium: 160,
    ph: 6.5,
    moisture: 35,
    organicMatter: 3.5,
    soilType: 'Loamy'
  };

  const results1 = CropSuitabilityEngine.evaluate(sampleInputs1);
  assert(results1.length === 10, 'Engine evaluates all 10 database crops');
  
  const isSorted = results1.every((item, idx) => {
    if (idx === 0) return true;
    return results1[idx - 1].suitabilityScore >= item.suitabilityScore;
  });
  assert(isSorted, 'Results are sorted in descending order by suitability score');

  // Test 2: Top 3 crop selection
  const top3 = results1.slice(0, 3);
  assert(top3.length === 3, 'Top 3 crops correctly selected');
  assert(top3[0].suitabilityScore >= 80, 'Top recommended crop scores in Highly Suitable range');

  // Test 3: pH Variation Effects (pH 6.5 vs pH 8.5)
  const acidicWheatInputs = { ...sampleInputs1, ph: 6.5 };
  const alkalineInputs = { ...sampleInputs1, ph: 8.5 };

  const wheatResultNeutral = CropSuitabilityEngine.evaluate(acidicWheatInputs).find(c => c.cropName === 'Wheat');
  const wheatResultAlkaline = CropSuitabilityEngine.evaluate(alkalineInputs).find(c => c.cropName === 'Wheat');

  assert(wheatResultNeutral.suitabilityScore > wheatResultAlkaline.suitabilityScore, 'Wheat suitability score drops when pH is alkaline (8.5)');

  // Test 4: Moisture Variation Effects for Rice (High moisture preference)
  const lowMoistureInputs = { ...sampleInputs1, moisture: 15 };
  const highMoistureInputs = { ...sampleInputs1, moisture: 60 };

  const riceLowM = CropSuitabilityEngine.evaluate(lowMoistureInputs).find(c => c.cropName === 'Rice');
  const riceHighM = CropSuitabilityEngine.evaluate(highMoistureInputs).find(c => c.cropName === 'Rice');

  assert(riceHighM.suitabilityScore > riceLowM.suitabilityScore, 'Rice scores significantly higher with high soil moisture (60%) than low moisture (15%)');

  // Test 5: Soil Type Preference Matching
  const groundnutSandy = CropSuitabilityEngine.evaluate({ ...sampleInputs1, soilType: 'Sandy' }).find(c => c.cropName === 'Groundnut');
  const groundnutClay = CropSuitabilityEngine.evaluate({ ...sampleInputs1, soilType: 'Clay' }).find(c => c.cropName === 'Groundnut');

  assert(groundnutSandy.suitabilityScore > groundnutClay.suitabilityScore, 'Groundnut scores higher in Sandy soil than Clay soil');

  console.log(`\nTest Summary: ${passed}/${total} assertions passed successfully.`);
  return passed === total;
}

// Run test if executed directly
if (typeof process !== 'undefined' && process.argv && process.argv[1] && process.argv[1].includes('cropSuitabilityEngine.test.js')) {
  runSuitabilityEngineTests();
}
