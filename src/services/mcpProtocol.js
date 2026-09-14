// Model Context Protocol (MCP) Tool Execution Engine

import { ragEngine } from './ragEngine';

export const MCP_TOOLS = [
  {
    name: 'evaluate_algebraic_function',
    description: 'Generates coordinate points and threshold evaluation for linear, quadratic, exponential, and logarithmic progress functions.',
    parameters: {
      type: 'object',
      properties: {
        functionType: { type: 'string', enum: ['linear', 'quadratic', 'exponential', 'logarithmic'] },
        params: { type: 'object' },
        pointsCount: { type: 'number', default: 10 }
      },
      required: ['functionType']
    }
  },
  {
    name: 'query_market_trends',
    description: 'Queries current job market, fashion, and lifestyle sector trend data using RAG context.',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string' },
        sectorType: { type: 'string', enum: ['growing', 'falling', 'all'] }
      }
    }
  },
  {
    name: 'analyze_stock_cause',
    description: 'Provides in-depth root cause analysis for ANY rising or falling company stock.',
    parameters: {
      type: 'object',
      properties: {
        ticker: { type: 'string', description: 'Stock ticker symbol or company name (e.g. AAPL, NVDA, AMZN, MSFT, TSLA, INTC, GOOGL)' }
      },
      required: ['ticker']
    }
  },
  {
    name: 'calculate_survival_metric',
    description: 'Computes fitness metrics (BMR, TDEE) or financial compounding projections for students and employees.',
    parameters: {
      type: 'object',
      properties: {
        metricType: { type: 'string', enum: ['bmr_tdee', 'compound_interest', 'emergency_fund'] },
        inputs: { type: 'object' }
      },
      required: ['metricType', 'inputs']
    }
  }
];

export const mcpProtocol = {
  getAvailableTools: () => MCP_TOOLS,

  executeTool: (toolName, args = {}) => {
    switch (toolName) {
      case 'evaluate_algebraic_function': {
        const { functionType = 'linear', params = {}, pointsCount = 10 } = args;
        const data = [];
        const a = params.a ?? 1;
        const b = params.b ?? 0;
        const k = params.k ?? 0.3;

        for (let x = 1; x <= pointsCount; x++) {
          let y = 0;
          if (functionType === 'linear') {
            y = a * x + b;
          } else if (functionType === 'quadratic') {
            y = a * Math.pow(x, 2) + b * x;
          } else if (functionType === 'exponential') {
            y = 100 * (1 - Math.exp(-k * x));
          } else if (functionType === 'logarithmic') {
            y = a * Math.log(x + 1) * 20 + b;
          }
          data.push({
            day: `Day ${x}`,
            x,
            y: Math.min(100, Math.max(0, Math.round(y * 10) / 10)),
            threshold: 80
          });
        }
        return {
          status: 'success',
          tool: toolName,
          formula: functionType === 'linear' ? `y = ${a}x + ${b}`
                 : functionType === 'quadratic' ? `y = ${a}x² + ${b}x`
                 : functionType === 'exponential' ? `y = 100(1 - e^(-${k}x))`
                 : `y = ${a}·ln(x+1) + ${b}`,
          data
        };
      }

      case 'query_market_trends': {
        const results = ragEngine.search(args.query || 'market trends', 'job_market', 5);
        return {
          status: 'success',
          tool: toolName,
          query: args.query,
          matchesCount: results.length,
          results
        };
      }

      case 'analyze_stock_cause': {
        const { ticker = 'NVDA' } = args;
        const stockInfo = ragEngine.getOrCreateStockAnalysis(ticker);
        return {
          status: 'success',
          tool: toolName,
          ticker: stockInfo.ticker,
          stockInfo
        };
      }

      case 'calculate_survival_metric': {
        const { metricType, inputs = {} } = args;
        if (metricType === 'bmr_tdee') {
          const { weightKg = 70, heightCm = 175, age = 25, gender = 'male', activityLevel = 1.375 } = inputs;
          let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
          bmr += (gender === 'male' ? 5 : -161);
          const tdee = Math.round(bmr * activityLevel);
          return {
            status: 'success',
            metricType,
            bmr: Math.round(bmr),
            tdee,
            proteinGramsMin: Math.round(weightKg * 1.6),
            proteinGramsMax: Math.round(weightKg * 2.2),
            waterLiters: Math.round((weightKg * 0.035) * 10) / 10
          };
        } else if (metricType === 'compound_interest') {
          const { monthlyInvestment = 200, annualReturnRate = 8, years = 20 } = inputs;
          const r = annualReturnRate / 100 / 12;
          const n = years * 12;
          let totalValue = 0;
          let totalInvested = 0;
          const yearlyBreakdown = [];

          for (let month = 1; month <= n; month++) {
            totalInvested += monthlyInvestment;
            totalValue = (totalValue + monthlyInvestment) * (1 + r);
            if (month % 12 === 0) {
              yearlyBreakdown.push({
                year: month / 12,
                invested: Math.round(totalInvested),
                futureValue: Math.round(totalValue),
                interestGained: Math.round(totalValue - totalInvested)
              });
            }
          }

          return {
            status: 'success',
            metricType,
            totalInvested: Math.round(totalInvested),
            futureValue: Math.round(totalValue),
            totalInterest: Math.round(totalValue - totalInvested),
            yearlyBreakdown
          };
        } else if (metricType === 'emergency_fund') {
          const { monthlyExpense = 2000, targetMonths = 6 } = inputs;
          return {
            status: 'success',
            metricType,
            targetAmount: monthlyExpense * targetMonths,
            monthlyExpense,
            targetMonths
          };
        }
        return { status: 'error', message: 'Unknown metric type' };
      }

      default:
        return { status: 'error', message: `Tool ${toolName} not recognized.` };
    }
  },

  // Simulates an AI reasoning layer with MCP context execution
  runAgentPrompt: (userPrompt) => {
    const promptLower = userPrompt.toLowerCase();
    
    // Algebraic function query
    if (promptLower.includes('chart') || promptLower.includes('algebra') || promptLower.includes('formula') || promptLower.includes('curve')) {
      const toolRes = mcpProtocol.executeTool('evaluate_algebraic_function', {
        functionType: promptLower.includes('exponential') ? 'exponential' : promptLower.includes('quadratic') ? 'quadratic' : 'linear',
        params: { a: 2, b: 10, k: 0.4 }
      });
      return {
        toolUsed: 'evaluate_algebraic_function',
        thought: 'Analyzed user request for mathematical function evaluation. Executed MCP algebraic tool to calculate curve points against a 80% threshold.',
        textResponse: `Executed MCP Tool **evaluate_algebraic_function** (${toolRes.formula}). Evaluated dynamic dataset curve with target threshold of 80%.`,
        data: toolRes
      };
    }

    // Stock inquiry detection (any stock ticker or company keyword)
    const stockKeywords = ['stock', 'shares', 'ticker', 'rising', 'falling', 'up', 'down', 'price', 'why did', 'why is'];
    const knownTickers = ['aapl', 'apple', 'amzn', 'amazon', 'msft', 'microsoft', 'googl', 'google', 'nvda', 'nvidia', 'intc', 'intel', 'tsla', 'tesla', 'amd', 'meta', 'pltr', 'palantir', 'nflx', 'netflix', 'orcl', 'oracle', 'apls'];
    
    const isStockQuery = stockKeywords.some(kw => promptLower.includes(kw)) || knownTickers.some(t => promptLower.includes(t));

    if (isStockQuery) {
      // Extract ticker or company from prompt
      let tickerCandidate = 'NVDA';
      for (const t of knownTickers) {
        if (promptLower.includes(t)) {
          tickerCandidate = t.toUpperCase();
          break;
        }
      }

      // If no preset match, clean prompt to find capitalized or primary word
      if (tickerCandidate === 'NVDA' && !promptLower.includes('nvda')) {
        const words = userPrompt.split(/\s+/).filter(w => w.length > 2 && !['why', 'did', 'is', 'the', 'stock', 'falling', 'rising', 'up', 'down', 'price', 'what', 'happened', 'to', 'for', 'about'].includes(w.toLowerCase()));
        if (words.length > 0) {
          tickerCandidate = words[0].toUpperCase();
        }
      }

      const toolRes = mcpProtocol.executeTool('analyze_stock_cause', { ticker: tickerCandidate });
      const info = toolRes.stockInfo;

      const causesText = info.rootCauses.map((rc, i) => `\n${i+1}. **${rc.title}**: ${rc.desc}`).join('');
      
      return {
        toolUsed: 'analyze_stock_cause',
        thought: `Detected stock root-cause query for '${info.name} (${info.ticker})'. Executed MCP tool analyze_stock_cause and fetched RAG vector telemetry.`,
        textResponse: `### Stock Root-Cause Analysis: **${info.name} (${info.ticker})**
**Movement**: ${info.change} (${info.isRising ? 'Surge 📈' : 'Decline 📉'}) at ${info.price}
**Primary Catalyst**: ${info.catalyst}

**Why It ${info.isRising ? 'Rose' : 'Fell'} (Detailed Causes)**:${causesText}`,
        data: toolRes
      };
    }

    // Job market query
    if (promptLower.includes('job') || promptLower.includes('career') || promptLower.includes('trend') || promptLower.includes('sector')) {
      const toolRes = mcpProtocol.executeTool('query_market_trends', { query: userPrompt });
      return {
        toolUsed: 'query_market_trends',
        thought: 'Triggered RAG search across job market & world trends knowledge corpus.',
        textResponse: `Found ${toolRes.matchesCount} matching market trend records. Top growing sectors include AI Infrastructure and Cleantech, while legacy manual entry contracts.`,
        data: toolRes
      };
    }

    // Survival metric query
    if (promptLower.includes('bmr') || promptLower.includes('tdee') || promptLower.includes('fitness') || promptLower.includes('compound') || promptLower.includes('money')) {
      const isFitness = promptLower.includes('bmr') || promptLower.includes('tdee') || promptLower.includes('fitness');
      const toolRes = mcpProtocol.executeTool('calculate_survival_metric', {
        metricType: isFitness ? 'bmr_tdee' : 'compound_interest',
        inputs: isFitness ? { weightKg: 75, heightCm: 180, age: 24, gender: 'male' } : { monthlyInvestment: 300, annualReturnRate: 9, years: 15 }
      });
      return {
        toolUsed: 'calculate_survival_metric',
        thought: 'Executed MCP calculation tool for life survival telemetry.',
        textResponse: `Calculated metrics via MCP tool **calculate_survival_metric**. ${isFitness ? `Estimated TDEE is ${toolRes.tdee} kcal/day with ${toolRes.proteinGramsMin}-${toolRes.proteinGramsMax}g daily protein target.` : `Projected future portfolio value is $${toolRes.futureValue.toLocaleString()} with total interest of $${toolRes.totalInterest.toLocaleString()}.`}`,
        data: toolRes
      };
    }

    // Default RAG fallback
    const ragRes = ragEngine.search(userPrompt, 'all', 2);
    return {
      toolUsed: 'rag_vector_search',
      thought: 'Searched all RAG vector indices for query keywords.',
      textResponse: ragRes.length > 0 ? ragRes[0].content : "I analyzed your query across our RAG knowledge bases. Ask about ANY stock (e.g. 'Why is AAPL stock rising?'), job market trends, or habit threshold charts!",
      data: ragRes
    };
  }
};
