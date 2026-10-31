import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardPage } from './pages/DashboardPage';
import { FieldsPage } from './pages/FieldsPage';
import { FieldDetailPage } from './pages/FieldDetailPage';
import { SoilCropPage } from './pages/SoilCropPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { FinancialsPage } from './pages/FinancialsPage';

import { 
  INITIAL_FARMS, 
  INITIAL_FIELDS, 
  INITIAL_SOIL_RECORDS, 
  INITIAL_WEATHER, 
  INITIAL_EXPENSES, 
  ALERTS_LIST 
} from './data/mockData';

export function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [farms, setFarms] = useState(INITIAL_FARMS);
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [selectedField, setSelectedField] = useState(INITIAL_FIELDS[0]);
  const [activeFarmId, setActiveFarmId] = useState('all');

  const [soilRecords, setSoilRecords] = useState(INITIAL_SOIL_RECORDS);
  const [weatherData, setWeatherData] = useState(INITIAL_WEATHER);
  const [expensesData, setExpensesData] = useState(INITIAL_EXPENSES);
  const [alerts, setAlerts] = useState(ALERTS_LIST);

  // Filter fields based on activeFarmId dropdown selection if filtered
  const visibleFields = activeFarmId === 'all' 
    ? fields 
    : fields.filter(f => f.farm_id === activeFarmId);

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
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
        </main>
      </div>
    </div>
  );
}

export default App;
