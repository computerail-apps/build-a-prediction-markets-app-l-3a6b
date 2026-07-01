export interface Market {
  id: string;
  title: string;
  description: string;
  category: string;
  yes_prob: number;
  volume: number;
  closes_at: string;
  resolved: boolean;
  outcome?: boolean | null;
}
export interface Position {
  market_id: string;
  side: 'YES' | 'NO';
  shares: number;
  avg_price: number;
}
