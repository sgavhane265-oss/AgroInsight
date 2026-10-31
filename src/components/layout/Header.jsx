import React from 'react';
import { Search, Bell, MapPin, Calendar } from 'lucide-react';
import { DemoBadge } from '../common/DemoBadge';

export const Header = ({ fields, selectedField, setSelectedField, alerts, activeTab }) => {
  const tabTitles = {
    dashboard: 'Executive Farm Dashboard',
    farms: 'Farm & Field Management',
    'field-detail': `Field Analysis - ${selectedField ? selectedField.name : 'Select a Field'}`,
    'soil-crop': 'Soil Chemistry & Crop Health',
    recommendations: 'Explainable Recommendation Hub',
    financials: 'Farm Profitability & Financial Analysis'
  };

  const currentDateStr = 'Aug 18, 2026';

  return (
    <header className="h-16 bg-slate-900/90 backdrop-blur border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Title & Page Context */}
      <div>
        <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
          {tabTitles[activeTab] || 'AgroInsight'}
        </h2>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
          <span>{selectedField ? `${selectedField.farm_name} • ${selectedField.crop}` : 'Global Overview'}</span>
        </div>
      </div>

      {/* Center Demo Badge & Search */}
      <div className="hidden lg:flex items-center gap-4">
        <DemoBadge text="DEMO MODE – Synthetic Satellite & Soil Data" />
        
        {/* Quick Field Switcher */}
        <div className="relative">
          <select
            value={selectedField ? selectedField.id : ''}
            onChange={(e) => {
              const f = fields.find(item => item.id === e.target.value);
              if (f) setSelectedField(f);
            }}
            className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-emerald-500 font-medium cursor-pointer"
          >
            {fields.map(f => (
              <option key={f.id} value={f.id}>
                {f.name} ({f.crop} - {f.area} ac)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-slate-800/60 border border-slate-700/60 rounded-lg text-xs text-slate-300">
          <Calendar className="w-3.5 h-3.5 text-emerald-400" />
          <span>{currentDateStr}</span>
        </div>

        {/* Notifications Icon with Badge */}
        <div className="relative">
          <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-colors">
            <Bell className="w-4 h-4" />
            {alerts && alerts.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                {alerts.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
