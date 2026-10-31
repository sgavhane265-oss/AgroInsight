import React from 'react';
import { AVAILABLE_SOIL_TYPES, DEFAULT_SOIL_INPUTS } from '../../config/suitabilityConfig';
import { TestTube, Save, RotateCcw, Sparkles, Info } from 'lucide-react';

export const SoilInputForm = ({ 
  soilInputs, 
  setSoilInputs, 
  onAnalyze, 
  onSave, 
  onReset 
}) => {
  const handleChange = (field, value) => {
    setSoilInputs(prev => ({
      ...prev,
      [field]: field === 'soilType' ? value : parseFloat(value) || 0
    }));
  };

  return (
    <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-xl space-y-5">
      {/* Title & Source Separation Callout */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-700 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <TestTube className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-base">Enter Soil Test Parameters</h3>
            <p className="text-xs text-slate-400">Input values from laboratory soil analysis reports</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={onReset}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 font-medium flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            type="button"
            onClick={onSave}
            className="px-3 py-1.5 bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-700 rounded-lg font-medium flex items-center gap-1.5 transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Soil Test</span>
          </button>
        </div>
      </div>

      {/* Data Source Notice */}
      <div className="p-3 bg-slate-900/60 border border-slate-700/60 rounded-xl text-xs text-slate-300 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-slate-200 block">Data Sources Separation Notice</span>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            <strong className="text-emerald-400">Soil Test Data</strong> is entered manually from soil lab reports for crop suitability matching. <strong className="text-amber-400">Satellite NDVI Data</strong> monitors live vegetation canopy health. <strong className="text-blue-400">Weather Data</strong> provides environmental context.
          </p>
        </div>
      </div>

      {/* Input Form Fields */}
      <form onSubmit={(e) => { e.preventDefault(); onAnalyze(); }} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Nitrogen */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Nitrogen (N) <span className="text-slate-500 font-normal">(kg/ha)</span>
            </label>
            <input
              type="number"
              step="1"
              required
              value={soilInputs.nitrogen}
              onChange={(e) => handleChange('nitrogen', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-slate-100 text-xs font-mono rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Phosphorus */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Phosphorus (P) <span className="text-slate-500 font-normal">(kg/ha)</span>
            </label>
            <input
              type="number"
              step="1"
              required
              value={soilInputs.phosphorus}
              onChange={(e) => handleChange('phosphorus', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-slate-100 text-xs font-mono rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Potassium */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Potassium (K) <span className="text-slate-500 font-normal">(kg/ha)</span>
            </label>
            <input
              type="number"
              step="1"
              required
              value={soilInputs.potassium}
              onChange={(e) => handleChange('potassium', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-slate-100 text-xs font-mono rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Soil pH */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Soil pH <span className="text-slate-500 font-normal">(3.0 - 10.0)</span>
            </label>
            <input
              type="number"
              step="0.1"
              required
              value={soilInputs.ph}
              onChange={(e) => handleChange('ph', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-slate-100 text-xs font-mono rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Soil Moisture */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Soil Moisture <span className="text-slate-500 font-normal">(%)</span>
            </label>
            <input
              type="number"
              step="1"
              required
              value={soilInputs.moisture}
              onChange={(e) => handleChange('moisture', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-slate-100 text-xs font-mono rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Organic Matter */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Organic Matter <span className="text-slate-500 font-normal">(%)</span>
            </label>
            <input
              type="number"
              step="0.1"
              required
              value={soilInputs.organicMatter}
              onChange={(e) => handleChange('organicMatter', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-slate-100 text-xs font-mono rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Soil Type Dropdown */}
        <div className="pt-2">
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Soil Texture / Type Classification
          </label>
          <select
            value={soilInputs.soilType}
            onChange={(e) => handleChange('soilType', e.target.value)}
            className="w-full sm:w-1/2 bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 font-medium cursor-pointer"
          >
            {AVAILABLE_SOIL_TYPES.map(type => (
              <option key={type} value={type}>{type} Soil</option>
            ))}
          </select>
        </div>

        {/* Analyze Action Button */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-6 py-2.5 rounded-xl shadow-lg shadow-emerald-950 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Analyze Soil & Recommend Crops</span>
          </button>
        </div>
      </form>
    </div>
  );
};
