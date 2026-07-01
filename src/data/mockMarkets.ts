import type { Market } from '../types';
export const mockMarkets: Market[] = [
  { id:'1', title:'Will BTC exceed $100k by end of 2025?', description:'Bitcoin price on any major exchange.', category:'Crypto', yes_prob:62, volume:1240000, closes_at:'2025-12-31', resolved:false },
  { id:'2', title:'Will the Fed cut rates in Q3 2025?', description:'Federal Reserve rate decision.', category:'Finance', yes_prob:45, volume:890000, closes_at:'2025-09-30', resolved:false },
  { id:'3', title:'Will GPT-5 launch before July 2025?', description:'Official OpenAI release.', category:'AI', yes_prob:38, volume:560000, closes_at:'2025-07-01', resolved:false },
  { id:'4', title:'Will SpaceX land on Mars by 2030?', description:'Crewed or uncrewed landing.', category:'Space', yes_prob:22, volume:320000, closes_at:'2030-01-01', resolved:false },
  { id:'5', title:'Will the S&P 500 hit 6000 in 2025?', description:'Closing price milestone.', category:'Finance', yes_prob:71, volume:2100000, closes_at:'2025-12-31', resolved:false },
  { id:'6', title:'Will a new AI model beat GPT-4 on all benchmarks?', description:'Any publicly available model.', category:'AI', yes_prob:85, volume:430000, closes_at:'2025-06-30', resolved:false }
];
