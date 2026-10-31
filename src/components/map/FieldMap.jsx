import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Rectangle, Popup, Tooltip, useMap } from 'react-leaflet';
import { MapLegend } from './MapLegend';
import { defaultSatelliteService } from '../../services/satelliteService';
import { Layers, Maximize2, MapPin } from 'lucide-react';

// Controller to auto-center and fit bounds when selectedField changes
function MapRecenter({ center, boundary }) {
  const map = useMap();
  useEffect(() => {
    if (boundary && boundary.length > 0) {
      map.fitBounds(boundary, { padding: [40, 40], maxZoom: 17 });
    } else if (center) {
      map.setView(center, 15);
    }
  }, [center, boundary, map]);
  return null;
}

export const FieldMap = ({ 
  fields = [], 
  selectedField = null, 
  onSelectField = () => {}, 
  showNdviGrid = false,
  height = "h-[450px]"
}) => {
  const [mapType, setMapType] = useState('satellite'); // satellite | street
  const [gridCells, setGridCells] = useState([]);

  useEffect(() => {
    if (selectedField && showNdviGrid) {
      const cells = defaultSatelliteService.getSpatialNDVIGrid(selectedField);
      setGridCells(cells);
    } else {
      setGridCells([]);
    }
  }, [selectedField, showNdviGrid]);

  const mapCenter = selectedField ? selectedField.center : (fields[0] ? fields[0].center : [42.0308, -93.6319]);

  const tileUrls = {
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    street: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  };

  const tileAttributions = {
    satellite: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    street: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  };

  return (
    <div className={`relative ${height} w-full rounded-xl overflow-hidden border border-slate-700/60 shadow-xl group`}>
      <MapContainer 
        center={mapCenter} 
        zoom={15} 
        scrollWheelZoom={true} 
        className="w-full h-full"
      >
        <TileLayer
          attribution={tileAttributions[mapType]}
          url={tileUrls[mapType]}
        />

        <MapRecenter center={mapCenter} boundary={selectedField ? selectedField.boundary : null} />

        {/* Spatial NDVI Grid Overlay (when toggled on for field detail) */}
        {showNdviGrid && gridCells.map((cell) => (
          <Rectangle
            key={cell.id}
            bounds={cell.bounds}
            pathOptions={{
              color: cell.color,
              fillColor: cell.color,
              fillOpacity: 0.65,
              weight: 1,
              dashArray: '2, 2'
            }}
          >
            <Tooltip sticky>
              <div className="text-xs p-1">
                <div className="font-bold text-slate-100">Grid Cell NDVI</div>
                <div className="text-emerald-400 font-mono font-bold text-sm">{cell.ndvi} ({cell.status})</div>
                <div className="text-[10px] text-amber-300">DEMO Sentinel-2 Grid</div>
              </div>
            </Tooltip>
          </Rectangle>
        ))}

        {/* Field Boundary Polygons */}
        {fields.map((field) => {
          const isSelected = selectedField && selectedField.id === field.id;
          
          const strokeColor = field.health_status === 'Healthy' 
            ? '#22c55e' 
            : field.health_status === 'Moderate' 
              ? '#f59e0b' 
              : '#ef4444';

          return (
            <Polygon
              key={field.id}
              positions={field.boundary}
              eventHandlers={{
                click: () => onSelectField(field)
              }}
              pathOptions={{
                color: isSelected ? '#38bdf8' : strokeColor,
                fillColor: strokeColor,
                fillOpacity: isSelected ? 0.35 : 0.2,
                weight: isSelected ? 3.5 : 2,
                dashArray: isSelected ? '0' : '4'
              }}
            >
              <Tooltip sticky>
                <div className="text-xs p-1">
                  <div className="font-bold text-slate-100">{field.name}</div>
                  <div className="text-slate-300">{field.crop} • {field.area} Acres</div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-bold" style={{ backgroundColor: `${strokeColor}33`, color: strokeColor }}>
                      {field.health_status} (NDVI: {field.mean_ndvi})
                    </span>
                  </div>
                </div>
              </Tooltip>

              <Popup>
                <div className="text-xs space-y-2 p-1 min-w-[160px]">
                  <div className="font-bold text-sm text-slate-100 border-b border-slate-700 pb-1 flex items-center justify-between">
                    <span>{field.name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-slate-300">
                    <span>Crop:</span> <span className="font-semibold text-white">{field.crop}</span>
                    <span>Area:</span> <span className="font-semibold text-white">{field.area} ac</span>
                    <span>Soil:</span> <span className="font-semibold text-white">{field.soil_type}</span>
                    <span>NDVI:</span> <span className="font-semibold text-emerald-400 font-mono">{field.mean_ndvi}</span>
                  </div>
                  <button 
                    onClick={() => onSelectField(field)}
                    className="w-full mt-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-1 px-2 rounded text-[11px] transition-colors"
                  >
                    View Field Analysis →
                  </button>
                </div>
              </Popup>
            </Polygon>
          );
        })}
      </MapContainer>

      {/* Map Overlay Controls */}
      <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
        <button
          onClick={() => setMapType(mapType === 'satellite' ? 'street' : 'satellite')}
          className="bg-slate-900/90 hover:bg-slate-800 text-slate-200 p-2 rounded-lg border border-slate-700 shadow-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          title="Toggle Base Map"
        >
          <Layers className="w-4 h-4 text-emerald-400" />
          <span className="hidden sm:inline">{mapType === 'satellite' ? 'Esri Satellite' : 'Street Map'}</span>
        </button>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 z-[400]">
        <MapLegend title={showNdviGrid ? "Spatial Grid NDVI Overlay" : "Field Health Status"} />
      </div>
    </div>
  );
};
