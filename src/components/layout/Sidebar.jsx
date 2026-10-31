import React from 'react';
import { 
  LayoutDashboard, 
  Tractor, 
  Map, 
  Activity, 
  Sprout, 
  Lightbulb, 
  DollarSign, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const Sidebar = ({ activeTab, setActiveTab, selectedField, farms, activeFarmId, setActiveFarmId }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'farms', label: 'Farms & Fields', icon: Tractor },
    { id: 'field-detail', label: 'Field Analysis', icon: Activity, badge: selectedField ? selectedField.name : null },
    { id: 'soil-crop', label: 'Soil & Crop', icon: Sprout },
    { id: 'recommendations', label: 'Recommendations', icon: Lightbulb },
    { id: 'financials', label: 'Financials', icon: DollarSign },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-900/30">
          <Sprout className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-lg text-white tracking-wide flex items-center gap-1">
            Agro<span className="text-emerald-400">Insight</span>
          </h1>
          <span className="text-[10px] text-emerald-400/80 uppercase font-semibold tracking-wider block">Decision-Support Platform</span>
        </div>
      </div>

      {/* Farm Selector Dropdown */}
      <div className="px-4 py-3 border-b border-slate-800/60 bg-slate-950/40">
        <label className="block text-[10px] font-semibold uppercase text-slate-400 mb-1">Active Farm</label>
        <select 
          value={activeFarmId} 
          onChange={(e) => setActiveFarmId(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-2 focus:outline-none focus:border-emerald-500 font-medium cursor-pointer"
        >
          <option value="all">All Farms (2)</option>
          {farms.map(farm => (
            <option key={farm.id} value={farm.id}>{farm.name}</option>
          ))}
        </select>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 group ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge ? (
                <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800/80 px-2 py-0.5 rounded-full max-w-[90px] truncate">
                  {item.badge}
                </span>
              ) : (
                <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'opacity-100' : ''}`} />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Prototype Indicator */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/60">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-slate-300">Prototype Mode</span>
        </div>
        <p className="text-[10px] text-slate-500 leading-tight">
          Non-diagnostic precision decision-support system. Built with local mock services.
        </p>
      </div>
    </aside>
  );
};
