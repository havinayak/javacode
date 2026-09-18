// LocalStorage Management for OmniPulse AI

const STORAGE_KEYS = {
  TASKS: 'omnipulse_tasks',
  THRESHOLDS: 'omnipulse_thresholds',
  USER_NOTES: 'omnipulse_notes',
  SAVED_REPORTS: 'omnipulse_reports',
  SAVED_STOCKS: 'omnipulse_stocks'
};

const DEFAULT_TASKS = [
  {
    id: 'task-1',
    title: 'Complete System Architecture Specification',
    category: 'Work',
    priority: 'High',
    targetThreshold: 85,
    currentProgress: 90,
    completed: true,
    date: '2026-09-10',
    lastModified: '2026-09-10T14:30:00.000Z',
    history: [
      { date: '2026-09-07', score: 40 },
      { date: '2026-09-08', score: 65 },
      { date: '2026-09-09', score: 80 },
      { date: '2026-09-10', score: 90 }
    ],
    notes: 'RAG and MCP pipeline diagrams finished.'
  },
  {
    id: 'task-2',
    title: 'Daily High-Intensity Cardiovascular Session',
    category: 'Health',
    priority: 'Medium',
    targetThreshold: 75,
    currentProgress: 80,
    completed: true,
    date: '2026-09-11',
    lastModified: '2026-09-11T09:15:00.000Z',
    history: [
      { date: '2026-09-07', score: 70 },
      { date: '2026-09-08', score: 75 },
      { date: '2026-09-09', score: 60 },
      { date: '2026-09-10', score: 85 },
      { date: '2026-09-11', score: 80 }
    ],
    notes: '30 mins zone 2 running.'
  },
  {
    id: 'task-3',
    title: 'Review Portfolio Asset Allocation & Stock Earnings',
    category: 'Finance',
    priority: 'High',
    targetThreshold: 90,
    currentProgress: 95,
    completed: true,
    date: '2026-09-12',
    lastModified: '2026-09-12T16:45:00.000Z',
    history: [
      { date: '2026-09-07', score: 80 },
      { date: '2026-09-08', score: 85 },
      { date: '2026-09-09', score: 90 },
      { date: '2026-09-10', score: 90 },
      { date: '2026-09-11', score: 95 },
      { date: '2026-09-12', score: 95 }
    ],
    notes: 'Analyzed NVDA and TSLA catalyst reports.'
  },
  {
    id: 'task-4',
    title: 'Study AI-Resilient Fullstack Architecture & MCP Docs',
    category: 'Learning',
    priority: 'High',
    targetThreshold: 80,
    currentProgress: 60,
    completed: false,
    date: '2026-09-13',
    lastModified: '2026-09-13T18:20:00.000Z',
    history: [
      { date: '2026-09-07', score: 30 },
      { date: '2026-09-08', score: 45 },
      { date: '2026-09-09', score: 50 },
      { date: '2026-09-10', score: 55 },
      { date: '2026-09-11', score: 60 },
      { date: '2026-09-12', score: 60 },
      { date: '2026-09-13', score: 60 }
    ],
    notes: 'Working on model context protocols.'
  },
  {
    id: 'task-5',
    title: 'Stoic Mindset Journaling & Cognitive Audit',
    category: 'Health',
    priority: 'Low',
    targetThreshold: 70,
    currentProgress: 70,
    completed: true,
    date: '2026-09-13',
    lastModified: '2026-09-13T21:00:00.000Z',
    history: [
      { date: '2026-09-10', score: 50 },
      { date: '2026-09-11', score: 60 },
      { date: '2026-09-12', score: 70 },
      { date: '2026-09-13', score: 70 }
    ],
    notes: 'Focus on locus of control.'
  }
];

export const storageService = {
  getTasks: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TASKS);
      return data ? JSON.parse(data) : DEFAULT_TASKS;
    } catch (e) {
      return DEFAULT_TASKS;
    }
  },
  saveTasks: (tasks) => {
    try {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to save tasks', e);
    }
  },
  getThresholds: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.THRESHOLDS);
      return data ? JSON.parse(data) : { globalTarget: 80, warningThreshold: 60 };
    } catch (e) {
      return { globalTarget: 80, warningThreshold: 60 };
    }
  },
  saveThresholds: (thresholds) => {
    try {
      localStorage.setItem(STORAGE_KEYS.THRESHOLDS, JSON.stringify(thresholds));
    } catch (e) {
      console.error('Failed to save thresholds', e);
    }
  },
  getSavedStocks: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_STOCKS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },
  saveSavedStocks: (stocks) => {
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_STOCKS, JSON.stringify(stocks));
    } catch (e) {
      console.error('Failed to save stocks', e);
    }
  },
  getNotes: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_NOTES);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },
  saveNotes: (notes) => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_NOTES, JSON.stringify(notes));
    } catch (e) {
      console.error('Failed to save notes', e);
    }
  },
  exportPerformanceReport: (tasks, thresholds, stockList = []) => {
    try {
      const completedTasks = tasks.filter(t => t.completed);
      const avgScore = tasks.length > 0
        ? Math.round(tasks.reduce((a, b) => a + b.currentProgress, 0) / tasks.length)
        : 0;

      const reportData = {
        title: 'OmniPulse AI Intelligence & Telemetry Audit',
        generatedAt: new Date().toISOString(),
        summary: {
          totalTasks: tasks.length,
          completedTasks: completedTasks.length,
          completionRate: `${tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0}%`,
          averageProgressScore: `${avgScore}%`,
          globalTargetThreshold: `${thresholds.globalTarget}%`,
          thresholdStatus: avgScore >= thresholds.globalTarget ? 'TARGET MET (+ PASSED)' : 'BELOW TARGET'
        },
        tasks: tasks.map(t => ({
          title: t.title,
          category: t.category,
          priority: t.priority,
          targetThreshold: t.targetThreshold,
          currentProgress: t.currentProgress,
          completed: t.completed,
          notes: t.notes || 'None'
        })),
        trackedStocks: stockList.map(s => ({
          ticker: s.ticker,
          name: s.name,
          price: s.price,
          change: s.change,
          catalyst: s.catalyst
        }))
      };

      const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `OmniPulse_Report_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return true;
    } catch (err) {
      console.error('Failed to export report', err);
      return false;
    }
  }
};
