import React from 'react';
import { CropSuitabilityCard } from './CropSuitabilityCard';
import { analyzeSoilSnapshot } from '../../utils/soilAnalysisUtils';
import { Trophy, Activity, ShieldAlert, Sparkles, Sprout } from 'lucide-react';

export const SuitabilityResults = ({ soilInputs, suitabilityResults }) => {
  if (!suitabilityResults || suitabilityResults.length === 0) return null;

  const top3 = suitabilityResults.slice(0, 3);
  const soilSnapshot = analyzeSoilSnapshot(soilInputs);

  return (
    <div className="space-y-6">
      {/* Disclaimer Banner - Mandatory Requirement */}
      <div className="bg-amber-950/30 border border-amber-800/60 rounded-2xl p-4 flex items-start gap-3 shadow-lg">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <h4 className="font-bold text-amber-300">Prototype Suitability Disclaimer</h4>
          <p className="text-amber-200/80 leading-relaxed">
            Prototype suitability estimate — crop suitability depends on local climate, season, variety, irrigation access, soil conditions, and regional agronomic practices. Consult local agricultural extension officers and formal soil laboratory recommendations before making planting decisions.
          </p>
        </div>
      </div>

      {/* Top 3 Recommended Crops Summary + Soil Snapshot Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top 3 Leaderboard (7 cols) */}
        <div className="lg:col-span-7 bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-700 pb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-slate-100 text-base">Top Recommended Crops</h3>
            </div>
            <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
              Optimal Match
            </span>
          </div>

          <div className="space-y-3">
            {top3.map((crop, index) => (
              <div 
                key={crop.id}
                className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 flex items-center justify-between gap-4 shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-sm flex items-center justify-center font-mono">
                    #{index + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-100 text-sm flex items-center gap-1.5">
                      <span>{crop.cropSymbol}</span>
                      <span>{crop.cropName}</span>
                    </h4>
                    <span className="text-[10px] text-slate-400">{crop.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${crop.badgeColor}`}>
                    {crop.suitabilityLevel}
                  </span>
                  <span className="font-bold font-mono text-emerald-400 text-lg">
                    {crop.suitabilityScore}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Soil Health Snapshot Card (5 cols) */}
        <div className="lg:col-span-5 bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-700 pb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-slate-100 text-base">Soil Health Snapshot</h3>
            </div>
            <span className="text-xs text-slate-400">Lab Test Inputs</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">NITROGEN (N)</span>
              <span className="font-bold text-slate-100 font-mono mt-0.5 block">{soilInputs.nitrogen} kg/ha</span>
              <span className="text-[10px] text-emerald-400 block mt-0.5">{soilSnapshot.nitrogen}</span>
            </div>

            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">PHOSPHORUS (P)</span>
              <span className="font-bold text-slate-100 font-mono mt-0.5 block">{soilInputs.phosphorus} kg/ha</span>
              <span className="text-[10px] text-emerald-400 block mt-0.5">{soilSnapshot.phosphorus}</span>
            </div>

            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">POTASSIUM (K)</span>
              <span className="font-bold text-slate-100 font-mono mt-0.5 block">{soilInputs.potassium} kg/ha</span>
              <span className="text-[10px] text-emerald-400 block mt-0.5">{soilSnapshot.potassium}</span>
            </div>

            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">SOIL PH</span>
              <span className="font-bold text-emerald-400 font-mono mt-0.5 block">{soilInputs.ph} pH</span>
              <span className="text-[10px] text-slate-300 block mt-0.5">{soilSnapshot.ph}</span>
            </div>

            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">MOISTURE</span>
              <span className="font-bold text-blue-400 font-mono mt-0.5 block">{soilInputs.moisture}%</span>
              <span className="text-[10px] text-slate-300 block mt-0.5">{soilSnapshot.moisture}</span>
            </div>

            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">ORGANIC MATTER</span>
              <span className="font-bold text-slate-100 font-mono mt-0.5 block">{soilInputs.organicMatter}%</span>
              <span className="text-[10px] text-emerald-400 block mt-0.5">{soilSnapshot.organicMatter}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Full Evaluated Crops List Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
            <Sprout className="w-5 h-5 text-emerald-400" />
            Complete Crop Suitability Evaluation ({suitabilityResults.length} Crops Evaluated)
          </h3>
          <span className="text-xs text-slate-400">Sorted Highest to Lowest Score</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suitabilityResults.map((cropResult) => (
            <CropSuitabilityCard key={cropResult.id} cropResult={cropResult} />
          ))}
        </div>
      </div>
    </div>
  );
};
