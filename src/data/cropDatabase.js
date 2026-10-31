// Prototype Crop Suitability Database for AgroInsight

export const CROPS_DATABASE = [
  {
    id: 'crop-wheat',
    name: 'Wheat',
    symbol: '🌾',
    category: 'Cereal Grain',
    nRange: { min: 60, max: 140, optMin: 80, optMax: 120 },
    pRange: { min: 20, max: 60, optMin: 30, optMax: 50 },
    kRange: { min: 100, max: 220, optMin: 140, optMax: 190 },
    phRange: { min: 6.0, max: 7.5, optMin: 6.2, optMax: 7.0 },
    moistureRange: { min: 20, max: 45, optMin: 25, optMax: 38 },
    preferredSoilTypes: ['Loamy', 'Silty', 'Clay', 'Alluvial'],
    description: 'Thrives in well-drained loamy to silty soils with neutral pH and moderate moisture.'
  },
  {
    id: 'crop-rice',
    name: 'Rice',
    symbol: '🍚',
    category: 'Cereal Grain',
    nRange: { min: 70, max: 150, optMin: 90, optMax: 130 },
    pRange: { min: 25, max: 65, optMin: 35, optMax: 55 },
    kRange: { min: 90, max: 200, optMin: 120, optMax: 170 },
    phRange: { min: 5.5, max: 7.2, optMin: 6.0, optMax: 6.8 },
    moistureRange: { min: 45, max: 85, optMin: 55, optMax: 75 },
    preferredSoilTypes: ['Clay', 'Alluvial', 'Silty'],
    description: 'Requires high soil moisture / water retention and slightly acidic to neutral clay loam.'
  },
  {
    id: 'crop-maize',
    name: 'Maize',
    symbol: '🌽',
    category: 'Cereal Grain',
    nRange: { min: 80, max: 160, optMin: 100, optMax: 140 },
    pRange: { min: 30, max: 70, optMin: 40, optMax: 60 },
    kRange: { min: 110, max: 240, optMin: 150, optMax: 200 },
    phRange: { min: 5.8, max: 7.8, optMin: 6.2, optMax: 7.2 },
    moistureRange: { min: 25, max: 55, optMin: 32, optMax: 45 },
    preferredSoilTypes: ['Loamy', 'Alluvial', 'Black Soil', 'Red Soil'],
    description: 'Heavy nutrient feeder needing rich organic matter, good drainage, and warm temperatures.'
  },
  {
    id: 'crop-soybean',
    name: 'Soybean',
    symbol: '🫘',
    category: 'Legume / Oilseed',
    nRange: { min: 20, max: 70, optMin: 30, optMax: 50 }, // Legumes fix nitrogen
    pRange: { min: 25, max: 65, optMin: 35, optMax: 55 },
    kRange: { min: 120, max: 250, optMin: 150, optMax: 210 },
    phRange: { min: 6.0, max: 7.5, optMin: 6.3, optMax: 7.0 },
    moistureRange: { min: 22, max: 50, optMin: 28, optMax: 42 },
    preferredSoilTypes: ['Loamy', 'Black Soil', 'Alluvial'],
    description: 'Nitrogen-fixing legume that prefers fertile loams and deep black soils with good potassium.'
  },
  {
    id: 'crop-cotton',
    name: 'Cotton',
    symbol: '☁️',
    category: 'Fiber Crop',
    nRange: { min: 50, max: 120, optMin: 70, optMax: 100 },
    pRange: { min: 20, max: 55, optMin: 28, optMax: 45 },
    kRange: { min: 100, max: 220, optMin: 130, optMax: 180 },
    phRange: { min: 5.8, max: 8.0, optMin: 6.5, optMax: 7.8 },
    moistureRange: { min: 18, max: 40, optMin: 22, optMax: 32 },
    preferredSoilTypes: ['Black Soil', 'Alluvial', 'Loamy'],
    description: 'Deep-rooted crop well suited for moisture-retaining black soils and warm climates.'
  },
  {
    id: 'crop-sugarcane',
    name: 'Sugarcane',
    symbol: '🎋',
    category: 'Cash Crop',
    nRange: { min: 100, max: 200, optMin: 130, optMax: 180 },
    pRange: { min: 35, max: 80, optMin: 45, optMax: 65 },
    kRange: { min: 130, max: 280, optMin: 170, optMax: 240 },
    phRange: { min: 6.0, max: 7.8, optMin: 6.5, optMax: 7.3 },
    moistureRange: { min: 35, max: 70, optMin: 42, optMax: 60 },
    preferredSoilTypes: ['Loamy', 'Alluvial', 'Black Soil'],
    description: 'High-yielding perennial demanding substantial nitrogen, potassium, and abundant moisture.'
  },
  {
    id: 'crop-chickpea',
    name: 'Chickpea',
    symbol: '🌱',
    category: 'Pulse / Legume',
    nRange: { min: 15, max: 50, optMin: 20, optMax: 40 },
    pRange: { min: 20, max: 50, optMin: 25, optMax: 40 },
    kRange: { min: 80, max: 180, optMin: 100, optMax: 150 },
    phRange: { min: 6.0, max: 8.2, optMin: 6.5, optMax: 7.8 },
    moistureRange: { min: 12, max: 32, optMin: 15, optMax: 25 },
    preferredSoilTypes: ['Loamy', 'Black Soil', 'Sandy', 'Red Soil'],
    description: 'Drought-tolerant pulse crop that thrives in low moisture and neutral-to-alkaline soils.'
  },
  {
    id: 'crop-groundnut',
    name: 'Groundnut',
    symbol: '🥜',
    category: 'Oilseed / Legume',
    nRange: { min: 20, max: 60, optMin: 25, optMax: 45 },
    pRange: { min: 25, max: 60, optMin: 30, optMax: 50 },
    kRange: { min: 90, max: 200, optMin: 120, optMax: 170 },
    phRange: { min: 5.8, max: 7.2, optMin: 6.0, optMax: 6.8 },
    moistureRange: { min: 18, max: 42, optMin: 22, optMax: 35 },
    preferredSoilTypes: ['Sandy', 'Loamy', 'Red Soil'],
    description: 'Requires loose, well-aerated sandy or light loamy soil for easy pod development.'
  },
  {
    id: 'crop-tomato',
    name: 'Tomato',
    symbol: '🍅',
    category: 'Horticulture / Vegetable',
    nRange: { min: 75, max: 160, optMin: 95, optMax: 135 },
    pRange: { min: 35, max: 85, optMin: 45, optMax: 70 },
    kRange: { min: 140, max: 300, optMin: 180, optMax: 250 },
    phRange: { min: 6.0, max: 7.2, optMin: 6.2, optMax: 6.8 },
    moistureRange: { min: 28, max: 55, optMin: 35, optMax: 48 },
    preferredSoilTypes: ['Loamy', 'Alluvial', 'Red Soil'],
    description: 'High potassium consumer preferring rich, organic loam with consistent moisture and mild acidity.'
  },
  {
    id: 'crop-potato',
    name: 'Potato',
    symbol: '🥔',
    category: 'Tuber / Vegetable',
    nRange: { min: 80, max: 170, optMin: 100, optMax: 145 },
    pRange: { min: 40, max: 90, optMin: 50, optMax: 75 },
    kRange: { min: 150, max: 320, optMin: 190, optMax: 270 },
    phRange: { min: 5.2, max: 6.8, optMin: 5.5, optMax: 6.3 }, // Slightly acidic to prevent scab
    moistureRange: { min: 30, max: 60, optMin: 38, optMax: 50 },
    preferredSoilTypes: ['Loamy', 'Sandy', 'Alluvial'],
    description: 'Tuber crop thriving in loose, well-drained, slightly acidic soils rich in potassium.'
  }
];
