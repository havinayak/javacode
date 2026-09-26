import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  TrendingUp, TrendingDown, DollarSign, Search, ShieldCheck, 
  HelpCircle, ChevronRight, AlertTriangle, ArrowUpRight, ArrowDownRight, 
  Calendar, Layers, FileText, Activity, Plus, Sparkles, Zap, Factory, ShieldAlert, Download,
  Radio, Play, Pause, RefreshCw
} from 'lucide-react';
import { ragEngine } from '../../services/ragEngine';
import { storageService } from '../../services/storageService';

// Base stocks with sudden volatility & deep industrial root cause metrics
const DEFAULT_STOCKS = [
    {
      ticker: 'NVDA',
      name: 'NVIDIA Corporation',
      price: '$138.25',
      change: '+14.8%',
      isRising: true,
      isSudden: true,
      suddenTag: '⚡ Sudden Volatility Surge',
      category: 'AI Hardware / Semiconductors',
      marketCap: '$3.40T',
      volume: '62.4M',
      catalyst: 'Q3 Earnings Beat & Blackwell GPU Full Pre-order Allocation',
      industrialContext: {
        sector: 'Semiconductor Manufacturing & Lithography Supply Chain',
        macroImpact: 'High Demand Bottleneck: TSMC 3nm wafer allocation capacity reached 98% utilization worldwide.',
        regulatoryPolicy: 'Export controls compliance verified across non-restricted international regions.',
        energyDemand: 'High: Data center expansion driving massive power supply order backlog.'
      },
      rootCauses: [
        { title: 'Datacenter Segment Boom', desc: 'Datacenter revenue rocketed to $30.8B (+112% YoY) driven by hyperscale cloud demand for AI LLM training.' },
        { title: 'Blackwell B200 Chip Allocation', desc: 'Pre-orders for next-gen B200 and GB200 NVL72 architectures sold out through end of 2027.' },
        { title: 'CUDA Software Ecosystem Moat', desc: 'Over 5 million developers lock-in ensures low defection risk to custom cloud ASIC silicon.' }
      ],
      timeline: [
        { date: '09:00 AM', event: 'Q3 Financial results released exceeding top-line estimates by $2.4B.' },
        { date: '10:30 AM', event: 'CEO confirmed Blackwell production ramp yields exceed 92%.' },
        { date: '02:15 PM', event: 'Wall Street analysts upgrade price target to $175.' }
      ]
    },
    {
      ticker: 'APLS',
      name: 'Apogee Clean Energy & Grid Tech',
      price: '$84.10',
      change: '+22.4%',
      isRising: true,
      isSudden: true,
      suddenTag: '⚡ Sudden Industrial Spike',
      category: 'Renewable Power / Data Center Baseload',
      marketCap: '$42.1B',
      volume: '18.9M',
      catalyst: 'Multi-Billion Power Purchase Agreement (PPA) with Big Tech',
      industrialContext: {
        sector: 'Power Grid Infrastructure & Energy Utilities',
        macroImpact: 'Baseload Crisis: Regional power grids facing 3-5 year interconnection queues, driving tech hyperscalers directly to private utility PPAs.',
        regulatoryPolicy: 'US Dept of Energy fast-tracked high-voltage direct current (HVDC) line construction permits.',
        energyDemand: 'Extreme: Co-located 1.2 GW geothermal cluster directly powering cloud data campus.'
      },
      rootCauses: [
        { title: 'Data Center Energy Shortage', desc: 'AI data centers facing regional grid interconnection delays signed 15-year baseload contracts.' },
        { title: 'Geothermal & SMR Nuclear Portfolio', desc: 'APLS controls 4.2 GW of zero-carbon baseload power directly adjacent to major US Fiber hubs.' }
      ],
      timeline: [
        { date: '08:30 AM', event: 'Announced 15-year $6.2B PPA with major cloud hyperscalers.' },
        { date: '11:00 AM', event: 'US Department of Energy granted fast-track transmission approval.' }
      ]
    },
    {
      ticker: 'INTC',
      name: 'Intel Corporation',
      price: '$19.40',
      change: '-18.2%',
      isRising: false,
      isSudden: true,
      suddenTag: '💥 Flash Drop Warning',
      category: 'Semiconductors / Foundry',
      marketCap: '$83.2B',
      volume: '88.5M',
      catalyst: 'Foundry Restructuring Delays & Margin Compression',
      industrialContext: {
        sector: 'Commercial Foundry & Semiconductor Packaging',
        macroImpact: 'EUV Yield Friction: Advanced 18A process node startup yields initially lagged commercial customer specs, inflating capex.',
        regulatoryPolicy: 'CHIPS Act fund disbursement milestones tied to fab construction progress.',
        energyDemand: 'High: Fab construction overhead in domestic sites requiring localized power substation upgrades.'
      },
      rootCauses: [
        { title: 'Intel Foundry Services Operating Loss', desc: 'IFS reported operating losses of $2.8B due to initial high EUV startup costs and delayed external customer tape-outs.' },
        { title: 'Datacenter CPU Share Loss', desc: 'AMD EPYC 5th Gen and ARM-based cloud custom processors eroded Intel Xeon market share to historical lows.' },
        { title: 'Capital Expenditure Pressure', desc: 'High capital outlay required for Ohio and Magdeburg fabs before reaching commercial yield.' }
      ],
      timeline: [
        { date: '04:15 PM (Yesterday)', event: 'Earnings report revealed lower Q4 gross margin guidance (36.5% vs 41% expected).' },
        { date: '08:00 AM', event: 'Downgraded by 3 major investment firms citing fab execution risks.' }
      ]
    },
    {
      ticker: 'TSLA',
      name: 'Tesla, Inc.',
      price: '$210.80',
      change: '-9.5%',
      isRising: false,
      isSudden: false,
      suddenTag: 'Moderate Re-pricing',
      category: 'Automotive / EV & Energy',
      marketCap: '$670.5B',
      volume: '54.2M',
      catalyst: 'EV Pricing Pressure & Full Self-Driving Regulatory Review',
      industrialContext: {
        sector: 'Automotive Manufacturing & Autonomous Robotics',
        macroImpact: 'EV Price Wars: Asian battery cell supply gluts enabled aggressive competitor pricing, pressuring global auto gross margins.',
        regulatoryPolicy: 'Safety regulators requested telemetry logs on autonomous software edge-case disengagements.',
        energyDemand: 'Moderate: Megapack grid storage production ramping to offset auto segment margins.'
      },
      rootCauses: [
        { title: 'Auto Gross Margin Contraction', desc: 'Promotional price cuts in European and Asian markets compressed vehicle gross margins by 180 basis points.' },
        { title: 'Regulatory FSD Scrutiny', desc: 'NHTSA initiated preliminary inquiry into autonomous software edge-case intervention logs.' }
      ],
      timeline: [
        { date: '07:45 AM', event: 'Q3 delivery numbers showed modest 2% YoY increase vs 7% market consensus.' },
        { date: '01:30 PM', event: 'European market share reports indicated increased competition from BYD.' }
      ]
    }
  ];

export default function FinanceSection({ globalSearchQuery, theme }) {
  const [selectedStock, setSelectedStock] = useState(null);
  const [stockFilter, setStockFilter] = useState('all'); // 'all', 'rising', 'falling', 'sudden'
  const [localSearch, setLocalSearch] = useState('');
  const [customTickerInput, setCustomTickerInput] = useState('');

  // ── Live Market Feed Telemetry State ──
  const [isLiveMarketActive, setIsLiveMarketActive] = useState(true);
  const [marketCountdown, setMarketCountdown] = useState(6);
  const [priceFlashMap, setPriceFlashMap] = useState({}); // { [ticker]: 'up' | 'down' }
  const [lastMarketUpdate, setLastMarketUpdate] = useState(() => new Date());

  const [stockList, setStockList] = useState(() => {
    const saved = storageService.getSavedStocks();
    const existing = new Set(DEFAULT_STOCKS.map(s => s.ticker));
    const custom = saved.filter(s => !existing.has(s.ticker));
    return [...custom, ...DEFAULT_STOCKS];
  });

  useEffect(() => {
    const customOnly = stockList.filter(s => !DEFAULT_STOCKS.some(d => d.ticker === s.ticker));
    storageService.saveSavedStocks(customOnly);
  }, [stockList]);

  // Execute a simulated realistic micro-market tick
  const executeMarketTick = useCallback(() => {
    setStockList(prev => {
      if (!prev || prev.length === 0) return prev;
      // Pick 1 to 2 random stocks to fluctuate
      const targetIndices = [];
      const count = Math.min(prev.length, Math.floor(Math.random() * 2) + 1);
      while (targetIndices.length < count) {
        const randIdx = Math.floor(Math.random() * prev.length);
        if (!targetIndices.includes(randIdx)) targetIndices.push(randIdx);
      }

      const flashUpdates = {};
      const updated = prev.map((stock, idx) => {
        if (!targetIndices.includes(idx)) return stock;

        // Parse numerical price
        const numPrice = parseFloat(stock.price.replace(/[^0-9.]/g, '')) || 100;
        // Direction and delta percentage (-1.2% to +1.2%)
        const deltaPct = (Math.random() * 2.4 - 1.15); // e.g. +0.8%
        const isUp = deltaPct >= 0;
        const newPriceVal = Math.max(1, numPrice * (1 + deltaPct / 100));

        // Parse current percentage change
        const currentChangeNum = parseFloat(stock.change.replace(/[^0-9.-]/g, '')) || 0;
        const newChangeNum = currentChangeNum + deltaPct;
        const newChangeStr = `${newChangeNum >= 0 ? '+' : ''}${newChangeNum.toFixed(1)}%`;
        const newIsRising = newChangeNum >= 0;
        const isSudden = Math.abs(newChangeNum) >= 12;

        flashUpdates[stock.ticker] = isUp ? 'up' : 'down';

        return {
          ...stock,
          price: `$${newPriceVal.toFixed(2)}`,
          change: newChangeStr,
          isRising: newIsRising,
          isSudden,
          suddenTag: isSudden ? (newIsRising ? '⚡ Sudden Volatility Surge' : '💥 Sudden Dip Alert') : stock.suddenTag,
          lastTickAt: new Date().toISOString()
        };
      });

      setPriceFlashMap(flashUpdates);
      setTimeout(() => setPriceFlashMap({}), 1500);
      setLastMarketUpdate(new Date());
      return updated;
    });
  }, []);

  // Automatic Market Feed Countdown Interval
  useEffect(() => {
    if (!isLiveMarketActive) return;

    const interval = setInterval(() => {
      setMarketCountdown(prev => {
        if (prev <= 1) {
          executeMarketTick();
          return 6;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isLiveMarketActive, executeMarketTick]);

  const handleAddOrSearchStock = (e) => {
    e?.preventDefault();
    const query = customTickerInput.trim() || localSearch.trim() || globalSearchQuery.trim();
    if (!query) return;

    const generated = ragEngine.getOrCreateStockAnalysis(query);
    if (generated) {
      const enriched = {
        ...generated,
        isSudden: Math.abs(parseFloat(generated.change || '0')) > 10,
        suddenTag: parseFloat(generated.change || '0') > 0 ? '⚡ Sudden Spike' : '💥 Sudden Dip',
        lastTickAt: new Date().toISOString(),
        industrialContext: {
          sector: `${generated.category} Industrial Chain`,
          macroImpact: 'Sector-wide market re-valuation based on live corporate quarterly performance.',
          regulatoryPolicy: 'Standard international trade and financial reporting compliance.',
          energyDemand: 'Baseline operational consumption.'
        }
      };
      if (!stockList.some(s => s.ticker === enriched.ticker)) {
        setStockList([enriched, ...stockList]);
      }
      setSelectedStock(enriched);
      setCustomTickerInput('');
    }
  };

  const searchTerms = globalSearchQuery || localSearch;
  const filteredStocks = stockList.filter(stock => {
    const matchesFilter = stockFilter === 'all' 
      ? true 
      : stockFilter === 'rising' ? stock.isRising 
      : stockFilter === 'falling' ? !stock.isRising 
      : stock.isSudden;
    const matchesSearch = !searchTerms || 
      stock.ticker.toLowerCase().includes(searchTerms.toLowerCase()) || 
      stock.name.toLowerCase().includes(searchTerms.toLowerCase()) ||
      stock.category.toLowerCase().includes(searchTerms.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4 border-l-emerald-500">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-500 dark:text-emerald-400" /> Stock Intelligence & Deep Industrial Diagnostic
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-500" /> Sudden Movement Radar
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Deep-dive industrial root-cause analysis for sudden stock price surges, flash dips, and macro-sector supply chain shocks.
          </p>
        </div>

        {/* Live Market Telemetry & Add Ticker Form */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          {/* Live Market Pulse Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-200/80 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-[11px] font-mono shrink-0">
            {isLiveMarketActive ? (
              <>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">LIVE FEED</span>
                <span className="text-slate-400 dark:text-slate-500">•</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-bold">Tick in {marketCountdown}s</span>
              </>
            ) : (
              <>
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">FEED PAUSED</span>
              </>
            )}

            <button
              onClick={() => setIsLiveMarketActive(!isLiveMarketActive)}
              title={isLiveMarketActive ? 'Pause live market feed' : 'Resume live market feed'}
              className="ml-1 p-1 text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 rounded"
            >
              {isLiveMarketActive ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>

            <button
              onClick={executeMarketTick}
              title="Force market tick immediately"
              className="p-1 text-slate-500 hover:text-cyan-500 rounded"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>

          <form onSubmit={handleAddOrSearchStock} className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search ticker (e.g. AAPL)..."
                value={customTickerInput}
                onChange={(e) => setCustomTickerInput(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-white/80 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-200 focus:outline-none focus:border-emerald-500 font-mono w-36 sm:w-44"
              />
            </div>
            <button
              type="submit"
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90 rounded-lg shadow-md transition-all shrink-0"
            >
              <Plus className="w-4 h-4" /> Analyze
            </button>
          </form>

          <button
            onClick={() => storageService.exportPerformanceReport([], { globalTarget: 80 }, stockList)}
            title="Download Intelligence Report (JSON)"
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm transition-all shrink-0"
          >
            <Download className="w-3.5 h-3.5 text-emerald-500" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Preset Quick Stock Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase shrink-0">Quick Analyze:</span>
        {['AAPL', 'AMZN', 'MSFT', 'GOOGL', 'AMD', 'META', 'PLTR', 'NFLX', 'ORCL'].map(t => (
          <button
            key={t}
            onClick={() => {
              const item = ragEngine.getOrCreateStockAnalysis(t);
              const enriched = {
                ...item,
                isSudden: Math.abs(parseFloat(item.change || '0')) > 10,
                suddenTag: parseFloat(item.change || '0') > 0 ? '⚡ Sudden Spike' : '💥 Sudden Dip',
                lastTickAt: new Date().toISOString(),
                industrialContext: {
                  sector: `${item.category} Industrial Chain`,
                  macroImpact: 'Sector-wide market re-valuation based on live corporate quarterly performance.',
                  regulatoryPolicy: 'Standard international trade compliance.',
                  energyDemand: 'Baseline operational consumption.'
                }
              };
              if (!stockList.some(s => s.ticker === enriched.ticker)) {
                setStockList([enriched, ...stockList]);
              }
              setSelectedStock(enriched);
            }}
            className="px-2.5 py-1 rounded-md bg-slate-200/80 dark:bg-slate-900/90 hover:bg-slate-300 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-300 font-mono border border-slate-300 dark:border-slate-800 transition-all text-[11px] shrink-0"
          >
            +{t}
          </button>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
          <span>Tracking {filteredStocks.length} Stock Diagnostics</span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            ● Real-Time Streaming
          </span>
        </div>

        <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-slate-900/90 p-1.5 rounded-xl border border-slate-300 dark:border-slate-800">
          <button
            onClick={() => setStockFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              stockFilter === 'all'
                ? 'bg-slate-800 text-white shadow'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            All Stocks
          </button>
          <button
            onClick={() => setStockFilter('sudden')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
              stockFilter === 'sudden'
                ? 'bg-amber-600 text-white shadow'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" /> Sudden Shifts
          </button>
          <button
            onClick={() => setStockFilter('rising')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
              stockFilter === 'rising'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <ArrowUpRight className="w-3.5 h-3.5" /> Rising
          </button>
          <button
            onClick={() => setStockFilter('falling')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
              stockFilter === 'falling'
                ? 'bg-rose-600 text-white shadow'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <ArrowDownRight className="w-3.5 h-3.5" /> Falling
          </button>
        </div>
      </div>

      {/* Stock Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStocks.map((stock) => {
          const flash = priceFlashMap[stock.ticker];
          return (
            <div
              key={stock.ticker}
              className={`glass-panel-interactive p-5 flex flex-col justify-between space-y-4 border-l-4 transition-all duration-300 ${
                flash === 'up'
                  ? 'ring-2 ring-emerald-400 bg-emerald-500/10'
                  : flash === 'down'
                  ? 'ring-2 ring-rose-400 bg-rose-500/10'
                  : ''
              } ${
                stock.isRising ? 'border-l-emerald-500 glow-emerald' : 'border-l-rose-500 glow-rose'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black text-slate-900 dark:text-white font-mono bg-slate-200 dark:bg-slate-900 px-2.5 py-1 rounded border border-slate-300 dark:border-slate-800">
                      {stock.ticker}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">{stock.name}</h3>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">{stock.category}</span>
                        <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> LIVE
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-base font-bold text-slate-900 dark:text-white font-mono flex items-center justify-end gap-1">
                      {flash === 'up' && <span className="text-xs text-emerald-500 animate-bounce">▲</span>}
                      {flash === 'down' && <span className="text-xs text-rose-500 animate-bounce">▼</span>}
                      <span>{stock.price}</span>
                    </div>
                    <div className={`text-xs font-mono font-bold flex items-center justify-end gap-0.5 ${
                      stock.isRising ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                    }`}>
                      {stock.isRising ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                      {stock.change}
                    </div>
                  </div>
                </div>

              {/* Sudden Movement Warning Badge if present */}
              {stock.isSudden && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[11px] font-bold font-mono">
                  <Zap className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
                  <span>{stock.suddenTag}</span>
                </div>
              )}

              {/* Primary Catalyst Brief */}
              <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase block mb-0.5">Primary Catalyst:</span>
                <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">{stock.catalyst}</p>
              </div>
            </div>

            {/* Bottom Meta & Inspect Button */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-3 font-mono">
                <span>Cap: {stock.marketCap}</span>
                <span>Vol: {stock.volume}</span>
              </div>

              <button
                onClick={() => setSelectedStock(stock)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-blue-600 dark:text-cyan-400 bg-blue-500/10 dark:bg-cyan-500/10 hover:bg-blue-500/20 dark:hover:bg-cyan-500/20 border border-blue-500/30 dark:border-cyan-500/30 rounded-lg transition-all"
              >
                Deep Industrial Diagnostic <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>

      {/* Deep Industrial Root-Cause Diagnostic Modal */}
      {selectedStock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="glass-panel p-6 w-full max-w-2xl max-h-[85vh] overflow-y-auto space-y-6 border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#090d16] text-slate-900 dark:text-white">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-xl font-black text-slate-900 dark:text-white font-mono bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700">
                  {selectedStock.ticker}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedStock.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{selectedStock.category}</p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xl font-bold text-slate-900 dark:text-white font-mono">{selectedStock.price}</div>
                <div className={`text-xs font-mono font-bold ${selectedStock.isRising ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {selectedStock.change} {selectedStock.isRising ? 'Surge' : 'Decline'}
                </div>
              </div>
            </div>

            {/* Industrial Sector Context Section */}
            {selectedStock.industrialContext && (
              <div className="space-y-3 bg-blue-500/10 dark:bg-slate-900/80 p-4 rounded-xl border border-blue-500/30">
                <h4 className="text-xs font-extrabold text-blue-600 dark:text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                  <Factory className="w-4 h-4" /> Industrial Sector & Macro Breakdown
                </h4>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-slate-700 dark:text-slate-300">Industrial Chain: </span>
                    <span className="text-slate-600 dark:text-slate-400">{selectedStock.industrialContext.sector}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 dark:text-slate-300">Macro Shock Cause: </span>
                    <span className="text-slate-600 dark:text-slate-400">{selectedStock.industrialContext.macroImpact}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 dark:text-slate-300">Regulatory Status: </span>
                    <span className="text-slate-600 dark:text-slate-400">{selectedStock.industrialContext.regulatoryPolicy}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Root Cause Analysis Section */}
            <div className="space-y-3">
              <h4 className="text-sm font-extrabold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4" /> Root-Cause Analysis: Why It {selectedStock.isRising ? 'Rose' : 'Fell'}
              </h4>

              <div className="space-y-3">
                {selectedStock.rootCauses.map((rc, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-100 dark:bg-slate-900/90 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-slate-200">
                      <span className="w-5 h-5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-[10px] font-mono border border-cyan-500/20">
                        {idx + 1}
                      </span>
                      {rc.title}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-7">
                      {rc.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline of Events */}
            {selectedStock.timeline && (
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-500 dark:text-purple-400" /> Key Event Timeline
                </h4>
                <div className="space-y-2 border-l-2 border-slate-300 dark:border-slate-800 pl-4 ml-2">
                  {selectedStock.timeline.map((item, i) => (
                    <div key={i} className="text-xs space-y-0.5 relative">
                      <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                      <span className="font-mono text-[10px] text-purple-600 dark:text-purple-400 block">{item.date}</span>
                      <p className="text-slate-700 dark:text-slate-300">{item.event}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Close Button */}
            <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setSelectedStock(null)}
                className="px-5 py-2 text-xs font-bold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg transition-all"
              >
                Close Diagnostic
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

