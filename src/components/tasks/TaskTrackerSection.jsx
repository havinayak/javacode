import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Plus, CheckCircle2, Circle, Trash2, PieChart as PieIcon, BarChart3, LineChart as LineIcon, 
  Sliders, Target, Sparkles, AlertCircle, RefreshCw, FunctionSquare, Zap, Radio, 
  Play, Pause, Timer, Clock, Download, FileText, ChevronDown, ChevronUp, Edit2
} from 'lucide-react';
import { 
  ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine, Legend 
} from 'recharts';
import confetti from 'canvas-confetti';
import { mcpProtocol } from '../../services/mcpProtocol';
import { storageService } from '../../services/storageService';

const CATEGORY_COLORS = {
  Work: '#3b82f6',
  Health: '#10b981',
  Finance: '#f59e0b',
  Learning: '#8b5cf6'
};

// Helper: format seconds to HH:MM:SS
const formatElapsed = (totalSec) => {
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${h > 0 ? String(h).padStart(2, '0') + ':' : ''}${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

// Helper: relative time display
const getRelativeTime = (isoDate) => {
  if (!isoDate) return '';
  const diff = Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000);
  if (diff < 5) return 'Just now';
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

export default function TaskTrackerSection({ tasks, setTasks, thresholds, setThresholds, theme }) {
  const [activeChartType, setActiveChartType] = useState('line');
  const [algebraicFuncType, setAlgebraicFuncType] = useState('exponential');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  
  // Expandable notes & history per task card
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteText, setNoteText] = useState('');

  // New Task Form Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Work');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');
  const [newTaskThreshold, setNewTaskThreshold] = useState(80);
  const [newTaskProgress, setNewTaskProgress] = useState(50);

  // Real-time live timer state: { [taskId]: { running: bool, elapsed: number (sec), startedAt: number|null } }
  const [taskTimers, setTaskTimers] = useState({});
  const timerIntervalRef = useRef(null);

  // Relative timestamps tick (re-render every 10s)
  const [, setTimeTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTimeTick(t => t + 1), 10000);
    return () => clearInterval(interval);
  }, []);

  // ── BroadcastChannel Real-Time Cross-Tab Sync (Tasks & Thresholds) ──
  const broadcastChannelRef = useRef(null);
  const isExternalUpdate = useRef(false);
  const isExternalThresholdUpdate = useRef(false);

  useEffect(() => {
    try {
      broadcastChannelRef.current = new BroadcastChannel('omnipulse_sync');
      broadcastChannelRef.current.onmessage = (event) => {
        if (event.data?.type === 'TASKS_UPDATE') {
          isExternalUpdate.current = true;
          setTasks(event.data.tasks);
        }
        if (event.data?.type === 'THRESHOLDS_UPDATE') {
          isExternalThresholdUpdate.current = true;
          setThresholds(event.data.thresholds);
        }
      };
    } catch (e) {
      // BroadcastChannel not supported, degrade gracefully
    }

    // Also listen for localStorage changes from other tabs
    const handleStorageChange = (e) => {
      if (e.key === 'omnipulse_tasks') {
        try {
          const parsed = JSON.parse(e.newValue);
          if (parsed) {
            isExternalUpdate.current = true;
            setTasks(parsed);
          }
        } catch (e) { /* ignore */ }
      }
      if (e.key === 'omnipulse_thresholds') {
        try {
          const parsed = JSON.parse(e.newValue);
          if (parsed) {
            isExternalThresholdUpdate.current = true;
            setThresholds(parsed);
          }
        } catch (e) { /* ignore */ }
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      broadcastChannelRef.current?.close();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [setTasks, setThresholds]);

  // Broadcast task changes to other tabs
  useEffect(() => {
    if (isExternalUpdate.current) {
      isExternalUpdate.current = false;
      return;
    }
    try {
      broadcastChannelRef.current?.postMessage({ type: 'TASKS_UPDATE', tasks });
    } catch (e) { /* ignore */ }
  }, [tasks]);

  // Broadcast threshold changes to other tabs
  useEffect(() => {
    if (isExternalThresholdUpdate.current) {
      isExternalThresholdUpdate.current = false;
      return;
    }
    try {
      broadcastChannelRef.current?.postMessage({ type: 'THRESHOLDS_UPDATE', thresholds });
    } catch (e) { /* ignore */ }
  }, [thresholds]);

  // ── Live Task Stopwatch Timer Engine ──
  useEffect(() => {
    timerIntervalRef.current = setInterval(() => {
      setTaskTimers(prev => {
        const next = { ...prev };
        let changed = false;
        for (const id of Object.keys(next)) {
          if (next[id].running) {
            next[id] = { ...next[id], elapsed: next[id].elapsed + 1 };
            changed = true;
          }
        }
        return changed ? next : prev;
      });
    }, 1000);
    return () => clearInterval(timerIntervalRef.current);
  }, []);

  const toggleTimer = useCallback((taskId) => {
    setTaskTimers(prev => {
      const existing = prev[taskId] || { running: false, elapsed: 0 };
      return { ...prev, [taskId]: { ...existing, running: !existing.running } };
    });
  }, []);

  const resetTimer = useCallback((taskId) => {
    setTaskTimers(prev => ({ ...prev, [taskId]: { running: false, elapsed: 0 } }));
  }, []);

  // Toggle Task Completion
  const handleToggleComplete = (id) => {
    const updated = tasks.map(task => {
      if (task.id === id) {
        const nextState = !task.completed;
        if (nextState) {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.7 }
          });
        }
        return { 
          ...task, 
          completed: nextState, 
          currentProgress: nextState ? 100 : Math.min(task.currentProgress, 50),
          lastModified: new Date().toISOString()
        };
      }
      return task;
    });
    setTasks(updated);
  };

  // Add Task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      category: newTaskCategory,
      priority: newTaskPriority,
      targetThreshold: Number(newTaskThreshold),
      currentProgress: Number(newTaskProgress),
      completed: Number(newTaskProgress) >= Number(newTaskThreshold),
      date: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString(),
      history: [
        { date: '2026-09-10', score: 30 },
        { date: '2026-09-11', score: 50 },
        { date: '2026-09-12', score: Number(newTaskProgress) }
      ],
      notes: 'Newly created task'
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
    setShowAddModal(false);
  };

  // Delete Task
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
    setTaskTimers(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  // Calculate Overall Analytics & Threshold status
  const totalTasksCount = tasks.length;
  const completedCount = tasks.filter(t => t.completed).length;
  const avgProgress = totalTasksCount > 0 
    ? Math.round(tasks.reduce((acc, t) => acc + t.currentProgress, 0) / totalTasksCount)
    : 0;
  const meetsGlobalThreshold = avgProgress >= thresholds.globalTarget;

  // Save note handler
  const handleSaveNote = (taskId) => {
    const updated = tasks.map(t => t.id === taskId ? { ...t, notes: noteText, lastModified: new Date().toISOString() } : t);
    setTasks(updated);
    setEditingNoteId(null);
  };

  // Export handler
  const handleExportReport = () => {
    storageService.exportPerformanceReport(tasks, thresholds);
  };

  // Filtered Tasks (category + priority)
  const filteredTasks = tasks.filter(t => {
    const catMatch = filterCategory === 'All' || t.category === filterCategory;
    const priMatch = filterPriority === 'All' || t.priority === filterPriority;
    return catMatch && priMatch;
  });

  // Compute Historical Line Data
  const lineChartData = [
    { date: 'Day 1', progress: 45, threshold: thresholds.globalTarget },
    { date: 'Day 2', progress: 55, threshold: thresholds.globalTarget },
    { date: 'Day 3', progress: 62, threshold: thresholds.globalTarget },
    { date: 'Day 4', progress: 70, threshold: thresholds.globalTarget },
    { date: 'Day 5', progress: 78, threshold: thresholds.globalTarget },
    { date: 'Day 6', progress: 84, threshold: thresholds.globalTarget },
    { date: 'Today', progress: avgProgress, threshold: thresholds.globalTarget }
  ];

  // Category Bar Data
  const categories = ['Work', 'Health', 'Finance', 'Learning'];
  const categoryBarData = categories.map(cat => {
    const catTasks = tasks.filter(t => t.category === cat);
    const catAvg = catTasks.length > 0 
      ? Math.round(catTasks.reduce((acc, t) => acc + t.currentProgress, 0) / catTasks.length)
      : 0;
    return {
      category: cat,
      progress: catAvg,
      threshold: thresholds.globalTarget
    };
  });

  // Pie Chart Data
  const pieData = categories.map(cat => {
    const count = tasks.filter(t => t.category === cat).length;
    return { name: cat, value: count, color: CATEGORY_COLORS[cat] };
  }).filter(d => d.value > 0);

  // Algebraic Data evaluated via MCP Protocol
  const algebraicEvaluated = mcpProtocol.executeTool('evaluate_algebraic_function', {
    functionType: algebraicFuncType,
    params: { a: 2.5, b: 15, k: 0.35 },
    pointsCount: 8
  });

  return (
    <div className="space-y-6">
      {/* LIVE REAL-TIME SYNC Badge Banner */}
      <div className="glass-panel p-4 flex items-center justify-between border-l-4 border-l-blue-500">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Live Real-Time Sync Active
            </span>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
            BroadcastChannel + localStorage • Multi-Tab Instant Sync (Tasks & Thresholds)
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportReport}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 rounded-lg transition-all"
          >
            <Download className="w-3.5 h-3.5" /> Export Audit Report
          </button>
          <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400 font-mono">
            <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            <span>Tasks & Thresholds</span>
          </div>
        </div>
      </div>

      {/* Top Controls & Threshold Indicator Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Global Threshold Setter */}
        <div className="glass-panel p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
              <Target className="w-4 h-4 text-cyan-500 dark:text-cyan-400" /> Target Threshold Setting
            </div>
            <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              {thresholds.globalTarget}% Goal
            </span>
          </div>
          <input
            type="range"
            min="40"
            max="100"
            value={thresholds.globalTarget}
            onChange={(e) => setThresholds({ ...thresholds, globalTarget: Number(e.target.value) })}
            className="w-full h-2 bg-slate-300 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono">
            <span>40% Baseline</span>
            <span>Current Goal: {thresholds.globalTarget}%</span>
            <span>100% Mastery</span>
          </div>
        </div>

        {/* Current Performance Metric */}
        <div className={`glass-panel p-5 flex flex-col justify-between border-l-4 ${
          meetsGlobalThreshold ? 'border-l-emerald-500' : 'border-l-amber-500'
        }`}>
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Average Completion Rate
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1 flex items-baseline gap-2">
                {avgProgress}%
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  meetsGlobalThreshold 
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                }`}>
                  {meetsGlobalThreshold ? 'Threshold Met (+ Passed)' : 'Below Target'}
                </span>
              </div>
            </div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              meetsGlobalThreshold ? 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-500 dark:text-amber-400'
            }`}>
              {meetsGlobalThreshold ? <Sparkles className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            </div>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            Target threshold set at <span className="text-slate-900 dark:text-white font-mono">{thresholds.globalTarget}%</span> across past 7 days.
          </p>
        </div>

        {/* Task Completion Ratio */}
        <div className="glass-panel p-5 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Completed Tasks
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {completedCount} <span className="text-sm font-normal text-slate-500 dark:text-slate-400">/ {totalTasksCount} items</span>
            </div>
          </div>
          <div className="w-full bg-slate-300 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden mt-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${totalTasksCount > 0 ? (completedCount / totalTasksCount) * 100 : 0}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Dynamic Graph Section */}
      <div className="glass-panel p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800/80 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyan-500 dark:text-cyan-400" /> Dynamic Telemetry & Threshold Visualizer
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Switch graph views (Line, Bar, Pie, Algebraic curves) to analyze task completion trends.
            </p>
          </div>

          {/* Graph Type Selector Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-200/80 dark:bg-slate-900/90 p-1.5 rounded-xl border border-slate-300 dark:border-slate-800">
            <button
              onClick={() => setActiveChartType('line')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeChartType === 'line'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              <LineIcon className="w-3.5 h-3.5" /> Line Graph
            </button>
            <button
              onClick={() => setActiveChartType('bar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeChartType === 'bar'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" /> Bar Chart
            </button>
            <button
              onClick={() => setActiveChartType('pie')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeChartType === 'pie'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              <PieIcon className="w-3.5 h-3.5" /> Pie Chart
            </button>
            <button
              onClick={() => setActiveChartType('algebraic')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeChartType === 'algebraic'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              <FunctionSquare className="w-3.5 h-3.5" /> Algebraic / Curve
            </button>
          </div>
        </div>

        {/* Dynamic Chart Container */}
        <div className="h-72 w-full pt-2">
          {activeChartType === 'line' && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'light' ? '#e2e8f0' : '#1e293b'} />
                <XAxis dataKey="date" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis domain={[0, 100]} stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a', borderColor: theme === 'light' ? '#e2e8f0' : '#334155', borderRadius: '0.5rem', color: theme === 'light' ? '#0f172a' : '#fff', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <ReferenceLine 
                  y={thresholds.globalTarget} 
                  stroke="#ef4444" 
                  strokeDasharray="4 4" 
                  label={{ value: `Threshold (${thresholds.globalTarget}%)`, fill: '#ef4444', fontSize: 11, position: 'top' }} 
                />
                <Line type="monotone" dataKey="progress" name="Actual Progress %" stroke="#06b6d4" strokeWidth={3} dot={{ r: 5, fill: '#06b6d4' }} />
              </LineChart>
            </ResponsiveContainer>
          )}

          {activeChartType === 'bar' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryBarData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'light' ? '#e2e8f0' : '#1e293b'} />
                <XAxis dataKey="category" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis domain={[0, 100]} stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a', borderColor: theme === 'light' ? '#e2e8f0' : '#334155', borderRadius: '0.5rem', color: theme === 'light' ? '#0f172a' : '#fff', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <ReferenceLine y={thresholds.globalTarget} stroke="#f59e0b" strokeDasharray="3 3" />
                <Bar dataKey="progress" name="Category Score %" radius={[6, 6, 0, 0]}>
                  {categoryBarData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.category] || '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}

          {activeChartType === 'pie' && (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a', borderColor: theme === 'light' ? '#e2e8f0' : '#334155', borderRadius: '0.5rem', color: theme === 'light' ? '#0f172a' : '#fff', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}

          {activeChartType === 'algebraic' && (
            <div className="h-full flex flex-col justify-between">
              <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-900/80 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 flex items-center gap-2">
                  <FunctionSquare className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                  Formula: {algebraicEvaluated.formula}
                </div>
                <div className="flex items-center gap-2">
                  {['exponential', 'logarithmic', 'quadratic', 'linear'].map((fn) => (
                    <button
                      key={fn}
                      onClick={() => setAlgebraicFuncType(fn)}
                      className={`px-2 py-1 text-[10px] font-semibold rounded capitalize transition-all ${
                        algebraicFuncType === fn
                          ? 'bg-purple-600 text-white'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 bg-slate-200 dark:bg-slate-800'
                      }`}
                    >
                      {fn}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-52 w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={algebraicEvaluated.data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'light' ? '#e2e8f0' : '#1e293b'} />
                    <XAxis dataKey="day" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <YAxis domain={[0, 100]} stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a', borderColor: theme === 'light' ? '#e2e8f0' : '#334155', borderRadius: '0.5rem', color: theme === 'light' ? '#0f172a' : '#fff', fontSize: '12px' }}
                    />
                    <ReferenceLine y={thresholds.globalTarget} stroke="#ef4444" strokeDasharray="3 3" label="Threshold" />
                    <Line type="monotone" dataKey="y" name="Algebraic Target Score" stroke="#a855f7" strokeWidth={3} dot={{ r: 4, fill: '#a855f7' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Task List Header & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Task Tracker Items</h3>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">({filteredTasks.length} tasks)</span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
          {/* Category Filter */}
          <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-slate-900 p-1 rounded-lg border border-slate-300 dark:border-slate-800">
            {['All', 'Work', 'Health', 'Finance', 'Learning'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-all ${
                  filterCategory === cat
                    ? 'bg-slate-800 text-cyan-400 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Priority Filter */}
          <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-slate-900 p-1 rounded-lg border border-slate-300 dark:border-slate-800">
            {['All', 'High', 'Medium', 'Low'].map(pri => (
              <button
                key={pri}
                onClick={() => setFilterPriority(pri)}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-all ${
                  filterPriority === pri
                    ? (pri === 'High' ? 'bg-rose-600 text-white font-bold' : pri === 'Medium' ? 'bg-amber-600 text-white font-bold' : pri === 'Low' ? 'bg-slate-600 text-white font-bold' : 'bg-slate-800 text-cyan-400 font-bold')
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {pri}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md shadow-blue-500/20 transition-all ml-auto"
          >
            <Plus className="w-4 h-4" /> Add Task
          </button>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTasks.map((task) => {
          const isPassed = task.currentProgress >= task.targetThreshold;
          const timer = taskTimers[task.id] || { running: false, elapsed: 0 };
          const isExpanded = expandedTaskId === task.id;
          const priorityColors = { High: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20', Medium: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20', Low: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20' };
          return (
            <div
              key={task.id}
              className={`glass-panel-interactive p-4 flex flex-col justify-between border-l-4 transition-all ${
                task.completed ? 'border-l-emerald-500 opacity-90' : isPassed ? 'border-l-blue-500' : 'border-l-amber-500'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <button
                      onClick={() => handleToggleComplete(task.id)}
                      className="mt-0.5 text-slate-400 hover:text-emerald-500 transition-colors"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                      )}
                    </button>
                    <div>
                      <h4 className={`text-sm font-bold ${task.completed ? 'line-through text-slate-400' : 'text-slate-900 dark:text-slate-100'}`}>
                        {task.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded text-white" style={{ backgroundColor: CATEGORY_COLORS[task.category] || '#3b82f6' }}>
                          {task.category}
                        </span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${priorityColors[task.priority] || priorityColors.Medium}`}>
                          {task.priority}
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                          Threshold: {task.targetThreshold}%
                        </span>
                        {/* Live Relative Timestamp */}
                        {task.lastModified && (
                          <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-mono flex items-center gap-0.5">
                            <Clock className="w-3 h-3" />
                            {getRelativeTime(task.lastModified)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {/* Expand / Collapse Notes & History */}
                    <button
                      onClick={() => {
                        setExpandedTaskId(isExpanded ? null : task.id);
                        if (!isExpanded) {
                          setEditingNoteId(null);
                          setNoteText(task.notes || '');
                        }
                      }}
                      title={isExpanded ? 'Collapse Details' : 'Expand Notes & History'}
                      className="p-1 text-slate-400 hover:text-blue-500 transition-colors"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {/* Live Task Timer Controls */}
                    <button
                      onClick={() => toggleTimer(task.id)}
                      title={timer.running ? 'Pause Timer' : 'Start Timer'}
                      className={`p-1 rounded transition-colors ${timer.running ? 'text-amber-500 hover:text-amber-600 bg-amber-500/10' : 'text-emerald-500 hover:text-emerald-600 bg-emerald-500/10'}`}
                    >
                      {timer.running ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                    {timer.elapsed > 0 && (
                      <button
                        onClick={() => resetTimer(task.id)}
                        title="Reset Timer"
                        className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                      >
                        <RefreshCw className="w-3 h-3" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-slate-400 dark:text-slate-600 hover:text-rose-500 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Live Timer Display */}
                {(timer.running || timer.elapsed > 0) && (
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs font-mono">
                    <Timer className={`w-3.5 h-3.5 text-blue-500 ${timer.running ? 'animate-pulse' : ''}`} />
                    <span className="text-blue-600 dark:text-blue-400 font-bold">{formatElapsed(timer.elapsed)}</span>
                    <span className="text-slate-500 dark:text-slate-400 text-[10px]">
                      {timer.running ? '● Recording' : '■ Paused'}
                    </span>
                  </div>
                )}

                {/* Progress Bar & Slider */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-500 dark:text-slate-400">Completion Score:</span>
                    <span className={`font-bold ${isPassed ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                      {task.currentProgress}% {isPassed ? '✓ Met' : '⚠ Below'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={task.currentProgress}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      const updated = tasks.map(t => t.id === task.id ? { 
                        ...t, 
                        currentProgress: val, 
                        completed: val >= t.targetThreshold,
                        lastModified: new Date().toISOString()
                      } : t);
                      setTasks(updated);
                    }}
                    className="w-full h-1.5 bg-slate-300 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>

                {/* ── Expandable Notes & Score History Panel ── */}
                {isExpanded && (
                  <div className="mt-2 pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3 animate-in slide-in-from-top-1">
                    {/* Score History Chips */}
                    {task.history && task.history.length > 0 && (
                      <div>
                        <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                          <BarChart3 className="w-3 h-3" /> Score History
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {task.history.map((h, idx) => (
                            <span
                              key={idx}
                              className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                                h.score >= task.targetThreshold
                                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                                  : 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20'
                              }`}
                            >
                              {h.date.slice(5)}: {h.score}%
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Inline Notes Editor */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <FileText className="w-3 h-3" /> Notes
                        </div>
                        {editingNoteId !== task.id && (
                          <button
                            onClick={() => { setEditingNoteId(task.id); setNoteText(task.notes || ''); }}
                            className="text-[10px] text-blue-500 hover:text-blue-400 flex items-center gap-0.5 transition-colors"
                          >
                            <Edit2 className="w-3 h-3" /> Edit
                          </button>
                        )}
                      </div>
                      {editingNoteId === task.id ? (
                        <div className="space-y-2">
                          <textarea
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500 resize-none"
                            placeholder="Add task notes…"
                          />
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => setEditingNoteId(null)}
                              className="px-2.5 py-1 text-[10px] text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSaveNote(task.id)}
                              className="px-2.5 py-1 text-[10px] font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-md"
                            >
                              Save Note
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900/60 px-3 py-2 rounded-lg">
                          {task.notes || 'No notes yet.'}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="glass-panel p-6 w-full max-w-md space-y-4 border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0d1424]">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-cyan-500 dark:text-cyan-400" /> Add New Task with Threshold
            </h3>

            <form onSubmit={handleAddTask} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Study RAG Vector Embeddings"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 dark:text-slate-400 mb-1">Category</label>
                  <select
                    value={newTaskCategory}
                    onChange={(e) => setNewTaskCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-200"
                  >
                    <option value="Work">Work</option>
                    <option value="Health">Health</option>
                    <option value="Finance">Finance</option>
                    <option value="Learning">Learning</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-500 dark:text-slate-400 mb-1">Priority</label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-200"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400 mb-1">
                  <span>Target Completion Threshold (%)</span>
                  <span className="font-mono text-cyan-600 dark:text-cyan-400">{newTaskThreshold}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={newTaskThreshold}
                  onChange={(e) => setNewTaskThreshold(e.target.value)}
                  className="w-full h-1.5 bg-slate-300 dark:bg-slate-800 rounded appearance-none accent-cyan-400"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
