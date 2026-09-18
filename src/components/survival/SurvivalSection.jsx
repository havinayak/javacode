import React, { useState } from 'react';
import { 
  Heart, Brain, DollarSign, Shield, Calculator, CheckCircle2, 
  Sparkles, Award, ArrowRight, Zap, Target, Copy, Check, PiggyBank, ShieldCheck
} from 'lucide-react';
import { mcpProtocol } from '../../services/mcpProtocol';

export default function SurvivalSection({ theme }) {
  const [activePillar, setActivePillar] = useState('fitness'); // 'fitness', 'mindset', 'finance', 'career'
  const [copied, setCopied] = useState(false);

  // Fitness Calculator State
  const [weightKg, setWeightKg] = useState(72);
  const [heightCm, setHeightCm] = useState(175);
  const [age, setAge] = useState(24);
  const [gender, setGender] = useState('male');
  const [activity, setActivity] = useState(1.375);

  // Financial Compound Calculator State
  const [monthlyInv, setMonthlyInv] = useState(250);
  const [returnRate, setReturnRate] = useState(8);
  const [years, setYears] = useState(25);

  // Emergency Fund Calculator State
  const [monthlyExpense, setMonthlyExpense] = useState(2200);
  const [targetMonths, setTargetMonths] = useState(6);
  const [currentSavings, setCurrentSavings] = useState(6600);

  // Execute MCP Calculation Tools
  const fitnessResult = mcpProtocol.executeTool('calculate_survival_metric', {
    metricType: 'bmr_tdee',
    inputs: { weightKg, heightCm, age, gender, activityLevel: activity }
  });

  const compoundResult = mcpProtocol.executeTool('calculate_survival_metric', {
    metricType: 'compound_interest',
    inputs: { monthlyInvestment: monthlyInv, annualReturnRate: returnRate, years }
  });

  const emergencyResult = mcpProtocol.executeTool('calculate_survival_metric', {
    metricType: 'emergency_fund',
    inputs: { monthlyExpense, targetMonths }
  });

  const targetFund = emergencyResult.targetAmount || monthlyExpense * targetMonths;
  const fundedPercent = Math.min(100, Math.round((currentSavings / (targetFund || 1)) * 100));
  const runwayMonths = monthlyExpense > 0 ? (currentSavings / monthlyExpense).toFixed(1) : 0;

  const handleCopySummary = () => {
    const summary = `OmniPulse Life Survival Telemetry:
• Daily Caloric TDEE: ${fitnessResult.tdee} kcal (BMR: ${fitnessResult.bmr} kcal)
• Daily Protein Target: ${fitnessResult.proteinGramsMin}-${fitnessResult.proteinGramsMax}g | Water: ${fitnessResult.waterLiters}L
• Projected Portfolio Value (${years} yrs @ ${returnRate}%): $${compoundResult.futureValue?.toLocaleString()}
• Emergency Runway: ${runwayMonths} months ($${currentSavings.toLocaleString()} / $${targetFund.toLocaleString()} target)`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4 border-l-amber-500">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-500 dark:text-amber-400" /> Life Survival & Mastery Knowledge Hub
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              MCP Telemetry
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Essential operational protocols and interactive tools for students & employees to thrive physically, mentally, and financially.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all border border-slate-300 dark:border-slate-700"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Metrics'}</span>
          </button>

          {/* Pillar Switcher */}
          <div className="flex flex-wrap items-center gap-1 bg-slate-200/80 dark:bg-slate-900/90 p-1.5 rounded-xl border border-slate-300 dark:border-slate-800">
            <button
              onClick={() => setActivePillar('fitness')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePillar === 'fitness'
                  ? 'bg-amber-600 text-white shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Heart className="w-3.5 h-3.5" /> Fitness & Health
            </button>
            <button
              onClick={() => setActivePillar('mindset')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePillar === 'mindset'
                  ? 'bg-amber-600 text-white shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Brain className="w-3.5 h-3.5" /> Mindset & Focus
            </button>
            <button
              onClick={() => setActivePillar('finance')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePillar === 'finance'
                  ? 'bg-amber-600 text-white shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" /> Personal Wealth
            </button>
            <button
              onClick={() => setActivePillar('career')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePillar === 'career'
                  ? 'bg-amber-600 text-white shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Award className="w-3.5 h-3.5" /> Skill Resilience
            </button>
          </div>
        </div>
      </div>

      {/* Fitness & Health Pillar */}
      {activePillar === 'fitness' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Interactive BMR/TDEE Calculator */}
          <div className="glass-panel p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> BMR & Daily Caloric TDEE Telemetry
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1 font-medium">Weight (kg)</label>
                <input
                  type="number"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1 font-medium">Height (cm)</label>
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1 font-medium">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1 font-medium">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            {/* Calculated Output Card */}
            <div className="p-4 bg-slate-100/90 dark:bg-slate-900/90 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2 bg-white dark:bg-slate-800/60 rounded border border-slate-200 dark:border-slate-700/50 shadow-sm">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase font-medium">Basal Metabolic (BMR)</span>
                  <span className="text-base font-bold text-slate-900 dark:text-white font-mono">{fitnessResult.bmr} kcal</span>
                </div>
                <div className="p-2 bg-white dark:bg-slate-800/60 rounded border border-slate-200 dark:border-slate-700/50 shadow-sm">
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block uppercase font-medium">Daily TDEE Target</span>
                  <span className="text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono">{fitnessResult.tdee} kcal</span>
                </div>
              </div>

              <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300 pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="flex justify-between">
                  <span>Protein Target:</span>
                  <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">{fitnessResult.proteinGramsMin}g - {fitnessResult.proteinGramsMax}g / day</span>
                </div>
                <div className="flex justify-between">
                  <span>Minimum Hydration:</span>
                  <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">{fitnessResult.waterLiters} Liters</span>
                </div>
              </div>
            </div>
          </div>

          {/* Physical Survival Rules */}
          <div className="glass-panel p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500 dark:text-rose-400" /> Non-Negotiable Fitness Rules
            </h3>
            <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-3 bg-slate-100/80 dark:bg-slate-900/80 rounded-lg border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Zone 2 Aerobic Base (150 mins/week)
                </h4>
                <p className="mt-1 text-slate-600 dark:text-slate-400 leading-relaxed">
                  Low-intensity cardio where you can converse comfortably expands lactate clearance capacity and keeps brain mitochondria healthy.
                </p>
              </div>

              <div className="p-3 bg-slate-100/80 dark:bg-slate-900/80 rounded-lg border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Sleep Hygiene & Circadian Light
                </h4>
                <p className="mt-1 text-slate-600 dark:text-slate-400 leading-relaxed">
                  Get 10 minutes of direct morning sunlight to anchor cortisol rhythms. Maintain 7.5 to 9 hours of uninterrupted REM sleep.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mindset & Focus Pillar */}
      {activePillar === 'mindset' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-500 dark:text-purple-400" /> Cognitive Architecture & Focus Shield
            </h3>
            <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-3 bg-slate-100/80 dark:bg-slate-900/80 rounded-lg border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-purple-600 dark:text-purple-400">1. Locus of Control Audit</h4>
                <p className="mt-1 text-slate-600 dark:text-slate-400 leading-relaxed">
                  Separate challenges into what you control (your efforts, your reaction) vs what you do not (macro economy, market noise). Devote 100% of mental capacity to controllables.
                </p>
              </div>

              <div className="p-3 bg-slate-100/80 dark:bg-slate-900/80 rounded-lg border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-purple-600 dark:text-purple-400">2. Two 90-Minute Deep Work Blocks</h4>
                <p className="mt-1 text-slate-600 dark:text-slate-400 leading-relaxed">
                  The brain can maintain intense peak focus for 90-minute ultradian cycles. Protect these blocks daily from phone notifications.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400" /> Dopamine & Energy Regulation
            </h3>
            <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-3 bg-slate-100/80 dark:bg-slate-900/80 rounded-lg border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-amber-600 dark:text-amber-400">Morning Screen Delay</h4>
                <p className="mt-1 text-slate-600 dark:text-slate-400 leading-relaxed">
                  Avoid checking social feeds or news during the first 60 minutes awake. Preserves baseline dopamine receptors for high-difficulty tasks.
                </p>
              </div>

              <div className="p-3 bg-slate-100/80 dark:bg-slate-900/80 rounded-lg border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-amber-600 dark:text-amber-400">Cold Stress / Breathing Protocols</h4>
                <p className="mt-1 text-slate-600 dark:text-slate-400 leading-relaxed">
                  Use physiological sighs (2 deep nasal inhales + 1 long mouth exhale) to quickly reset nervous system arousal during intense work stress.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Personal Wealth Pillar */}
      {activePillar === 'finance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Compound Interest Simulator */}
            <div className="glass-panel p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Compound Wealth Growth Simulator
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-500 dark:text-slate-400 mb-1 font-medium">Monthly Investment ($)</label>
                  <input
                    type="number"
                    value={monthlyInv}
                    onChange={(e) => setMonthlyInv(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1 font-medium">Expected Return (%)</label>
                    <input
                      type="number"
                      value={returnRate}
                      onChange={(e) => setReturnRate(Number(e.target.value))}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1 font-medium">Horizon (Years)</label>
                    <input
                      type="number"
                      value={years}
                      onChange={(e) => setYears(Number(e.target.value))}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              {/* Compound Output */}
              <div className="p-4 bg-slate-100/90 dark:bg-slate-900/90 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Total Invested Principal:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">${compoundResult.totalInvested?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Compound Interest Earned:</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">+${compoundResult.totalInterest?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-sm">
                  <span className="font-bold text-slate-900 dark:text-white">Projected Portfolio Value:</span>
                  <span className="font-mono font-black text-cyan-600 dark:text-cyan-400">${compoundResult.futureValue?.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Emergency Fund Runway Calculator (MCP Powered) */}
            <div className="glass-panel p-6 space-y-4 border-t-2 border-t-cyan-500">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <PiggyBank className="w-4 h-4 text-cyan-500" /> Emergency Runway Cushion Calculator
                </h3>
                <span className="text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/20">
                  MCP Metric
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-500 dark:text-slate-400 mb-1 font-medium">Monthly Essential Expense ($)</label>
                  <input
                    type="number"
                    value={monthlyExpense}
                    onChange={(e) => setMonthlyExpense(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1 font-medium">Target Runway (Months)</label>
                    <select
                      value={targetMonths}
                      onChange={(e) => setTargetMonths(Number(e.target.value))}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
                    >
                      <option value={3}>3 Months (Lean)</option>
                      <option value={6}>6 Months (Standard)</option>
                      <option value={9}>9 Months (Robust)</option>
                      <option value={12}>12 Months (Ironclad)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1 font-medium">Current Cash Savings ($)</label>
                    <input
                      type="number"
                      value={currentSavings}
                      onChange={(e) => setCurrentSavings(Number(e.target.value))}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Output Telemetry */}
              <div className="p-4 bg-slate-100/90 dark:bg-slate-900/90 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Target Cushion Goal:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">${targetFund.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Current Runway Safety:</span>
                  <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">{runwayMonths} months funded</span>
                </div>

                <div className="w-full bg-slate-300 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-1">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${fundedPercent}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-[11px] pt-1">
                  <span className="text-slate-500 dark:text-slate-400">Funded: {fundedPercent}%</span>
                  <span className={`font-bold ${fundedPercent >= 100 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                    {fundedPercent >= 100 ? '✓ Fully Protected' : `$${(targetFund - currentSavings).toLocaleString()} to target`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 50/30/20 Wealth Blueprint */}
          <div className="glass-panel p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-500 dark:text-cyan-400" /> The 50 / 30 / 20 Student & Employee Allocation Protocol
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 bg-slate-100/80 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-cyan-600 dark:text-cyan-400 block">50% Essential Needs</span>
                <p className="text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">Rent, groceries, utilities, and essential health coverage.</p>
              </div>
              <div className="p-3.5 bg-slate-100/80 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-purple-600 dark:text-purple-400 block">30% Personal Wants</span>
                <p className="text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">Dining out, hobbies, personal experiences, and recreation.</p>
              </div>
              <div className="p-3.5 bg-slate-100/80 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block">20% Automated Wealth Investment</span>
                <p className="text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">Automated low-cost index funds & compounding reserves.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Skill Resilience Pillar */}
      {activePillar === 'career' && (
        <div className="glass-panel p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-cyan-500 dark:text-cyan-400" /> AI-Resilient High-Value Skill Radar
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-100/80 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-cyan-600 dark:text-cyan-400">1. AI Tool Orchestration & MCP Integration</span>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Combining LLM capabilities with programmatic tool definitions, RAG databases, and structured APIs.
              </p>
            </div>
            <div className="p-4 bg-slate-100/80 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-cyan-600 dark:text-cyan-400">2. First-Principles Systems Thinking</span>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Deconstructing complex problems down to fundamental truths rather than reasoning by analogy.
              </p>
            </div>
            <div className="p-4 bg-slate-100/80 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-cyan-600 dark:text-cyan-400">3. High-Stakes Communication & Synthesis</span>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Distilling technical complexity into concise, action-oriented strategic decisions for leadership.
              </p>
            </div>
            <div className="p-4 bg-slate-100/80 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-cyan-600 dark:text-cyan-400">4. Financial Literacy & Unit Economics</span>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Understanding cash flow, margins, ROI, and capital efficiency in any project or startup.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

