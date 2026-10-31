import React, { useState } from 'react';
import { FieldMap } from '../components/map/FieldMap';
import { DemoBadge } from '../components/common/DemoBadge';
import { defaultSatelliteService } from '../services/satelliteService';
import { RecommendationEngine } from '../services/recommendationEngine';
import { 
  Sprout, 
  Calendar, 
  MapPin, 
  Activity, 
  Droplets, 
  Thermometer, 
  TrendingUp, 
  Layers,
  Lightbulb,
  DollarSign,
  ArrowRight,
  ShieldAlert,
  Info
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

export const FieldDetailPage = ({ 
  selectedField, 
  fields, 
  setSelectedField, 
  soilRecords, 
  weatherData, 
  expensesData, 
  setActiveTab 
}) => {
  const [showNdviGrid, setShowNdviGrid] = useState(true);
  const [selectedDate, setSelectedDate] = useState('2026-08-15');

  if (!selectedField) {
    return (
      <div className="p-8 text-center bg-slate-800 rounded-2xl border border-slate-700 space-y-4">
        <p className="text-slate-300">No field selected. Please select a field from the list.</p>
        <button 
          onClick={() => setSelectedField(fields[0])}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold"
        >
          Select {fields[0]?.name || 'Field A'}
        </button>
      </div>
    );
  }

  const soil = soilRecords[selectedField.id] || soilRecords['field-1'];
  const weather = weatherData[selectedField.id] || weatherData['field-1'];
  const expense = expensesData[selectedField.id] || expensesData['field-1'];

  const ndviStats = defaultSatelliteService.getNDVIStatistics(selectedField);
  const ndviTrend = defaultSatelliteService.getNDVIHistory(selectedField.id, selectedField.mean_ndvi);

  const recommendations = RecommendationEngine.generateRecommendations(selectedField, soil, weather);

  // Financial calculations
  const totalCost = Object.values(expense).slice(0, 7).reduce((a, b) => a + Number(b), 0);
  const revenue = expense.expected_yield * expense.selling_price_per_unit;
  const netProfit = revenue - totalCost;

  return (
    <div className="space-y-6 pb-12">
      {/* Field Overview Header */}
      <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/80 pb-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-slate-100">{selectedField.name}</h1>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                selectedField.health_status === 'Healthy'
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : selectedField.health_status === 'Moderate'
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                    : 'bg-red-500/20 text-red-400 border-red-500/40'
              }`}>
                {selectedField.health_status} Canopy
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
              <span>{selectedField.farm_name}</span>
              <span>•</span>
              <MapPin className="w-3.5 h-3.5 text-emerald-400 inline" />
              <span>Centroid: [{selectedField.center.map(c => c.toFixed(4)).join(', ')}]</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <DemoBadge text="DEMO SATELLITE & SOIL MODEL" />
            <select
              value={selectedField.id}
              onChange={(e) => {
                const found = fields.find(f => f.id === e.target.value);
                if (found) setSelectedField(found);
              }}
              className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 font-medium"
            >
              {fields.map(f => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Parameter Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-1">
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Crop Type</span>
            <span className="text-sm font-bold text-slate-100">{selectedField.crop}</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">{selectedField.crop_variety}</span>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Field Area</span>
            <span className="text-sm font-bold text-emerald-400">{selectedField.area} Acres</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">({(selectedField.area * 0.404686).toFixed(2)} Ha)</span>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Sowing Date</span>
            <span className="text-xs font-semibold text-slate-200">{selectedField.sowing_date}</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Harvest: {selectedField.expected_harvest_date}</span>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Soil Type</span>
            <span className="text-xs font-semibold text-slate-200">{selectedField.soil_type}</span>
            <span className="text-[10px] text-emerald-400 block mt-0.5">pH: {soil.ph} ({soil.ph_status})</span>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Topsoil Moisture</span>
            <span className={`text-sm font-bold ${soil.moisture < 20 ? 'text-red-400' : 'text-emerald-400'}`}>{soil.moisture}%</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">{soil.moisture_status}</span>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Mean NDVI</span>
            <span className="text-sm font-bold text-emerald-400 font-mono">{ndviStats.mean}</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Min: {ndviStats.min} | Max: {ndviStats.max}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Spatial NDVI Overlay Map + Satellite Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Spatial Map Canvas (8 cols) */}
        <div className="lg:col-span-8 bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                Satellite Spatial NDVI Grid Heatmap
              </h3>
              <p className="text-xs text-amber-300 flex items-center gap-1 font-semibold mt-0.5">
                <Info className="w-3 h-3" />
                DEMO DATA – Simulated satellite-derived vegetation index grid
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-300 font-medium">Date:</label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2 py-1 font-medium"
              >
                <option value="2026-08-15">Aug 15, 2026 (Latest)</option>
                <option value="2026-08-01">Aug 01, 2026</option>
                <option value="2026-07-15">Jul 15, 2026</option>
              </select>

              <button
                onClick={() => setShowNdviGrid(!showNdviGrid)}
                className={`text-xs px-3 py-1 rounded-lg border font-semibold transition-colors ${
                  showNdviGrid 
                    ? 'bg-emerald-600 text-white border-emerald-500' 
                    : 'bg-slate-900 text-slate-300 border-slate-700'
                }`}
              >
                {showNdviGrid ? 'Grid On' : 'Grid Off'}
              </button>
            </div>
          </div>

          <FieldMap
            fields={[selectedField]}
            selectedField={selectedField}
            showNdviGrid={showNdviGrid}
            height="h-[460px]"
          />
        </div>

        {/* Satellite Health Breakdown & Trend (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Spatial Breakdown Progress Bars */}
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-700 pb-2">
              Field Canopy Spatial Breakdown
            </h3>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Healthy Canopy (≥ 0.60)
                  </span>
                  <span className="font-bold text-slate-200">{ndviStats.healthyPct}%</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${ndviStats.healthyPct}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-amber-400 font-medium flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Moderate (0.35 - 0.59)
                  </span>
                  <span className="font-bold text-slate-200">{ndviStats.moderatePct}%</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 transition-all duration-500" style={{ width: `${ndviStats.moderatePct}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-red-400 font-medium flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Stressed (&lt; 0.35)
                  </span>
                  <span className="font-bold text-slate-200">{ndviStats.stressedPct}%</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 transition-all duration-500" style={{ width: `${ndviStats.stressedPct}%` }}></div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/50 text-xs text-slate-400 space-y-1">
              <div className="font-semibold text-slate-300">Spatial Grid Resolution</div>
              <div>16 Synthetic Grid Cells @ 10m Sentinel-2 Equiv.</div>
            </div>
          </div>

          {/* Temporal NDVI History Chart */}
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 shadow-xl space-y-3">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Seasonal NDVI Trend
            </h3>

            <div className="h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ndviTrend}>
                  <defs>
                    <linearGradient id="colorNdviDetail" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="date" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                  <YAxis domain={[0, 1]} stroke="#94a3b8" tick={{ fontSize: 10 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem' }}
                    labelStyle={{ color: '#f8fafc', fontWeight: 'bold', fontSize: '11px' }}
                  />
                  <Area type="monotone" dataKey="ndvi" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorNdviDetail)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded 3-Card Summary Grid: Recommendations, Soil/Weather, Profitability */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recommendation Engine Card */}
        <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-700 pb-2">
            <h4 className="font-bold text-slate-100 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              Explainable Recommendation
            </h4>
            <button 
              onClick={() => setActiveTab('recommendations')}
              className="text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              Full Hub →
            </button>
          </div>

          {recommendations.length > 0 ? (
            <div className="space-y-2 text-xs">
              <div className="font-semibold text-slate-200">{recommendations[0].observation}</div>
              <div className="p-2.5 bg-amber-950/20 border border-amber-800/40 rounded-xl text-amber-300">
                <span className="font-bold block text-[11px]">Suggested Action:</span>
                <p className="mt-0.5">{recommendations[0].recommendedAction}</p>
              </div>
              <p className="text-[10px] text-slate-400 italic">
                *Non-diagnostic guidance for field verification.
              </p>
            </div>
          ) : (
            <p className="text-xs text-slate-400">No active alerts. Crop growth conditions optimal.</p>
          )}
        </div>

        {/* Soil & Weather Snapshot */}
        <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-700 pb-2">
            <h4 className="font-bold text-slate-100 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-blue-400" />
              Soil & Micro-Climate
            </h4>
            <button 
              onClick={() => setActiveTab('soil-crop')}
              className="text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              Details →
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400 text-[10px] block">NITROGEN (N)</span>
              <span className={`font-bold ${soil.nitrogen < 50 ? 'text-amber-400' : 'text-slate-200'}`}>{soil.nitrogen} mg/kg</span>
            </div>
            <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400 text-[10px] block">PHOSPHORUS (P)</span>
              <span className="font-bold text-slate-200">{soil.phosphorus} mg/kg</span>
            </div>
            <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400 text-[10px] block">AIR TEMP</span>
              <span className="font-bold text-slate-200">{weather.temperature}°C</span>
            </div>
            <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400 text-[10px] block">RAINFALL (24H)</span>
              <span className="font-bold text-blue-400">{weather.rainfall} mm</span>
            </div>
          </div>
        </div>

        {/* Profitability Snapshot */}
        <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-700 pb-2">
            <h4 className="font-bold text-slate-100 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              Profitability Outlook
            </h4>
            <button 
              onClick={() => setActiveTab('financials')}
              className="text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              Financials →
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Total Input Expenses:</span>
              <span className="font-semibold text-slate-200">${totalCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Gross Expected Revenue:</span>
              <span className="font-semibold text-emerald-400">${revenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-700">
              <span className="font-bold text-slate-200">Estimated Net Profit:</span>
              <span className={`font-mono font-bold text-sm ${netProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                ${netProfit.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
