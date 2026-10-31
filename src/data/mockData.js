// Realistic Demo Data for AgroInsight Precision Agriculture Platform

export const INITIAL_FARMS = [
  {
    id: 'farm-1',
    name: 'Green Valley Estate',
    location: 'Ames, Story County, Iowa, USA',
    coordinates: [42.0308, -93.6319],
    totalArea: 7.3, // in acres
    fieldIds: ['field-1', 'field-2', 'field-3'],
    created_at: '2025-04-12'
  },
  {
    id: 'farm-2',
    name: 'Sunrise Horizon Acres',
    location: 'Fresno, Central Valley, California, USA',
    coordinates: [36.7468, -119.7726],
    totalArea: 4.2,
    fieldIds: ['field-4'],
    created_at: '2025-05-01'
  }
];

export const INITIAL_FIELDS = [
  {
    id: 'field-1',
    farm_id: 'farm-1',
    farm_name: 'Green Valley Estate',
    name: 'Field A - North Tract',
    crop: 'Soybean',
    crop_variety: 'Pioneer P22T18E',
    sowing_date: '2026-05-15',
    expected_harvest_date: '2026-10-10',
    area: 2.4, // in acres
    soil_type: 'Silt Loam',
    health_status: 'Moderate', // Healthy, Moderate, Stressed
    mean_ndvi: 0.54,
    center: [42.0335, -93.6345],
    boundary: [
      [42.0350, -93.6360],
      [42.0352, -93.6330],
      [42.0320, -93.6328],
      [42.0318, -93.6358]
    ]
  },
  {
    id: 'field-2',
    farm_id: 'farm-1',
    farm_name: 'Green Valley Estate',
    name: 'Field B - East Ridge',
    crop: 'Wheat',
    crop_variety: 'Hard Red Winter',
    sowing_date: '2026-04-02',
    expected_harvest_date: '2026-08-25',
    area: 3.1,
    soil_type: 'Clay Loam',
    health_status: 'Healthy',
    mean_ndvi: 0.76,
    center: [42.0290, -93.6260],
    boundary: [
      [42.0305, -93.6280],
      [42.0308, -93.6240],
      [42.0275, -93.6238],
      [42.0272, -93.6278]
    ]
  },
  {
    id: 'field-3',
    farm_id: 'farm-1',
    farm_name: 'Green Valley Estate',
    name: 'Field C - Creek South',
    crop: 'Cotton',
    crop_variety: 'Deltapine 2038',
    sowing_date: '2026-05-01',
    expected_harvest_date: '2026-11-15',
    area: 1.8,
    soil_type: 'Sandy Loam',
    health_status: 'Stressed',
    mean_ndvi: 0.32,
    center: [42.0250, -93.6360],
    boundary: [
      [42.0262, -93.6380],
      [42.0265, -93.6340],
      [42.0238, -93.6338],
      [42.0235, -93.6378]
    ]
  },
  {
    id: 'field-4',
    farm_id: 'farm-2',
    farm_name: 'Sunrise Horizon Acres',
    name: 'Field D - Valley Plot',
    crop: 'Corn',
    crop_variety: 'DeKalb DKC64-35',
    sowing_date: '2026-04-20',
    expected_harvest_date: '2026-09-30',
    area: 4.2,
    soil_type: 'Loam',
    health_status: 'Healthy',
    mean_ndvi: 0.81,
    center: [36.7480, -119.7740],
    boundary: [
      [36.7500, -119.7770],
      [36.7502, -119.7710],
      [36.7460, -119.7708],
      [36.7458, -119.7768]
    ]
  }
];

export const INITIAL_SOIL_RECORDS = {
  'field-1': {
    field_id: 'field-1',
    nitrogen: 42, // mg/kg (optimal 50-80)
    nitrogen_status: 'Low',
    phosphorus: 28, // mg/kg (optimal 25-45)
    phosphorus_status: 'Optimal',
    potassium: 165, // mg/kg (optimal 150-250)
    potassium_status: 'Optimal',
    ph: 6.4, // optimal 6.0-7.0
    ph_status: 'Optimal',
    moisture: 22, // % (optimal 30-45%)
    moisture_status: 'Low',
    organic_matter: 3.2, // %
    organic_matter_status: 'Optimal',
    recorded_at: '2026-08-14'
  },
  'field-2': {
    field_id: 'field-2',
    nitrogen: 68,
    nitrogen_status: 'Optimal',
    phosphorus: 34,
    phosphorus_status: 'Optimal',
    potassium: 210,
    potassium_status: 'Optimal',
    ph: 6.8,
    ph_status: 'Optimal',
    moisture: 38,
    moisture_status: 'Optimal',
    organic_matter: 4.1,
    organic_matter_status: 'Optimal',
    recorded_at: '2026-08-15'
  },
  'field-3': {
    field_id: 'field-3',
    nitrogen: 24,
    nitrogen_status: 'Deficient',
    phosphorus: 18,
    phosphorus_status: 'Low',
    potassium: 120,
    potassium_status: 'Low',
    ph: 5.7,
    ph_status: 'Slightly Acidic',
    moisture: 14,
    moisture_status: 'Critical Low',
    organic_matter: 1.8,
    organic_matter_status: 'Low',
    recorded_at: '2026-08-16'
  },
  'field-4': {
    field_id: 'field-4',
    nitrogen: 75,
    nitrogen_status: 'Optimal',
    phosphorus: 38,
    phosphorus_status: 'Optimal',
    potassium: 230,
    potassium_status: 'Optimal',
    ph: 6.6,
    ph_status: 'Optimal',
    moisture: 34,
    moisture_status: 'Optimal',
    organic_matter: 3.8,
    organic_matter_status: 'Optimal',
    recorded_at: '2026-08-15'
  }
};

export const INITIAL_WEATHER = {
  'field-1': {
    temperature: 28.5, // °C
    humidity: 48, // %
    rainfall: 2.4, // mm last 24h
    wind_speed: 12, // km/h
    condition: 'Partly Cloudy',
    icon: 'cloud-sun',
    forecast: [
      { day: 'Mon', temp_max: 30, temp_min: 19, rainfall_prob: 15, condition: 'Sunny' },
      { day: 'Tue', temp_max: 31, temp_min: 20, rainfall_prob: 20, condition: 'Partly Cloudy' },
      { day: 'Wed', temp_max: 27, temp_min: 17, rainfall_prob: 75, condition: 'Light Rain' },
      { day: 'Thu', temp_max: 26, temp_min: 16, rainfall_prob: 40, condition: 'Cloudy' },
      { day: 'Fri', temp_max: 29, temp_min: 18, rainfall_prob: 10, condition: 'Sunny' }
    ]
  },
  'field-2': {
    temperature: 27.0,
    humidity: 55,
    rainfall: 14.2,
    wind_speed: 10,
    condition: 'Passing Showers',
    icon: 'cloud-rain',
    forecast: [
      { day: 'Mon', temp_max: 28, temp_min: 18, rainfall_prob: 60, condition: 'Showers' },
      { day: 'Tue', temp_max: 29, temp_min: 19, rainfall_prob: 30, condition: 'Partly Cloudy' },
      { day: 'Wed', temp_max: 28, temp_min: 18, rainfall_prob: 20, condition: 'Sunny' },
      { day: 'Thu', temp_max: 27, temp_min: 17, rainfall_prob: 15, condition: 'Sunny' },
      { day: 'Fri', temp_max: 30, temp_min: 19, rainfall_prob: 10, condition: 'Clear' }
    ]
  },
  'field-3': {
    temperature: 33.2,
    humidity: 28,
    rainfall: 0.0,
    wind_speed: 18,
    condition: 'Hot & Dry',
    icon: 'sun',
    forecast: [
      { day: 'Mon', temp_max: 34, temp_min: 22, rainfall_prob: 5, condition: 'Sunny' },
      { day: 'Tue', temp_max: 35, temp_min: 23, rainfall_prob: 0, condition: 'Sunny' },
      { day: 'Wed', temp_max: 36, temp_min: 24, rainfall_prob: 0, condition: 'Hot' },
      { day: 'Thu', temp_max: 34, temp_min: 22, rainfall_prob: 10, condition: 'Partly Cloudy' },
      { day: 'Fri', temp_max: 33, temp_min: 21, rainfall_prob: 15, condition: 'Sunny' }
    ]
  },
  'field-4': {
    temperature: 29.0,
    humidity: 50,
    rainfall: 5.8,
    wind_speed: 11,
    condition: 'Clear',
    icon: 'sun',
    forecast: [
      { day: 'Mon', temp_max: 30, temp_min: 20, rainfall_prob: 10, condition: 'Sunny' },
      { day: 'Tue', temp_max: 31, temp_min: 21, rainfall_prob: 10, condition: 'Clear' },
      { day: 'Wed', temp_max: 32, temp_min: 22, rainfall_prob: 25, condition: 'Partly Cloudy' },
      { day: 'Thu', temp_max: 30, temp_min: 20, rainfall_prob: 45, condition: 'Scattered Showers' },
      { day: 'Fri', temp_max: 29, temp_min: 19, rainfall_prob: 20, condition: 'Sunny' }
    ]
  }
};

export const INITIAL_EXPENSES = {
  'field-1': {
    seed: 480,
    fertilizer: 620,
    pesticide: 310,
    irrigation: 250,
    labour: 540,
    machinery: 390,
    other: 150,
    expected_yield: 120, // bushels
    yield_unit: 'bushels',
    selling_price_per_unit: 14.50 // $ per bushel
  },
  'field-2': {
    seed: 550,
    fertilizer: 720,
    pesticide: 280,
    irrigation: 180,
    labour: 600,
    machinery: 450,
    other: 120,
    expected_yield: 210,
    yield_unit: 'bushels',
    selling_price_per_unit: 8.20
  },
  'field-3': {
    seed: 620,
    fertilizer: 850,
    pesticide: 520,
    irrigation: 680,
    labour: 750,
    machinery: 500,
    other: 200,
    expected_yield: 95,
    yield_unit: 'bales',
    selling_price_per_unit: 380.00
  },
  'field-4': {
    seed: 890,
    fertilizer: 1250,
    pesticide: 450,
    irrigation: 380,
    labour: 900,
    machinery: 680,
    other: 250,
    expected_yield: 780,
    yield_unit: 'bushels',
    selling_price_per_unit: 5.40
  }
};

export const ALERTS_LIST = [
  {
    id: 'alert-1',
    field_id: 'field-3',
    field_name: 'Field C - Creek South',
    severity: 'High',
    title: 'Severe Moisture & NDVI Depress',
    message: 'NDVI dropped to 0.32 with soil moisture at 14%. Possible moisture stress.',
    timestamp: '2 hours ago',
    type: 'water'
  },
  {
    id: 'alert-2',
    field_id: 'field-1',
    field_name: 'Field A - North Tract',
    severity: 'Medium',
    title: 'Low Soil Nitrogen Warning',
    message: 'Nitrogen levels measured at 42 mg/kg. Below optimal threshold of 50 mg/kg.',
    timestamp: '1 day ago',
    type: 'nutrient'
  },
  {
    id: 'alert-3',
    field_id: 'field-2',
    field_name: 'Field B - East Ridge',
    severity: 'Low',
    title: 'Favorable Crop Growth',
    message: 'NDVI peak at 0.76 with optimal soil moisture following 14mm rainfall.',
    timestamp: '2 days ago',
    type: 'growth'
  }
];

export const CONFIGURABLE_NDVI_THRESHOLDS = {
  healthyMin: 0.60,
  moderateMin: 0.35,
  stressedMax: 0.34
};
