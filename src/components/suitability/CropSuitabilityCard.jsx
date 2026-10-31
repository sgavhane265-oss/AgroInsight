import React from 'react';
import { Check, AlertTriangle, X, Info } from 'lucide-react';

export const CropSuitabilityCard = ({ cropResult }) => {
  const {
    cropName,
    cropSymbol,
    category,
    suitabilityScore,
    suitabilityLevel,
    badgeColor,
    matchedFactors,
    limitingFactors,
    explanation,
    description
  } = cropResult;

  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-emerald-500 text-emerald-400';
    if (score >= 60) return 'bg-blue-500 text-blue-400';
    if (score >= 40) return 'bg-amber-500 text-amber-400';
    return 'bg-red-500 text-red-400';
  };

  return (
    <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 shadow-xl space-y-4 hover:border-slate-500 transition-all">
      {/* Card Header */}
      <div className="flex items-start justify-between gap-3 border-b border-slate-700 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-xl shadow">
            {cropSymbol}
          </div>
          <div>
            <h4 className="font-bold text-slate-100 text-base">{cropName}</h4>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">{category}</span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xl font-bold font-mono text-slate-100">{suitabilityScore}%</div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${badgeColor}`}>
            {suitabilityLevel}
          </span>
        </div>
      </div>

      {/* Suitability Score Bar */}
      <div className="space-y-1">
        <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${getScoreColor(suitabilityScore).split(' ')[0]}`}
            style={{ width: `${suitabilityScore}%` }}
          ></div>
        </div>
      </div>

      {/* Matched Factors (Checkmarks) */}
      {matchedFactors && matchedFactors.length > 0 && (
        <div className="space-y-1.5 text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">Favorable Soil Conditions</span>
          <div className="space-y-1">
            {matchedFactors.map((factor, idx) => (
              <div key={idx} className="flex items-start gap-2 text-slate-300">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{factor}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Limiting Factors (Warnings/Discrepancies) */}
      {limitingFactors && limitingFactors.length > 0 && (
        <div className="space-y-1.5 text-xs pt-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">Limiting Soil Factors</span>
          <div className="space-y-1">
            {limitingFactors.map((factor, idx) => (
              <div key={idx} className="flex items-start gap-2 text-slate-300">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{factor}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Explanation Footer */}
      <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 italic">
        {description || explanation}
      </div>
    </div>
  );
};
