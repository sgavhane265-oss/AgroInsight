// Utility functions for analyzing soil test parameter levels

export function analyzeSoilSnapshot(soilData) {
  const { nitrogen, phosphorus, potassium, ph, moisture, organicMatter } = soilData;

  // Nitrogen Status (kg/ha)
  let nitrogenStatus = 'Adequate';
  if (nitrogen < 40) nitrogenStatus = 'Deficient';
  else if (nitrogen < 70) nitrogenStatus = 'Low';
  else if (nitrogen <= 120) nitrogenStatus = 'Moderate / Adequate';
  else nitrogenStatus = 'High';

  // Phosphorus Status (kg/ha)
  let phosphorusStatus = 'Moderate';
  if (phosphorus < 25) phosphorusStatus = 'Low';
  else if (phosphorus <= 55) phosphorusStatus = 'Adequate / High';
  else phosphorusStatus = 'Very High';

  // Potassium Status (kg/ha)
  let potassiumStatus = 'Adequate';
  if (potassium < 110) potassiumStatus = 'Low';
  else if (potassium <= 200) potassiumStatus = 'Adequate';
  else potassiumStatus = 'High';

  // pH Status
  let phStatus = 'Neutral';
  if (ph < 5.5) phStatus = 'Acidic';
  else if (ph < 6.2) phStatus = 'Slightly Acidic';
  else if (ph <= 7.3) phStatus = 'Neutral (Optimal)';
  else if (ph <= 8.0) phStatus = 'Slightly Alkaline';
  else phStatus = 'Alkaline';

  // Moisture Status (%)
  let moistureStatus = 'Adequate';
  if (moisture < 20) moistureStatus = 'Low';
  else if (moisture <= 45) moistureStatus = 'Adequate';
  else moistureStatus = 'High / Saturation';

  // Organic Matter Status (%)
  let omStatus = 'Moderate';
  if (organicMatter < 2.0) omStatus = 'Low';
  else if (organicMatter <= 4.0) omStatus = 'Optimal';
  else omStatus = 'Rich';

  return {
    nitrogen: nitrogenStatus,
    phosphorus: phosphorusStatus,
    potassium: potassiumStatus,
    ph: phStatus,
    moisture: moistureStatus,
    organicMatter: omStatus
  };
}
