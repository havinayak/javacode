// LocalStorage Management for OmniPulse AI

const STORAGE_KEYS = {
  TASKS: 'omnipulse_tasks',
  THRESHOLDS: 'omnipulse_thresholds',
  USER_NOTES: 'omnipulse_notes',
  SAVED_REPORTS: 'omnipulse_reports'
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
    } catch {
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
    } catch {
      return { globalTarget: 80, warningThreshold: 60 };
    }
  },
  saveThresholds: (thresholds) => {
    try {
      localStorage.setItem(STORAGE_KEYS.THRESHOLDS, JSON.stringify(thresholds));
    } catch (e) {
      console.error('Failed to save thresholds', e);
    }
  }
};
