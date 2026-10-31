import React from 'react';

export const MapLegend = ({ title = "NDVI Vegetation Classification" }) => {
  return (
    <div className="bg-slate-900/90 backdrop-blur border border-slate-700/80 rounded-lg p-3 text-xs shadow-xl space-y-2">
      <div className="font-semibold text-slate-200 border-b border-slate-800 pb-1 flex items-center justify-between gap-2">
        <span>{title}</span>
        <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">DEMO</span>
      </div>
      
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-emerald-500 inline-block border border-emerald-400"></span>
            <span className="text-slate-300 font-medium">Healthy Canopy</span>
          </div>
          <span className="text-slate-400 font-mono text-[11px]">NDVI ≥ 0.60</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-amber-500 inline-block border border-amber-400"></span>
            <span className="text-slate-300 font-medium">Moderate Dense</span>
          </div>
          <span className="text-slate-400 font-mono text-[11px]">0.35 - 0.59</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-red-500 inline-block border border-red-400"></span>
            <span className="text-slate-300 font-medium">Stressed / Bare</span>
          </div>
          <span className="text-slate-400 font-mono text-[11px]">NDVI &lt; 0.35</span>
        </div>
      </div>
    </div>
  );
};
