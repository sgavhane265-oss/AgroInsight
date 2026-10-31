import React from 'react';

export const StatCard = ({ title, value, subtext, icon: Icon, trend, color = 'emerald' }) => {
  const colorStyles = {
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    red: 'bg-red-500/10 text-red-400 border-red-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  };

  return (
    <div className="bg-slate-800/80 backdrop-blur border border-slate-700/60 rounded-xl p-5 shadow-lg transition-all duration-200 hover:border-slate-600">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</span>
        {Icon && (
          <div className={`p-2.5 rounded-lg border ${colorStyles[color] || colorStyles.emerald}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      
      <div className="mt-3 flex items-baseline justify-between">
        <div className="text-2xl font-bold text-slate-100 tracking-tight">{value}</div>
        {trend && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            trend.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}>
            {trend}
          </span>
        )}
      </div>

      {subtext && (
        <p className="mt-2 text-xs text-slate-400 truncate">{subtext}</p>
      )}
    </div>
  );
};
