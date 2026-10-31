// Transparent, Non-Diagnostic Rule-Based Recommendation Engine for AgroInsight

export class RecommendationEngine {
  /**
   * Generates explainable, non-diagnostic agricultural support recommendations
   * based on NDVI, soil nutrients, moisture, and weather observations.
   */
  static generateRecommendations(field, soilRecord, weatherRecord) {
    const recommendations = [];

    if (!field) return recommendations;

    const meanNdvi = field.mean_ndvi || 0.5;
    const moisture = soilRecord ? soilRecord.moisture : 30;
    const nitrogen = soilRecord ? soilRecord.nitrogen : 60;
    const ph = soilRecord ? soilRecord.ph : 6.5;
    const temp = weatherRecord ? weatherRecord.temperature : 25;
    const rainfall = weatherRecord ? weatherRecord.rainfall : 5;

    // Rule 1: Low NDVI + Low Soil Moisture -> Moisture Stress Indicator
    if (meanNdvi < 0.45 && moisture < 20) {
      recommendations.push({
        id: 'rec-moisture-stress',
        category: 'Irrigation & Water Management',
        observation: `Field spatial NDVI is low (${meanNdvi}) combined with low topsoil moisture (${moisture}%).`,
        possibleFactors: [
          'Root-zone soil moisture depletion due to heat or low recent rainfall',
          'Uneven irrigation coverage across field contours',
          'Localized soil compaction limiting water infiltration'
        ],
        recommendedAction: 'Verify soil moisture at 15cm and 30cm root depths. Check drip lines or sprinkler nozzles for clogging.',
        priority: 'High', // High, Medium, Low
        confidence: '88% Rule Match',
        disclaimer: 'Indicator only. Field inspection required before adjusting irrigation schedules.'
      });
    }

    // Rule 2: Low NDVI + Deficient Nitrogen -> Nutrient Deficiency Indicator
    if (meanNdvi < 0.50 && nitrogen < 50) {
      recommendations.push({
        id: 'rec-nitrogen-deficiency',
        category: 'Nutrient & Soil Fertility',
        observation: `Vegetation greenness index (${meanNdvi}) is below average alongside low soil nitrogen (${nitrogen} mg/kg).`,
        possibleFactors: [
          'Sub-optimal nitrogen availability during rapid crop canopy growth stage',
          'Nitrogen leaching following recent heavy rainfall events',
          'Soil organic matter mineralization slowdown'
        ],
        recommendedAction: 'Conduct spot tissue testing (SPAD meter or leaf sample) before applying side-dress nitrogen fertilizer.',
        priority: 'High',
        confidence: '82% Rule Match',
        disclaimer: 'Non-diagnostic guidance. Soil lab confirmation recommended.'
      });
    }

    // Rule 3: High Temperature + Zero Rainfall + Low Soil Moisture -> Thermal Stress Alert
    if (temp > 32 && rainfall === 0 && moisture < 25) {
      recommendations.push({
        id: 'rec-heat-stress',
        category: 'Weather & Climate Adaptation',
        observation: `Ambient air temperature (${temp}°C) exceeds heat threshold with 0mm rainfall in the past 24 hours.`,
        possibleFactors: [
          'Elevated evapotranspiration demand (ET0)',
          'Stomatal closure response reducing leaf photosynthetic efficiency'
        ],
        recommendedAction: 'Schedule evening or early morning pulse irrigation to alleviate crop canopy heat stress.',
        priority: 'Medium',
        confidence: '85% Rule Match',
        disclaimer: 'Weather observation alert. Adjust based on crop growth stage sensitivity.'
      });
    }

    // Rule 4: Soil pH Imbalance Indicator
    if (ph < 6.0 || ph > 7.5) {
      recommendations.push({
        id: 'rec-ph-imbalance',
        category: 'Soil Chemistry',
        observation: `Soil pH reading is ${ph} (${ph < 6.0 ? 'Acidic' : 'Alkaline'}), outside optimal 6.0 - 7.2 range.`,
        possibleFactors: [
          'Reduced availability of phosphorus and micronutrients due to soil acidity/alkalinity',
          'Potential aluminum toxicity in strongly acidic soils'
        ],
        recommendedAction: 'Evaluate lime application (for acidic soils) or gypsum/sulfur amendments for the upcoming season.',
        priority: 'Medium',
        confidence: '78% Rule Match',
        disclaimer: 'Soil test suggestion. Consult agricultural extension officer for precise rate calculation.'
      });
    }

    // Rule 5: Generic Vegetation Stress (Low NDVI without specific soil trigger)
    if (meanNdvi < 0.40 && recommendations.length === 0) {
      recommendations.push({
        id: 'rec-generic-stress',
        category: 'Field Agronomy',
        observation: `Field displays depressed NDVI index (${meanNdvi}).`,
        possibleFactors: [
          'Pest infestation or disease pressure in localized canopy zones',
          'Weed competition absorbing available light and nutrients',
          'Varietal crop emergence variation'
        ],
        recommendedAction: 'Perform targeted ground scouting at GPS coordinates showing lowest NDVI response.',
        priority: 'Medium',
        confidence: '75% Rule Match',
        disclaimer: 'Vegetation anomaly alert. Field verification recommended.'
      });
    }

    // Default positive recommendation if crop is thriving
    if (recommendations.length === 0 && meanNdvi >= 0.70) {
      recommendations.push({
        id: 'rec-thriving',
        category: 'Crop Development',
        observation: `Field canopy density and biomass index are vigorous (NDVI: ${meanNdvi}).`,
        possibleFactors: [
          'Optimal moisture and nutrient uptake conditions',
          'Effective weed and pest management'
        ],
        recommendedAction: 'Maintain current irrigation and field monitoring schedule. Prepare equipment for mid-season growth stage.',
        priority: 'Low',
        confidence: '95% Rule Match',
        disclaimer: 'Growth benchmark confirmation.'
      });
    }

    return recommendations;
  }
}
