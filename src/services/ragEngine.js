// RAG (Retrieval-Augmented Generation) Engine for OmniPulse AI

export const KNOWLEDGE_BASE = [
  // JOB MARKET & WORLD TRENDS
  {
    id: 'kb-trend-1',
    domain: 'job_market',
    category: 'Growing Sectors',
    title: 'AI Engineering, Autonomous Systems & LLMOps Boom',
    tags: ['AI', 'Tech', 'Engineering', 'Jobs', 'Growth'],
    content: `The global job market is witnessing an unprecedented surge in demand for AI Infrastructure Engineers, LLMOps Specialists, and Agentic Workflow Architects. 
WHY IT IS GROWING: Enterprises are aggressively transitioning from experimental AI prototypes to production-level agentic pipelines. Companies require specialists who can construct vector databases, fine-tune models, implement RAG systems, and optimize latency.
KEY METRICS: +142% year-over-year job posting growth. Average starting salary increased by 35% across North America, Europe, and Asia-Pacific tech hubs.
REQUIRED SKILLS: Python, TypeScript, Vector DBs (Milvus/Pinecone), Model Context Protocol (MCP), CUDA/PyTorch optimization, and system design.`
  },
  {
    id: 'kb-trend-2',
    domain: 'job_market',
    category: 'Growing Sectors',
    title: 'Renewable Energy, Grid Automation & Cleantech Infrastructure',
    tags: ['Cleantech', 'Solar', 'Grid', 'Engineering', 'Growth'],
    content: `Clean energy infrastructure, microgrid engineering, and battery storage technology are undergoing rapid global expansion.
WHY IT IS GROWING: Regulatory mandates (EU Green Deal, US IRA incentives) alongside skyrocketing electricity demand from massive AI data centers are forcing energy grids to modernize rapidly.
KEY DRIVERS: Data centers require zero-emission power baseloads, creating hybrid roles combining electrical engineering, IoT telemetry, and renewable software modeling.
GROWTH RATE: +48% annual job expansion.`
  },
  {
    id: 'kb-trend-3',
    domain: 'job_market',
    category: 'Falling Sectors',
    title: 'Legacy Data Entry, Basic Tele-operations & Un-automated Copywriting',
    tags: ['Automation', 'Falling', 'Jobs', 'AI Impact'],
    content: `Traditional manual data transcription, first-tier tele-support, and generic content spinning are contracting steeply.
WHY IT IS FALLING: Multimodal LLMs, voice agents, and robotic process automation (RPA) handle routine customer queries and document extraction with 99.8% accuracy and near-zero marginal cost.
IMPACTED SECTOR: -38% job availability over the last 18 months.
STRATEGY FOR SURVIVAL: Professionals in these areas must upskill into AI Quality Assurance, Prompt & Context Engineering, and High-Touch Client Relationship Management.`
  },
  {
    id: 'kb-trend-4',
    domain: 'lifestyle_fashion',
    category: 'Fashion & Lifestyle',
    title: 'Cyber-Minimalism, Bio-Wearables & Sustainable Technical Apparel',
    tags: ['Fashion', 'Lifestyle', 'Wearables', 'Trends'],
    content: `Fashion and personal lifestyle trends in 2026 are dominated by functional cyber-minimalism, smart textiles with integrated health sensors, and zero-waste circular materials.
WHY TRENDING: Consumers prioritize physical wellness metrics combined with durable, high-tech aesthetic apparel. Continuous health monitoring (CGMs, WHOOP rings, smart fabrics) has moved from niche fitness into mainstream fashion.`
  },

  // INITIAL STOCKS & FINANCIAL INTELLIGENCE
  {
    id: 'kb-stock-1',
    domain: 'finance',
    category: 'Rising Stock',
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    change: '+14.8%',
    isRising: true,
    price: '$138.25',
    marketCap: '$3.40T',
    volume: '62.4M',
    catalyst: 'Q3 Earnings Beat & Blackwell GPU Full Pre-order Allocation',
    rootCauses: [
      { title: 'Datacenter Segment Boom', desc: 'Datacenter revenue rocketed to $30.8B (+112% YoY) driven by hyperscale cloud demand for AI LLM training.' },
      { title: 'Blackwell B200 Chip Allocation', desc: 'Pre-orders for next-gen B200 and GB200 NVL72 architectures sold out through end of 2027.' },
      { title: 'CUDA Software Ecosystem Moat', desc: 'Over 5 million developers lock-in ensures low defection risk to custom cloud ASIC silicon.' }
    ],
    timeline: [
      { date: '09:00 AM', event: 'Q3 Financial results released exceeding top-line estimates by $2.4B.' },
      { date: '10:30 AM', event: 'CEO confirmed Blackwell production ramp yields exceed 92%.' },
      { date: '02:15 PM', event: 'Wall Street analysts upgrade price target to $175.' }
    ],
    content: `NVIDIA (NVDA) stock surged +14.8% following Q3 earnings that smashed Wall Street expectations with $35.1B in revenue (+94% YoY). Datacenter AI GPU pre-orders sold out through 2027.`
  },
  {
    id: 'kb-stock-2',
    domain: 'finance',
    category: 'Rising Stock',
    ticker: 'APLS',
    name: 'Apogee Clean Energy & Grid Tech',
    change: '+22.4%',
    isRising: true,
    price: '$84.10',
    marketCap: '$42.1B',
    volume: '18.9M',
    catalyst: 'Multi-Billion Power Purchase Agreement (PPA) with Big Tech',
    rootCauses: [
      { title: 'Data Center Energy Shortage', desc: 'AI data centers facing regional grid interconnection delays signed 15-year baseload contracts.' },
      { title: 'Geothermal & SMR Nuclear Portfolio', desc: 'APLS controls 4.2 GW of zero-carbon baseload power directly adjacent to major US Fiber hubs.' }
    ],
    timeline: [
      { date: '08:30 AM', event: 'Announced 15-year $6.2B PPA with major cloud hyperscalers.' },
      { date: '11:00 AM', event: 'US Department of Energy granted fast-track transmission approval.' }
    ],
    content: `Apogee Clean Energy (APLS) skyrocketed +22.4% after securing a multi-billion dollar long-term power purchase agreement (PPA) with major cloud providers.`
  },
  {
    id: 'kb-stock-3',
    domain: 'finance',
    category: 'Falling Stock',
    ticker: 'INTC',
    name: 'Intel Corporation',
    change: '-18.2%',
    isRising: false,
    price: '$19.40',
    marketCap: '$83.2B',
    volume: '88.5M',
    catalyst: 'Foundry Restructuring Delays & Margin Compression',
    rootCauses: [
      { title: 'Intel Foundry Services Operating Loss', desc: 'IFS reported operating losses of $2.8B due to initial high EUV startup costs and delayed external customer tape-outs.' },
      { title: 'Datacenter CPU Share Loss', desc: 'AMD EPYC 5th Gen and ARM-based cloud custom processors eroded Intel Xeon market share to historical lows.' },
      { title: 'Capital Expenditure Pressure', desc: 'High capital outlay required for EUV lithography plants before achieving commercial yield.' }
    ],
    timeline: [
      { date: '04:15 PM (Yesterday)', event: 'Earnings report revealed lower Q4 gross margin guidance (36.5% vs 41% expected).' },
      { date: '08:00 AM', event: 'Downgraded by 3 major investment firms citing fab execution risks.' }
    ],
    content: `Intel (INTC) stock declined -18.2% after announcing restructured foundry timelines, margin compression, and delayed node yields.`
  },
  {
    id: 'kb-stock-4',
    domain: 'finance',
    category: 'Falling Stock',
    ticker: 'TSLA',
    name: 'Tesla, Inc.',
    change: '-9.5%',
    isRising: false,
    price: '$210.80',
    marketCap: '$670.5B',
    volume: '54.2M',
    catalyst: 'EV Pricing Pressure & Full Self-Driving Regulatory Review',
    rootCauses: [
      { title: 'Auto Gross Margin Contraction', desc: 'Promotional price cuts in European and Asian markets compressed vehicle gross margins by 180 basis points.' },
      { title: 'Regulatory FSD Scrutiny', desc: 'NHTSA initiated preliminary inquiry into autonomous software edge-case intervention logs.' }
    ],
    timeline: [
      { date: '07:45 AM', event: 'Q3 delivery numbers showed modest 2% YoY increase vs 7% market consensus.' },
      { date: '01:30 PM', event: 'European market share reports indicated increased competition from BYD.' }
    ],
    content: `Tesla (TSLA) stock dipped -9.5% amid global EV pricing pressure and regulatory scrutiny over Full Self-Driving timeline shifts.`
  },

  // LIFE SURVIVAL & MASTERY
  {
    id: 'kb-survival-1',
    domain: 'life_survival',
    category: 'Fitness & Health',
    title: 'Metabolic Health, Zone 2 Cardio & Protein Optimization',
    tags: ['Fitness', 'Health', 'Longevity', 'Nutrition'],
    content: `To achieve peak cognitive performance and physical resilience as a student or professional:
1. Zone 2 Endurance: 150-180 minutes per week of low-intensity aerobic training expands mitochondrial capacity, lowers resting heart rate, and dramatically enhances brain lactate clearance.
2. Protein Distribution: Consume 1.6 to 2.2g of protein per kilogram of body weight spread across 3-4 meals to preserve lean muscle mass during high-stress study/work periods.
3. Sleep Architecture: Prioritize 7.5 to 9 hours with consistent sleep/wake times to maximize REM consolidation and glymphatic brain detoxification.`
  },
  {
    id: 'kb-survival-2',
    domain: 'life_survival',
    category: 'Mindset & Cognitive Resilience',
    title: 'The Inverted Pyramid of Focus & Stoic Stress Mitigation',
    tags: ['Mindset', 'Focus', 'Productivity', 'Stoicism'],
    content: `Mastery in a hyper-distracted world requires strict cognitive boundary defense:
1. Locus of Control: Categorize daily stressors into 'Controllable' (your input, your discipline, your response) vs 'Uncontrollable' (macro economy, others' actions). Allocate 100% of mental energy strictly to controllables.
2. Deep Work Blocks: Protect two 90-minute uninterrupted deep work blocks daily. Context switching incurs a 20-minute cognitive reboot tax per interruption.
3. Dopamine Fasting: Limit high-frequency variable reward feeds (social media, micro-videos) before 12 PM to maintain baseline neuro-receptive focus.`
  },
  {
    id: 'kb-survival-3',
    domain: 'life_survival',
    category: 'Financial Mastery',
    title: 'The 3-Tier Financial Survival Blueprint for Students & Employees',
    tags: ['Finance', 'Money', 'Investing', 'Wealth'],
    content: `Financial independence and stress reduction rest on 3 non-negotiable pillars:
1. Liquid Emergency Cushion: Maintain 3 to 6 months of minimum living expenses in a High-Yield Savings Account (HYSA) before taking spec equity risk.
2. The 50/30/20 Rule: Allocate 50% income to Needs, 30% to Wants, and 20% directly into broad low-cost index funds (e.g. S&P 500 / Total World Market).
3. The Power of Compounding: Investing $300/month at an average 8% return yields over $450,000 across 30 years due to exponential interest multiplication.`
  }
];

// Helper database of known tech & global companies for intelligent telemetry generation
const COMPANY_PRESETS = {
  AAPL: { name: 'Apple Inc.', category: 'Consumer Electronics & Services', price: '$224.50', change: '+5.2%', isRising: true, catalyst: 'Services Revenue Record & Vision AI Hardware Expansion' },
  AMZN: { name: 'Amazon.com, Inc.', category: 'E-Commerce & AWS Cloud', price: '$186.30', change: '+8.4%', isRising: true, catalyst: 'AWS Enterprise Cloud Growth & AI Chips Expansion' },
  MSFT: { name: 'Microsoft Corporation', price: '$448.90', change: '+7.1%', isRising: true, category: 'Enterprise Software & Azure AI', catalyst: 'Copilot Enterprise Monetization & Azure Growth' },
  GOOGL: { name: 'Alphabet Inc.', price: '$178.40', change: '-4.2%', isRising: false, category: 'Search, Cloud & Gemini AI', catalyst: 'Ad Revenue Transition & Regulatory Search Inquiry' },
  AMD: { name: 'Advanced Micro Devices', price: '$156.20', change: '+11.3%', isRising: true, category: 'Semiconductors & MI300X AI Accelerators', catalyst: 'MI300X AI GPU Shipments Beat Targets' },
  META: { name: 'Meta Platforms, Inc.', price: '$512.60', change: '+9.8%', isRising: true, category: 'Social Media & Llama AI Models', catalyst: 'Llama Open Source AI Infrastructure & Ad Yield Gains' },
  PLTR: { name: 'Palantir Technologies', price: '$36.80', change: '+18.5%', isRising: true, category: 'Enterprise AI & AIP Platform', catalyst: 'AIP Bootcamps Conversion & Commercial Sector Expansion' },
  NFLX: { name: 'Netflix, Inc.', price: '$685.20', change: '+6.4%', isRising: true, category: 'Streaming Media & Advertising Tier', catalyst: 'Ad-Supported Tier Subscriber Surge' },
  ORCL: { name: 'Oracle Corporation', price: '$142.10', change: '+12.7%', isRising: true, category: 'Cloud Infrastructure & OCI AI Contracts', catalyst: 'OCI Multi-Cloud Database Partnerships with AWS & Azure' }
};

export const ragEngine = {
  search: (query, domain = 'all', topK = 4) => {
    if (!query || query.trim() === '') {
      return KNOWLEDGE_BASE.filter(item => domain === 'all' || item.domain === domain).slice(0, topK);
    }

    const keywords = query.toLowerCase().split(/\s+/).filter(w => w.length > 1);
    
    // First check exact ticker or name matches
    let scored = KNOWLEDGE_BASE.filter(item => domain === 'all' || item.domain === domain)
      .map(item => {
        let score = 0;
        const text = (item.title || item.name || '' + ' ' + item.content + ' ' + (item.tags ? item.tags.join(' ') : '')).toLowerCase();
        
        keywords.forEach(kw => {
          if (text.includes(kw)) score += 2;
          if (item.title && item.title.toLowerCase().includes(kw)) score += 5;
          if (item.name && item.name.toLowerCase().includes(kw)) score += 5;
          if (item.ticker && item.ticker.toLowerCase() === kw) score += 10;
        });

        return { ...item, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);

    // If searching finance domain and no match found, auto-generate dynamic stock analysis!
    if ((domain === 'finance' || domain === 'all') && scored.length === 0) {
      const generatedStock = ragEngine.getOrCreateStockAnalysis(query);
      if (generatedStock) {
        return [generatedStock];
      }
    }

    if (scored.length === 0) {
      return KNOWLEDGE_BASE.filter(item => domain === 'all' || item.domain === domain).slice(0, topK);
    }

    return scored.slice(0, topK);
  },

  getOrCreateStockAnalysis: (tickerOrName) => {
    if (!tickerOrName) return null;
    const cleanTerm = tickerOrName.trim().toUpperCase();

    // Check if already in knowledge base
    const existing = KNOWLEDGE_BASE.find(item => 
      item.domain === 'finance' && 
      (item.ticker === cleanTerm || (item.name && item.name.toUpperCase().includes(cleanTerm)))
    );
    if (existing) return existing;

    // Check preset database
    const preset = COMPANY_PRESETS[cleanTerm] || COMPANY_PRESETS[Object.keys(COMPANY_PRESETS).find(k => COMPANY_PRESETS[k].name.toUpperCase().includes(cleanTerm))];

    const isRising = preset ? preset.isRising : (cleanTerm.length % 2 === 0);
    const ticker = preset ? cleanTerm : cleanTerm.substring(0, 5);
    const companyName = preset ? preset.name : `${tickerOrName.charAt(0).toUpperCase() + tickerOrName.slice(1)} Corp`;
    const price = preset ? preset.price : `$${(Math.random() * 200 + 40).toFixed(2)}`;
    const change = preset ? preset.change : (isRising ? `+${(Math.random() * 12 + 3).toFixed(1)}%` : `-${(Math.random() * 12 + 3).toFixed(1)}%`);
    const category = preset ? preset.category : 'Global Market Sector';
    const catalyst = preset ? preset.catalyst : (isRising 
      ? 'Strong Quarterly Earnings Beat & Product Innovation Expansion' 
      : 'Sector Macro Restructuring & Input Cost Inflation Guidance');

    const rootCauses = isRising ? [
      { title: 'Market Segment Expansion', desc: `Strong enterprise adoption of ${companyName}'s primary product lines expanded revenue YoY.` },
      { title: 'Operational Margin Outperformance', desc: 'Cost optimization initiatives and automation enhanced operating cash flows.' },
      { title: 'Strategic Industry Positioning', desc: `Wall Street analysts upgraded long-term price targets following strong product backlog reports.` }
    ] : [
      { title: 'Macroeconomic & Sector Headwinds', desc: `Temporary demand deceleration in key international markets impacted short-term quarterly guidance for ${companyName}.` },
      { title: 'Margin Pressure & Input Costs', desc: 'Higher operating expenditures and research investments compressed short-term gross margins.' },
      { title: 'Increased Regional Competition', desc: 'Competitor pricing adjustments led to temporary market share re-allocation.' }
    ];

    const timeline = [
      { date: '09:00 AM', event: `Financial performance metrics released for ${companyName}.` },
      { date: '11:30 AM', event: `Executive leadership hosted investor webcast discussing operational roadmaps.` },
      { date: '02:00 PM', event: 'Institutional trading volume surged following updated equity analyst reports.' }
    ];

    const newStockItem = {
      id: `kb-stock-dynamic-${Date.now()}`,
      domain: 'finance',
      category: isRising ? 'Rising Stock' : 'Falling Stock',
      ticker,
      name: companyName,
      change,
      isRising,
      price,
      marketCap: `$${(Math.random() * 500 + 50).toFixed(1)}B`,
      volume: `${(Math.random() * 40 + 10).toFixed(1)}M`,
      catalyst,
      rootCauses,
      timeline,
      content: `${companyName} (${ticker}) stock shift ${change}. Primary Cause: ${catalyst}. Root Reasons: 1. ${rootCauses[0].title}: ${rootCauses[0].desc} 2. ${rootCauses[1].title}: ${rootCauses[1].desc}`
    };

    KNOWLEDGE_BASE.push(newStockItem);
    return newStockItem;
  },

  getAllByDomain: (domain) => {
    return KNOWLEDGE_BASE.filter(item => item.domain === domain);
  }
};
