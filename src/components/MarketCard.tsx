import React from 'react';
import type { Market } from '../types';
interface Props { market: Market; onClick: ()=>void; }
export default function MarketCard({ market, onClick }: Props) {
  const yes = market.yes_prob;
  const no = 100 - yes;
  return (
    <div onClick={onClick} className="bg-gray-900 border border-gray-800 rounded-xl p-4 cursor-pointer hover:border-indigo-500 transition group">
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">{market.category}</span>
        <span className="text-xs text-gray-500">Closes {new Date(market.closes_at).toLocaleDateString()}</span>
      </div>
      <h3 className="font-semibold text-white mb-3 group-hover:text-indigo-300 transition leading-snug">{market.title}</h3>
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-green-400 font-bold">YES {yes}¢</span>
          <span className="text-red-400 font-bold">NO {no}¢</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full" style={{width:`${yes}%`}} />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">Vol: ${(market.volume/1000).toFixed(0)}K</span>
        <div className="flex gap-2">
          <button className="bg-green-600 hover:bg-green-500 text-white text-xs px-3 py-1 rounded-lg font-bold" onClick={e=>{e.stopPropagation();onClick();}}>YES</button>
          <button className="bg-red-600 hover:bg-red-500 text-white text-xs px-3 py-1 rounded-lg font-bold" onClick={e=>{e.stopPropagation();onClick();}}>NO</button>
        </div>
      </div>
    </div>
  );
}
