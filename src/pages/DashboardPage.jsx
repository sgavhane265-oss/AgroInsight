import React from 'react';
import { StatCard } from '../components/common/StatCard';
import { FieldMap } from '../components/map/FieldMap';
import { DemoBadge } from '../components/common/DemoBadge';
import { 
  Tractor, 
  Map as MapIcon, 
  Sprout, 
  Activity, 
  AlertTriangle, 
  ArrowRight,
  TrendingUp,
  Droplets,
  Zap
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { defaultSatelliteService } from '../services/satelliteService';

export const DashboardPage = ({ 
  farms, 
  fields, 
  selectedField, 
  setSelectedField, 
  alerts, 
  setActiveTab 
}) => {
  const totalFarms = farms.length;
  const totalFields = fields.length;
  const totalAcres = fields.reduce((sum, f) => sum + f.area, 0).toFixed(1);
  const avgNdvi = (fields.reduce((sum, f) => sum + f.mean_ndvi, 0) / (fields.length || 1)).toFixed(2);
  const healthyCount = fields.filter(f => f.health_status === 'Healthy').length;

  const trendData = defaultSatelliteService.getNDVIHistory(selectedField?.id, selectedField?.mean_ndvi);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner Alert */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border border-emerald-800/60 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">Precision Decision Support System</h1>
            <DemoBadge text="SIMULATED DEMO DATA" />
          </div>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            AgroInsight synthesizes field boundary geospatial data, satellite-derived vegetation indices (NDVI), topsoil nutrients, and micro-climate observations into transparent, non-diagnostic agricultural guidance.
          </p>
        </div>
        <button 
          onClick={() => setActiveTab('recommendations')}
          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-950 flex items-center gap-2 transition-all whitespace-nowrap"
        >
          <span>View Active Recommendations</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Farms" 
          value={totalFarms} 
          subtext="2 Active Locations"
          icon={Tractor}
          color="emerald"
        />
        <StatCard 
          title="Monitored Fields" 
          value={totalFields} 
          subtext={`${totalAcres} Total Acres`}
          icon={MapIcon}
          color="indigo"
        />
        <StatCard 
          title="Active Crops" 
          value="4 Varieties" 
          subtext="Soybean, Wheat, Cotton, Corn"
          icon={Sprout}
          color="blue"
        />
        <StatCard 
          title="Avg NDVI Health" 
          value={avgNdvi} 
          trend={`${healthyCount}/${totalFields} Fields Healthy`}
          subtext="Satellite Vegetation Index"
          icon={Activity}
          color={avgNdvi >= 0.6 ? 'emerald' : 'amber'}
        />
      </div>

      {/* Main Split Content: Map & Trend Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Field Map (2 Cols) */}
        <div className="lg:col-span-2 bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <MapIcon className="w-4 h-4 text-emerald-400" />
                Geospatial Field Boundaries Map
              </h3>
              <p className="text-xs text-slate-400">Click any field boundary polygon to view localized spatial health</p>
            </div>
            <button 
              onClick={() => setActiveTab('farms')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
            >
              <span>Manage Fields</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <FieldMap 
            fields={fields} 
            selectedField={selectedField} 
            onSelectField={(f) => {
              setSelectedField(f);
              setActiveTab('field-detail');
            }} 
            height="h-[420px]"
          />
        </div>

        {/* Quick Field Selection & NDVI History (1 Col) */}
        <div className="space-y-6">
          {/* Historical NDVI Trend Chart */}
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  NDVI Temporal History
                </h3>
                <p className="text-xs text-slate-400">{selectedField?.name || 'Selected Field'}</p>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                Sentinel-2
              </span>
            </div>

            <div className="h-[200px] w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorNdvi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="date" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                  <YAxis domain={[0, 1]} stroke="#94a3b8" tick={{ fontSize: 10 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem' }}
                    labelStyle={{ color: '#f8fafc', fontWeight: 'bold', fontSize: '11px' }}
                  />
                  <Area type="monotone" dataKey="ndvi" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorNdvi)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Agronomic Alerts Feed */}
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-700 pb-2">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Agronomic Field Alerts
              </h3>
              <span className="text-xs text-slate-400">{alerts.length} Active</span>
            </div>

            <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
              {alerts.map(alert => (
                <div 
                  key={alert.id}
                  onClick={() => {
                    const f = fields.find(item => item.id === alert.field_id);
                    if (f) setSelectedField(f);
                    setActiveTab('field-detail');
                  }}
                  className="bg-slate-900/60 border border-slate-700/50 hover:border-amber-500/50 p-3 rounded-xl cursor-pointer transition-all space-y-1 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-amber-300 transition-colors">
                      {alert.title}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      alert.severity === 'High' 
                        ? 'bg-red-500/20 text-red-400 border border-red-500/40' 
                        : alert.severity === 'Medium' 
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    }`}>
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2">{alert.message}</p>
                  <div className="text-[10px] text-slate-500 pt-1 flex items-center justify-between">
                    <span>{alert.field_name}</span>
                    <span>{alert.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Field Quick Cards Table */}
      <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-100 text-sm">Monitored Agricultural Fields Overview</h3>
            <p className="text-xs text-slate-400">Select any field to open its full analysis canvas</p>
          </div>
          <button 
            onClick={() => setActiveTab('farms')}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
          >
            + Add New Field
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {fields.map(field => (
            <div 
              key={field.id}
              onClick={() => {
                setSelectedField(field);
                setActiveTab('field-detail');
              }}
              className={`p-4 rounded-xl border transition-all cursor-pointer space-y-3 ${
                selectedField?.id === field.id 
                  ? 'bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-950/50' 
                  : 'bg-slate-900/60 border-slate-700/60 hover:border-slate-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-100 text-sm truncate">{field.name}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  field.health_status === 'Healthy' 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                    : field.health_status === 'Moderate'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      : 'bg-red-500/20 text-red-400 border border-red-500/40'
                }`}>
                  {field.health_status}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Crop:</span>
                  <span className="font-semibold text-white">{field.crop}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Area:</span>
                  <span className="font-medium">{field.area} Acres</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Soil:</span>
                  <span className="font-medium text-slate-300">{field.soil_type}</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-slate-800">
                  <span className="text-slate-400">NDVI:</span>
                  <span className="font-mono font-bold text-emerald-400">{field.mean_ndvi}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
