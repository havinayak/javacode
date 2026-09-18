import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import TaskTrackerSection from './components/tasks/TaskTrackerSection';
import TrendsSection from './components/trends/TrendsSection';
import FinanceSection from './components/finance/FinanceSection';
import SurvivalSection from './components/survival/SurvivalSection';
import McpAssistantDrawer from './components/ai/McpAssistantDrawer';
import { storageService } from './services/storageService';

export default function App() {
  const [activeTab, setActiveTab] = useState('tasks'); // 'tasks', 'trends', 'finance', 'survival'
  const [tasks, setTasks] = useState(() => storageService.getTasks());
  const [thresholds, setThresholds] = useState(() => storageService.getThresholds());
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [isMcpDrawerOpen, setIsMcpDrawerOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('omnipulse_theme') || 'dark';
  });

  // Theme Sync
  useEffect(() => {
    localStorage.setItem('omnipulse_theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  // Sync to local storage
  useEffect(() => {
    storageService.saveTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    storageService.saveThresholds(thresholds);
  }, [thresholds]);

  const handleAgentAction = (action) => {
    if (!action) return;
    if (action.type === 'ADD_TASK' && action.payload) {
      setTasks(prev => [action.payload, ...prev]);
    } else if (action.type === 'UPDATE_THRESHOLD' && action.payload) {
      setThresholds(prev => ({ ...prev, globalTarget: action.payload.target }));
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-slate-100 text-slate-900' : 'bg-[#090d16] text-slate-100'} flex flex-col font-sans selection:bg-cyan-500 selection:text-black transition-colors duration-300`}>
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onOpenMcpAssistant={() => setIsMcpDrawerOpen(true)}
        globalSearchQuery={globalSearchQuery}
        setGlobalSearchQuery={setGlobalSearchQuery}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Main Content Layout */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 md:p-6 gap-6">
        {/* Navigation Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} />

        {/* Section View Workspace */}
        <main className="flex-1 min-w-0">
          {activeTab === 'tasks' && (
            <TaskTrackerSection
              tasks={tasks}
              setTasks={setTasks}
              thresholds={thresholds}
              setThresholds={setThresholds}
              theme={theme}
            />
          )}

          {activeTab === 'trends' && (
            <TrendsSection globalSearchQuery={globalSearchQuery} theme={theme} />
          )}

          {activeTab === 'finance' && (
            <FinanceSection globalSearchQuery={globalSearchQuery} theme={theme} />
          )}

          {activeTab === 'survival' && (
            <SurvivalSection theme={theme} />
          )}
        </main>
      </div>

      {/* MCP AI Assistant Drawer */}
      <McpAssistantDrawer
        isOpen={isMcpDrawerOpen}
        onClose={() => setIsMcpDrawerOpen(false)}
        theme={theme}
        onAgentAction={handleAgentAction}
      />

      {/* Futuristic Background Glow Elements */}
      <div className={`fixed top-1/4 left-10 w-96 h-96 ${theme === 'light' ? 'bg-blue-400/20' : 'bg-blue-600/10'} rounded-full blur-3xl pointer-events-none -z-10`}></div>
      <div className={`fixed bottom-10 right-10 w-96 h-96 ${theme === 'light' ? 'bg-cyan-400/20' : 'bg-cyan-500/10'} rounded-full blur-3xl pointer-events-none -z-10`}></div>
    </div>
  );
}

