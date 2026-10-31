// Configuration for Crop Suitability Analysis Engine

export const DEFAULT_SUITABILITY_WEIGHTS = {
  nitrogen: 0.20,
  phosphorus: 0.15,
  potassium: 0.20,
  ph: 0.25,
  moisture: 0.10,
  soilType: 0.10
};

export const AVAILABLE_SOIL_TYPES = [
  'Loamy',
  'Sandy',
  'Clay',
  'Silty',
  'Black Soil',
  'Red Soil',
  'Alluvial'
];

export const DEFAULT_SOIL_INPUTS = {
  nitrogen: 85, // kg/ha
  phosphorus: 35, // kg/ha
  potassium: 160, // kg/ha
  ph: 6.6,
  moisture: 32, // %
  organicMatter: 3.5, // %
  soilType: 'Loamy'
};

export const LOCAL_STORAGE_KEY = 'agroinsight_soil_test_data';
