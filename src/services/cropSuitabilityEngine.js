// Crop Suitability Analysis Engine

import { CROPS_DATABASE } from '../data/cropDatabase.js';
import { DEFAULT_SUITABILITY_WEIGHTS } from '../config/suitabilityConfig.js';

/**
 * Calculates parameter sub-score between 0 and 1
 */
function scoreNumericRange(val, range) {
  const { min, max, optMin, optMax } = range;
  
  if (val >= optMin && val <= optMax) {
    return 1.0;
  }
  
  if (val >= min && val <= max) {
    // Within acceptable tolerance
    if (val < optMin) {
      const span = optMin - min;
      return span > 0 ? 0.75 + 0.20 * ((val - min) / span) : 0.85;
    } else {
      const span = max - optMax;
      return span > 0 ? 0.75 + 0.20 * ((max - val) / span) : 0.85;
    }
  }

  // Outside acceptable tolerance
  if (val < min) {
    const diff = min - val;
    const penalty = diff / (min || 1);
    return Math.max(0.1, 0.60 - penalty * 0.5);
  } else {
    const diff = val - max;
    const penalty = diff / max;
    return Math.max(0.1, 0.60 - penalty * 0.5);
  }
}

export class CropSuitabilityEngine {
  /**
   * Evaluates soil parameters against crop database and returns ranked suitability results
   */
  static evaluate(soilInputs, weights = DEFAULT_SUITABILITY_WEIGHTS) {
    const { nitrogen, phosphorus, potassium, ph, moisture, soilType } = soilInputs;

    const results = CROPS_DATABASE.map(crop => {
      const matchedFactors = [];
      const limitingFactors = [];

      // 1. Nitrogen Evaluation
      const nScore = scoreNumericRange(nitrogen, crop.nRange);
      if (nScore >= 0.95) {
        matchedFactors.push(`Nitrogen level (${nitrogen} kg/ha) is in optimal range (${crop.nRange.optMin}-${crop.nRange.optMax} kg/ha)`);
      } else if (nScore >= 0.70) {
        matchedFactors.push(`Nitrogen level (${nitrogen} kg/ha) is acceptable`);
      } else if (nitrogen < crop.nRange.min) {
        limitingFactors.push(`Nitrogen level (${nitrogen} kg/ha) is below preferred minimum (${crop.nRange.optMin} kg/ha)`);
      } else {
        limitingFactors.push(`Nitrogen level (${nitrogen} kg/ha) exceeds crop requirements`);
      }

      // 2. Phosphorus Evaluation
      const pScore = scoreNumericRange(phosphorus, crop.pRange);
      if (pScore >= 0.95) {
        matchedFactors.push(`Phosphorus level (${phosphorus} kg/ha) is optimal (${crop.pRange.optMin}-${crop.pRange.optMax} kg/ha)`);
      } else if (pScore >= 0.70) {
        matchedFactors.push(`Phosphorus level (${phosphorus} kg/ha) is suitable`);
      } else if (phosphorus < crop.pRange.min) {
        limitingFactors.push(`Phosphorus level (${phosphorus} kg/ha) is lower than preferred (${crop.pRange.optMin} kg/ha)`);
      } else {
        limitingFactors.push(`Phosphorus level (${phosphorus} kg/ha) is high`);
      }

      // 3. Potassium Evaluation
      const kScore = scoreNumericRange(potassium, crop.kRange);
      if (kScore >= 0.95) {
        matchedFactors.push(`Potassium level (${potassium} kg/ha) is optimal (${crop.kRange.optMin}-${crop.kRange.optMax} kg/ha)`);
      } else if (kScore >= 0.70) {
        matchedFactors.push(`Potassium level (${potassium} kg/ha) is suitable`);
      } else if (potassium < crop.kRange.min) {
        limitingFactors.push(`Potassium level (${potassium} kg/ha) is below optimal (${crop.kRange.optMin} kg/ha)`);
      } else {
        limitingFactors.push(`Potassium level (${potassium} kg/ha) is higher than preferred`);
      }

      // 4. pH Evaluation
      const phScore = scoreNumericRange(ph, crop.phRange);
      if (phScore >= 0.95) {
        matchedFactors.push(`Soil pH (${ph}) is within ideal range (${crop.phRange.optMin} - ${crop.phRange.optMax})`);
      } else if (phScore >= 0.70) {
        matchedFactors.push(`Soil pH (${ph}) is within acceptable tolerance (${crop.phRange.min} - ${crop.phRange.max})`);
      } else if (ph < crop.phRange.min) {
        limitingFactors.push(`Soil pH (${ph}) is too acidic for optimal growth (requires ≥ ${crop.phRange.optMin})`);
      } else {
        limitingFactors.push(`Soil pH (${ph}) is too alkaline for optimal growth (requires ≤ ${crop.phRange.optMax})`);
      }

      // 5. Moisture Evaluation
      const mScore = scoreNumericRange(moisture, crop.moistureRange);
      if (mScore >= 0.90) {
        matchedFactors.push(`Soil moisture (${moisture}%) matches crop growth conditions`);
      } else if (mScore >= 0.65) {
        matchedFactors.push(`Soil moisture (${moisture}%) is acceptable`);
      } else if (moisture < crop.moistureRange.min) {
        limitingFactors.push(`Soil moisture (${moisture}%) is low for ${crop.name} (preferred: ${crop.moistureRange.optMin}-${crop.moistureRange.optMax}%)`);
      } else {
        limitingFactors.push(`Soil moisture (${moisture}%) is higher than preferred`);
      }

      // 6. Soil Type Evaluation
      const isPreferredSoil = crop.preferredSoilTypes.includes(soilType);
      const stScore = isPreferredSoil ? 1.0 : 0.45;
      if (isPreferredSoil) {
        matchedFactors.push(`Soil type (${soilType}) is highly preferred by ${crop.name}`);
      } else {
        limitingFactors.push(`Soil type (${soilType}) is less preferred (prefers: ${crop.preferredSoilTypes.join(', ')})`);
      }

      // Weighted Aggregation
      const totalScore = (
        nScore * weights.nitrogen +
        pScore * weights.phosphorus +
        kScore * weights.potassium +
        phScore * weights.ph +
        mScore * weights.moisture +
        stScore * weights.soilType
      ) * 100;

      const roundedScore = Math.round(totalScore);

      // Suitability Level Classification
      let suitabilityLevel = 'Highly Suitable';
      let badgeColor = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';

      if (roundedScore >= 80) {
        suitabilityLevel = 'Highly Suitable';
        badgeColor = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
      } else if (roundedScore >= 60) {
        suitabilityLevel = 'Suitable';
        badgeColor = 'bg-blue-500/20 text-blue-400 border-blue-500/40';
      } else if (roundedScore >= 40) {
        suitabilityLevel = 'Moderately Suitable';
        badgeColor = 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      } else {
        suitabilityLevel = 'Less Suitable';
        badgeColor = 'bg-red-500/20 text-red-400 border-red-500/40';
      }

      const explanation = `${crop.name} scored ${roundedScore}% suitability based on entered soil NPK, pH (${ph}), moisture (${moisture}%), and ${soilType} soil texture.`;

      return {
        id: crop.id,
        cropName: crop.name,
        cropSymbol: crop.symbol,
        category: crop.category,
        suitabilityScore: roundedScore,
        suitabilityLevel,
        badgeColor,
        matchedFactors,
        limitingFactors,
        explanation,
        description: crop.description
      };
    });

    // Sort crops from highest suitability score to lowest
    return results.sort((a, b) => b.suitabilityScore - a.suitabilityScore);
  }
}
