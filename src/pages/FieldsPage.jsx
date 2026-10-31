import React, { useState } from 'react';
import { FieldMap } from '../components/map/FieldMap';
import { DemoBadge } from '../components/common/DemoBadge';
import { 
  Plus, 
  MapPin, 
  Sprout, 
  Calendar, 
  Layers, 
  Trash2, 
  Check, 
  Sparkles,
  Search,
  ArrowRight
} from 'lucide-react';

export const FieldsPage = ({ 
  farms, 
  fields, 
  setFields, 
  selectedField, 
  setSelectedField, 
  setActiveTab 
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form State for New Field Simulation
  const [newFieldName, setNewFieldName] = useState('Field E - South Orchard');
  const [newCrop, setNewCrop] = useState('Almonds');
  const [newArea, setNewArea] = useState(2.8);
  const [newSoilType, setNewSoilType] = useState('Silt Loam');
  const [newFarmId, setNewFarmId] = useState(farms[0]?.id || 'farm-1');
  const [newSowingDate, setNewSowingDate] = useState('2026-04-10');

  const filteredFields = fields.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.soil_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateField = (e) => {
    e.preventDefault();
    const targetFarm = farms.find(farm => farm.id === newFarmId) || farms[0];

    // Generate a demo polygon offset near farm center
    const center = targetFarm.coordinates || [42.0308, -93.6319];
    const offset = fields.length * 0.005;

    const newFieldObj = {
      id: `field-${Date.now()}`,
      farm_id: targetFarm.id,
      farm_name: targetFarm.name,
      name: newFieldName,
      crop: newCrop,
      crop_variety: 'Hybrid Standard',
      sowing_date: newSowingDate,
      expected_harvest_date: '2026-10-30',
      area: parseFloat(newArea),
      soil_type: newSoilType,
      health_status: 'Healthy',
      mean_ndvi: 0.72,
      center: [center[0] + offset, center[1] + offset],
      boundary: [
        [center[0] + offset + 0.002, center[1] + offset - 0.002],
        [center[0] + offset + 0.002, center[1] + offset + 0.002],
        [center[0] + offset - 0.002, center[1] + offset + 0.002],
        [center[0] + offset - 0.002, center[1] + offset - 0.002]
      ]
    };

    setFields([...fields, newFieldObj]);
    setSelectedField(newFieldObj);
    setShowCreateModal(false);
  };

  const handleDeleteField = (fieldId) => {
    if (fields.length <= 1) {
      alert('Cannot delete the last remaining field in the demo prototype.');
      return;
    }
    const updated = fields.filter(f => f.id !== fieldId);
    setFields(updated);
    if (selectedField?.id === fieldId) {
      setSelectedField(updated[0]);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 shadow-xl">
        <div>
          <h1 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            Farm & Field Management
          </h1>
          <p className="text-xs text-slate-400">
            Define, map, and organize field polygons stored as spatial GeoJSON geometries.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <DemoBadge text="GEOSPATIAL GeoJSON STORAGE" />
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-950/40 flex items-center gap-2 transition-all whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Draw / Add Field</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search fields, crops, soil..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800/80 border border-slate-700 text-slate-200 text-xs rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-emerald-500"
          />
        </div>
        <div className="text-xs text-slate-400 font-medium">
          Showing <span className="text-emerald-400 font-bold">{filteredFields.length}</span> of {fields.length} Fields
        </div>
      </div>

      {/* Main Grid: Interactive Map & Field Cards List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Field Boundary Viewer Map (7 cols) */}
        <div className="lg:col-span-7 bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              Field Polygons Boundary Map
            </h3>
            <span className="text-xs text-slate-400">Click field polygon to inspect</span>
          </div>

          <FieldMap
            fields={filteredFields}
            selectedField={selectedField}
            onSelectField={(f) => {
              setSelectedField(f);
              setActiveTab('field-detail');
            }}
            height="h-[520px]"
          />
        </div>

        {/* Fields Cards List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="font-bold text-slate-100 text-sm">Monitored Fields Catalogue</div>

          <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
            {filteredFields.map((field) => {
              const isSelected = selectedField?.id === field.id;
              return (
                <div
                  key={field.id}
                  className={`p-4 rounded-xl border transition-all space-y-3 ${
                    isSelected
                      ? 'bg-emerald-950/40 border-emerald-500 shadow-xl'
                      : 'bg-slate-800/80 border-slate-700/60 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-100 text-sm">{field.name}</h4>
                      <p className="text-xs text-slate-400">{field.farm_name}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        field.health_status === 'Healthy'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : field.health_status === 'Moderate'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                            : 'bg-red-500/20 text-red-400 border border-red-500/40'
                      }`}>
                        {field.health_status}
                      </span>
                      <button
                        onClick={() => handleDeleteField(field.id)}
                        className="text-slate-500 hover:text-red-400 p-1 transition-colors"
                        title="Delete Field Polygon"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                    <div>
                      <span className="text-slate-400 block text-[10px]">CROP & VARIETY</span>
                      <span className="font-semibold text-slate-200">{field.crop}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">TOTAL AREA</span>
                      <span className="font-semibold text-emerald-400">{field.area} Acres</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">SOIL CLASSIFICATION</span>
                      <span className="font-medium text-slate-300">{field.soil_type}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">MEAN NDVI</span>
                      <span className="font-mono font-bold text-emerald-400">{field.mean_ndvi}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      Sown: {field.sowing_date}
                    </span>

                    <button
                      onClick={() => {
                        setSelectedField(field);
                        setActiveTab('field-detail');
                      }}
                      className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors shadow"
                    >
                      <span>Analyze Field</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Field Creation Modal Simulator */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-base">Define New Field Boundary</h3>
                  <p className="text-xs text-slate-400">Simulate polygon mapping & area auto-calculation</p>
                </div>
              </div>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateField} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Field Name</label>
                <input
                  type="text"
                  required
                  value={newFieldName}
                  onChange={(e) => setNewFieldName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Crop Type</label>
                  <select
                    value={newCrop}
                    onChange={(e) => setNewCrop(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Soybean">Soybean</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Corn">Corn</option>
                    <option value="Almonds">Almonds</option>
                    <option value="Canola">Canola</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Field Area (Acres)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newArea}
                    onChange={(e) => setNewArea(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Soil Type</label>
                  <select
                    value={newSoilType}
                    onChange={(e) => setNewSoilType(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Silt Loam">Silt Loam</option>
                    <option value="Clay Loam">Clay Loam</option>
                    <option value="Sandy Loam">Sandy Loam</option>
                    <option value="Loam">Loam</option>
                    <option value="Silty Clay">Silty Clay</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Sowing Date</label>
                  <input
                    type="date"
                    required
                    value={newSowingDate}
                    onChange={(e) => setNewSowingDate(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-xl text-xs text-emerald-300 space-y-1">
                <div className="font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Geospatial Polygon Calculation</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Polygon geometry will be saved in GeoJSON format. Bounding box centroid auto-calculated.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-emerald-950"
                >
                  Save & Map Field
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
