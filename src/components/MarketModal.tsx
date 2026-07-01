import React, { useState } from 'react';
import type { Market } from '../types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
const genHistory = (prob: number) => Array.from({length:30},(_,i)=>({ day:`D${i+1}`, prob: Math.max(5,Math.min(95, prob + (Math.random()-0.5)*20)) }));
interface Props { market: Market; onClose: ()=>void; onTrade: (side:'YES'|'NO', shares:number)=>void; }
export default function MarketModal({ market, onClose, onTrade }: Props) {
  const [side, setSide] = useState<'YES'|'NO'>('YES');
  const [shares, setShares] = useState(10);
  const history = genHistory(market.yes_prob);
  const price = side==='YES' ? market.yes_prob : 100-market.yes_prob;
  const cost = (shares * price / 100).toFixed(2);
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-lg p-6" onClick={e=>e.stopPropagation()}>
        <div className="flex justify-between mb-4">
          <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">{market.category}</span>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-xl">✕</button>
        </div>
        <h2 className="text-lg font-bold text-white mb-4">{market.title}</h2>
        <ResponsiveContainer width="100%" height={120}>
          <LineChart data={history}><XAxis dataKey="day" hide /><YAxis domain={[0,100]} hide /><Tooltip /><Line type="monotone" dataKey="prob" stroke="#6366f1" dot={false} strokeWidth={2} /></LineChart>
        </ResponsiveContainer>
        <div className="flex gap-3 mt-4 mb-4">
          {(['YES','NO'] as const).map(s=>(
            <button key={s} onClick={()=>setSide(s)}
              className={`flex-1 py-2 rounded-xl font-bold text-sm transition ${
                side===s ? (s==='YES'?'bg-green-600 text-white':'bg-red-600 text-white') : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}>{s} {s==='YES'?market.yes_prob:100-market.yes_prob}¢</button>
          ))}
        </div>
        <div className="bg-gray-800 rounded-xl p-4 mb-4">
          <label className="text-xs text-gray-400 mb-1 block">Shares</label>
          <input type="number" min={1} value={shares} onChange={e=>setShares(Number(e.target.value))}
            className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>Price per share: {price}¢</span><span>Total cost: <span className="text-white font-bold">${cost}</span></span>
          </div>
        </div>
        <button onClick={()=>{ onTrade(side, shares); onClose(); }}
          className={`w-full py-3 rounded-xl font-bold text-white transition ${
            side==='YES'?'bg-green-600 hover:bg-green-500':'bg-red-600 hover:bg-red-500'
          }`}>Buy {shares} {side} shares for ${cost}</button>
      </div>
    </div>
  );
}
