import React from 'react';
import { Activity, Cpu, Sparkles, Search, Sun, Moon } from 'lucide-react';

export default function Navbar({ activeTab, onOpenMcpAssistant, globalSearchQuery, setGlobalSearchQuery, theme, setTheme }) {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'tasks':
        return 'Task & Metric Tracker (Real-Time Sync & Threshold Engine)';
      case 'trends':
        return 'World & Job Market Trends (Live News & RAG Analysis)';
      case 'finance':
        return 'Financial Stock Intelligence & Deep Industrial Diagnostic';
      case 'survival':
        return 'Life Survival & Mastery Knowledge Hub';
      default:
        return 'OmniPulse AI Intelligence Dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full glass-panel border-b border-slate-700/40 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Brand Identity */}
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 shadow-lg shadow-blue-500/20">
          <Activity className="w-6 h-6 text-white animate-pulse" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
          </span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 dark:from-white dark:via-slate-200 dark:to-slate-400">
              OmniPulse <span className="text-cyan-500 dark:text-cyan-400 font-mono">AI</span>
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-blue-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 flex items-center gap-1">
              <Cpu className="w-3 h-3" /> MCP + RAG
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {getTabTitle()}
          </p>
        </div>
      </div>

      {/* Global RAG Search & Assistant Quick Trigger & Theme Toggle */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="relative flex-1 md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search RAG vector index (e.g. NVDA, AI jobs)..."
            value={globalSearchQuery}
            onChange={(e) => setGlobalSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
          />
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          className="p-2 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 bg-white/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-800 rounded-lg shadow-sm hover:scale-105 transition-all"
        >
          {theme === 'light' ? (
            <Moon className="w-4 h-4 text-indigo-600" />
          ) : (
            <Sun className="w-4 h-4 text-amber-400" />
          )}
        </button>

        <button
          onClick={onOpenMcpAssistant}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-lg shadow-md shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95 shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>MCP Assistant</span>
        </button>
      </div>
    </header>
  );
}

