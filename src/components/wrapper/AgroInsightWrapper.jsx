import React, { useState } from 'react';
import { Sidebar } from '../layout/Sidebar';
import { Header } from '../layout/Header';
import { DashboardPage } from '../../pages/DashboardPage';
import { FieldsPage } from '../../pages/FieldsPage';
import { FieldDetailPage } from '../../pages/FieldDetailPage';
import { SoilCropPage } from '../../pages/SoilCropPage';
import { RecommendationsPage } from '../../pages/RecommendationsPage';
import { FinancialsPage } from '../../pages/FinancialsPage';
import { SoilCropSuitabilityPage } from '../../pages/SoilCropSuitabilityPage';

import { 
  INITIAL_FARMS, 
  INITIAL_FIELDS, 
  INITIAL_SOIL_RECORDS, 
  INITIAL_WEATHER, 
  INITIAL_EXPENSES, 
  ALERTS_LIST 
} from '../../data/mockData';

import { TestTube, ChevronRight, Sprout } from 'lucide-react';

export function AgroInsightWrapper() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [farms, setFarms] = useState(INITIAL_FARMS);
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [selectedField, setSelectedField] = useState(INITIAL_FIELDS[0]);
  const [activeFarmId, setActiveFarmId] = useState('all');

  const [soilRecords, setSoilRecords] = useState(INITIAL_SOIL_RECORDS);
  const [weatherData, setWeatherData] = useState(INITIAL_WEATHER);
  const [expensesData, setExpensesData] = useState(INITIAL_EXPENSES);
  const [alerts, setAlerts] = useState(ALERTS_LIST);

  const visibleFields = activeFarmId === 'all' 
    ? fields 
    : fields.filter(f => f.farm_id === activeFarmId);

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      {/* Top Extension Banner to toggle new Soil Suitability feature seamlessly */}
      <div className="bg-slate-900 border-b border-emerald-800/60 px-6 py-2 flex items-center justify-between z-30 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">AgroInsight Feature Module</span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-300 font-medium">Soil-Based Crop Suitability Analysis Ready</span>
        </div>

        <button
          onClick={() => setActiveTab('soil-suitability')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'soil-suitability'
              ? 'bg-emerald-600 text-white shadow-lg'
              : 'bg-slate-800 text-emerald-300 hover:bg-slate-700 border border-emerald-700/60'
          }`}
        >
          <Sprout className="w-3.5 h-3.5" />
          <span>🌱 Soil & Crop Suitability Page</span>
        </button>
      </div>

      <div className="flex-1 flex min-w-0 overflow-x-hidden">
        {/* Sidebar Navigation */}
        <Sidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedField={selectedField}
          farms={farms}
          activeFarmId={activeFarmId}
          setActiveFarmId={setActiveFarmId}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
          <Header 
            fields={visibleFields}
            selectedField={selectedField}
            setSelectedField={setSelectedField}
            alerts={alerts}
            activeTab={activeTab}
          />

          <main className="flex-1 px-6 py-6 overflow-y-auto max-w-[1600px] w-full mx-auto">
            {activeTab === 'dashboard' && (
              <DashboardPage
                farms={farms}
                fields={visibleFields}
                selectedField={selectedField}
                setSelectedField={setSelectedField}
                alerts={alerts}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === 'farms' && (
              <FieldsPage
                farms={farms}
                fields={visibleFields}
                setFields={setFields}
                selectedField={selectedField}
                setSelectedField={setSelectedField}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === 'field-detail' && (
              <FieldDetailPage
                selectedField={selectedField}
                fields={visibleFields}
                setSelectedField={setSelectedField}
                soilRecords={soilRecords}
                weatherData={weatherData}
                expensesData={expensesData}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === 'soil-crop' && (
              <SoilCropPage
                selectedField={selectedField}
                fields={visibleFields}
                setSelectedField={setSelectedField}
                soilRecords={soilRecords}
                weatherData={weatherData}
              />
            )}

            {activeTab === 'recommendations' && (
              <RecommendationsPage
                selectedField={selectedField}
                fields={visibleFields}
                setSelectedField={setSelectedField}
                soilRecords={soilRecords}
                weatherData={weatherData}
              />
            )}

            {activeTab === 'financials' && (
              <FinancialsPage
                selectedField={selectedField}
                fields={visibleFields}
                setSelectedField={setSelectedField}
                expensesData={expensesData}
                setExpensesData={setExpensesData}
              />
            )}

            {activeTab === 'soil-suitability' && (
              <SoilCropSuitabilityPage />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default AgroInsightWrapper;
