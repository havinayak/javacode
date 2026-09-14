import React, { useState } from 'react';
import { 
  Heart, Brain, DollarSign, Shield, Calculator, CheckCircle2, 
  Sparkles, Award, ArrowRight, Zap, Target
} from 'lucide-react';
import { mcpProtocol } from '../../services/mcpProtocol';

export default function SurvivalSection() {
  const [activePillar, setActivePillar] = useState('fitness'); // 'fitness', 'mindset', 'finance', 'career'

  // Fitness Calculator State
  const [weightKg, setWeightKg] = useState(72);
  const [heightCm, setHeightCm] = useState(175);
  const [age, setAge] = useState(24);
  const [gender, setGender] = useState('male');
  const [activity, setActivity] = useState(1.375);

  // Financial Calculator State
  const [monthlyInv, setMonthlyInv] = useState(250);
  const [returnRate, setReturnRate] = useState(8);
  const [years, setYears] = useState(25);

  // Execute MCP Calculation Tools
  const fitnessResult = mcpProtocol.executeTool('calculate_survival_metric', {
    metricType: 'bmr_tdee',
    inputs: { weightKg, heightCm, age, gender, activityLevel: activity }
  });

  const compoundResult = mcpProtocol.executeTool('calculate_survival_metric', {
    metricType: 'compound_interest',
    inputs: { monthlyInvestment: monthlyInv, annualReturnRate: returnRate, years }
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4 border-l-amber-500">
        <div>
          <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" /> Life Survival & Mastery Knowledge Hub
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Essential operational guidelines and interactive tools for students & employees to thrive physically, mentally, and financially.
          </p>
        </div>

        {/* Pillar Switcher */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActivePillar('fitness')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activePillar === 'fitness'
                ? 'bg-amber-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Heart className="w-3.5 h-3.5" /> Fitness & Health
          </button>
          <button
            onClick={() => setActivePillar('mindset')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activePillar === 'mindset'
                ? 'bg-amber-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Brain className="w-3.5 h-3.5" /> Mindset & Focus
          </button>
          <button
            onClick={() => setActivePillar('finance')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activePillar === 'finance'
                ? 'bg-amber-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" /> Personal Wealth
          </button>
          <button
            onClick={() => setActivePillar('career')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activePillar === 'career'
                ? 'bg-amber-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" /> Skill Resilience
          </button>
        </div>
      </div>

      {/* Fitness & Health Pillar */}
      {activePillar === 'fitness' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Interactive BMR/TDEE Calculator */}
          <div className="glass-panel p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-400" /> BMR & Daily Caloric TDEE Telemetry
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            {/* Calculated Output Card */}
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-3">
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2 bg-slate-800/60 rounded">
                  <span className="text-[10px] text-slate-400 block uppercase">Basal Metabolic (BMR)</span>
                  <span className="text-base font-bold text-white font-mono">{fitnessResult.bmr} kcal</span>
                </div>
                <div className="p-2 bg-slate-800/60 rounded">
                  <span className="text-[10px] text-emerald-400 block uppercase">Daily TDEE Target</span>
                  <span className="text-base font-bold text-emerald-400 font-mono">{fitnessResult.tdee} kcal</span>
                </div>
              </div>

              <div className="text-xs space-y-1 text-slate-300 pt-2 border-t border-slate-800">
                <div className="flex justify-between">
                  <span>Protein Target:</span>
                  <span className="font-mono font-bold text-cyan-400">{fitnessResult.proteinGramsMin}g - {fitnessResult.proteinGramsMax}g / day</span>
                </div>
                <div className="flex justify-between">
                  <span>Minimum Hydration:</span>
                  <span className="font-mono font-bold text-cyan-400">{fitnessResult.waterLiters} Liters</span>
                </div>
              </div>
            </div>
          </div>

          {/* Physical Survival Rules */}
          <div className="glass-panel p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-400" /> Non-Negotiable Fitness Rules
            </h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                <h4 className="font-bold text-slate-100 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Zone 2 Aerobic Base (150 mins/week)
                </h4>
                <p className="mt-1 text-slate-400 leading-relaxed">
                  Low-intensity cardio where you can converse comfortably expands lactate clearance capacity and keeps brain mitochondria healthy.
                </p>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                <h4 className="font-bold text-slate-100 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Sleep Hygiene & Circadian Light
                </h4>
                <p className="mt-1 text-slate-400 leading-relaxed">
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
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-400" /> Cognitive Architecture & Focus Shield
            </h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                <h4 className="font-bold text-purple-400">1. Locus of Control Audit</h4>
                <p className="mt-1 text-slate-400 leading-relaxed">
                  Separate challenges into what you control (your efforts, your reaction) vs what you do not (macro economy, market noise). Devote 100% of mental capacity to controllables.
                </p>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                <h4 className="font-bold text-purple-400">2. Two 90-Minute Deep Work Blocks</h4>
                <p className="mt-1 text-slate-400 leading-relaxed">
                  The brain can maintain intense peak focus for 90-minute ultradian cycles. Protect these blocks daily from phone notifications.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" /> Dopamine & Energy Regulation
            </h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                <h4 className="font-bold text-amber-400">Morning Screen Delay</h4>
                <p className="mt-1 text-slate-400 leading-relaxed">
                  Avoid checking social feeds or news during the first 60 minutes awake. Preserves baseline dopamine receptors for high-difficulty tasks.
                </p>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                <h4 className="font-bold text-amber-400">Cold Stress / Breathing Protocols</h4>
                <p className="mt-1 text-slate-400 leading-relaxed">
                  Use physiological sighs (2 deep nasal inhales + 1 long mouth exhale) to quickly reset nervous system arousal during intense work stress.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Personal Wealth Pillar */}
      {activePillar === 'finance' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Compound Interest Simulator */}
          <div className="glass-panel p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-400" /> Compound Wealth Growth Simulator
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Monthly Investment ($)</label>
                <input
                  type="number"
                  value={monthlyInv}
                  onChange={(e) => setMonthlyInv(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Expected Return (%)</label>
                  <input
                    type="number"
                    value={returnRate}
                    onChange={(e) => setReturnRate(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Horizon (Years)</label>
                  <input
                    type="number"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200"
                  />
                </div>
              </div>
            </div>

            {/* Compound Output */}
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Invested Principal:</span>
                <span className="font-mono font-bold text-slate-200">${compoundResult.totalInvested?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Compound Interest Earned:</span>
                <span className="font-mono font-bold text-emerald-400">+${compoundResult.totalInterest?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-800 text-sm">
                <span className="font-bold text-white">Projected Portfolio Value:</span>
                <span className="font-mono font-black text-cyan-400">${compoundResult.futureValue?.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* 50/30/20 Wealth Blueprint */}
          <div className="glass-panel p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-cyan-400" /> The 50 / 30 / 20 Student & Employee Allocation
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                <span className="font-bold text-cyan-400 block">50% Essential Needs</span>
                <p className="text-slate-400 mt-0.5">Rent, essential groceries, utilities, baseline health insurance.</p>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                <span className="font-bold text-purple-400 block">30% Personal Wants</span>
                <p className="text-slate-400 mt-0.5">Dining out, travel, hobbies, entertainment.</p>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                <span className="font-bold text-emerald-400 block">20% Automated Wealth Investment</span>
                <p className="text-slate-400 mt-0.5">Automated index fund buys (S&P 500 / Total Stock Index) and emergency cash reserves.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Skill Resilience Pillar */}
      {activePillar === 'career' && (
        <div className="glass-panel p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-cyan-400" /> AI-Resilient High-Value Skill Radar
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-cyan-400">1. AI Tool Orchestration & MCP Integration</span>
              <p className="text-slate-400 leading-relaxed">
                Combining LLM capabilities with programmatic tool definitions, RAG databases, and structured APIs.
              </p>
            </div>
            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-cyan-400">2. First-Principles Systems Thinking</span>
              <p className="text-slate-400 leading-relaxed">
                Deconstructing complex problems down to fundamental truths rather than reasoning by analogy.
              </p>
            </div>
            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-cyan-400">3. High-Stakes Communication & Synthesis</span>
              <p className="text-slate-400 leading-relaxed">
                Distilling technical complexity into concise, action-oriented strategic decisions for leadership.
              </p>
            </div>
            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-cyan-400">4. Financial Literacy & Unit Economics</span>
              <p className="text-slate-400 leading-relaxed">
                Understanding cash flow, margins, ROI, and capital efficiency in any project or startup.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
