// Satellite Data Service Abstraction with Demo & Real Provider Patterns

import { CONFIGURABLE_NDVI_THRESHOLDS } from '../data/mockData';

export class SatelliteDataService {
  constructor(providerType = 'DEMO') {
    this.providerType = providerType;
  }

  /**
   * Calculates classified status for an NDVI value
   */
  classifyNDVI(ndvi, thresholds = CONFIGURABLE_NDVI_THRESHOLDS) {
    if (ndvi >= thresholds.healthyMin) return { status: 'Healthy', color: '#16a34a', bg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' };
    if (ndvi >= thresholds.moderateMin) return { status: 'Moderate', color: '#eab308', bg: 'bg-amber-500/20 text-amber-400 border-amber-500/40' };
    return { status: 'Stressed', color: '#dc2626', bg: 'bg-red-500/20 text-red-400 border-red-500/40' };
  }

  /**
   * Generates a spatial grid of NDVI synthetic cells within the field boundary rectangle.
   */
  getSpatialNDVIGrid(field) {
    if (!field || !field.boundary || field.boundary.length === 0) return [];

    const lats = field.boundary.map(p => p[0]);
    const lngs = field.boundary.map(p => p[1]);

    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    const rows = 4;
    const cols = 4;
    const latStep = (maxLat - minLat) / rows;
    const lngStep = (maxLng - minLng) / cols;

    const baseNdvi = field.mean_ndvi || 0.55;
    const cells = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cellMinLat = minLat + r * latStep;
        const cellMaxLat = cellMinLat + latStep;
        const cellMinLng = minLng + c * lngStep;
        const cellMaxLng = cellMinLng + lngStep;

        // Generate realistic spatial variation across grid
        // e.g. center has higher NDVI, south/east corner might have stress
        const spatialFactor = (r * 0.04 - c * 0.03) + (Math.sin(r + c) * 0.05);
        let cellNdvi = Math.max(0.12, Math.min(0.92, +(baseNdvi + spatialFactor).toFixed(2)));

        const classification = this.classifyNDVI(cellNdvi);

        cells.push({
          id: `cell-${r}-${c}`,
          ndvi: cellNdvi,
          status: classification.status,
          color: classification.color,
          bounds: [
            [cellMinLat, cellMinLng],
            [cellMaxLat, cellMaxLng]
          ],
          center: [(cellMinLat + cellMaxLat) / 2, (cellMinLng + cellMaxLng) / 2],
          isDemo: true,
          resolution: '10m Sentinel-2 Equiv'
        });
      }
    }

    return cells;
  }

  /**
   * Calculates overall field NDVI statistics
   */
  getNDVIStatistics(field) {
    const grid = this.getSpatialNDVIGrid(field);
    if (!grid.length) return { mean: 0, min: 0, max: 0, healthyPct: 0, moderatePct: 0, stressedPct: 0 };

    const values = grid.map(g => g.ndvi);
    const mean = +(values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);
    const min = Math.min(...values);
    const max = Math.max(...values);

    const healthyCount = grid.filter(g => g.status === 'Healthy').length;
    const moderateCount = grid.filter(g => g.status === 'Moderate').length;
    const stressedCount = grid.filter(g => g.status === 'Stressed').length;

    return {
      mean,
      min,
      max,
      totalCells: grid.length,
      healthyPct: Math.round((healthyCount / grid.length) * 100),
      moderatePct: Math.round((moderateCount / grid.length) * 100),
      stressedPct: Math.round((stressedCount / grid.length) * 100),
      isDemoData: true,
      satelliteSource: 'Sentinel-2 L2A (Simulated)'
    };
  }

  /**
   * Returns temporal NDVI historical trend for charts
   */
  getNDVIHistory(fieldId, baseNdvi = 0.55) {
    return [
      { date: 'May 15', ndvi: 0.22, cloudCover: 5, meanTemp: 18 },
      { date: 'Jun 01', ndvi: 0.38, cloudCover: 2, meanTemp: 22 },
      { date: 'Jun 15', ndvi: 0.52, cloudCover: 12, meanTemp: 25 },
      { date: 'Jul 01', ndvi: 0.68, cloudCover: 8, meanTemp: 27 },
      { date: 'Jul 15', ndvi: +(baseNdvi + 0.12).toFixed(2), cloudCover: 0, meanTemp: 29 },
      { date: 'Aug 01', ndvi: +(baseNdvi + 0.05).toFixed(2), cloudCover: 4, meanTemp: 30 },
      { date: 'Aug 15', ndvi: baseNdvi, cloudCover: 2, meanTemp: 28 }
    ];
  }
}

export const defaultSatelliteService = new SatelliteDataService('DEMO');
