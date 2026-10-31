import React, { useState } from 'react';
import { DemoBadge } from '../components/common/DemoBadge';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  PieChart as PieIcon, 
  Sliders, 
  Coins, 
  Scale, 
  Calculator 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from 'recharts';

export const FinancialsPage = ({ 
  selectedField, 
  fields, 
  setSelectedField, 
  expensesData, 
  setExpensesData 
}) => {
  const field = selectedField || fields[0];
  const expenseRecord = expensesData[field.id] || expensesData['field-1'];

  // Financial State for Scenario Customization
  const [seed, setSeed] = useState(expenseRecord.seed);
  const [fertilizer, setFertilizer] = useState(expenseRecord.fertilizer);
  const [pesticide, setPesticide] = useState(expenseRecord.pesticide);
  const [irrigation, setIrrigation] = useState(expenseRecord.irrigation);
  const [labour, setLabour] = useState(expenseRecord.labour);
  const [machinery, setMachinery] = useState(expenseRecord.machinery);
  const [expectedYield, setExpectedYield] = useState(expenseRecord.expected_yield);
  const [sellingPrice, setSellingPrice] = useState(expenseRecord.selling_price_per_unit);

  // Calculations
  const totalCost = Number(seed) + Number(fertilizer) + Number(pesticide) + Number(irrigation) + Number(labour) + Number(machinery);
  const grossRevenue = Number(expectedYield) * Number(sellingPrice);
  const netProfit = grossRevenue - totalCost;
  const costPerUnit = expectedYield > 0 ? (totalCost / expectedYield).toFixed(2) : 0;
  const costPerAcre = field.area > 0 ? (totalCost / field.area).toFixed(2) : 0;

  const pieData = [
    { name: 'Seed', value: Number(seed), color: '#10b981' },
    { name: 'Fertilizer', value: Number(fertilizer), color: '#3b82f6' },
    { name: 'Pesticide', value: Number(pesticide), color: '#f59e0b' },
    { name: 'Irrigation', value: Number(irrigation), color: '#06b6d4' },
    { name: 'Labour', value: Number(labour), color: '#8b5cf6' },
    { name: 'Machinery', value: Number(machinery), color: '#ec4899' },
  ];

  const comparisonData = [
    { category: 'Total Expenses', amount: totalCost },
    { category: 'Gross Revenue', amount: grossRevenue },
    { category: 'Net Profit', amount: Math.max(0, netProfit) }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 shadow-xl">
        <div>
          <h1 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            Field Profitability & Input Expense Analytics
          </h1>
          <p className="text-xs text-slate-400">
            Track input operational costs, evaluate unit margins, and simulate financial scenarios for {field.name}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <DemoBadge text="FINANCIAL MODEL DEMO" />
          <select
            value={field.id}
            onChange={(e) => {
              const found = fields.find(f => f.id === e.target.value);
              if (found) {
                setSelectedField(found);
                const rec = expensesData[found.id] || expensesData['field-1'];
                setSeed(rec.seed);
                setFertilizer(rec.fertilizer);
                setPesticide(rec.pesticide);
                setIrrigation(rec.irrigation);
                setLabour(rec.labour);
                setMachinery(rec.machinery);
                setExpectedYield(rec.expected_yield);
                setSellingPrice(rec.selling_price_per_unit);
              }
            }}
            className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 font-medium"
          >
            {fields.map(f => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-5 shadow-xl">
          <span className="text-[10px] uppercase font-semibold text-slate-400">Total Field Input Cost</span>
          <div className="text-2xl font-bold text-slate-100 font-mono mt-2">${totalCost.toLocaleString()}</div>
          <div className="text-xs text-slate-400 mt-1">${costPerAcre} / Acre</div>
        </div>

        <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-5 shadow-xl">
          <span className="text-[10px] uppercase font-semibold text-slate-400">Expected Gross Revenue</span>
          <div className="text-2xl font-bold text-emerald-400 font-mono mt-2">${grossRevenue.toLocaleString()}</div>
          <div className="text-xs text-slate-400 mt-1">{expectedYield} {expenseRecord.yield_unit} @ ${sellingPrice}</div>
        </div>

        <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-5 shadow-xl">
          <span className="text-[10px] uppercase font-semibold text-slate-400">Estimated Net Field Profit</span>
          <div className={`text-2xl font-bold font-mono mt-2 ${netProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            ${netProfit.toLocaleString()}
          </div>
          <div className="text-xs text-slate-400 mt-1">Margin: {grossRevenue > 0 ? Math.round((netProfit / grossRevenue) * 100) : 0}%</div>
        </div>

        <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-5 shadow-xl">
          <span className="text-[10px] uppercase font-semibold text-slate-400">Cost Per Unit Yield</span>
          <div className="text-2xl font-bold text-indigo-400 font-mono mt-2">${costPerUnit}</div>
          <div className="text-xs text-slate-400 mt-1">Per {expenseRecord.yield_unit.slice(0, -1) || 'unit'}</div>
        </div>
      </div>

      {/* Main Grid: Financial Controls & Interactive Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scenario Controls Sliders (7 cols) */}
        <div className="lg:col-span-7 bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-700 pb-3">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <Sliders className="w-5 h-5 text-emerald-400" />
              Interactive Financial Scenario Simulator
            </h3>
            <span className="text-xs text-amber-400 font-semibold">Live Calculation</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Seed */}
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-700/50 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-semibold">Seed Cost ($)</span>
                <span className="text-emerald-400 font-mono font-bold">${seed}</span>
              </div>
              <input 
                type="range" 
                min="100" 
                max="2000" 
                step="20"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Fertilizer */}
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-700/50 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-semibold">Fertilizer Cost ($)</span>
                <span className="text-blue-400 font-mono font-bold">${fertilizer}</span>
              </div>
              <input 
                type="range" 
                min="100" 
                max="3000" 
                step="50"
                value={fertilizer}
                onChange={(e) => setFertilizer(e.target.value)}
                className="w-full accent-blue-500 cursor-pointer"
              />
            </div>

            {/* Pesticide */}
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-700/50 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-semibold">Pesticide Cost ($)</span>
                <span className="text-amber-400 font-mono font-bold">${pesticide}</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="1500" 
                step="25"
                value={pesticide}
                onChange={(e) => setPesticide(e.target.value)}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Irrigation */}
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-700/50 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-semibold">Irrigation Cost ($)</span>
                <span className="text-cyan-400 font-mono font-bold">${irrigation}</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="1500" 
                step="25"
                value={irrigation}
                onChange={(e) => setIrrigation(e.target.value)}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* Labour */}
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-700/50 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-semibold">Labour Cost ($)</span>
                <span className="text-purple-400 font-mono font-bold">${labour}</span>
              </div>
              <input 
                type="range" 
                min="100" 
                max="2500" 
                step="50"
                value={labour}
                onChange={(e) => setLabour(e.target.value)}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            {/* Machinery */}
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-700/50 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-semibold">Machinery & Other ($)</span>
                <span className="text-pink-400 font-mono font-bold">${machinery}</span>
              </div>
              <input 
                type="range" 
                min="100" 
                max="2000" 
                step="50"
                value={machinery}
                onChange={(e) => setMachinery(e.target.value)}
                className="w-full accent-pink-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Revenue Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-700/80 pt-4">
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-700/50 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-semibold">Expected Yield ({expenseRecord.yield_unit})</span>
                <span className="text-emerald-400 font-mono font-bold">{expectedYield}</span>
              </div>
              <input 
                type="range" 
                min="20" 
                max="1000" 
                step="10"
                value={expectedYield}
                onChange={(e) => setExpectedYield(e.target.value)}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-700/50 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-semibold">Selling Price ($ / unit)</span>
                <span className="text-emerald-400 font-mono font-bold">${sellingPrice}</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="500" 
                step="0.5"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Charts Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Pie Chart Cost Breakdown */}
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 shadow-xl space-y-3">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-emerald-400" />
              Expense Distribution Breakdown
            </h3>

            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem' }}
                    itemStyle={{ color: '#f8fafc', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[10px]">
              {pieData.map(item => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-slate-300 font-medium truncate">{item.name}: ${item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bar Chart Revenue vs Cost */}
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 shadow-xl space-y-3">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <BarChart className="w-4 h-4 text-emerald-400" />
              Financial Revenue vs Expenses
            </h3>

            <div className="h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="category" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#94a3b8" tick={{ fontSize: 10 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem' }}
                  />
                  <Bar dataKey="amount" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
