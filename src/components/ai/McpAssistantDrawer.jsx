import React, { useState } from 'react';
import { 
  Sparkles, X, Send, Bot, Terminal, Cpu, Database, CheckCircle2, 
  HelpCircle, ArrowRight 
} from 'lucide-react';
import { mcpProtocol } from '../../services/mcpProtocol';

export default function McpAssistantDrawer({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      thought: 'Initialized Model Context Protocol (MCP) environment with active RAG vector index.',
      text: 'Hello! I am your OmniPulse AI Assistant. I can execute MCP tools for algebraic chart evaluation, analyze stock movement root-causes, search global job market trends, or calculate life survival metrics. What would you like to explore?',
      toolUsed: 'system_init'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputQuery.trim() || isProcessing) return;

    const userMsg = { sender: 'user', text: inputQuery };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = inputQuery;
    setInputQuery('');
    setIsProcessing(true);

    setTimeout(() => {
      const agentRes = mcpProtocol.runAgentPrompt(currentInput);
      setMessages(prev => [...prev, {
        sender: 'assistant',
        thought: agentRes.thought,
        text: agentRes.textResponse,
        toolUsed: agentRes.toolUsed,
        data: agentRes.data
      }]);
      setIsProcessing(false);
    }, 400);
  };

  const handleQuickPrompt = (promptText) => {
    setInputQuery(promptText);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 glass-panel border-l border-slate-800 shadow-2xl flex flex-col justify-between p-4 bg-slate-950/95 backdrop-blur-xl">
      {/* Drawer Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-extrabold text-white flex items-center gap-1.5">
              OmniPulse Agent <span className="text-[10px] text-cyan-400 font-mono">MCP</span>
            </h3>
            <p className="text-[10px] text-slate-400">Context Protocol & RAG Assistant</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Conversation Trajectory */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 text-xs">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`space-y-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
          >
            {msg.sender === 'assistant' && msg.thought && (
              <div className="p-2 bg-slate-900/90 rounded border border-slate-800 text-[10px] text-slate-400 font-mono space-y-1">
                <div className="flex items-center gap-1 text-cyan-400 font-bold">
                  <Terminal className="w-3 h-3" /> MCP Thought & Execution
                </div>
                <p>{msg.thought}</p>
                {msg.toolUsed && (
                  <span className="inline-block bg-cyan-500/10 text-cyan-300 px-1.5 py-0.5 rounded text-[9px] border border-cyan-500/20">
                    Tool: {msg.toolUsed}
                  </span>
                )}
              </div>
            )}

            <div
              className={`inline-block p-3 rounded-xl max-w-[90%] leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none font-medium'
                  : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isProcessing && (
          <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400 animate-spin" />
            <span>Executing Model Context Protocol tool...</span>
          </div>
        )}
      </div>

      {/* Suggested Quick Prompts */}
      <div className="py-2 border-t border-slate-800 space-y-2">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Suggested Prompts:</span>
        <div className="flex flex-wrap gap-1.5">
          {[
            'Why is NVDA stock rising?',
            'Exponential habit curve graph',
            'Which job sectors are falling?',
            'Calculate BMR for 75kg'
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleQuickPrompt(prompt)}
              className="text-[10px] bg-slate-900 hover:bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-800 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="flex items-center gap-2 pt-2">
          <input
            type="text"
            placeholder="Ask AI via MCP & RAG..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-xs"
          />
          <button
            type="submit"
            disabled={isProcessing}
            className="p-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
