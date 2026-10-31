import React from 'react';
import { DemoBadge } from '../components/common/DemoBadge';
import { 
  Sprout, 
  Droplets, 
  CloudRain, 
  Sun, 
  Wind, 
  CheckCircle2, 
  AlertCircle, 
  Thermometer,
  TestTube
} from 'lucide-react';

export const SoilCropPage = ({ 
  selectedField, 
  fields, 
  setSelectedField, 
  soilRecords, 
  weatherData 
}) => {
  const field = selectedField || fields[0];
  const soil = soilRecords[field.id] || soilRecords['field-1'];
  const weather = weatherData[field.id] || weatherData['field-1'];

  const getStatusBadge = (status) => {
    if (status === 'Optimal') return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
    if (status === 'Low' || status === 'Slightly Acidic') return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
    return 'bg-red-500/20 text-red-400 border-red-500/40';
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 shadow-xl">
        <div>
          <h1 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            Soil Chemistry & Micro-Climate Analytics
          </h1>
          <p className="text-xs text-slate-400">
            Topsoil nutrients (NPK), pH balances, moisture saturation, and weather trends for {field.name}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <DemoBadge text="DEMO SOIL & WEATHER MODELS" />
          <select
            value={field.id}
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

      {/* Soil Nutrients Grid */}
      <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-700 pb-3">
          <div className="flex items-center gap-2">
            <TestTube className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-slate-100 text-sm">Topsoil Chemical & Physical Properties</h3>
          </div>
          <span className="text-xs text-slate-400">Sampled: {soil.recorded_at}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Nitrogen */}
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">Nitrogen (N)</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getStatusBadge(soil.nitrogen_status)}`}>
                {soil.nitrogen_status}
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-100 font-mono">
              {soil.nitrogen} <span className="text-xs font-normal text-slate-400">mg/kg</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500" style={{ width: `${Math.min(100, (soil.nitrogen / 80) * 100)}%` }}></div>
            </div>
            <p className="text-[11px] text-slate-400">Target Range: 50 - 80 mg/kg</p>
          </div>

          {/* Phosphorus */}
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">Phosphorus (P)</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getStatusBadge(soil.phosphorus_status)}`}>
                {soil.phosphorus_status}
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-100 font-mono">
              {soil.phosphorus} <span className="text-xs font-normal text-slate-400">mg/kg</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500" style={{ width: `${Math.min(100, (soil.phosphorus / 45) * 100)}%` }}></div>
            </div>
            <p className="text-[11px] text-slate-400">Target Range: 25 - 45 mg/kg</p>
          </div>

          {/* Potassium */}
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">Potassium (K)</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getStatusBadge(soil.potassium_status)}`}>
                {soil.potassium_status}
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-100 font-mono">
              {soil.potassium} <span className="text-xs font-normal text-slate-400">mg/kg</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500" style={{ width: `${Math.min(100, (soil.potassium / 250) * 100)}%` }}></div>
            </div>
            <p className="text-[11px] text-slate-400">Target Range: 150 - 250 mg/kg</p>
          </div>

          {/* pH */}
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">Soil pH Scale</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getStatusBadge(soil.ph_status)}`}>
                {soil.ph_status}
              </span>
            </div>
            <div className="text-2xl font-bold text-emerald-400 font-mono">
              {soil.ph} <span className="text-xs font-normal text-slate-400">pH</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500" style={{ width: `${(soil.ph / 14) * 100}%` }}></div>
            </div>
            <p className="text-[11px] text-slate-400">Optimal Range: 6.0 - 7.2</p>
          </div>

          {/* Moisture */}
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">Soil Volumetric Moisture</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getStatusBadge(soil.moisture_status)}`}>
                {soil.moisture_status}
              </span>
            </div>
            <div className="text-2xl font-bold text-blue-400 font-mono">
              {soil.moisture}% <span className="text-xs font-normal text-slate-400">VWC</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500" style={{ width: `${soil.moisture}%` }}></div>
            </div>
            <p className="text-[11px] text-slate-400">Optimal Range: 30% - 45%</p>
          </div>

          {/* Organic Matter */}
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">Soil Organic Matter</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getStatusBadge(soil.organic_matter_status)}`}>
                {soil.organic_matter_status}
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-100 font-mono">
              {soil.organic_matter}% <span className="text-xs font-normal text-slate-400">SOM</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500" style={{ width: `${(soil.organic_matter / 5) * 100}%` }}></div>
            </div>
            <p className="text-[11px] text-slate-400">Target Range: 3.0% - 5.0%</p>
          </div>
        </div>
      </div>

      {/* Weather Forecast Widget */}
      <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700 pb-3">
          <div>
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <Sun className="w-5 h-5 text-amber-400" />
              Micro-Climate Weather Observations & 5-Day Forecast
            </h3>
            <p className="text-xs text-slate-400">{field.farm_name} Field Station</p>
          </div>
          <DemoBadge text="DEMO WEATHER API" />
        </div>

        {/* Current Weather Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60 text-center">
            <Thermometer className="w-5 h-5 text-amber-400 mx-auto mb-1" />
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Air Temperature</span>
            <span className="text-xl font-bold text-slate-100 font-mono">{weather.temperature}°C</span>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60 text-center">
            <Droplets className="w-5 h-5 text-blue-400 mx-auto mb-1" />
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Relative Humidity</span>
            <span className="text-xl font-bold text-slate-100 font-mono">{weather.humidity}%</span>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60 text-center">
            <CloudRain className="w-5 h-5 text-indigo-400 mx-auto mb-1" />
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">24H Rainfall</span>
            <span className="text-xl font-bold text-blue-400 font-mono">{weather.rainfall} mm</span>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60 text-center">
            <Wind className="w-5 h-5 text-teal-400 mx-auto mb-1" />
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Wind Speed</span>
            <span className="text-xl font-bold text-slate-100 font-mono">{weather.wind_speed} km/h</span>
          </div>
        </div>

        {/* 5-Day Forecast Stack */}
        <div>
          <h4 className="text-xs font-bold text-slate-300 mb-3 uppercase tracking-wider">5-Day Meteorological Forecast</h4>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {weather.forecast.map((day, idx) => (
              <div key={idx} className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/50 text-center space-y-1.5">
                <span className="font-bold text-slate-200 text-xs block">{day.day}</span>
                <span className="text-[11px] text-slate-400 block">{day.condition}</span>
                <div className="text-sm font-bold text-slate-100 font-mono pt-1">
                  {day.temp_max}° <span className="text-xs text-slate-500">{day.temp_min}°</span>
                </div>
                <div className="text-[10px] text-blue-400 font-semibold bg-blue-500/10 py-0.5 rounded border border-blue-500/20">
                  {day.rainfall_prob}% Rain
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
