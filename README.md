# AgroInsight - Precision Agriculture Decision-Support Platform

AgroInsight is a modular, high-fidelity decision-support web platform designed for small and medium-sized farms. It synthesizes geospatial field boundary mapping, satellite-derived vegetation indices (NDVI), topsoil nutrient chemistry, micro-climate weather observations, and financial metrics into transparent, non-diagnostic agricultural recommendations.

> **IMPORTANT SCOPE NOTICE**: This application is a college-level precision agriculture prototype. All satellite imagery, soil readings, and weather forecasts are powered by synthetic, realistic demo data providers labeled with prominent **DEMO DATA** badges. Recommendations are framed as *possible contributing factors* and *suggested verification actions*, not guaranteed agricultural advice.

---

## Technical Stack

- **Frontend Framework**: React 18 + Vite
- **Styling & UI**: Tailwind CSS (Custom Dark Precision-Ag Palette) + Lucide Icons
- **Geospatial Mapping**: Leaflet + React-Leaflet (Esri World Imagery Satellite basemap, OpenStreetMap tiles, GeoJSON boundary polygon rendering, 16-cell spatial NDVI heatmaps)
- **Data Visualization**: Recharts (NDVI temporal trends, 5-day weather forecast, expense distribution pie charts, gross revenue vs profit bar charts)
- **Architecture**: Modular provider abstraction layer (`SatelliteDataService`, `WeatherService`, `RecommendationEngine`) ready for future backend REST API integration.

---

## Core Application Features

### 1. Executive Farm Dashboard
- KPI Summary Cards: Monitored Farms, Total Fields, Active Crops, Average Field NDVI Health Index.
- Global Geospatial Map displaying all field boundary polygons with click-to-inspect popups.
- Seasonal NDVI temporal history trend area charts.
- Agronomic Alerts Feed with severity indicators (High, Medium, Low).

### 2. Farm & Field Management
- Field catalogue listing crop type, acreage, soil type, sowing date, and NDVI score.
- **Field Polygon Creator**: Simulate drawing custom field boundaries on an interactive map with automatic acreage calculation from GeoJSON coordinates.

### 3. Spatial Field Detail & NDVI Analysis
- Detailed field header displaying crop variety, centroid coordinates, and soil classification.
- **Spatial NDVI Heatmap Grid**: Synthetic $4 \times 4$ spatial grid overlay rendering localized canopy variation across the field polygon:
  - **Healthy Canopy**: $\text{NDVI} \ge 0.60$ (Green)
  - **Moderate Dense**: $0.35 \le \text{NDVI} < 0.60$ (Yellow)
  - **Stressed / Bare**: $\text{NDVI} < 0.35$ (Red)
- Interactive Map controls: Esri Satellite vs Street Map base layer toggle, spatial grid overlay toggle, date selector.

### 4. Soil Chemistry & Weather Forecast
- Topsoil nutrient gauges for Nitrogen (N), Phosphorus (P), Potassium (K), pH balance, soil volumetric moisture (VWC), and Organic Matter (SOM).
- Micro-climate observations (Air Temp, Relative Humidity, 24h Rainfall, Wind Speed) and 5-Day forecast card stack with precipitation probability.

### 5. Explainable Recommendation Engine
- Rule-based inference matrix evaluating combinations of low NDVI, soil nutrient deficiencies, soil moisture depletion, and heat stress.
- Output cards structured into:
  - *Observation*
  - *Possible Contributing Factors*
  - *Suggested Ground Scouting & Verification Action*
  - *Priority & Confidence Rule Match Score*
  - *Safety Disclaimer Notice*

### 6. Profitability & Expense Analytics
- Field input expense breakdown (Seed, Fertilizer, Pesticide, Irrigation, Labour, Machinery).
- **Interactive Financial Scenario Simulator**: Adjust expense sliders, expected yield, and selling price in real-time to compute gross revenue, net field profit/loss, and cost per unit yield.

---

## Local Setup & Quickstart Instructions

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

The application will start locally at `http://localhost:3000`.

---

## Project Structure

```
/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data/
    │   └── mockData.js (Farms, Fields, Soil, Weather, Expenses, Alerts)
    ├── services/
    │   ├── satelliteService.js (Spatial grid NDVI heatmap generator & stats)
    │   └── recommendationEngine.js (Rule-based non-diagnostic engine)
    ├── components/
    │   ├── common/
    │   │   ├── DemoBadge.jsx
    │   │   └── StatCard.jsx
    │   ├── layout/
    │   │   ├── Header.jsx
    │   │   └── Sidebar.jsx
    │   └── map/
    │       ├── FieldMap.jsx
    │       └── MapLegend.jsx
    └── pages/
        ├── DashboardPage.jsx
        ├── FieldsPage.jsx
        ├── FieldDetailPage.jsx
        ├── SoilCropPage.jsx
        ├── RecommendationsPage.jsx
        └── FinancialsPage.jsx
```

---

## Architecture Flow & Backend Expansion Blueprint

When transitioning from this functional prototype to a full production architecture:
1. **Database Layer**: Replace `mockData.js` with a PostgreSQL + PostGIS database. Field boundaries stored as `GEOMETRY(Polygon, 4326)`.
2. **Satellite Integration**: Replace `DemoSatelliteProvider` in `satelliteService.js` with `RealSatelliteProvider` querying Sentinel Hub API (`Sentinel-2 L2A` imagery) using `SENTINEL_CLIENT_ID` environment variables.
3. **Weather Integration**: Connect `WeatherService` to OpenWeatherMap or Open-Meteo REST API.
4. **Backend REST API**: Express.js server providing authenticated JWT routes for `/api/farms`, `/api/fields`, `/api/observations`, and `/api/financials`.
