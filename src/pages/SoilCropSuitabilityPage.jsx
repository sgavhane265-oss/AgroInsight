import React, { useState, useEffect } from 'react';
import { SoilInputForm } from '../components/suitability/SoilInputForm';
import { SuitabilityResults } from '../components/suitability/SuitabilityResults';
import { CropSuitabilityEngine } from '../services/cropSuitabilityEngine';
import { DEFAULT_SOIL_INPUTS, LOCAL_STORAGE_KEY } from '../config/suitabilityConfig';
import { DemoBadge } from '../components/common/DemoBadge';
import { TestTube, Sparkles, CheckCircle2 } from 'lucide-react';

export const SoilCropSuitabilityPage = () => {
  const [soilInputs, setSoilInputs] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_SOIL_INPUTS;
    } catch (err) {
      return DEFAULT_SOIL_INPUTS;
    }
  });

  const [suitabilityResults, setSuitabilityResults] = useState([]);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [saveNotification, setSaveNotification] = useState(false);

  // Auto-run initial evaluation on load
  useEffect(() => {
    const results = CropSuitabilityEngine.evaluate(soilInputs);
    setSuitabilityResults(results);
    setHasAnalyzed(true);
  }, []);

  const handleAnalyze = () => {
    const results = CropSuitabilityEngine.evaluate(soilInputs);
    setSuitabilityResults(results);
    setHasAnalyzed(true);
  };

  const handleSave = () => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(soilInputs));
      setSaveNotification(true);
      setTimeout(() => setSaveNotification(false), 3000);
    } catch (err) {
      console.error('Failed to save soil test to localStorage', err);
    }
  };

  const handleReset = () => {
    setSoilInputs(DEFAULT_SOIL_INPUTS);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (err) {}
    const results = CropSuitabilityEngine.evaluate(DEFAULT_SOIL_INPUTS);
    setSuitabilityResults(results);
    setHasAnalyzed(true);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              Soil Analysis & Crop Suitability
            </h1>
            <DemoBadge text="PROTOTYPE SUITABILITY MODEL" />
          </div>
          <p className="text-xs text-slate-400">
            Evaluate soil nutrient chemistry and physical properties to recommend optimal crops based on weighted agronomic tolerance parameters.
          </p>
        </div>

        {saveNotification && (
          <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs px-3 py-1.5 rounded-xl flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Soil Test Saved to Local Storage!</span>
          </div>
        )}
      </div>

      {/* Soil Parameter Input Form */}
      <SoilInputForm
        soilInputs={soilInputs}
        setSoilInputs={setSoilInputs}
        onAnalyze={handleAnalyze}
        onSave={handleSave}
        onReset={handleReset}
      />

      {/* Results View */}
      {hasAnalyzed && (
        <SuitabilityResults
          soilInputs={soilInputs}
          suitabilityResults={suitabilityResults}
        />
      )}
    </div>
  );
};

export default SoilCropSuitabilityPage;
