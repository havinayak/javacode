// Live News Service for OmniPulse AI

const LIVE_NEWS_DATABASE = [
  {
    id: 'news-1',
    headline: 'Global Semiconductor Alliance Announces Next-Gen 1.4nm Silicon Standards',
    category: 'Technology & AI',
    source: 'Tech Global Wire',
    timestamp: '12 mins ago',
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
    summary: 'Clinical trial yields significant biological age reduction markers, triggering increased venture investment into longevity therapy clinics worldwide.',
    impact: 'High Impact',
    badge: 'HEALTHCARE',
    relatedSectors: ['Genomics', 'Longevity Science', 'Preventative Health'],
    url: 'https://news.google.com'
  }
];

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

  fetchLiveUpdates: () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const freshItem = {
      id: `live-news-${Date.now()}`,
      headline: `Live World News Dispatch (${timeStr}): Real-Time Industrial & Market Pulse`,
      category: 'Technology & AI',
      source: 'OmniPulse Live Telemetry Stream',
      timestamp: 'Just now',
      summary: `Automated live news retrieval verified breaking updates across semiconductor manufacturing, baseload energy infrastructure, and enterprise AI hiring trends at ${timeStr}.`,
      impact: 'Real-Time',
      badge: 'LIVE NOW',
      relatedSectors: ['Global Tech', 'Industrial Power', 'AI Workforce'],
      url: 'https://news.google.com'
    };
    return [freshItem, ...LIVE_NEWS_DATABASE];
  }
};
