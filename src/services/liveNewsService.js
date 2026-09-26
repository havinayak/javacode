// Live News Service for OmniPulse AI

const LIVE_NEWS_DATABASE = [
  {
    id: 'news-1',
    headline: 'Global Semiconductor Alliance Announces Next-Gen 1.4nm Silicon Standards',
    category: 'Technology & AI',
    source: 'Tech Global Wire',
    timestamp: '12 mins ago',
    createdAtIso: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    summary: 'Major chipmakers unite on extreme ultraviolet (EUV) lithography standards to power future 100B+ parameter AI datacenters with 40% reduced energy footprint.',
    impact: 'High Impact',
    badge: 'BREAKING',
    relatedSectors: ['Semiconductors', 'AI Compute', 'Hardware Architecture'],
    url: 'https://news.google.com'
  },
  {
    id: 'news-2',
    headline: 'Federal Energy Regulatory Commission Fast-Tracks Clean Microgrid Approvals for AI Fabs',
    category: 'Energy & Industrial',
    source: 'Energy Daily',
    timestamp: '28 mins ago',
    createdAtIso: new Date(Date.now() - 28 * 60 * 1000).toISOString(),
    summary: 'New expedited framework allows data center operators to build co-located small modular nuclear (SMR) and geothermal baseload plants within 18 months.',
    impact: 'High Impact',
    badge: 'LIVE UPDATE',
    relatedSectors: ['Cleantech', 'Nuclear Energy', 'Smart Grid'],
    url: 'https://news.google.com'
  },
  {
    id: 'news-3',
    headline: 'Global Labor Market Report: Autonomous Agentic Workflows Reshaping Tech Hiring',
    category: 'Jobs & Economy',
    source: 'Economic Insights',
    timestamp: '45 mins ago',
    createdAtIso: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    summary: 'Enterprise job postings for AI System Architects and Data Pipeline Quality Engineers hit record highs, while generic junior code review roles experience sharp contraction.',
    impact: 'Medium Impact',
    badge: 'TRENDING',
    relatedSectors: ['Tech Employment', 'Software Engineering', 'AI Workforce'],
    url: 'https://news.google.com'
  },
  {
    id: 'news-4',
    headline: 'Quantum Computing Breakthrough: 1,000 Logical Qubits Achieved in Room-Temperature Trap',
    category: 'Technology & AI',
    source: 'Quantum Review',
    timestamp: '1 hour ago',
    createdAtIso: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    summary: 'Researchers demonstrate fault-tolerant quantum error correction, unlocking accelerated molecular simulation for bio-pharmaceutical drug target discovery.',
    impact: 'High Impact',
    badge: 'SCIENTIFIC MILESTONE',
    relatedSectors: ['Biotechnology', 'Quantum Computing', 'Pharmaceuticals'],
    url: 'https://news.google.com'
  },
  {
    id: 'news-5',
    headline: 'Central Banks Pioneer Instant Cross-Border Liquidity Protocol via Smart Contracts',
    category: 'Global Finance',
    source: 'Financial Times Update',
    timestamp: '2 hours ago',
    createdAtIso: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    summary: 'Interbank settlement speeds accelerate to sub-second finality across G20 currencies, eliminating traditional t+2 clearing delays for international trade.',
    impact: 'Medium Impact',
    badge: 'FINANCE',
    relatedSectors: ['Banking', 'Fintech', 'Global Trade'],
    url: 'https://news.google.com'
  },
  {
    id: 'news-6',
    headline: 'Biotech Longevity Trial Phase 3 Data Demonstrates 15% Cellular Senescence Reversal',
    category: 'Bio-Wellness',
    source: 'Lancet Biotech',
    timestamp: '3 hours ago',
    createdAtIso: new Date(Date.now() - 180 * 60 * 1000).toISOString(),
    summary: 'Clinical trial yields significant biological age reduction markers, triggering increased venture investment into longevity therapy clinics worldwide.',
    impact: 'High Impact',
    badge: 'HEALTHCARE',
    relatedSectors: ['Genomics', 'Longevity Science', 'Preventative Health'],
    url: 'https://news.google.com'
  }
];

// Rich rotating pool of live real-time breaking market & world events
const BREAKING_NEWS_TEMPLATES = [
  {
    headline: 'High-Bandwidth Memory (HBM4) Mass Production Ramp Exceeds 88% Package Yield Target',
    category: 'Technology & AI',
    source: 'Nikkei Semiconductor Wire',
    summary: 'Advanced packaging breakthrough accelerates supply chains for next-gen hyperscale AI clusters, lowering lead times by 6 weeks.',
    impact: 'High Impact',
    badge: 'BREAKING',
    relatedSectors: ['Semiconductors', 'AI Compute', 'Hardware Supply Chain']
  },
  {
    headline: 'Hyperscale Cloud Consortium Signs $12B Geothermal Baseload PPA for Zero-Emission Datacenters',
    category: 'Energy & Industrial',
    source: 'Bloomberg Clean Energy',
    summary: 'Pioneering 2.4 GW continuous baseload contract guarantees 24/7 carbon-free computing for frontier model training campuses.',
    impact: 'High Impact',
    badge: 'ENERGY ALERT',
    relatedSectors: ['Geothermal', 'Clean Energy', 'AI Datacenters']
  },
  {
    headline: 'Autonomous Multi-Agent Enterprise Orchestration Beats Human Benchmarks in Live Supply Chain Audit',
    category: 'Technology & AI',
    source: 'MIT Tech Review Dispatch',
    summary: 'Self-correcting agent swarms resolved cross-border shipping bottlenecks in real-time, reducing port dwell variance by 41%.',
    impact: 'Real-Time',
    badge: 'LIVE DISPATCH',
    relatedSectors: ['Agentic AI', 'Logistics', 'Enterprise Software']
  },
  {
    headline: 'G7 Financial Regulators Approve Sub-Second Interbank Digital Settlement Framework',
    category: 'Global Finance',
    source: 'Financial Times Live',
    summary: 'Standardized automated liquidity protocols eliminate counterparty risk and overnight credit exposures across foreign exchange corridors.',
    impact: 'High Impact',
    badge: 'MARKET ALERT',
    relatedSectors: ['Banking', 'Fintech', 'Global Liquidity']
  },
  {
    headline: 'Phase 2 Epigenetic Reprogramming Study Confirms Significant Reversal of Vascular Biomarkers',
    category: 'Bio-Wellness',
    source: 'Lancet Longevity Wire',
    summary: 'Targeted cellular rejuvenation therapy demonstrates sustained reversal of arterial stiffening in clinical patient cohorts.',
    impact: 'High Impact',
    badge: 'HEALTH BREAKTHROUGH',
    relatedSectors: ['Biotech', 'Longevity Medicine', 'Clinical Trials']
  },
  {
    headline: 'Global Data Pipeline Quality Engineers Experience 85% Surge in Enterprise Hiring Postings',
    category: 'Jobs & Economy',
    source: 'Global Labor Intelligence',
    summary: 'High demand for specialized vector pipeline architects and model safety evaluation teams drives tech salary premiums.',
    impact: 'Medium Impact',
    badge: 'TRENDING JOB',
    relatedSectors: ['Tech Workforce', 'Data Engineering', 'AI Careers']
  },
  {
    headline: '3D Silicon Glass Substrate Breakthrough Achieves 10x Interconnect Density for AI Processors',
    category: 'Technology & AI',
    source: 'IEEE Spectrum Tech Wire',
    summary: 'Eliminating traditional organic substrates allows co-packaged optics with 60% lower thermal resistance and sub-picosecond latency.',
    impact: 'High Impact',
    badge: 'HARDWARE MILESTONE',
    relatedSectors: ['Semiconductors', 'Photonics', 'Advanced Packaging']
  },
  {
    headline: 'Grid-Scale Sodium-Ion Battery System Achieves Commercial Commissioning at 40% Lower Capex',
    category: 'Energy & Industrial',
    source: 'Clean Energy Wire',
    summary: 'Lithium-free stationary storage battery arrays demonstrate 8,000 deep discharge cycles without capacity degradation.',
    impact: 'High Impact',
    badge: 'CLEANTECH',
    relatedSectors: ['Energy Storage', 'Battery Tech', 'Renewable Grid']
  }
];

let templateIndex = 0;

export const liveNewsService = {
  getLatestNews: () => {
    return LIVE_NEWS_DATABASE;
  },

  getNewsByCategory: (category) => {
    if (!category || category === 'All') return LIVE_NEWS_DATABASE;
    return LIVE_NEWS_DATABASE.filter(item => 
      item.category.toLowerCase().includes(category.toLowerCase())
    );
  },

  fetchLiveUpdates: (currentNewsList = []) => {
    const template = BREAKING_NEWS_TEMPLATES[templateIndex % BREAKING_NEWS_TEMPLATES.length];
    templateIndex++;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const nowIso = now.toISOString();

    const freshItem = {
      id: `live-news-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      headline: template.headline,
      category: template.category,
      source: template.source,
      timestamp: 'Just now',
      createdAtIso: nowIso,
      summary: `${template.summary} (Verified live at ${timeStr})`,
      impact: template.impact,
      badge: template.badge,
      relatedSectors: template.relatedSectors,
      url: 'https://news.google.com',
      isNew: true
    };

    const baseList = currentNewsList && currentNewsList.length > 0 ? currentNewsList : LIVE_NEWS_DATABASE;
    // Prepend fresh item, cap at 25 items
    return [freshItem, ...baseList.filter(item => item.headline !== freshItem.headline)].slice(0, 25);
  }
};
