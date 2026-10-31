import React, { useState } from 'react';
import { RecommendationEngine } from '../services/recommendationEngine';
import { DemoBadge } from '../components/common/DemoBadge';
import { 
  Lightbulb, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Search, 
  ArrowRight, 
  HelpCircle,
  Cpu,
  Check
} from 'lucide-react';

export const RecommendationsPage = ({ 
  selectedField, 
  fields, 
  setSelectedField, 
  soilRecords, 
  weatherData 
}) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const field = selectedField || fields[0];
  const soil = soilRecords[field.id] || soilRecords['field-1'];
  const weather = weatherData[field.id] || weatherData['field-1'];

  // Generate explainable recommendations
  const allRecommendations = RecommendationEngine.generateRecommendations(field, soil, weather);

  const categories = ['All', 'Irrigation & Water Management', 'Nutrient & Soil Fertility', 'Weather & Climate Adaptation', 'Soil Chemistry'];

  const filteredRecs = activeCategory === 'All' 
    ? allRecommendations 
    : allRecommendations.filter(r => r.category === activeCategory);

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 shadow-xl">
        <div>
          <h1 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            Explainable Recommendation Engine
          </h1>
          <p className="text-xs text-slate-400">
            Rule-based agronomic inference matrix translating multispectral NDVI & soil data into ground verification guidance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <DemoBadge text="TRANSPARENT RULE-BASED ENGINE" />
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

      {/* Safety Disclaimer Banner - Mandatory Requirement */}
      <div className="bg-amber-950/30 border border-amber-800/60 rounded-2xl p-4 flex items-start gap-3 shadow-lg">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <h4 className="font-bold text-amber-300">Agricultural Decision Support Notice & Framing Disclaimer</h4>
          <p className="text-amber-200/80 leading-relaxed">
            Recommendations are generated using transparent decision-tree rules evaluating satellite vegetation indices, soil test chemistry, and weather parameters. Outputs strictly present <strong>possible contributing factors</strong> and <strong>suggested verification actions</strong>. Satellite imagery and proxy indices do NOT constitute guaranteed or definitive diagnostic advice.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs px-3 py-1.5 rounded-xl border font-semibold transition-all ${
              activeCategory === cat 
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-950' 
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {filteredRecs.length > 0 ? (
          filteredRecs.map((rec) => (
            <div 
              key={rec.id}
              className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-xl space-y-4 hover:border-slate-500 transition-all"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">{rec.category}</span>
                    <h3 className="font-bold text-slate-100 text-sm">{rec.observation}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-700">
                    {rec.confidence}
                  </span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    rec.priority === 'High' 
                      ? 'bg-red-500/20 text-red-400 border-red-500/40' 
                      : rec.priority === 'Medium'
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  }`}>
                    {rec.priority} Priority
                  </span>
                </div>
              </div>

              {/* Grid: Possible Factors vs Recommended Verification */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Factors */}
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50 space-y-2">
                  <h4 className="font-bold text-slate-200 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-amber-400" />
                    Possible Contributing Factors
                  </h4>
                  <ul className="space-y-1.5 text-slate-300">
                    {rec.possibleFactors.map((factor, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended Actions */}
                <div className="bg-emerald-950/20 p-4 rounded-xl border border-emerald-800/40 space-y-2">
                  <h4 className="font-bold text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Suggested Verification & Ground Scouting Action
                  </h4>
                  <p className="text-slate-200 font-medium leading-relaxed">
                    {rec.recommendedAction}
                  </p>
                </div>
              </div>

              {/* Footer Disclaimer */}
              <div className="text-[10px] text-slate-500 italic flex items-center justify-between border-t border-slate-800 pt-2">
                <span>Rule Reference: AGRI-RULE-MATRIX-2026</span>
                <span>{rec.disclaimer}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center bg-slate-800/60 border border-slate-700 rounded-2xl text-slate-400">
            No active recommendation rules triggered for this field. Crop conditions within normal parameters.
          </div>
        )}
      </div>
    </div>
  );
};
