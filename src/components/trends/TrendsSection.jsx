import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, Search, Cpu, Sparkles, BookOpen, Layers, 
  HelpCircle, ArrowUpRight, ArrowDownRight, Tag, ShieldAlert, Radio, RefreshCw, ExternalLink, Globe
} from 'lucide-react';
import { ragEngine } from '../../services/ragEngine';
import { liveNewsService } from '../../services/liveNewsService';

export default function TrendsSection({ globalSearchQuery, theme }) {
  const [activeSubTab, setActiveSubTab] = useState('live_news'); // 'live_news', 'job_market', 'fashion_lifestyle'
  const [newsCategory, setNewsCategory] = useState('All');
  const [newsList, setNewsList] = useState(() => liveNewsService.getLatestNews());
  const [isRefreshingNews, setIsRefreshingNews] = useState(false);
  const [localQuery, setLocalQuery] = useState('');

  const queryToUse = globalSearchQuery || localQuery;
  const ragResults = ragEngine.search(queryToUse, activeSubTab === 'job_market' ? 'job_market' : 'lifestyle_fashion', 6);

  const handleRefreshNews = () => {
    setIsRefreshingNews(true);
    setTimeout(() => {
      const fresh = liveNewsService.fetchLiveUpdates();
      setNewsList(fresh);
      setIsRefreshingNews(false);
    }, 600);
  };

  const filteredNews = newsCategory === 'All'
    ? newsList
    : newsList.filter(n => n.category.toLowerCase().includes(newsCategory.toLowerCase()));

  const growingSectors = [
    {
      title: 'AI Engineering & Agentic System Architecture',
      growth: '+142% YoY',
      category: 'Technology',
      whyGrowing: 'Enterprises are shifting rapidly from basic chat interfaces to production-ready multi-agent workflows, vector retrieval pipelines, and fine-tuned domain models.',
      macroCause: 'Automation ROI: Companies achieve 10x throughput in code review, customer resolution, and document intelligence.',
      keySkills: ['TypeScript / Python', 'Vector Databases', 'MCP (Model Context Protocol)', 'RAG Pipelines']
    },
    {
      title: 'Cleantech, Battery Storage & Smart Grid Infrastructure',
      growth: '+48% YoY',
      category: 'Energy & Hardware',
      whyGrowing: 'Hyper-scale AI data centers require gigawatt-level continuous clean power baseloads, forcing electric utilities to modernize grid infrastructure.',
      macroCause: 'Global climate mandates combined with intense data center power consumption.',
      keySkills: ['Power Systems', 'IoT Sensors', 'Cleantech Software', 'Grid Automation']
    },
    {
      title: 'Precision Genomics, Biotechnology & Longevity Science',
      growth: '+35% YoY',
      category: 'Healthcare',
      whyGrowing: 'AI-driven drug discovery (AlphaFold/ESM models) has slashed target identification timelines from years to months.',
      macroCause: 'Aging demographic pressures in G7 economies coupled with bio-computing breakthroughs.',
      keySkills: ['Bioinformatics', 'CRISPR Tools', 'Data Science', 'Clinical AI']
    }
  ];

  const fallingSectors = [
    {
      title: 'Legacy Data Entry & Manual Document Processing',
      decline: '-38% YoY',
      category: 'Administrative',
      whyFalling: 'Vision-LLMs (Multimodal models) extract structured JSON from complex invoices, medical forms, and PDF handwritings with >99% precision.',
      macroCause: 'Near-zero marginal cost of LLM document intelligence vs human manual entry.',
      transitionAdvice: 'Transition into Data Quality Assurance & Prompt Engineering.'
    },
    {
      title: 'First-Tier Un-automated Tele-Sales & Support',
      decline: '-32% YoY',
      category: 'Customer Ops',
      whyFalling: 'Conversational voice agents handle routine tier-1 inquiries, refunds, and scheduling with zero latency and multi-language capability.',
      macroCause: 'Voice AI latency dropped below 300ms, making conversational interaction seamless.',
      transitionAdvice: 'Focus on High-Touch Enterprise Client Success & Complex Negotiations.'
    },
    {
      title: 'Generic Un-differentiated Copywriting & Content Spinning',
      decline: '-27% YoY',
      category: 'Media & Marketing',
      whyFalling: 'Search engines and audiences penalty-rank shallow SEO content. AI generates baseline drafts instantly.',
      macroCause: 'Market saturation of basic written material requiring human expert analysis instead.',
      transitionAdvice: 'Pivot to Deep Industry Analysis, Investigative Journalism, & Video Media.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header & Subtab Navigation */}
      <div className="glass-panel p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4 border-l-cyan-500">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-500 dark:text-cyan-400" /> Global News & Market Trends Radar
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-rose-500/10 text-rose-500 dark:text-rose-400 border border-rose-500/20 flex items-center gap-1">
              <Radio className="w-3 h-3 animate-pulse" /> LIVE STREAM
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time live world updates, breaking daily news, job market matrix, and RAG-indexed vector insights.
          </p>
        </div>

        {/* Subtab Toggle */}
        <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-slate-900/90 p-1.5 rounded-xl border border-slate-300 dark:border-slate-800">
          <button
            onClick={() => setActiveSubTab('live_news')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeSubTab === 'live_news'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" /> Live World News
          </button>
          <button
            onClick={() => setActiveSubTab('job_market')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'job_market'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Job Market Matrix
          </button>
          <button
            onClick={() => setActiveSubTab('fashion_lifestyle')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'fashion_lifestyle'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Fashion & Lifestyle
          </button>
        </div>
      </div>

      {/* RAG Knowledge Base Results Banner if query active */}
      {queryToUse && (
        <div className="glass-panel p-5 space-y-3 bg-cyan-500/10 dark:bg-cyan-950/20 border-cyan-500/30">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-600 dark:text-cyan-400">
            <Sparkles className="w-4 h-4" /> RAG Vector Retrieval for "{queryToUse}"
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ragResults.map((item) => (
              <div key={item.id} className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-slate-200">{item.title || item.name}</span>
                  <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded">
                    Score: {item.score || 'Direct Match'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LIVE WORLD NEWS TAB */}
      {activeSubTab === 'live_news' && (
        <div className="space-y-6">
          {/* Live Bar Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Filter World Sector News:
              </span>
              <div className="flex items-center gap-1 overflow-x-auto text-xs">
                {['All', 'Technology', 'Energy', 'Jobs', 'Finance', 'Bio'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setNewsCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      newsCategory === cat
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-200/70 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleRefreshNews}
              disabled={isRefreshingNews}
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90 rounded-lg shadow-md transition-all active:scale-95 shrink-0"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingNews ? 'animate-spin' : ''}`} />
              <span>{isRefreshingNews ? 'Fetching Live...' : 'Refresh Live Feed'}</span>
            </button>
          </div>

          {/* Live News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNews.map((news) => (
              <div
                key={news.id}
                className="glass-panel-interactive p-5 space-y-3 flex flex-col justify-between border-l-4 border-l-cyan-500"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-cyan-600 dark:text-cyan-400 font-mono text-[10px] bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                      {news.category}
                    </span>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
                      <span>{news.source}</span>
                      <span>•</span>
                      <span className="font-mono text-cyan-500 font-bold">{news.timestamp}</span>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    {news.headline}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {news.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px]">
                  <div className="flex flex-wrap gap-1">
                    {news.relatedSectors.map((sec, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded border border-slate-300 dark:border-slate-700">
                        #{sec}
                      </span>
                    ))}
                  </div>

                  <a
                    href={news.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 font-semibold text-blue-600 dark:text-cyan-400 hover:underline shrink-0"
                  >
                    <span>Read Article</span> <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Job Market Matrix */}
      {activeSubTab === 'job_market' && (
        <div className="space-y-6">
          {/* Growing Sectors Grid */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-extrabold text-emerald-500 dark:text-emerald-400 uppercase tracking-wider">
              <ArrowUpRight className="w-5 h-5" /> Growing Job Sectors & Expansion Causes
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {growingSectors.map((sector, idx) => (
                <div key={idx} className="glass-panel-interactive p-5 flex flex-col justify-between space-y-4 border-t-2 border-t-emerald-500">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        {sector.category}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                        {sector.growth}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {sector.title}
                    </h3>
                  </div>

                  {/* Why Growing Section */}
                  <div className="space-y-2 bg-slate-100/80 dark:bg-slate-900/60 p-3 rounded-lg border border-slate-200 dark:border-slate-800/80 text-xs">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 block mb-0.5">Why It Is Growing:</span>
                      <p className="text-slate-800 dark:text-slate-300 leading-relaxed text-[11px]">{sector.whyGrowing}</p>
                    </div>
                    <div className="pt-1 border-t border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 block mb-0.5">Macro Economic Driver:</span>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">{sector.macroCause}</p>
                    </div>
                  </div>

                  {/* Required Skills */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase block mb-1">In-Demand Skills:</span>
                    <div className="flex flex-wrap gap-1">
                      {sector.keySkills.map((sk, i) => (
                        <span key={i} className="text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-300 dark:border-slate-700">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Falling Sectors Grid */}
          <div className="space-y-3 pt-4">
            <div className="flex items-center gap-2 text-sm font-extrabold text-rose-500 dark:text-rose-400 uppercase tracking-wider">
              <ArrowDownRight className="w-5 h-5" /> Contracting Job Sectors & Root Causes
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {fallingSectors.map((sector, idx) => (
                <div key={idx} className="glass-panel-interactive p-5 flex flex-col justify-between space-y-4 border-t-2 border-t-rose-500">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                        {sector.category}
                      </span>
                      <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 dark:bg-rose-950/60 px-2 py-0.5 rounded">
                        {sector.decline}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {sector.title}
                    </h3>
                  </div>

                  {/* Why Falling Section */}
                  <div className="space-y-2 bg-slate-100/80 dark:bg-slate-900/60 p-3 rounded-lg border border-slate-200 dark:border-slate-800/80 text-xs">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 block mb-0.5">Why It Is Falling:</span>
                      <p className="text-slate-800 dark:text-slate-300 leading-relaxed text-[11px]">{sector.whyFalling}</p>
                    </div>
                    <div className="pt-1 border-t border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 block mb-0.5">Root Cause:</span>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">{sector.macroCause}</p>
                    </div>
                  </div>

                  {/* Survival Advice */}
                  <div className="bg-amber-500/10 dark:bg-amber-950/20 border border-amber-500/30 p-2.5 rounded-lg text-xs">
                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase flex items-center gap-1 mb-0.5">
                      <ShieldAlert className="w-3 h-3" /> Career Transition Strategy:
                    </span>
                    <p className="text-slate-800 dark:text-slate-300 text-[11px]">{sector.transitionAdvice}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fashion & Lifestyle Tab */}
      {activeSubTab === 'fashion_lifestyle' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Tag className="w-5 h-5 text-purple-500 dark:text-purple-400" /> Fashion & Apparel Trends 2026
            </h3>
            <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-lg border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-cyan-600 dark:text-cyan-400">1. Cyber-Minimalism & Technical Outerwear</h4>
                <p className="mt-1">
                  High-durability waterproof textiles, modular pockets, and dark monochrome palettes designed for urban mobility.
                </p>
              </div>
              <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-lg border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-cyan-600 dark:text-cyan-400">2. Smart Fabrics & Integrated Telemetry</h4>
                <p className="mt-1">
                  Apparel embedded with micro-conductive yarns monitoring body temperature, heart rate variability, and posture alignment.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-500 dark:text-emerald-400" /> Lifestyle & Bio-Wellness Shifts
            </h3>
            <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-lg border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-emerald-600 dark:text-emerald-400">1. Continuous Biomarker Tracking</h4>
                <p className="mt-1">
                  Glucose monitors (CGMs) and sleep architecture rings are now staple daily accessories for software professionals.
                </p>
              </div>
              <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-lg border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-emerald-600 dark:text-emerald-400">2. Low-Dopamine Morning Protocols</h4>
                <p className="mt-1">
                  Eliminating phone screen time during the first 60 minutes of waking to preserve baseline focus and reduce stress hormones.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

