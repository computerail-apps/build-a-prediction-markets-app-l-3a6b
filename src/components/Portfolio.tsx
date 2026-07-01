import React from 'react';
import type { Position, Market } from '../types';
interface Props { positions: Position[]; markets: Market[]; }
export default function Portfolio({ positions, markets }: Props) {
  if (!positions.length) return (
    <div className="text-center py-20 text-gray-500">
      <div className="text-5xl mb-4">📊</div>
      <p className="text-lg font-medium">No positions yet</p>
      <p className="text-sm mt-1">Trade on markets to build your portfolio</p>
    </div>
  );
  return (
    <div className="space-y-3">
      {positions.map((p,i)=>{
        const m = markets.find(x=>x.id===p.market_id);
        if(!m) return null;
        const cur = p.side==='YES' ? m.yes_prob : 100-m.yes_prob;
        const pnl = ((cur - p.avg_price) * p.shares / 100).toFixed(2);
        const pnlPos = parseFloat(pnl) >= 0;
        return (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{m.title}</p>
                <div className="flex gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    p.side==='YES'?'bg-green-900 text-green-400':'bg-red-900 text-red-400'
                  }`}>{p.side}</span>
                  <span className="text-xs text-gray-500">{p.shares} shares @ {p.avg_price}¢</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-white">{cur}¢</p>
                <p className={`text-xs font-bold ${pnlPos?'text-green-400':'text-red-400'}`}>{pnlPos?'+':''}{pnl}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
