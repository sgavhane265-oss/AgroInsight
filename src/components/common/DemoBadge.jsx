import React from 'react';
import { Info, Sparkles } from 'lucide-react';

export const DemoBadge = ({ text = "DEMO DATA – Simulated Satellite & Weather Model", className = "" }) => {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30 backdrop-blur-sm ${className}`}>
      <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
      <span>{text}</span>
      <Info className="w-3 h-3 text-amber-400/70" />
    </div>
  );
};
