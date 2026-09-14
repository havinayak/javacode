import React from 'react';
import { 
  CheckSquare, 
  TrendingUp, 
  DollarSign, 
  Compass, 
  Bot, 
  Layers,
  ChevronRight
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    {
      id: 'tasks',
      label: 'Task & Threshold Engine',
      description: 'Pie, Bar, Line & Algebraic Graphs',
      icon: CheckSquare,
      color: 'from-blue-500 to-indigo-500',
      badge: 'Dynamic'
    },
    {
      id: 'trends',
      label: 'World & Job Trends',
      description: 'Growing vs Falling Sectors & Causes',
      icon: TrendingUp,
      color: 'from-cyan-500 to-teal-500',
      badge: 'RAG Powered'
    },
    {
      id: 'finance',
      label: 'Financial Stock Intelligence',
      description: 'Rising vs Falling Root-Causes',
      icon: DollarSign,
      color: 'from-emerald-500 to-green-500',
      badge: 'Root Cause'
    },
    {
      id: 'survival',
      label: 'Life Survival & Mastery',
      description: 'Fitness, Mindset & Wealth',
      icon: Compass,
      color: 'from-amber-500 to-orange-500',
      badge: 'Essential'
    }
  ];

  return (
    <aside className="w-full md:w-72 glass-panel border-r border-slate-800/80 p-4 flex flex-col justify-between gap-6 shrink-0">
      <div>
        <div className="px-3 py-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-cyan-400" /> Platform Navigation
        </div>

        <div className="mt-3 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between group ${
                  isActive
                    ? 'bg-gradient-to-r from-slate-800/90 to-slate-900/90 border border-slate-700/80 shadow-lg text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-white bg-gradient-to-br ${item.color} ${
                      isActive ? 'shadow-md shadow-cyan-500/20' : 'opacity-80 group-hover:opacity-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-100 flex items-center gap-2">
                      {item.label}
                    </div>
                    <div className="text-[10px] text-slate-400 line-clamp-1">
                      {item.description}
                    </div>
                  </div>
                </div>

                <ChevronRight
                  className={`w-4 h-4 transition-transform ${
                    isActive ? 'text-cyan-400 translate-x-0.5' : 'text-slate-600 group-hover:text-slate-400'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* System Status Card */}
      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/90 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            MCP Protocol Active
          </div>
          <span className="text-[10px] text-cyan-400 font-mono">v1.2.0</span>
        </div>
        <p className="text-[10px] text-slate-400 leading-relaxed">
          Retrieval-Augmented Generation & Tool execution online for task telemetry & market insights.
        </p>
      </div>
    </aside>
  );
}
